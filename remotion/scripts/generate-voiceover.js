/**
 * SignalSky — ElevenLabs voiceover generator
 *
 * Generates per-scene female voice narration for WalkthroughComposition.
 * Uses ElevenLabs "Rachel" voice (warm, natural, American female).
 *
 * Setup:
 *   1. Add ELEVENLABS_API_KEY=your_key_here to .env.local
 *   2. Run: node remotion/scripts/generate-voiceover.js
 *
 * Output: remotion/public/audio/vo-scene-{N}.mp3
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

// ── Config ────────────────────────────────────────────────────────────────────
// Load env — check remotion/.env first, then .env.local
function loadApiKey() {
  const candidates = [
    path.resolve(__dirname, "../.env"),
    path.resolve(__dirname, "../../.env.local"),
    path.resolve(__dirname, "../../.env"),
  ];
  for (const f of candidates) {
    if (!fs.existsSync(f)) continue;
    const m = fs.readFileSync(f, "utf8").match(/^ELEVENLABS_API_KEY=(.+)$/m);
    if (m) return m[1].trim().replace(/"/g, "");
  }
  return null;
}
const API_KEY = loadApiKey();
if (!API_KEY) {
  console.error("❌  ELEVENLABS_API_KEY not found in remotion/.env or .env.local");
  process.exit(1);
}

// Sarah — Mature, Reassuring, Confident (free premade voice)
const VOICE_ID = "EXAVITQu4vr4xnSDxMaL";
const MODEL = "eleven_turbo_v2_5"; // fastest + highest quality

const OUT_DIR = path.resolve(__dirname, "../../remotion/public/audio");
fs.mkdirSync(OUT_DIR, { recursive: true });

// ── Narration scripts per scene ────────────────────────────────────────────
const SCENES = [
  {
    id: "s1-hook",
    text: "Most traders scan for setups manually — every evening, stock by stock. SignalSky does it automatically. Every Reset and Reclaim setup across Nifty 50, Bank Nifty, S&P 100, and Nasdaq 100. Ranked by strength. Ready every morning before markets open.",
  },
  {
    id: "s2-scanner",
    text: "This is the Scanner. Every stock ranked by how close it is to breaking its prior ATH right now. Heat badges show the distance. Breakout means it's already there. Boiling means it's within 2 percent. Now apply the Slingshot filter — stocks that reclaimed EMA 220 within the last 30 days. Tighter reclaim window. Higher conviction. These are the stocks still inside the breakout window right now.",
  },
  {
    id: "s3-signal",
    text: "Click TITAN. The chart marks three exact moments. The pre-set ATH — where the stock peaked before the pullback. The break date — where it crossed below EMA 220. And the reclaim date — where it crossed back above. That's the setup. Scroll down to the Position Calculator. Type in your capital and risk percentage — stop loss, target price, and exact share count update instantly. No spreadsheet needed.",
  },
  {
    id: "s4-backtests",
    text: "Before risking real money — check the historical edge. Every symbol has a full backtest going back 20 years. Click the Slingshot 30-day chip. Win rate climbs. The tighter the entry window, the sharper the historical edge. Every triangle on the chart is a real trade. Green is a win.",
  },
  {
    id: "s5-performance",
    text: "The Performance page aggregates across every symbol in your universe. Apply the Slingshot filter across the entire universe. Win rate jumps. That's not data mining — it's the same strategy with a timing constraint that improves the edge.",
  },
  {
    id: "s6-market-health",
    text: "Before entering any trade — check market conditions. 76 percent of Nifty 50 is currently above EMA 220. Conditions are bullish. If this number drops below 40 percent, wait. No individual trades when the broader market is in distribution.",
  },
  {
    id: "s7-journal",
    text: "Every trade gets logged here — automatically split by India and US. Your actual performance, trade by trade. Not simulated. India P&L in rupees. US in dollars.",
  },
  {
    id: "s8-alerts",
    text: "Never miss a signal. Connect Telegram in 30 seconds — the bot fires the moment a stock enters the breakout zone. Choose which heat levels matter to you. Daily email digest also available — hits your inbox every morning at 7 AM IST before markets open.",
  },
  {
    id: "s9-cta",
    text: "7-day free trial. No card required. Monthly, yearly, or lifetime — whichever works for you. If you trade Reset and Reclaim and you're still doing it manually on TradingView — this is the upgrade. signalsky.app.",
  },
];

// ── ElevenLabs API call ────────────────────────────────────────────────────
function generateSpeech(text) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      text,
      model_id: MODEL,
      voice_settings: {
        stability: 0.45,
        similarity_boost: 0.85,
        style: 0.2,
        use_speaker_boost: true,
      },
    });

    const options = {
      hostname: "api.elevenlabs.io",
      path: `/v1/text-to-speech/${VOICE_ID}`,
      method: "POST",
      headers: {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let err = "";
        res.on("data", (d) => (err += d));
        res.on("end", () => reject(new Error(`ElevenLabs ${res.statusCode}: ${err}`)));
        return;
      }
      const chunks = [];
      res.on("data", (d) => chunks.push(d));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  console.log(`🎙  Generating ${SCENES.length} voiceover clips with ElevenLabs Rachel...\n`);

  for (const scene of SCENES) {
    const outPath = path.join(OUT_DIR, `vo-${scene.id}.mp3`);
    if (fs.existsSync(outPath)) {
      console.log(`  ⏭  ${scene.id} — already exists, skipping`);
      continue;
    }
    process.stdout.write(`  ⏳ ${scene.id} ...`);
    try {
      const audio = await generateSpeech(scene.text);
      fs.writeFileSync(outPath, audio);
      const kb = Math.round(audio.length / 1024);
      console.log(` ✅  ${kb}KB`);
    } catch (err) {
      console.log(` ❌  ${err.message}`);
    }
    // Rate limit: ElevenLabs allows burst, but be polite
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(`\n✅  Voiceovers saved to ${OUT_DIR}`);
  console.log("   Files:");
  SCENES.forEach((s) => {
    const p = path.join(OUT_DIR, `vo-${s.id}.mp3`);
    if (fs.existsSync(p)) {
      console.log(`   • vo-${s.id}.mp3 (${Math.round(fs.statSync(p).size / 1024)}KB)`);
    }
  });
}

main().catch((err) => {
  console.error("\n❌ Error:", err.message);
  process.exit(1);
});

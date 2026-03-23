import fs from "fs";
import path from "path";
import { VOICEOVER_SCRIPTS, VoiceoverVariant } from "../config/voiceover";

const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1/text-to-speech";
const VOICE_ID = "onwK4e9ZLuTAKqWW03F9"; // Daniel - Steady Broadcaster (premade, free tier)
const MODEL_ID = "eleven_turbo_v2";

const OUTPUT_DIR = path.join(__dirname, "..", "public", "audio");

async function generateVoiceover(variant: VoiceoverVariant): Promise<void> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ELEVENLABS_API_KEY not set. Create remotion/.env with ELEVENLABS_API_KEY=your_key"
    );
  }

  const script = VOICEOVER_SCRIPTS[variant];
  console.log(`\n📢 Generating ${variant} voiceover (${script.length} chars)...`);

  const response = await fetch(`${ELEVENLABS_API_URL}/${VOICE_ID}`, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text: script,
      model_id: MODEL_ID,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.3,
        use_speaker_boost: true,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`ElevenLabs API error (${response.status}): ${error}`);
  }

  const buffer = await response.arrayBuffer();
  const outputPath = path.join(OUTPUT_DIR, `vo-${variant}.mp3`);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(outputPath, Buffer.from(buffer));

  const kb = Math.round(buffer.byteLength / 1024);
  console.log(`✅ Saved: ${outputPath} (${kb} KB)`);
}

async function main() {
  // Load .env from remotion/.env
  const envPath = path.join(__dirname, "..", ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    for (const line of envContent.split("\n")) {
      const [key, ...rest] = line.split("=");
      if (key && rest.length > 0) {
        process.env[key.trim()] = rest.join("=").trim();
      }
    }
  }

  const arg = process.argv[2] as VoiceoverVariant | undefined;
  const validVariants: VoiceoverVariant[] = ["30s", "60s", "90s", "explainer", "demo"];

  if (arg && validVariants.includes(arg)) {
    await generateVoiceover(arg);
  } else if (!arg) {
    // Generate all
    for (const variant of validVariants) {
      await generateVoiceover(variant);
    }
  } else {
    console.error(`Invalid variant: ${arg}. Use 30s, 60s, 90s, or explainer`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});

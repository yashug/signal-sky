/**
 * SignalSky — Puppeteer screenshot capture
 *
 * Starts YOUR Chrome (with your real profile + Arcade extension) with remote
 * debugging enabled, then connects Puppeteer to it via CDP — so you're already
 * logged in and all extensions are active.
 *
 * Run: node remotion/scripts/capture-screenshots.js
 */

const puppeteer = require("puppeteer");
const { execSync, spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

// ─── Config ───────────────────────────────────────────────────────────────────
const CHROME_EXE =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const DEBUG_PORT = 9222;
const OUT_DIR = path.resolve(__dirname, "../../remotion/public/screenshots");
const BASE = "https://signalsky.app";
const VIEWPORT = { width: 1440, height: 900 };

// ─── Helpers ──────────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let idx = 0;
async function shot(page, name) {
  const filename = `${String(++idx).padStart(2, "0")}-${name}.png`;
  await page.screenshot({ path: path.join(OUT_DIR, filename), type: "png" });
  console.log(`  📸 ${filename}`);
}

async function nav(page, url, label) {
  console.log(`\n🔗 ${label}`);
  await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
  await sleep(2500);
}

async function scrollTo(page, y) {
  await page.evaluate(
    (y) => window.scrollTo({ top: y, behavior: "smooth" }),
    y
  );
  await sleep(1200);
}

async function tryClick(page, selectors, label) {
  for (const sel of selectors) {
    try {
      const el = await page.$(sel);
      if (el) {
        await el.click();
        console.log(`  👆 ${label}`);
        await sleep(1800);
        return true;
      }
    } catch {}
  }
  console.log(`  ⚠️  Couldn't click: ${label}`);
  return false;
}

async function waitForAuth(page) {
  const url = page.url();
  const needsLogin =
    url.includes("/sign-in") || url.includes("accounts.google.com");
  if (needsLogin) {
    console.log(
      "\n⏳  Not logged in — please sign in with the Susmitha Yaswanth Google account in the browser that just opened."
    );
    console.log("   Script will continue automatically after login.\n");
    await page.waitForFunction(
      () =>
        !window.location.href.includes("/sign-in") &&
        !window.location.href.includes("accounts.google.com"),
      { timeout: 120000, polling: 1000 }
    );
    await sleep(3000);
    console.log("  ✅ Logged in!\n");
  } else {
    console.log("  ✅ Already logged in\n");
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // ── Step 1: Kill any existing Chrome & lock files ──────────────────────────
  console.log("🛑  Closing existing Chrome...");
  try {
    execSync(`osascript -e 'quit app "Google Chrome"'`, { timeout: 6000 });
    await sleep(2000);
  } catch {}
  // Clear lock files
  const profileDir =
    "/Users/yaswanth/Library/Application Support/Google/Chrome";
  [
    `${profileDir}/SingletonLock`,
    `${profileDir}/SingletonSocket`,
    `${profileDir}/Default/LOCK`,
    `${profileDir}/Default/lockfile`,
  ].forEach((f) => { try { fs.unlinkSync(f); } catch {} });
  console.log("  ✅ Chrome closed, locks cleared\n");

  // ── Step 2: Launch YOUR Chrome with remote debugging ──────────────────────
  // This uses your real profile — all cookies, sessions, extensions intact.
  console.log(
    `🚀  Launching Chrome (your profile) on debug port ${DEBUG_PORT}...`
  );
  const chromeProcArgs = [
    `--remote-debugging-port=${DEBUG_PORT}`,
    "--remote-debugging-address=127.0.0.1",
    `--user-data-dir=${profileDir}`,
    "--profile-directory=Default",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-infobars",
    "--disable-session-crashed-bubble",
    "--restore-last-session",
    `--window-size=${VIEWPORT.width},${VIEWPORT.height}`,
    "about:blank",
  ];
  const chromeProc = spawn(CHROME_EXE, chromeProcArgs, {
    detached: false,
    stdio: "ignore",
  });
  chromeProc.unref();

  // Wait for Chrome to be ready
  console.log("  ⏳  Waiting for Chrome to start...");
  let browserURL = null;
  for (let attempt = 0; attempt < 30; attempt++) {
    await sleep(1000);
    try {
      const res = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
      const json = await res.json();
      browserURL = json.webSocketDebuggerUrl ? `http://127.0.0.1:${DEBUG_PORT}` : null;
      if (browserURL) break;
    } catch {}
  }
  if (!browserURL) throw new Error("Chrome didn't start on debug port in time");
  console.log("  ✅ Chrome ready\n");

  // ── Step 3: Connect Puppeteer to the running Chrome ───────────────────────
  const browser = await puppeteer.connect({ browserURL, defaultViewport: VIEWPORT });
  const pages = await browser.pages();
  const page = pages.find((p) => !p.url().includes("chrome://")) || pages[0] || await browser.newPage();
  await page.setViewport(VIEWPORT);

  // ── Step 4: Verify auth ────────────────────────────────────────────────────
  console.log("🔐  Checking auth...");
  await nav(page, `${BASE}/scanner`, "Auth check");
  await waitForAuth(page);

  if (!page.url().includes("/scanner")) {
    await nav(page, `${BASE}/scanner`, "Post-login scanner");
  }
  console.log("  ✅ Ready — starting capture\n");

  // ═══════════════════════════════════════════════════════════════════════════
  // SCENE 1 — Landing page
  // ═══════════════════════════════════════════════════════════════════════════
  console.log("━━━━ SCENE 1: Landing page");
  await nav(page, BASE, "Landing");
  await shot(page, "landing-hero");
  await scrollTo(page, 600);
  await shot(page, "landing-features");
  await scrollTo(page, 1600);
  await shot(page, "landing-pricing");

  // ═══════════════════════════════════════════════════════════════════════════
  // SCENE 2 — Sign-in page
  // ═══════════════════════════════════════════════════════════════════════════
  console.log("━━━━ SCENE 2: Sign-in page");
  await nav(page, `${BASE}/sign-in`, "Sign-in");
  await shot(page, "signin-page");
  // Navigate back to scanner (already logged in)
  await nav(page, `${BASE}/scanner`, "Back to scanner");

  // ═══════════════════════════════════════════════════════════════════════════
  // SCENE 3 — Scanner
  // ═══════════════════════════════════════════════════════════════════════════
  console.log("━━━━ SCENE 3: Scanner");
  await shot(page, "scanner-default");

  await tryClick(
    page,
    ["button::-p-text(Nifty 50)", "[data-value='nifty50']", "select"],
    "Nifty 50 filter"
  );
  await shot(page, "scanner-nifty50");

  await tryClick(
    page,
    ["button::-p-text(≤30)", "button::-p-text(30d)", "button::-p-text(≤ 30d)"],
    "Slingshot ≤30d"
  );
  await sleep(1500);
  await shot(page, "scanner-slingshot-30d");

  try {
    const row = await page.$("tbody tr:first-child");
    if (row) { await row.hover(); await sleep(600); }
  } catch {}
  await shot(page, "scanner-row-hover");

  // ═══════════════════════════════════════════════════════════════════════════
  // SCENE 4 — Signal Detail: RELIANCE
  // ═══════════════════════════════════════════════════════════════════════════
  console.log("━━━━ SCENE 4: Signal Detail — RELIANCE");
  await nav(page, `${BASE}/scanner/RELIANCE.NS`, "RELIANCE detail");
  await shot(page, "signal-detail-hero");
  await scrollTo(page, 450);
  await shot(page, "signal-detail-chart");
  await scrollTo(page, 950);
  await shot(page, "signal-detail-why-triggered");
  await scrollTo(page, 1400);
  await shot(page, "signal-detail-position-calc");

  // ═══════════════════════════════════════════════════════════════════════════
  // SCENE 5 — Backtests
  // ═══════════════════════════════════════════════════════════════════════════
  console.log("━━━━ SCENE 5: Backtests");
  await nav(page, `${BASE}/backtests`, "Backtests list");
  await shot(page, "backtests-list");
  await nav(page, `${BASE}/backtests/RELIANCE.NS`, "RELIANCE backtest");
  await shot(page, "backtest-detail-baseline");
  await tryClick(
    page,
    ["button::-p-text(≤ 30)", "button::-p-text(≤30)", "button::-p-text(30d)", "[data-chip='s30']"],
    "Slingshot ≤30d chip"
  );
  await sleep(2500);
  await shot(page, "backtest-detail-slingshot30");

  // ═══════════════════════════════════════════════════════════════════════════
  // SCENE 6 — Performance
  // ═══════════════════════════════════════════════════════════════════════════
  console.log("━━━━ SCENE 6: Performance");
  await nav(page, `${BASE}/performance`, "Performance");
  await shot(page, "performance-baseline");
  await tryClick(
    page,
    ["button::-p-text(≤30)", "button::-p-text(30d)", "button::-p-text(≤ 30)"],
    "Slingshot ≤30d"
  );
  await sleep(2500);
  await shot(page, "performance-slingshot30");

  // ═══════════════════════════════════════════════════════════════════════════
  // SCENE 7 — Market Health
  // ═══════════════════════════════════════════════════════════════════════════
  console.log("━━━━ SCENE 7: Market Health");
  await nav(page, `${BASE}/market-health`, "Market Health");
  await shot(page, "market-health-top");
  await scrollTo(page, 350);
  await shot(page, "market-health-cards");

  // ═══════════════════════════════════════════════════════════════════════════
  // SCENE 8 — Trade Journal
  // ═══════════════════════════════════════════════════════════════════════════
  console.log("━━━━ SCENE 8: Journal");
  await nav(page, `${BASE}/journal`, "Journal");
  await shot(page, "journal-overview");
  await scrollTo(page, 200);
  await shot(page, "journal-trades");

  // ═══════════════════════════════════════════════════════════════════════════
  // SCENE 9 — Alerts Settings
  // ═══════════════════════════════════════════════════════════════════════════
  console.log("━━━━ SCENE 9: Alerts");
  await nav(page, `${BASE}/settings`, "Settings");
  await tryClick(
    page,
    ["button::-p-text(Alerts)", "a::-p-text(Alerts)", "[data-tab='alerts']", "[value='alerts']"],
    "Alerts tab"
  );
  await shot(page, "settings-alerts-telegram");
  await scrollTo(page, 500);
  await shot(page, "settings-alerts-email");

  // ═══════════════════════════════════════════════════════════════════════════
  // SCENE 10 — Pricing / CTA
  // ═══════════════════════════════════════════════════════════════════════════
  console.log("━━━━ SCENE 10: Pricing");
  await nav(page, `${BASE}/pricing`, "Pricing");
  await shot(page, "pricing-full");
  await scrollTo(page, 300);
  await shot(page, "pricing-cards");

  // ─── Done ─────────────────────────────────────────────────────────────────
  const files = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith(".png")).sort();
  console.log(`\n✅  ${files.length} screenshots saved → ${OUT_DIR}`);
  files.forEach((f) => console.log(`   • ${f}`));

  await browser.disconnect();

  // Kill the debug Chrome and reopen normal Chrome
  try { chromeProc.kill(); } catch {}
  await sleep(500);
  execSync(`open -a "Google Chrome"`);
  console.log("\n✅  Normal Chrome reopened.\n");
}

main().catch((err) => {
  console.error("\n❌  Error:", err.message);
  process.exit(1);
});

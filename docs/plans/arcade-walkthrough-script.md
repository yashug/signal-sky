# SignalSky Arcade Product Walkthrough Script

## Context

Switched from Remotion (animated mockups) to Arcade (real screen recording + face cam) because the animated videos don't show the actual product. Arcade captures the live app with real data, click interactions, and the actual UI — far more credible for potential users. Face cam adds personal trust signal.

No code changes needed. This is a recording script only.

---

## Pre-Recording Checklist

- [ ] Open signalsky.app, sign in with your account (PRO tier active)
- [ ] Set browser zoom to **90%** (Cmd+- once) so the full scanner table fits
- [ ] Hide browser bookmarks bar (Cmd+Shift+B)
- [ ] Use Chrome in a **clean profile** — no extensions showing, no notification badges
- [ ] Arcade: enable **face cam**, position bottom-right corner, circular crop
- [ ] Arcade: set quality to **1080p**, frame rate 60fps
- [ ] Silence phone notifications; close Slack/email
- [ ] Have **TITAN** open in a background tab for the signal detail scene
- [ ] Pre-load backtests page on TITAN — so data is cached and loads instantly
- [ ] Run through the full script once dry before recording

---

## Full Walkthrough Script (~5–6 minutes)

---

### Scene 1 — Hook (0:00–0:25)

**URL**: signalsky.app (landing page)

**Face cam**: On. Confident, direct to camera.

**Narration**:
> "If you trade Indian or US markets using the Reset and Reclaim strategy — stocks that pulled back below their EMA 220 and reclaimed it — I built something specifically for you. This is SignalSky. Let me show you exactly what it does."

**Actions**:
1. Scroll slowly down the landing page — show the hero, feature sections, pricing
2. Pause 2s on the pricing section
3. Click **"Start free trial"** → lands on scanner (already logged in)

---

### Scene 2 — Signal Scanner (0:25–1:45)

**URL**: signalsky.app/scanner

**Face cam**: Smaller, move to top-right for this scene (screen needs space).

**Narration**:
> "This is the scanner. Every stock across Nifty 50, Bank Nifty, S&P 100, Nasdaq 100 — ranked by how close they are to breaking their pre-set ATH right now."

**Actions**:
1. Let the scanner load — show the full table with heat badges
2. Point out the heat colors: **"Breakout is green — stock is at or above ATH. Boiling is yellow-orange — within 2%. Simmering is just below that."**
3. Click the **Universe** dropdown → hover over "Bank Nifty" → hover "Nifty 50" → select **"Nifty 50"**
4. Table re-filters. Narrate:
   > "Switch to just Nifty 50 — India's top 50 stocks. Instantly filtered."
5. Now click the **Slingshot** chip — select **"≤ 30 days"**
6. Table shortens significantly. Narrate:
   > "This is the Slingshot filter. It only shows stocks that reclaimed their EMA 220 within the last 30 days. Tighter reclaim window — higher conviction. These are the stocks still inside the breakout window right now."
7. Hover over the slingshot days cell on TITAN row — show the tooltip ("X days from reclaim")
8. Narrate:
   > "TITAN — 12 days since reclaim. Still inside the window."

---

### Scene 3 — Signal Detail (1:45–2:45)

**URL**: signalsky.app/scanner/TITAN.NS

**Face cam**: Back to bottom-right, medium size.

**Narration**:
> "Click any stock. Here's the full signal breakdown."

**Actions**:
1. Click the TITAN row → signal detail page opens
2. Point at the chart — narrate:
   > "The chart marks three exact moments. The prior peak — where the stock hit its all-time high before the pullback. The break date — where it crossed below EMA 220. The reclaim date — where it crossed back above. That's the trade setup."
3. Scroll down to **"Why This Triggered"** section — show the three cards (Pre-Set ATH, Break date, Reclaim date)
4. Scroll to **Position Calculator** — narrate:
   > "Type in your capital and risk percentage. It calculates your stop loss, target price, and exact share count instantly."
5. Change risk % from default to **1.5%** — show numbers update live
6. Narrate: *"One and a half percent risk. Stop loss auto-calculated. No spreadsheet needed."*

---

### Scene 4 — Backtests (2:45–3:35)

**URL**: signalsky.app/backtests

**Face cam**: On, bottom-right.

**Narration**:
> "Before putting real money in — check the historical edge."

**Actions**:
1. Navigate to Backtests in the sidebar
2. Show the list of backtest cards — narrate:
   > "Every symbol in your universe has a backtest. 20 years of daily data."
3. Click the **TITAN** card
4. Backtest detail loads — point at the equity curve chart:
   > "TITAN — 72% win rate, Sharpe of 1.82, over 20 years."
5. Click the **"Slingshot ≤ 30d"** chip at the top of the chart
6. Stats re-animate — narrate:
   > "Switch to the 30-day slingshot variant. Win rate climbs to 76%. The tighter the entry window, the sharper the historical edge."
7. Point at individual trade markers on the chart: *"Every triangle is a real trade. Green is a win."*

---

### Scene 5 — Performance (3:35–4:10)

**URL**: signalsky.app/performance

**Face cam**: On, bottom-right.

**Narration**:
> "The Performance page aggregates across every symbol."

**Actions**:
1. Navigate to Performance in the sidebar
2. Show the stat grid — point at total backtests count, average win rate
3. Narrate:
   > "234 backtests. 68% average win rate on the baseline Reset and Reclaim strategy across all symbols."
4. Click the **"Slingshot ≤ 30d"** chip
5. Stats animate to new values — narrate:
   > "Apply the slingshot filter across the entire universe — win rate jumps to 76%. That's not data mining — it's the same strategy with a timing constraint that Shashank himself described."

---

### Scene 6 — Market Health (4:10–4:40)

**URL**: signalsky.app/market-health

**Face cam**: On, slightly larger — this is a good "look at camera" moment.

**Narration**:
> "Before entering any trade, check market conditions."

**Actions**:
1. Navigate to Market Health
2. Show the cards for Nifty 50, Bank Nifty, S&P 100, Nasdaq 100
3. Point at the percentage bars — narrate:
   > "76% of Nifty 50 is currently above EMA 220. Conditions are bullish. If this number drops below 40%, I wait. No individual trades when the broader market is in distribution."
4. Briefly hover over the S&P 100 card too

---

### Scene 7 — Trade Journal (4:40–5:05)

**URL**: signalsky.app/journal

**Face cam**: On, bottom-right.

**Narration**:
> "Every trade gets logged here — automatically split by India and US."

**Actions**:
1. Navigate to Journal in the sidebar
2. Show the P&L totals at top — India in ₹, US in $
3. Scroll through the trade rows — show green and red colouring
4. Narrate:
   > "Your actual performance, trade by trade. Not simulated — real entries and exits you've made. India P&L in rupees. US in dollars. You can also log directly from the scanner."

---

### Scene 8 — Alerts (5:05–5:35)

**URL**: signalsky.app/settings (Alerts tab)

**Face cam**: On, slightly larger — show excitement about this feature.

**Narration**:
> "The last piece — alerts. So you never miss a signal."

**Actions**:
1. Navigate to Settings → click the **Alerts** tab
2. Show the Telegram section — narrate:
   > "Connect Telegram in 30 seconds. One click, one tap in the bot."
3. Click **"Connect Telegram"** → show the deep link / QR (don't actually connect if already connected — if connected, show the "Connected ✓" state)
4. Show the heat filter toggles — narrate:
   > "Choose which heat levels you care about. Breakout only, or all levels."
5. Scroll to email section — show digest cadence toggle:
   > "Daily email digest option as well — hits your inbox every morning at 7 AM IST before markets open."

---

### Scene 9 — CTA Close (5:35–6:00)

**URL**: signalsky.app/pricing

**Face cam**: Large, centered or prominent — this is a direct-to-camera close.

**Narration**:
> "7-day free trial. No card required. Monthly, yearly, or lifetime — whichever works for you. If you trade Reset and Reclaim and you're still doing it manually on TradingView with sticky notes — this is the upgrade. signalsky.app."

**Actions**:
1. Navigate to Pricing page
2. Slowly scroll through the pricing cards — Monthly ₹299, Yearly ₹2,999, Lifetime ₹4,999
3. Hover over the **Yearly** card (highlighted "Best Value")
4. End on a static shot of the pricing page with face cam prominent

---

## Pace Guidelines

| Scene | Target Duration | Key Rule |
|-------|----------------|----------|
| Hook | 25s | Fast scroll — keep energy high |
| Scanner | 80s | Slow down on the Slingshot chip click — pause 2s after filtering |
| Signal Detail | 60s | Pause on the chart annotations — let viewers read each marker |
| Backtests | 50s | Pause 3s after chips switch to let stats re-animate fully |
| Performance | 35s | Quick — one chip click, read the numbers, move on |
| Market Health | 30s | Pause on the 40% threshold comment |
| Journal | 25s | Quick scan of the table, don't linger |
| Alerts | 30s | Slow on the Telegram connect step |
| CTA | 25s | Direct to camera the whole time |

---

## Short Reel Cut (60s version for Instagram/Twitter)

Use only 4 scenes:

1. **Scanner + Slingshot** (0:25–1:00, ~35s): Full scanner → Slingshot ≤30d chip click → table filters → hover tooltip on TITAN
2. **Signal Detail chart** (1:45–2:10, ~25s): Chart with 3 markers, position calculator with live update
3. **Backtest chip switch** (3:10–3:35, ~25s): Click slingshot chip → 68% → 76% win rate animation
4. **CTA** (5:35–6:00, ~25s): Direct to camera, pricing, signalsky.app

Total: ~110s — trim in editor (cut pauses) to get under 60s. Add captions via CapCut or Arcade's caption feature.

---

## Arcade-Specific Settings

- **Zoom clicks**: Enable "zoom on click" in Arcade — automatically zooms to 1.5× around each click point
- **Hotspots**: Add hotspot annotations on the Slingshot filter chip and heat badges — let Arcade render the "click" ripple
- **Background**: Use Arcade's gradient blur background (dark blue works well with SignalSky's theme)
- **Captions**: Turn on auto-captions, style in white with black outline
- **Music**: Low-fi background track at 15% volume (Arcade has built-in tracks)
- **Export**: 1080p MP4, H.264, for upload to YouTube/LinkedIn/Twitter natively

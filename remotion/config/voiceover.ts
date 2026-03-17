export const VOICEOVER_SCRIPTS = {
  "30s": `Most traders miss the breakout — not because they weren't watching, but because the signal was buried in noise.
SignalSky cuts through. One scan. Every morning. India and US markets.
It detects Reset and Reclaim setups using EMA200 — the moment a stock resets below its trend line and reclaims it near an all-time high.
Instant Telegram and email alerts. Trade journal with P&L analytics. Twenty years of backtest data.
Start your seven-day free trial at signalsky dot app. No card needed.`,

  "60s": `Most traders miss the breakout — not because they weren't watching, but because the signal was buried in noise.
Too many indicators. Too many tabs. Too much noise.
SignalSky is different. Built for one strategy that works: Reset and Reclaim.
When a stock pulls back below its two-hundred-day EMA, then reclaims it near an all-time high — that's the setup. SignalSky finds it for you, every single day, across Nifty 50, Nifty Bank, S&P 100, and NASDAQ 100.
The scanner shows you exactly where each stock sits in the cycle. Breakout — at the peak. Boiling — within two percent. Simmering — within five. Every level, color-coded and ranked.
Check market health at a glance. See what percentage of stocks are above their EMA200. Green means the tide is rising. Red means sit tight.
Get alerts the moment a signal fires — on Telegram, or email, filtered by heat level. No more checking charts manually.
Log your trades in the journal. Track P&L for India and US separately. Run backtests on twenty years of data before you risk a rupee.
Seven-day free trial. No card required. signalsky dot app.`,

  "90s": `Most traders miss the breakout — not because they weren't watching, but because the signal was buried in noise.
Seventeen browser tabs. Dozens of stocks. Conflicting indicators. By the time you figure it out, the move is already done.
There's a better way.
SignalSky is a professional signal scanner built for one strategy: Reset and Reclaim. It's the most reliable breakout pattern in markets — a stock hits an all-time high, pulls back below the two-hundred-day EMA, then reclaims it. That's the setup. Simple. Repeatable. Proven.
Every evening, SignalSky runs an automated scan across India's Nifty 50 and Nifty Bank, and the US's S&P 100 and NASDAQ 100 — over a thousand stocks in two markets. You wake up to a ranked list of the best setups, ready to act on.
Four heat levels tell you exactly where each stock is in the cycle. Breakout means the stock is at or above its prior peak right now. Boiling means it's within two percent. Simmering, within five. Warming means it's building up steam. Each level is color-coded so you can scan the table in seconds.
Market health gives you the macro view before you trade. See what percentage of each index is above its EMA200. When seventy percent of Nifty 50 is above the trend line, conditions are bullish. When it drops below forty, you wait.
Alerts fire the moment a signal meets your criteria. Connect your Telegram in one tap. Set your heat filter — maybe you only want Breakout and Boiling. Done. You'll get a message the instant it's relevant to you.
The trade journal tracks every position. Entry, exit, P&L — India in rupees, US in dollars, calculated separately. The portfolio heatmap shows your winners and losers at a glance.
And before you put real money in, run a backtest. Twenty years of historical data. See the win rate, average return, maximum drawdown — all for that specific symbol and strategy.
SignalSky is for traders who want an edge, not more noise.
Start your seven-day free trial at signalsky dot app. No credit card required. Cancel anytime.`,
  "explainer": `Have you ever wondered why some stocks suddenly shoot up after pulling back? There's a pattern behind it. Once you see it, you can't unsee it.

A stock's price moves up and down every day — like a runner on a track. Sometimes faster, sometimes slower, but with a general direction.

There's a special line called the EMA 200 — the average price over the last two hundred trading days. Think of it as the runner's natural pace. When the stock is above this line, it's healthy. When it falls below — it's struggling.

Every stock also has a prior peak — the highest price it hit before its most recent pullback. Not the all-time high, but the high that came just before it fell below the trend line.

Then the pullback happens. The stock drops below the EMA 200. Maybe the whole market sold off, or there was bad news. This is the Reset. The stock is catching its breath.

Here's where it gets exciting. The stock recovers. It crosses back above the EMA 200 — near its old peak. This is the Reclaim. The stock has reset its momentum and is now heading back toward that prior high. This is the exact moment that matters.

Why does this work? Because big institutions — hedge funds, mutual funds — missed the first run up. Now they're loading in right here, before the breakout. When institutions buy, stocks move.

SignalSky scans over a thousand stocks across India and the US every single morning to find exactly these setups — before they break out. Start your free trial at signalsky dot app.`,
} as const;

export type VoiceoverVariant = keyof typeof VOICEOVER_SCRIPTS;

export const AUDIO_FILES: Record<VoiceoverVariant, string> = {
  "30s": "audio/vo-30s.mp3",
  "60s": "audio/vo-60s.mp3",
  "90s": "audio/vo-90s.mp3",
  "explainer": "audio/vo-explainer.mp3",
};

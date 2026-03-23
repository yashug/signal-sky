import Link from "next/link"
import { ZapIcon, ArrowRightIcon, ArrowLeftIcon, TimerIcon, BellIcon, TrendingUpIcon, LineChartIcon, ActivityIcon, CheckIcon } from "lucide-react"
import { ThemeToggle } from "@/components/signal-sky/theme-toggle"
import type { ReactNode } from "react"

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <ZapIcon className="size-4.5" />
      </div>
      <span className="text-[17px] font-semibold tracking-tight text-foreground">
        SignalSky
      </span>
    </Link>
  )
}

function Navbar() {
  return (
    <nav className="fixed top-2 left-0 right-0 z-50 border-b border-border/20 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 h-16">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          <a href="/#features" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="/#strategy" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Strategy</a>
          <a href="/#pricing" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <Link href="/guide" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Guide</Link>
          <Link href="/changelog" className="text-[13px] text-foreground font-medium transition-colors">Changelog</Link>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/sign-in"
            className="text-[13px] text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Get Started
            <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

// ─── Inline mockup illustrations ─────────────────────────────────────────────

function SlingshotMockup() {
  return (
    <div className="mt-5 rounded-xl border border-border/40 bg-background/60 overflow-hidden shadow-sm">
      {/* Tab bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30 bg-muted/20">
        {["All · 24", "Breakout · 3", "Boiling · 7", "Simmering · 9", "Warming · 5"].map((tab, i) => (
          <span key={i} className={`text-[10px] font-medium px-2.5 py-1 rounded ${i === 0 ? "bg-primary/15 text-primary border border-primary/25" : "text-muted-foreground"}`}>
            {tab}
          </span>
        ))}
        {/* slingshot chip on the right */}
        <div className="ml-auto flex items-center gap-1.5">
          <ZapIcon className="size-3 text-primary" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-primary hidden sm:block">Slingshot</span>
          <div className="flex gap-0.5 rounded-md border border-border/25 bg-muted/20 p-0.5">
            {["Any", "≤30d", "≤60d", "≤90d"].map((label, i) => (
              <span key={i} className={`h-5 px-2 rounded text-[10px] font-semibold flex items-center ${i === 1 ? "bg-primary/20 text-primary shadow-sm" : "text-muted-foreground/40"}`}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Info strip */}
      <div className="flex items-center gap-2 px-4 py-1.5 border-b border-primary/10 bg-primary/[0.04]">
        <ZapIcon className="size-3 text-primary/60" />
        <span className="text-[10px] text-foreground/60">
          <span className="font-semibold text-primary/80">Slingshot ≤30d:</span>{" "}
          Stocks that bounced back above EMA220 within the last 30 days.
        </span>
        <span className="ml-auto text-[10px] text-muted-foreground/40">✕ Clear</span>
      </div>
      {/* Table rows */}
      <div className="divide-y divide-border/20">
        {[
          { symbol: "RELIANCE", heat: "breakout", dist: "0.0%", days: "12d", color: "text-bull bg-bull/10 border-bull/20" },
          { symbol: "INFY", heat: "boiling", dist: "−1.4%", days: "28d", color: "text-heat-boiling bg-heat-boiling/10 border-heat-boiling/20" },
          { symbol: "TCS", heat: "simmering", dist: "−3.2%", days: "19d", color: "text-heat-simmering bg-heat-simmering/10 border-heat-simmering/20" },
        ].map((row) => (
          <div key={row.symbol} className="flex items-center gap-4 px-4 py-2.5">
            <span className="font-mono text-[11px] font-semibold text-foreground w-20">{row.symbol}</span>
            <span className={`text-[9px] font-semibold uppercase tracking-wide border rounded-full px-1.5 py-0.5 ${row.color}`}>
              {row.heat}
            </span>
            <span className="font-mono text-[11px] text-muted-foreground ml-auto">{row.dist}</span>
            <span className="flex items-center gap-1 text-[10px] text-primary/70 font-medium">
              <TimerIcon className="size-2.5" />
              {row.days} since reclaim
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TelegramMockup() {
  return (
    <div className="mt-5 rounded-xl border border-border/40 bg-background/60 overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-border/30 bg-muted/20 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-foreground">Alert Preferences</span>
        <span className="text-[10px] text-muted-foreground">Settings → Alerts</span>
      </div>
      <div className="p-4 space-y-3">
        {/* Telegram card */}
        <div className="rounded-lg border border-border/40 bg-muted/10 p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-[oklch(0.56_0.21_245)]/15 flex items-center justify-center">
                <BellIcon className="size-3 text-[oklch(0.56_0.21_245)]" />
              </div>
              <span className="text-[12px] font-medium text-foreground">Telegram</span>
              <span className="text-[9px] font-semibold bg-bull/10 text-bull border border-bull/20 rounded-full px-1.5 py-0.5 flex items-center gap-1">
                <CheckIcon className="size-2" /> Connected
              </span>
            </div>
            {/* Toggle on */}
            <div className="w-8 h-4 rounded-full bg-primary flex items-center justify-end pr-0.5">
              <div className="size-3 rounded-full bg-white shadow" />
            </div>
          </div>
          <div className="flex gap-1 mt-2">
            {["All heats", "Breakout only", "Boiling+"].map((f, i) => (
              <span key={i} className={`text-[9px] px-2 py-0.5 rounded border font-medium ${i === 0 ? "border-primary/30 bg-primary/10 text-primary" : "border-border/30 text-muted-foreground"}`}>{f}</span>
            ))}
          </div>
        </div>
        {/* Email card */}
        <div className="rounded-lg border border-border/40 bg-muted/10 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center">
                <BellIcon className="size-3 text-primary" />
              </div>
              <span className="text-[12px] font-medium text-foreground">Email Digest</span>
            </div>
            <div className="flex gap-1">
              {["Off", "Daily", "Weekly"].map((opt, i) => (
                <span key={i} className={`text-[9px] px-2 py-0.5 rounded border font-medium ${i === 1 ? "border-primary/30 bg-primary/10 text-primary" : "border-border/30 text-muted-foreground"}`}>{opt}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BacktestMockup() {
  const bars = [30, 42, 38, 55, 50, 68, 60, 75, 70, 88, 82, 100]
  return (
    <div className="mt-5 rounded-xl border border-border/40 bg-background/60 overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-border/30 bg-muted/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-foreground">RELIANCE · Backtest</span>
          <span className="text-[9px] font-medium text-muted-foreground border border-border/30 rounded px-1.5 py-0.5">v2-ath-ema220</span>
        </div>
        <div className="flex gap-1.5">
          {["Baseline", "≤30d", "≤60d", "≤90d"].map((v, i) => (
            <span key={i} className={`text-[9px] px-2 py-0.5 rounded border font-medium ${i === 0 ? "border-primary/30 bg-primary/10 text-primary" : "border-border/30 text-muted-foreground"}`}>{v}</span>
          ))}
        </div>
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-4 divide-x divide-border/20 border-b border-border/20">
        {[
          { label: "Win Rate", value: "72%", positive: true },
          { label: "Avg Return", value: "+18.4%", positive: true },
          { label: "Sharpe", value: "1.82", positive: true },
          { label: "Max DD", value: "−12.1%", positive: false },
        ].map((s) => (
          <div key={s.label} className="px-3 py-2.5 text-center">
            <p className="text-[9px] text-muted-foreground mb-0.5">{s.label}</p>
            <p className={`font-mono text-[13px] font-semibold ${s.positive ? "text-bull" : "text-bear"}`}>{s.value}</p>
          </div>
        ))}
      </div>
      {/* Mini equity curve */}
      <div className="px-4 py-3">
        <p className="text-[9px] text-muted-foreground mb-2 uppercase tracking-wider">Equity Curve</p>
        <div className="flex items-end gap-1 h-16">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-bull/20 border-t border-bull/40 transition-all"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="font-mono text-[9px] text-muted-foreground/50">Jan 2015</span>
          <span className="font-mono text-[9px] text-muted-foreground/50">Jan 2025</span>
        </div>
      </div>
    </div>
  )
}

function ScannerMockup() {
  return (
    <div className="mt-5 rounded-xl border border-border/40 bg-background/60 overflow-hidden shadow-sm">
      {/* Market health bar */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-border/30 bg-muted/30">
        <ActivityIcon className="size-3 text-primary/60" />
        <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Market Health</span>
        {[
          { label: "Nifty 50", pct: 76 },
          { label: "Nifty 200", pct: 61 },
          { label: "S&P 100", pct: 68 },
          { label: "NDX 100", pct: 72 },
        ].map((m) => (
          <div key={m.label} className="flex items-center gap-1.5">
            <span className="text-[9px] text-muted-foreground/60">{m.label}</span>
            <div className="w-14 h-1.5 rounded-full bg-border/30 overflow-hidden">
              <div className="h-full rounded-full bg-bull/50" style={{ width: `${m.pct}%` }} />
            </div>
            <span className="font-mono text-[9px] text-bull">{m.pct}%</span>
          </div>
        ))}
      </div>
      {/* Signal rows */}
      <div className="divide-y divide-border/20">
        {[
          { symbol: "RELIANCE.NS", name: "Reliance Ind.", heat: "breakout", heatColor: "text-bull bg-bull/10 border-bull/20", price: "₹2,847", dist: "0.0%", vol: "2.1×" },
          { symbol: "HDFCBANK.NS", name: "HDFC Bank", heat: "boiling", heatColor: "text-heat-boiling bg-heat-boiling/10 border-heat-boiling/20", price: "₹1,623", dist: "−1.2%", vol: "1.4×" },
          { symbol: "AAPL", name: "Apple Inc.", heat: "simmering", heatColor: "text-heat-simmering bg-heat-simmering/10 border-heat-simmering/20", price: "$189.40", dist: "−3.8%", vol: "1.7×" },
        ].map((row) => (
          <div key={row.symbol} className="flex items-center gap-3 px-4 py-2.5">
            <div className="w-28">
              <p className="font-mono text-[10px] font-semibold text-foreground">{row.symbol}</p>
              <p className="text-[9px] text-muted-foreground/60">{row.name}</p>
            </div>
            <span className={`text-[9px] font-semibold uppercase tracking-wide border rounded-full px-1.5 py-0.5 ${row.heatColor}`}>
              {row.heat}
            </span>
            <span className="font-mono text-[11px] text-foreground ml-auto">{row.price}</span>
            <span className={`font-mono text-[10px] w-10 text-right ${row.dist === "0.0%" ? "text-bull" : "text-muted-foreground"}`}>{row.dist}</span>
            <span className="font-mono text-[10px] text-muted-foreground/60 w-8 text-right">{row.vol}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function JournalMockup() {
  return (
    <div className="mt-5 rounded-xl border border-border/40 bg-background/60 overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-border/30 bg-muted/20 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-foreground">Trade Journal</span>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-muted-foreground">India <span className="font-mono text-bull">+₹18,240</span></span>
          <span className="text-[10px] text-muted-foreground">US <span className="font-mono text-bull">+$1,340</span></span>
        </div>
      </div>
      <div className="divide-y divide-border/20">
        {[
          { symbol: "RELIANCE", entry: "₹2,720", exit: "₹2,847", qty: "10", pnl: "+₹1,270", status: "CLOSED", pnlColor: "text-bull" },
          { symbol: "INFY", entry: "₹1,450", exit: "—", qty: "15", pnl: "Open", status: "OPEN", pnlColor: "text-muted-foreground" },
          { symbol: "AAPL", entry: "$182.00", exit: "$191.40", qty: "5", pnl: "+$47.00", status: "CLOSED", pnlColor: "text-bull" },
        ].map((row) => (
          <div key={row.symbol} className="flex items-center gap-3 px-4 py-2.5">
            <span className="font-mono text-[11px] font-semibold text-foreground w-20">{row.symbol}</span>
            <span className={`text-[9px] font-semibold border rounded-full px-1.5 py-0.5 ${row.status === "OPEN" ? "text-primary border-primary/30 bg-primary/10" : "text-muted-foreground border-border/30"}`}>
              {row.status}
            </span>
            <span className="text-[10px] text-muted-foreground">{row.entry} → {row.exit}</span>
            <span className={`font-mono text-[11px] font-semibold ml-auto ${row.pnlColor}`}>{row.pnl}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MarketHealthMockup() {
  return (
    <div className="mt-5 rounded-xl border border-border/40 bg-background/60 overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-border/30 bg-muted/20 flex items-center gap-2">
        <TrendingUpIcon className="size-3.5 text-primary/60" />
        <span className="text-[11px] font-semibold text-foreground">Market Health Dashboard</span>
        <span className="text-[9px] text-muted-foreground ml-auto">Updated EOD · Mar 21, 2026</span>
      </div>
      <div className="p-4 grid grid-cols-2 gap-3">
        {[
          { label: "Nifty 50", pct: 76, count: "38/50", trend: "up" },
          { label: "Nifty 200", pct: 61, count: "122/200", trend: "up" },
          { label: "S&P 100", pct: 68, count: "68/100", trend: "neutral" },
          { label: "NASDAQ 100", pct: 72, count: "72/100", trend: "up" },
        ].map((m) => (
          <div key={m.label} className="rounded-lg border border-border/30 bg-muted/10 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-medium text-foreground">{m.label}</span>
              <span className="font-mono text-[11px] font-bold text-bull">{m.pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-border/30 overflow-hidden mb-1.5">
              <div className="h-full rounded-full bg-bull/50" style={{ width: `${m.pct}%` }} />
            </div>
            <span className="text-[9px] text-muted-foreground/60">{m.count} above EMA220</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Types & data ─────────────────────────────────────────────────────────────

type Category = "Scanner" | "Backtests" | "Alerts" | "Payments" | "Platform" | "Journal"

const categoryColors: Record<Category, string> = {
  Scanner: "bg-primary/10 text-primary border-primary/20",
  Backtests: "bg-bull/10 text-bull border-bull/20",
  Alerts: "bg-heat-simmering/10 text-heat-simmering border-heat-simmering/20",
  Payments: "bg-muted/50 text-muted-foreground border-border/40",
  Platform: "bg-secondary/50 text-secondary-foreground border-border/40",
  Journal: "bg-[oklch(0.72_0.19_280)]/10 text-[oklch(0.72_0.19_280)] border-[oklch(0.72_0.19_280)]/20",
}

interface ChangelogEntry {
  date: string
  category: Category
  title: string
  description: string
  bullets?: string[]
  isNew?: boolean
  /** Pass a URL string for a screenshot, or a ReactNode for an inline mockup */
  preview?: string | ReactNode
}

const entries: ChangelogEntry[] = [
  {
    date: "Mar 2026",
    category: "Scanner",
    title: "Slingshot Filter",
    description:
      "Filter signals by how quickly stocks bounce back to their ATH after reclaiming EMA220. Set a window (≤30d / ≤60d / ≤90d) to find the sharpest setups where price didn't waste time drifting — it shot straight for the breakout.",
    bullets: [
      "URL-persistent filter — your window preference stays across page refreshes",
      "Three windows: ≤30 days, ≤60 days, ≤90 days (or 'All')",
      "Measures days from EMA220 reclaim → ATH breakout, not the pullback duration",
    ],
    isNew: true,
    preview: <SlingshotMockup />,
  },
  {
    date: "Mar 2026",
    category: "Alerts",
    title: "Telegram & Email Alerts",
    description:
      "Get notified the moment a new signal appears — without opening the app. Connect your Telegram account in Settings for instant push notifications, or choose a daily/weekly email digest.",
    bullets: [
      "Real-time signal alerts via @signalskyin_bot on Telegram",
      "Daily and weekly email digest with all new signals",
      "Per-channel heat-level filtering — only see Breakout signals, or all of them",
    ],
    preview: <TelegramMockup />,
  },
  {
    date: "Feb 2026",
    category: "Backtests",
    title: "Slingshot Backtest Variants",
    description:
      "The backtest engine now runs four independent simulations per symbol — a baseline (no filter) plus three slingshot windows. Each variant has its own trade list, win rate, and equity curve so you can compare apples-to-apples.",
    bullets: [
      "Admin bulk-run generates 4 DB variants per symbol: baseline, s30, s60, s90",
      "Performance page aggregates stats across all symbols for each variant",
      "Backtest detail page switches between variants instantly — no extra API call",
    ],
    preview: <BacktestMockup />,
  },
  {
    date: "Feb 2026",
    category: "Journal",
    title: "Trade Journal",
    description:
      "Log every trade you take from a signal — entry price, exit price, position size — and track realised P&L over time. India and US books are kept separate so currency doesn't mix.",
    bullets: [
      "Open and closed trade tracking per symbol and exchange",
      "Realised P&L split by India (₹) and US ($)",
      "Quick-add from scanner: prefills symbol and current price",
    ],
    preview: <JournalMockup />,
  },
  {
    date: "Jan 2026",
    category: "Backtests",
    title: "Backtesting Engine",
    description:
      "Run full historical backtests on any signal — up to 20 years of daily data. See exactly how the Reset & Reclaim strategy would have performed: win rate, average return, Sharpe ratio, max drawdown, profit factor, and an interactive equity curve.",
    bullets: [
      "20-year backtests using daily OHLCV from Yahoo Finance",
      "Risk-adjusted metrics: Sharpe ratio, max drawdown, profit factor",
      "Interactive equity curve with trade markers",
      "Per-trade breakdown — every entry, exit, and return visible",
    ],
  },
  {
    date: "Jan 2026",
    category: "Scanner",
    title: "Market Health Dashboard",
    description:
      "A real-time breadth dashboard showing what percentage of major indices are trading above EMA220. One glance tells you whether the broader market is in a healthy uptrend or a risk-off environment before you act on any signal.",
    bullets: [
      "Nifty 50, Nifty 200, S&P 100, NASDAQ 100 breadth indicators",
      "Updated after each EOD scan",
      "Top bar visible on every dashboard page",
    ],
    preview: <MarketHealthMockup />,
  },
  {
    date: "Dec 2025",
    category: "Payments",
    title: "PhonePe Subscriptions",
    description:
      "Billing is live. Monthly and yearly plans use UPI autopay mandates — set it once and your subscription renews automatically. Lifetime access is a one-time payment with no recurring charges.",
    bullets: [
      "UPI autopay mandates for monthly (₹299/mo) and yearly (₹2,999/yr) plans",
      "One-time lifetime payment (₹4,999) — pay once, use forever",
      "Webhook-driven activation — subscription goes live the moment payment clears",
    ],
  },
  {
    date: "Dec 2025",
    category: "Platform",
    title: "Lifetime Deal",
    description:
      "One payment. No future bills. A limited number of lifetime seats are available at ₹4,999 — once they're gone, they're gone. The seat counter updates live on the pricing page.",
    bullets: [
      "Limited seats — tracked live with a public counter",
      "All future features included at no extra cost",
      "Same full access as monthly/yearly subscribers",
    ],
  },
  {
    date: "Nov 2025",
    category: "Scanner",
    title: "Signal Scanner — Launch",
    description:
      "SignalSky launched with the Reset & Reclaim scanner for NSE (India) and US markets. The strategy finds stocks that hit a pre-set ATH, pulled back below EMA220, and have since reclaimed above it — with the ATH still within reach.",
    bullets: [
      "Scans Nifty 50, Nifty 200, S&P 100, NASDAQ 100 universes daily",
      "Heat levels: Breakout (at ATH), Boiling (0–2% below), Simmering (2–5% below), Warming (5–15% below)",
      "Signal detail page with annotated chart showing ATH, EMA220, break and reclaim dates",
      "7-day free trial — no credit card required to start",
    ],
    preview: <ScannerMockup />,
  },
]

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* subtle background glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-[0.06] blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.19 220), transparent 70%)" }}
      />

      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-3xl px-6">
          {/* Page header */}
          <div className="mb-16">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
                What&apos;s new
              </span>
            </div>

            <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.035em] text-foreground">
              Changelog
            </h1>
            <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
              New features and improvements as they ship.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 top-3 bottom-3 w-px bg-border/30" />

            <div className="space-y-14">
              {entries.map((entry, i) => (
                <div key={i} className="relative pl-10">
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-[-4.5px] top-[6px] size-[9px] rounded-full border-2 ${
                      entry.isNew
                        ? "border-primary bg-primary"
                        : "border-border/60 bg-background"
                    }`}
                  />

                  {/* Entry card */}
                  <div className="group">
                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                      <span className="font-mono text-[11px] font-medium text-muted-foreground/70 tracking-wide">
                        {entry.date}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] ${categoryColors[entry.category]}`}
                      >
                        {entry.category}
                      </span>
                      {entry.isNew && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-primary">
                          <span className="relative flex size-1.5">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                          </span>
                          New
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-[19px] font-semibold tracking-[-0.02em] text-foreground mb-2">
                      {entry.title}
                    </h2>

                    {/* Description */}
                    <p className="text-[14px] leading-relaxed text-muted-foreground">
                      {entry.description}
                    </p>

                    {/* Bullets */}
                    {entry.bullets && (
                      <ul className="mt-3 space-y-1.5">
                        {entry.bullets.map((bullet, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2.5 text-[13px] text-muted-foreground"
                          >
                            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary/50" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Preview — screenshot URL or inline mockup */}
                    {entry.preview && (
                      typeof entry.preview === "string" ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={entry.preview}
                          alt={`${entry.title} screenshot`}
                          className="mt-5 w-full rounded-xl border border-border/40 shadow-sm object-cover"
                        />
                      ) : (
                        entry.preview
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-20 pt-8 border-t border-border/20 flex items-center justify-between gap-4 flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeftIcon className="size-3.5" />
              Back to home
            </Link>
            <p className="text-[12px] text-muted-foreground/60">
              More features shipping soon.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

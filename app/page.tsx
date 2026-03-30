import Link from "next/link"
import {
  CrosshairIcon,
  HeartPulseIcon,
  BookOpenIcon,
  ZapIcon,
  ArrowRightIcon,
  TrendingUpIcon,
  ShieldCheckIcon,
  BarChart3Icon,
  CheckIcon,
  SparklesIcon,
  FlameIcon,
  ThermometerIcon,
  ActivityIcon,
  GlobeIcon,
  RocketIcon,
  CrownIcon,
  BellIcon,
  SendIcon,
} from "lucide-react"
import { ThemeToggle } from "@/components/signal-sky/theme-toggle"
import { LifetimeSlots } from "@/components/signal-sky/lifetime-slots"
import { ExplainerPlayer } from "@/components/signal-sky/explainer-player"
import { WalkthroughVideo } from "@/components/signal-sky/walkthrough-video"
import { getLifetimeDealInfo, type LifetimeDealInfo } from "@/lib/data/deals"
import { getBacktestAggregates } from "@/lib/data/backtests"
import { getLandingStats } from "@/lib/data/signals"

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 ring-1 ring-primary/20 text-primary">
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl navbar-glow-line">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 h-16">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#strategy" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Strategy</a>
          <a href="#preview" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Preview</a>
          <a href="#pricing" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <Link href="/guide" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Guide</Link>
          <Link href="/changelog" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Changelog</Link>
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
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98] glow-cta-primary"
          >
            Get Started
            <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="relative pt-36 pb-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-15 blur-[120px]"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.19 220), transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.19 155), transparent 70%)" }}
      />
      <div className="absolute top-24 -left-20 w-[350px] h-[350px] rounded-full opacity-[0.06] blur-[90px] pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.68 0.22 25), transparent 70%)" }} />
      <div className="absolute top-1/2 -right-10 w-[300px] h-[300px] rounded-full opacity-[0.07] blur-[80px] pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.65 0.17 300), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-bull opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-bull" />
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] bg-gradient-to-r from-primary to-bull bg-clip-text text-transparent">
              Live market scanning
            </span>
          </div>

          {/* New alerts badge */}
          <div className="mb-8 inline-flex items-center gap-1.5 rounded-full border border-heat-boiling/30 bg-heat-boiling/5 px-3 py-1">
            <SparklesIcon className="size-3 text-heat-boiling" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-heat-boiling">
              New — Telegram &amp; Email Alerts
            </span>
          </div>

          {/* Headline */}
          <h1 className="max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.035em] text-foreground">
            Catch breakouts{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-primary via-[oklch(0.78_0.16_200)] to-bull bg-clip-text text-transparent">
                before they run
              </span>
              <span
                className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full opacity-40"
                style={{ background: "linear-gradient(90deg, oklch(0.72 0.19 220), oklch(0.72 0.19 155))" }}
              />
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            Professional-grade signal scanner for India & US markets.
            Detect Reset & Reclaim setups, get instant Telegram & email alerts, and journal every trade — all in one place.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/sign-in"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98] glow-cta-primary"
            >
              Start 7-day free trial
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#preview"
              className="inline-flex items-center gap-2 rounded-xl border border-border/40 bg-surface/50 px-6 py-3 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:border-border/60"
            >
              See it in action
            </a>
          </div>

          {/* Product Hunt Badge */}
          <div className="mt-6">
            <a href="https://www.producthunt.com/products/signalsky?utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-signalsky" target="_blank" rel="noopener noreferrer">
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1106951&theme=dark"
                alt="SignalSky - One strategy, 20 years of data, 1,000+ stocks scanned daily | Product Hunt"
                width={250}
                height={54}
                style={{ width: 250, height: 54 }}
              />
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-10 sm:gap-16">
            {[
              { label: "Markets Covered", value: "2", suffix: "" },
              { label: "Signals Scanned Daily", value: "1,000", suffix: "+" },
              { label: "Years of Backtest Data", value: "20", suffix: "Y" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <span className="font-mono text-4xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                  {stat.value}{stat.suffix && <span className="bg-gradient-to-r from-primary to-bull bg-clip-text text-transparent font-mono text-2xl font-bold ml-0.5">{stat.suffix}</span>}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal Preview */}
        <div className="mt-20 relative">
          <div
            className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl"
            style={{ background: "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.3), oklch(0.72 0.19 155 / 0.15), transparent)" }}
          />
          <div className="relative rounded-2xl border border-border/30 bg-card/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/40">
            {/* Terminal chrome */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border/20 bg-surface/50">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[oklch(0.68_0.22_25)]" />
                <span className="size-2.5 rounded-full bg-[oklch(0.78_0.16_80)]" />
                <span className="size-2.5 rounded-full bg-[oklch(0.72_0.19_155)]" />
              </div>
              <div className="flex-1 flex justify-center">
                <span className="text-[10px] font-mono text-muted-foreground/50 tracking-wider">
                  signalsky.app/scanner
                </span>
              </div>
            </div>

            {/* Mock scanner table */}
            <div className="p-0 overflow-x-auto">
              {/* Header bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-border/15">
                <div className="flex items-center gap-2.5">
                  <CrosshairIcon className="size-4 text-primary" />
                  <span className="text-sm font-semibold">Signal Scanner</span>
                  <span className="text-[10px] font-mono text-muted-foreground bg-surface px-2 py-0.5 rounded-md">
                    23 signals
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <GlobeIcon className="size-3" />
                    All Markets
                  </span>
                </div>
              </div>

              {/* Heat filter tabs */}
              <div className="flex items-center gap-1 px-5 py-2 border-b border-border/10 bg-surface/20 overflow-x-auto">
                <span className="px-3 py-1 text-[11px] font-medium rounded-md bg-primary/10 text-primary">All</span>
                <span className="flex items-center gap-1 px-3 py-1 text-[11px] text-muted-foreground rounded-md">
                  <RocketIcon className="size-2.5 text-heat-breakout" /> Breakout
                </span>
                <span className="flex items-center gap-1 px-3 py-1 text-[11px] text-muted-foreground rounded-md">
                  <FlameIcon className="size-2.5 text-heat-boiling" /> Boiling
                </span>
                <span className="flex items-center gap-1 px-3 py-1 text-[11px] text-muted-foreground rounded-md">
                  <ThermometerIcon className="size-2.5 text-heat-simmering" /> Simmering
                </span>
                <span className="flex items-center gap-1 px-3 py-1 text-[11px] text-muted-foreground rounded-md">
                  <TrendingUpIcon className="size-2.5 text-heat-cooling" /> Warming
                </span>
              </div>

              {/* Table */}
              <div className="text-xs min-w-[600px]">
                {/* Header */}
                <div className="grid grid-cols-[1.5fr_0.5fr_0.7fr_1fr_1fr_1fr] gap-3 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/10">
                  <span>Symbol</span>
                  <span>Mkt</span>
                  <span>Status</span>
                  <span>Price</span>
                  <span>Prior Peak</span>
                  <span>Gap to Peak</span>
                </div>

                {/* Rows */}
                {[
                  { symbol: "INDUSTOWER", name: "Indus Towers Ltd", mkt: "NSE", price: "₹437", peak: "₹426", dist: "-2.5%", heat: "breakout" as const },
                  { symbol: "LT", name: "Larsen & Toubro", mkt: "NSE", price: "₹3,648", peak: "₹3,666", dist: "0.5%", heat: "boiling" as const },
                  { symbol: "POLYCAB", name: "Polycab India", mkt: "NSE", price: "₹5,780", peak: "₹6,015", dist: "3.9%", heat: "simmering" as const },
                  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", mkt: "NSE", price: "₹1,958", peak: "₹2,138", dist: "8.4%", heat: "cooling" as const },
                  { symbol: "MRF", name: "MRF Ltd", mkt: "NSE", price: "₹1,22,830", peak: "₹1,35,590", dist: "9.4%", heat: "cooling" as const },
                ].map((row, i) => {
                  const isBreakout = row.heat === "breakout"
                  const heatLabel = row.heat === "cooling" ? "Warming" : row.heat === "breakout" ? "Breakout" : row.heat === "boiling" ? "Boiling" : "Simmering"
                  return (
                    <div
                      key={row.symbol}
                      className={`grid grid-cols-[1.5fr_0.5fr_0.7fr_1fr_1fr_1fr] gap-3 px-5 py-3 border-b border-border/8 items-center transition-colors hover:bg-surface/40 ${
                        row.heat === "breakout" ? "border-l-2 border-l-heat-breakout" :
                        row.heat === "boiling" ? "border-l-2 border-l-heat-boiling" :
                        row.heat === "simmering" ? "border-l-2 border-l-heat-simmering" :
                        "border-l-2 border-l-heat-cooling"
                      } ${i >= 3 ? "opacity-60" : ""}`}
                    >
                      <div className="flex flex-col">
                        <span className="font-mono text-[13px] font-semibold text-foreground">{row.symbol}</span>
                        <span className="text-[10px] text-muted-foreground">{row.name}</span>
                      </div>
                      <span className={`font-mono text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded w-fit ${
                        row.mkt === "NSE" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      }`}>{row.mkt}</span>
                      <span className={`inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider rounded-full border px-1.5 py-0.5 w-fit ${
                        row.heat === "breakout" ? "bg-heat-breakout/10 text-heat-breakout border-heat-breakout/20" :
                        row.heat === "boiling" ? "bg-heat-boiling/10 text-heat-boiling border-heat-boiling/20" :
                        row.heat === "simmering" ? "bg-heat-simmering/10 text-heat-simmering border-heat-simmering/20" :
                        "bg-heat-cooling/10 text-heat-cooling border-heat-cooling/20"
                      }`}>
                        {row.heat === "breakout" && <RocketIcon className="size-2" />}
                        {row.heat === "boiling" && <FlameIcon className="size-2" />}
                        {row.heat === "simmering" && <ThermometerIcon className="size-2" />}
                        {row.heat === "cooling" && <TrendingUpIcon className="size-2" />}
                        {heatLabel}
                      </span>
                      <span className="font-mono text-[13px] font-medium text-bull">{row.price}</span>
                      <span className="font-mono text-[13px] text-muted-foreground">{row.peak}</span>
                      <div className="flex items-center gap-1.5">
                        <div className="h-1.5 w-14 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isBreakout ? "bg-heat-breakout" :
                              row.heat === "boiling" ? "bg-heat-boiling" :
                              row.heat === "simmering" ? "bg-heat-simmering" : "bg-heat-cooling"
                            }`}
                            style={{ width: isBreakout ? "100%" : `${Math.max(8, 100 - parseFloat(row.dist) * 6.67)}%` }}
                          />
                        </div>
                        <span className={`font-mono text-[11px] font-semibold ${
                          isBreakout ? "text-heat-breakout" :
                          row.heat === "boiling" ? "text-heat-boiling" :
                          row.heat === "simmering" ? "text-heat-simmering" : "text-muted-foreground"
                        }`}>{isBreakout ? `+${row.dist.replace("-", "")}` : row.dist}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Fade out overlay */}
              <div className="h-12 bg-gradient-to-t from-card to-transparent" />
            </div>
          </div>

          {/* Card A — "New Signal" top-right */}
          <div className="absolute -top-5 right-4 lg:right-8 z-10 animate-float-a hidden sm:block">
            <div className="flex items-center gap-2.5 rounded-xl border border-border/30 bg-card/90 backdrop-blur-md px-3 py-2.5 shadow-lg ring-1 ring-border/20">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-heat-breakout opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-heat-breakout" />
              </span>
              <div>
                <p className="text-[10px] font-semibold text-foreground leading-none">New Signal</p>
                <p className="text-[9px] text-muted-foreground mt-0.5 font-mono">INDUSTOWER · Breakout</p>
              </div>
              <RocketIcon className="size-3.5 text-heat-breakout ml-1" />
            </div>
          </div>

          {/* Card B — Telegram alert top-left */}
          <div className="absolute -top-4 left-4 lg:left-6 z-10 animate-float-b hidden sm:block">
            <div className="flex items-center gap-2 rounded-xl border border-border/30 bg-card/90 backdrop-blur-md px-3 py-2 shadow-lg ring-1 ring-border/20">
              <SendIcon className="size-3 text-primary" />
              <p className="text-[10px] font-medium text-muted-foreground">Alert sent via Telegram</p>
            </div>
          </div>

          {/* Card C — Market Health bottom-left */}
          <div className="absolute -bottom-5 left-4 lg:left-10 z-10 animate-float-c hidden sm:block">
            <div className="flex items-center gap-2.5 rounded-xl border border-border/30 bg-card/90 backdrop-blur-md px-3 py-2.5 shadow-lg ring-1 ring-border/20">
              <HeartPulseIcon className="size-3.5 text-bull" />
              <div>
                <p className="text-[9px] text-muted-foreground">Market Health</p>
                <p className="text-[11px] font-mono font-bold text-bull leading-none">62% Bullish</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TickerSection() {
  const items = [
    { symbol: "RELIANCE.NS", heat: "breakout" },
    { symbol: "AAPL",        heat: "boiling"  },
    { symbol: "HDFCBANK.NS", heat: "simmering" },
    { symbol: "NVDA",        heat: "breakout" },
    { symbol: "TCS.NS",      heat: "boiling"  },
    { symbol: "TSLA",        heat: "simmering" },
    { symbol: "INFY.NS",     heat: "breakout" },
    { symbol: "MSFT",        heat: "boiling"  },
    { symbol: "KOTAKBANK.NS",heat: "simmering" },
    { symbol: "GOOGL",       heat: "breakout" },
  ]
  const heatConfig = {
    breakout:  { label: "Breakout",  className: "bg-heat-breakout/10  text-heat-breakout  border-heat-breakout/20",  Icon: RocketIcon     },
    boiling:   { label: "Boiling",   className: "bg-heat-boiling/10   text-heat-boiling   border-heat-boiling/20",   Icon: FlameIcon      },
    simmering: { label: "Simmering", className: "bg-heat-simmering/10 text-heat-simmering border-heat-simmering/20", Icon: ThermometerIcon },
  }
  const doubled = [...items, ...items]

  return (
    <div className="relative py-4 overflow-hidden border-y border-border/15 bg-surface/30">
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />
      <div className="flex animate-ticker" style={{ width: "max-content" }}>
        {doubled.map((item, i) => {
          const cfg = heatConfig[item.heat as keyof typeof heatConfig]
          return (
            <div key={i} className="flex items-center gap-2 px-5 shrink-0">
              <span className="font-mono text-[12px] font-semibold text-foreground">{item.symbol}</span>
              <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${cfg.className}`}>
                <cfg.Icon className="size-2" />
                {cfg.label}
              </span>
              <span className="text-border/40 text-[10px] select-none">·</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 bg-gradient-to-b from-background via-surface/20 to-background">
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] bg-gradient-to-r from-primary to-bull bg-clip-text text-transparent mb-3 block">
            Built for traders
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-foreground">
            Every tool you need,<br />nothing you don&apos;t
          </h2>
        </div>

        {/* Bento grid — Row 1: Scanner (2col) + Market Health (1col) */}
        <div className="grid gap-5 sm:grid-cols-3 mb-5">
          {/* Signal Scanner — wide */}
          <div className="rounded-2xl border border-border/25 bg-card/60 backdrop-blur-sm ring-1 ring-border/10 p-6 hover:border-border/40 hover:bg-card/80 transition-all overflow-hidden sm:col-span-2">
            <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.65_0.17_250)] p-[1px]">
              <div className="flex size-full items-center justify-center rounded-[10px] bg-card">
                <CrosshairIcon className="size-5 text-foreground" />
              </div>
            </div>
            <h3 className="text-[15px] font-semibold text-foreground mb-1">Signal Scanner</h3>
            <p className="text-[13px] leading-relaxed text-muted-foreground mb-5">
              Real-time detection of Reset &amp; Reclaim setups across all Nifty &amp; US universes. Classified by distance to prior peak.
            </p>
            {/* Mini signal rows */}
            <div className="space-y-2">
              {[
                { symbol: "INDUSTOWER", heat: "breakout" as const, gap: "+2.5%" },
                { symbol: "LT",         heat: "boiling" as const,  gap: "0.5%" },
                { symbol: "POLYCAB",    heat: "simmering" as const, gap: "3.9%" },
              ].map((row) => (
                <div key={row.symbol} className={`flex items-center justify-between rounded-lg px-3 py-2 border ${
                  row.heat === "breakout" ? "border-heat-breakout/15 bg-heat-breakout/[0.04]" :
                  row.heat === "boiling"  ? "border-heat-boiling/15 bg-heat-boiling/[0.04]" :
                  "border-heat-simmering/15 bg-heat-simmering/[0.04]"
                }`}>
                  <span className="font-mono text-[12px] font-semibold text-foreground">{row.symbol}</span>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      row.heat === "breakout" ? "bg-heat-breakout/10 text-heat-breakout border-heat-breakout/20" :
                      row.heat === "boiling"  ? "bg-heat-boiling/10 text-heat-boiling border-heat-boiling/20" :
                      "bg-heat-simmering/10 text-heat-simmering border-heat-simmering/20"
                    }`}>
                      {row.heat === "breakout" ? <RocketIcon className="size-2" /> : row.heat === "boiling" ? <FlameIcon className="size-2" /> : <ThermometerIcon className="size-2" />}
                      {row.heat}
                    </span>
                    <span className={`font-mono text-[11px] font-semibold ${row.heat === "breakout" ? "text-heat-breakout" : row.heat === "boiling" ? "text-heat-boiling" : "text-heat-simmering"}`}>{row.gap}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Health */}
          <div className="rounded-2xl border border-border/25 bg-card/60 backdrop-blur-sm ring-1 ring-border/10 p-6 hover:border-border/40 hover:bg-card/80 transition-all overflow-hidden">
            <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-bull to-[oklch(0.78_0.16_80)] p-[1px]">
              <div className="flex size-full items-center justify-center rounded-[10px] bg-card">
                <HeartPulseIcon className="size-5 text-foreground" />
              </div>
            </div>
            <h3 className="text-[15px] font-semibold text-foreground mb-1">Market Health</h3>
            <p className="text-[13px] leading-relaxed text-muted-foreground mb-5">
              Track breadth with % of stocks above EMA 220.
            </p>
            {/* Mini progress bars */}
            <div className="space-y-3">
              {[
                { label: "NIFTY 200", pct: 62, color: "bg-bull" },
                { label: "S&P 100",   pct: 54, color: "bg-heat-simmering" },
                { label: "Tech",      pct: 78, color: "bg-primary" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[11px] text-muted-foreground">{m.label}</span>
                    <span className="font-mono text-[11px] font-semibold text-foreground">{m.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Backtests + Journal + Alerts */}
        <div className="grid gap-5 sm:grid-cols-3">
          {/* Backtests */}
          <div className="rounded-2xl border border-border/25 bg-card/60 backdrop-blur-sm ring-1 ring-border/10 p-6 hover:border-border/40 hover:bg-card/80 transition-all overflow-hidden">
            <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.65_0.17_250)] to-primary p-[1px]">
              <div className="flex size-full items-center justify-center rounded-[10px] bg-card">
                <BarChart3Icon className="size-5 text-foreground" />
              </div>
            </div>
            <h3 className="text-[15px] font-semibold text-foreground mb-1">Backtests</h3>
            <p className="text-[13px] leading-relaxed text-muted-foreground mb-4">
              Validate on 20 years of data. Win rate, drawdown, and Sharpe — per symbol.
            </p>
            {/* Mini bar chart */}
            <div className="flex items-end gap-1 h-10">
              {[60, 40, 75, 55, 80, 45, 70, 65, 50, 85].map((h, i) => (
                <div key={i} className={`flex-1 rounded-sm ${i % 3 === 0 ? "bg-primary/60" : "bg-bull/50"}`} style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">Win rate</span>
              <span className="font-mono text-[13px] font-bold text-primary">50%</span>
            </div>
          </div>

          {/* Journal */}
          <div className="rounded-2xl border border-border/25 bg-card/60 backdrop-blur-sm ring-1 ring-border/10 p-6 hover:border-border/40 hover:bg-card/80 transition-all overflow-hidden">
            <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.78_0.16_80)] to-[oklch(0.68_0.22_25)] p-[1px]">
              <div className="flex size-full items-center justify-center rounded-[10px] bg-card">
                <BookOpenIcon className="size-5 text-foreground" />
              </div>
            </div>
            <h3 className="text-[15px] font-semibold text-foreground mb-1">Trade Journal</h3>
            <p className="text-[13px] leading-relaxed text-muted-foreground mb-4">
              Log entries, exits, stops. Track P&amp;L and win rate analytics.
            </p>
            <div className="space-y-2">
              {[
                { sym: "RELIANCE", pnl: "+₹4,200", win: true },
                { sym: "AAPL",     pnl: "+$312",   win: true },
                { sym: "LT",       pnl: "-₹1,100", win: false },
              ].map((t) => (
                <div key={t.sym} className="flex items-center justify-between rounded-lg bg-surface/60 px-3 py-1.5">
                  <span className="font-mono text-[11px] text-foreground">{t.sym}</span>
                  <span className={`font-mono text-[11px] font-semibold ${t.win ? "text-bull" : "text-bear"}`}>{t.pnl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="relative rounded-2xl border border-heat-boiling/25 bg-card/60 backdrop-blur-sm ring-1 ring-border/10 p-6 hover:border-heat-boiling/40 hover:bg-card/80 transition-all overflow-hidden">
            <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-heat-boiling/30 bg-heat-boiling/10 px-2.5 py-0.5">
              <SparklesIcon className="size-2.5 text-heat-boiling" />
              <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-heat-boiling">New</span>
            </div>
            <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-heat-boiling to-heat-simmering p-[1px]">
              <div className="flex size-full items-center justify-center rounded-[10px] bg-card">
                <BellIcon className="size-5 text-foreground" />
              </div>
            </div>
            <h3 className="text-[15px] font-semibold text-foreground mb-1">Alerts</h3>
            <p className="text-[13px] leading-relaxed text-muted-foreground mb-4">
              Telegram &amp; email the moment a signal fires. Never miss a setup.
            </p>
            {/* Telegram message bubble */}
            <div className="rounded-xl bg-primary/8 border border-primary/15 p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <SendIcon className="size-3 text-primary" />
                <span className="text-[10px] font-semibold text-primary">@signalskyin_bot</span>
              </div>
              <p className="text-[10px] text-foreground leading-relaxed">
                🚀 <strong>INDUSTOWER</strong> — Breakout<br />
                Price: ₹437 · Peak: ₹426<br />
                <span className="text-heat-breakout font-semibold">Above prior ATH +2.5%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AppHighlightsSection() {
  return (
    <section id="highlights" className="relative py-24 overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-10 blur-[120px]"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.19 220), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-3 block">
            Product tour
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-foreground">
            See SignalSky in action
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
            Scanner, market health, alerts, and journal — everything in one terminal.
          </p>
        </div>
        <div className="relative">
          <div
            className="absolute -inset-3 rounded-3xl opacity-15 blur-xl"
            style={{ background: "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.3), oklch(0.72 0.19 155 / 0.2))" }}
          />
          <div className="relative rounded-2xl border border-border/30 bg-card/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/30">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30 bg-background/60">
              <div className="flex gap-1.5">
                <div className="size-3 rounded-full bg-bear/60" />
                <div className="size-3 rounded-full bg-heat-simmering/60" />
                <div className="size-3 rounded-full bg-bull/60" />
              </div>
              <div className="flex-1 mx-4">
                <div className="mx-auto max-w-xs rounded-md border border-border/40 bg-background/60 px-3 py-1 text-center">
                  <span className="text-[11px] font-mono text-muted-foreground">signalsky.app/scanner</span>
                </div>
              </div>
            </div>
            <WalkthroughVideo />
          </div>
        </div>
      </div>
    </section>
  )
}

function ExplainerVideoSection() {
  return (
    <section id="explainer" className="relative py-24 overflow-hidden">
      <div
        className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px]"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.19 155), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="text-center mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-3 block">
            Strategy explained
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-foreground">
            Reset &amp; Reclaim in 90 seconds
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-sm mx-auto leading-relaxed">
            No jargon. No prior trading experience needed.
          </p>
        </div>
        <ExplainerPlayer />
      </div>
    </section>
  )
}

function PreviewSection() {
  return (
    <section id="preview" className="relative py-28 overflow-hidden bg-gradient-to-b from-surface/20 via-background to-surface/10">
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.19 155), transparent 70%)" }}
      />
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-8 blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.19 220), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left: Text */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-3 block">
              How it works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-foreground mb-6">
              Scan. Analyze.<br />Execute.
            </h2>
            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Scan for signals",
                  description: "Our scanner runs the Reset & Reclaim strategy across 1,000+ stocks daily, ranking results by distance to all-time high.",
                  icon: CrosshairIcon,
                },
                {
                  step: "02",
                  title: "Get alerted instantly",
                  description: "Connect Telegram or set up email alerts. The moment a new signal appears after the EOD scan, you're notified — no need to check the app.",
                  icon: BellIcon,
                  isNew: true,
                },
                {
                  step: "03",
                  title: "Analyze with context",
                  description: "Check market health, review backtests, and use the position calculator to size your trade based on risk parameters.",
                  icon: BarChart3Icon,
                },
                {
                  step: "04",
                  title: "Track every trade",
                  description: "Log your entries in the journal, track your positions, and monitor your P&L in real time.",
                  icon: TrendingUpIcon,
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl border bg-surface ${"isNew" in item && item.isNew ? "border-heat-boiling/40 text-heat-boiling" : "border-primary/30 text-primary shadow-[0_0_12px_oklch(0.55_0.22_220/0.1)]"}`}>
                      <item.icon className="size-4.5" />
                    </div>
                    {item.step !== "04" && (
                      <div className="w-px flex-1 bg-gradient-to-b from-border/40 to-transparent mt-2" />
                    )}
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-semibold tracking-wider bg-gradient-to-r from-primary to-bull bg-clip-text text-transparent">
                        STEP {item.step}
                      </span>
                      {"isNew" in item && item.isNew && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-heat-boiling/30 bg-heat-boiling/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-heat-boiling">
                          <SparklesIcon className="size-2.5" />New
                        </span>
                      )}
                    </div>
                    <h3 className="text-[15px] font-semibold text-foreground mt-1">
                      {item.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Market Health Card */}
          <div className="relative">
            <div
              className="absolute -inset-6 rounded-3xl opacity-15 blur-xl"
              style={{ background: "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.3), oklch(0.72 0.19 155 / 0.2))" }}
            />
            <div className="relative rounded-2xl border border-border/30 bg-card/80 backdrop-blur-sm overflow-hidden">
              {/* Market Health Header */}
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border/15">
                <HeartPulseIcon className="size-4 text-primary" />
                <span className="text-sm font-semibold">Market Health</span>
                <span className="ml-auto flex items-center gap-1.5">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-bull opacity-50" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-bull" />
                  </span>
                  <span className="text-[10px] text-muted-foreground">Live</span>
                </span>
              </div>

              {/* Market cards */}
              <div className="p-5 space-y-4">
                {[
                  { market: "NIFTY 200", value: 62, status: "Bullish", statusColor: "text-bull" },
                  { market: "S&P 100", value: 54, status: "Neutral", statusColor: "text-heat-simmering" },
                ].map((m) => (
                  <div key={m.market} className="rounded-xl border border-border/20 bg-surface/60 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[13px] font-semibold">{m.market}</span>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider ${m.statusColor}`}>
                        {m.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${m.value >= 60 ? "bg-bull" : "bg-heat-simmering"}`}
                          style={{ width: `${m.value}%` }}
                        />
                      </div>
                      <span className="font-mono text-sm font-bold text-foreground">{m.value}%</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2">
                      Stocks above EMA 220
                    </p>
                  </div>
                ))}

                {/* Sector mini-table */}
                <div className="rounded-xl border border-border/20 bg-surface/60 p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
                    Top Sectors
                  </span>
                  {[
                    { sector: "Technology", pct: 78, color: "bg-primary" },
                    { sector: "Financials", pct: 65, color: "bg-bull" },
                    { sector: "Healthcare", pct: 52, color: "bg-heat-simmering" },
                    { sector: "Energy", pct: 38, color: "bg-heat-boiling" },
                  ].map((s) => (
                    <div key={s.sector} className="flex items-center gap-3 py-1.5">
                      <span className="text-[12px] text-muted-foreground w-24">{s.sector}</span>
                      <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                      </div>
                      <span className="font-mono text-[11px] font-semibold text-foreground w-8 text-right">{s.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustSection() {
  return (
    <section className="relative py-20 border-y border-border/15 bg-surface/20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-10">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] bg-gradient-to-r from-primary to-bull bg-clip-text text-transparent">
            Why traders trust us
          </span>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: ShieldCheckIcon,
              title: "Your data, your control",
              description: "No broker integration needed. Signal Sky is read-only — we never touch your trading account.",
            },
            {
              icon: GlobeIcon,
              title: "India + US markets",
              description: "Full coverage of Nifty 200, Midcap, Smallcap, S&P 100 & NASDAQ 100. Trade across borders from one dashboard.",
            },
            {
              icon: ActivityIcon,
              title: "20 years of backtest data",
              description: "Reset & Reclaim is not a black box. Every signal comes with 20 years of historical backtest data to validate the setup.",
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 p-5 rounded-2xl border border-border/15 bg-card/40 backdrop-blur-sm ring-1 ring-border/10 hover:bg-card/60 transition-all">
              <item.icon className="size-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-[14px] font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-[12px] leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StrategySection() {
  return (
    <section id="strategy" className="relative py-28 overflow-hidden bg-gradient-to-b from-surface/10 via-background to-surface/10">
      {/* Background effects */}
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px]"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.19 220), transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full opacity-8 blur-[100px]"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.19 155), transparent 70%)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-[0.06] blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.19 220), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] bg-gradient-to-r from-primary to-bull bg-clip-text text-transparent mb-3 block">
            The strategy
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-foreground">
            Reset &amp; Reclaim
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto leading-relaxed">
            A systematic approach to catching breakouts. Find stocks that hit all-time highs,
            pulled back to key support, then reclaimed strength.
          </p>
        </div>

        {/* SVG Strategy Chart in terminal chrome */}
        <div className="relative mb-16">
          <div
            className="absolute -inset-4 rounded-3xl opacity-15 blur-xl"
            style={{ background: "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.2), oklch(0.72 0.19 155 / 0.15))" }}
          />
          <div className="relative rounded-2xl border border-border/30 bg-card/80 backdrop-blur-sm overflow-hidden shadow-xl shadow-black/20">
            {/* Terminal chrome */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border/20 bg-surface/50">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[oklch(0.68_0.22_25)]" />
                <span className="size-2.5 rounded-full bg-[oklch(0.78_0.16_80)]" />
                <span className="size-2.5 rounded-full bg-[oklch(0.72_0.19_155)]" />
              </div>
              <div className="flex-1 flex justify-center">
                <span className="text-[10px] font-mono text-muted-foreground/50 tracking-wider">
                  strategy / reset-reclaim
                </span>
              </div>
            </div>

            {/* Chart area */}
            <div className="p-4 sm:p-8">
              <svg
                viewBox="0 0 700 300"
                className="w-full h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Subtle grid */}
                {[80, 130, 180, 230].map((y) => (
                  <line
                    key={y}
                    x1="50"
                    y1={y}
                    x2="650"
                    y2={y}
                    stroke="currentColor"
                    className="text-border/15"
                    strokeWidth="0.5"
                    strokeDasharray="4 6"
                  />
                ))}

                {/* ATH reference zone — subtle highlight band */}
                <rect x="50" y="46" width="600" height="24" rx="3" className="fill-bull/[0.04]" />
                <line
                  x1="50" y1="58" x2="650" y2="58"
                  className="stroke-bull/30"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />
                <text
                  x="660" y="62"
                  className="text-[9px] font-mono font-semibold"
                  fill="currentColor"
                  style={{ color: "var(--bull)" }}
                  textAnchor="start"
                >
                  ATH
                </text>

                {/* EMA220 reference line */}
                <path
                  d="M 50 175 C 200 172, 420 180, 650 168"
                  className="stroke-heat-simmering/40"
                  strokeWidth="1.5"
                  strokeDasharray="8 5"
                />
                <text
                  x="660" y="172"
                  className="text-[8px] font-mono"
                  fill="currentColor"
                  style={{ color: "var(--heat-simmering)" }}
                  textAnchor="start"
                >
                  EMA220
                </text>

                {/* Fill under price curve — gradient from transparent to subtle */}
                <defs>
                  <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="resetFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--heat-boiling)" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="var(--heat-boiling)" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Filled area under price */}
                <path
                  d="M 50 158 C 85 140, 135 68, 185 58 C 235 48, 265 88, 300 148 C 335 210, 360 240, 395 240 C 430 240, 455 218, 485 178 C 515 138, 555 76, 600 66 L 650 60 L 650 290 L 50 290 Z"
                  fill="url(#priceFill)"
                />

                {/* Reset zone background */}
                <rect
                  x="280" y="175" width="165" height="75" rx="6"
                  className="fill-heat-boiling/[0.04] stroke-heat-boiling/10"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                {/* Price line — main path */}
                <path
                  d="M 50 158 C 85 140, 135 68, 185 58 C 235 48, 265 88, 300 148 C 335 210, 360 240, 395 240 C 430 240, 455 218, 485 178 C 515 138, 555 76, 600 66 L 650 60"
                  className="stroke-primary"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Phase 1 marker: ATH peak */}
                <circle cx="185" cy="58" r="5" className="fill-bull" />
                <circle cx="185" cy="58" r="8" className="fill-bull/20" />
                <line x1="185" y1="70" x2="185" y2="98" className="stroke-bull/30" strokeWidth="1" />
                <rect x="134" y="100" width="102" height="24" rx="6" className="fill-bull/8 stroke-bull/20" strokeWidth="1" />
                <text
                  x="185" y="116"
                  textAnchor="middle"
                  className="text-[9px] font-mono font-bold"
                  fill="currentColor"
                  style={{ color: "var(--bull)" }}
                >
                  ALL-TIME HIGH
                </text>

                {/* Phase 2 marker: Reset dip */}
                <circle cx="395" cy="240" r="5" className="fill-heat-boiling" />
                <circle cx="395" cy="240" r="8" className="fill-heat-boiling/20" />
                <line x1="395" y1="228" x2="395" y2="200" className="stroke-heat-boiling/30" strokeWidth="1" />
                <rect x="351" y="175" width="88" height="24" rx="6" className="fill-heat-boiling/8 stroke-heat-boiling/20" strokeWidth="1" />
                <text
                  x="395" y="191"
                  textAnchor="middle"
                  className="text-[9px] font-mono font-bold"
                  fill="currentColor"
                  style={{ color: "var(--heat-boiling)" }}
                >
                  THE RESET
                </text>

                {/* Phase 3 marker: Signal fires */}
                <circle cx="600" cy="66" r="5" className="fill-primary" />
                <circle cx="600" cy="66" r="8" className="fill-primary/20" />
                <circle cx="600" cy="66" r="12" className="fill-primary/10" />
                <line x1="600" y1="80" x2="600" y2="108" className="stroke-primary/30" strokeWidth="1" />
                <rect x="545" y="110" width="110" height="24" rx="6" className="fill-primary/8 stroke-primary/20" strokeWidth="1" />
                <text
                  x="600" y="126"
                  textAnchor="middle"
                  className="text-[9px] font-mono font-bold"
                  fill="currentColor"
                  style={{ color: "var(--primary)" }}
                >
                  SIGNAL FIRES
                </text>

                {/* Momentum arrows near reclaim */}
                <path d="M 492 160 L 502 152 L 492 144" className="stroke-bull/50" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M 515 142 L 525 134 L 515 126" className="stroke-bull/50" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M 538 120 L 548 112 L 538 104" className="stroke-bull/60" strokeWidth="1.5" fill="none" strokeLinecap="round" />

                {/* Y-axis labels */}
                <text x="44" y="62" textAnchor="end" className="text-[8px] font-mono" fill="currentColor" style={{ color: "var(--muted-foreground)", opacity: 0.5 }}>High</text>
                <text x="44" y="180" textAnchor="end" className="text-[8px] font-mono" fill="currentColor" style={{ color: "var(--muted-foreground)", opacity: 0.5 }}>200d</text>
                <text x="44" y="244" textAnchor="end" className="text-[8px] font-mono" fill="currentColor" style={{ color: "var(--muted-foreground)", opacity: 0.5 }}>Low</text>

                {/* Time axis markers */}
                <text x="185" y="278" textAnchor="middle" className="text-[7px] font-mono" fill="currentColor" style={{ color: "var(--muted-foreground)", opacity: 0.4 }}>Peak</text>
                <text x="395" y="278" textAnchor="middle" className="text-[7px] font-mono" fill="currentColor" style={{ color: "var(--muted-foreground)", opacity: 0.4 }}>Pullback</text>
                <text x="600" y="278" textAnchor="middle" className="text-[7px] font-mono" fill="currentColor" style={{ color: "var(--muted-foreground)", opacity: 0.4 }}>Entry</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Three phases explained */}
        <div className="grid gap-5 sm:grid-cols-3 mb-14">
          <div className="rounded-2xl border border-bull/15 bg-bull/[0.03] p-6 ring-1 ring-bull/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex size-9 items-center justify-center rounded-lg border border-bull/15 bg-background">
                <TrendingUpIcon className="size-4 text-bull" />
              </div>
              <div>
                <span className="font-mono text-[10px] font-semibold text-bull tracking-wider block">
                  PHASE 01
                </span>
                <h3 className="text-[14px] font-semibold text-foreground">All-Time High</h3>
              </div>
            </div>
            <p className="text-[12px] leading-relaxed text-muted-foreground">
              Stock reaches a new all-time high, proving strong institutional demand and confirming long-term upward momentum.
            </p>
          </div>

          <div className="rounded-2xl border border-heat-boiling/15 bg-heat-boiling/[0.03] p-6 ring-1 ring-heat-boiling/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex size-9 items-center justify-center rounded-lg border border-heat-boiling/15 bg-background">
                <ActivityIcon className="size-4 text-heat-boiling" />
              </div>
              <div>
                <span className="font-mono text-[10px] font-semibold text-heat-boiling tracking-wider block">
                  PHASE 02
                </span>
                <h3 className="text-[14px] font-semibold text-foreground">The Reset</h3>
              </div>
            </div>
            <p className="text-[12px] leading-relaxed text-muted-foreground">
              Price pulls back below the 200-day exponential moving average. Weak hands exit, creating the key support test that sets up the trade.
            </p>
          </div>

          <div className="rounded-2xl border border-primary/15 bg-primary/[0.03] p-6 ring-1 ring-primary/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex size-9 items-center justify-center rounded-lg border border-primary/15 bg-background">
                <CrosshairIcon className="size-4 text-primary" />
              </div>
              <div>
                <span className="font-mono text-[10px] font-semibold text-primary tracking-wider block">
                  PHASE 03
                </span>
                <h3 className="text-[14px] font-semibold text-foreground">The Reclaim</h3>
              </div>
            </div>
            <p className="text-[12px] leading-relaxed text-muted-foreground">
              Price reclaims above EMA 220 and approaches the prior peak. Our scanner classifies stocks by distance and fires breakout signals when they cross above.
            </p>
          </div>
        </div>

        {/* Signal Heat Classification — full width */}
        <div className="w-full px-0">
          <div className="rounded-2xl border border-border/25 bg-card/60 p-6 md:p-8">
            <h3 className="text-[15px] font-semibold text-foreground mb-1">Signal Heat Classification</h3>
            <p className="text-[12px] text-muted-foreground mb-5">
              Every signal is ranked by distance to the prior peak — the all-time high reached before the stock broke below EMA 220.
            </p>
            <div className="space-y-3">
              {/* Breakout */}
              <div className="flex items-center gap-4 rounded-xl border border-heat-breakout/15 bg-heat-breakout/[0.04] px-4 py-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-heat-breakout/10">
                  <RocketIcon className="size-3.5 text-heat-breakout" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[12px] font-semibold text-heat-breakout">Breakout</span>
                    <span className="text-[10px] font-mono text-muted-foreground">Crossed above prior peak, within 5%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-heat-breakout" style={{ width: "100%" }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 block">Price has broken out — new high territory</span>
                </div>
              </div>
              {/* Boiling */}
              <div className="flex items-center gap-4 rounded-xl border border-heat-boiling/15 bg-heat-boiling/[0.04] px-4 py-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-heat-boiling/10">
                  <FlameIcon className="size-3.5 text-heat-boiling" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[12px] font-semibold text-heat-boiling">Boiling</span>
                    <span className="text-[10px] font-mono text-muted-foreground">&le; 2% from prior peak</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-heat-boiling" style={{ width: "96%" }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 block">Highest conviction — breakout imminent</span>
                </div>
              </div>
              {/* Simmering */}
              <div className="flex items-center gap-4 rounded-xl border border-heat-simmering/15 bg-heat-simmering/[0.04] px-4 py-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-heat-simmering/10">
                  <ThermometerIcon className="size-3.5 text-heat-simmering" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[12px] font-semibold text-heat-simmering">Simmering</span>
                    <span className="text-[10px] font-mono text-muted-foreground">2 &ndash; 5% from prior peak</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-heat-simmering" style={{ width: "72%" }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 block">Building momentum — watch for acceleration</span>
                </div>
              </div>
              {/* Warming */}
              <div className="flex items-center gap-4 rounded-xl border border-heat-cooling/15 bg-heat-cooling/[0.04] px-4 py-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-heat-cooling/10">
                  <TrendingUpIcon className="size-3.5 text-heat-cooling" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[12px] font-semibold text-heat-cooling">Warming</span>
                    <span className="text-[10px] font-mono text-muted-foreground">5 &ndash; 15% from prior peak</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-heat-cooling" style={{ width: "40%" }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 block">Above EMA 220, on the radar — early positioning</span>
                </div>
              </div>
            </div>

            {/* Exit condition */}
            <div className="mt-5 rounded-xl border border-border/20 bg-surface/40 px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheckIcon className="size-3.5 text-muted-foreground" />
                <span className="text-[12px] font-semibold text-foreground">Exit Rule</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Close position when price drops below EMA 220 — a built-in stop loss that protects capital and removes emotion from the exit.
              </p>
            </div>
          </div>
        </div>

        {/* Guide deep-dive CTA */}
        <style>{`
          @keyframes guide-shimmer {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes guide-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-3px); }
          }
          .guide-shimmer-ring {
            background: linear-gradient(90deg,
              oklch(0.72 0.19 220 / 0.0) 0%,
              oklch(0.72 0.19 220 / 0.55) 30%,
              oklch(0.75 0.18 155 / 0.45) 55%,
              oklch(0.72 0.19 220 / 0.55) 70%,
              oklch(0.72 0.19 220 / 0.0) 100%
            );
            background-size: 300% 100%;
            animation: guide-shimmer 3.5s ease-in-out infinite;
          }
          .guide-icon-float {
            animation: guide-float 4s ease-in-out infinite;
          }
        `}</style>
        <div className="mt-8 group relative">
          {/* Shimmer border ring */}
          <div className="absolute -inset-[1px] rounded-2xl guide-shimmer-ring opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
          {/* Soft glow bloom */}
          <div
            className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-2xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse, oklch(0.72 0.19 220 / 0.5), transparent 70%)" }}
          />
          <Link href="/guide">
            <div className="relative rounded-2xl border border-border/10 bg-card/70 backdrop-blur-sm px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 overflow-hidden cursor-pointer">
              {/* Subtle inner glow top-left */}
              <div
                className="absolute -top-8 -left-8 w-40 h-40 rounded-full opacity-20 blur-2xl pointer-events-none"
                style={{ background: "radial-gradient(circle, oklch(0.72 0.19 220), transparent 70%)" }}
              />

              {/* Mini SVG chart icon */}
              <div className="guide-icon-float shrink-0 relative">
                <div
                  className="flex size-14 items-center justify-center rounded-xl border border-primary/20"
                  style={{ background: "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.08), oklch(0.72 0.19 220 / 0.02))" }}
                >
                  <svg viewBox="0 0 40 32" className="w-8 h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Grid lines */}
                    <line x1="4" y1="8"  x2="36" y2="8"  stroke="currentColor" className="text-border/20" strokeWidth="0.5" strokeDasharray="2 3" />
                    <line x1="4" y1="16" x2="36" y2="16" stroke="currentColor" className="text-border/20" strokeWidth="0.5" strokeDasharray="2 3" />
                    <line x1="4" y1="24" x2="36" y2="24" stroke="currentColor" className="text-border/20" strokeWidth="0.5" strokeDasharray="2 3" />
                    {/* EMA line */}
                    <path d="M4 20 C12 19 24 21 36 18" stroke="currentColor" className="text-heat-simmering/50" strokeWidth="1" strokeDasharray="3 2" />
                    {/* Price path */}
                    <path d="M4 18 C8 14 12 6 16 5 C20 4 22 12 24 18 C26 22 28 24 30 20 C32 16 34 8 36 6" stroke="currentColor" className="text-primary" strokeWidth="1.5" strokeLinecap="round" />
                    {/* ATH peak dot */}
                    <circle cx="16" cy="5" r="2" className="fill-bull" />
                    {/* Signal dot */}
                    <circle cx="36" cy="6" r="2" className="fill-primary" />
                    <circle cx="36" cy="6" r="4" className="fill-primary/15" />
                    {/* Magnifier overlay */}
                    <circle cx="28" cy="16" r="7" stroke="currentColor" className="text-primary/30" strokeWidth="1.2" />
                    <line x1="33" y1="21" x2="37" y2="25" stroke="currentColor" className="text-primary/30" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-mono font-semibold uppercase tracking-[0.18em] text-primary/70">Strategy Deep Dive</span>
                  <span
                    className="inline-flex items-center rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider"
                    style={{ background: "oklch(0.72 0.19 220 / 0.12)", color: "oklch(0.72 0.19 220)" }}
                  >
                    Guide
                  </span>
                </div>
                <p className="text-[13px] font-semibold text-foreground leading-snug mb-1">
                  Want to understand the mechanics in depth?
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  EMA 220 explained, Pre-Set ATH vs all-time high, how each heat level works, and exactly how to read every signal.
                </p>
              </div>

              {/* Arrow */}
              <div
                className="shrink-0 flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[11px] font-semibold transition-all duration-300 group-hover:gap-2.5 whitespace-nowrap"
                style={{ background: "oklch(0.72 0.19 220 / 0.1)", color: "oklch(0.72 0.19 220)" }}
              >
                Read the Guide
                <ArrowRightIcon className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

function PricingSection({ deal }: { deal: LifetimeDealInfo }) {
  return (
    <section id="pricing" className="relative py-28 bg-gradient-to-b from-background to-surface/20">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div
        className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-8 blur-[100px]"
        style={{ background: "radial-gradient(circle, oklch(0.65 0.17 300), transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-[0.05] blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, oklch(0.72 0.19 220), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center mb-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] bg-gradient-to-r from-primary to-[oklch(0.65_0.17_300)] bg-clip-text text-transparent mb-3 block">
            Early Adopter Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-foreground">
            Invest in your edge
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
            Start with a 7-day free trial. Unlock all Nifty &amp; US indices, Telegram &amp; email alerts, unlimited backtests, and more.
          </p>
          <p className="text-[11px] text-heat-simmering font-medium mt-2">
            Prices increase after launch
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3 max-w-4xl mx-auto mt-12">
          {/* Pro Monthly */}
          <div className="rounded-2xl border border-border/25 bg-card/50 p-6 flex flex-col">
            <h3 className="text-base font-semibold">Pro Monthly</h3>
            <p className="text-[12px] text-muted-foreground mt-0.5">Flexible month-to-month billing</p>
            <div className="mt-5">
              <span className="font-mono text-sm text-muted-foreground line-through">&#8377;599</span>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-3xl font-bold tracking-tight">&#8377;299</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mb-6">7-day free trial included</p>
            <ul className="space-y-2 mb-6 flex-1">
              {["All Nifty indices (50, 100, 200, Midcap, Smallcap)", "S&P 100 & NASDAQ 100 coverage", "Telegram & email signal alerts", "Unlimited backtests", "Unlimited trade journal", "Priority support"].map((f) => (
                <li key={f} className="flex items-start gap-2 text-[12px]">
                  {f.startsWith("Telegram") ? (
                    <BellIcon className="size-3.5 mt-0.5 shrink-0 text-heat-boiling" />
                  ) : (
                    <CheckIcon className="size-3.5 mt-0.5 shrink-0 text-primary" />
                  )}
                  <span className={f.startsWith("Telegram") ? "text-foreground font-medium" : "text-muted-foreground"}>
                    {f}{f.startsWith("Telegram") && <span className="ml-1.5 inline-flex items-center rounded-full bg-heat-boiling/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-heat-boiling">New</span>}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/sign-in"
              className="flex items-center justify-center w-full rounded-xl py-2.5 text-[13px] font-semibold border border-border/40 text-foreground hover:bg-surface transition-all"
            >
              <SparklesIcon className="size-3 mr-1.5" />
              Start Free Trial
            </Link>
          </div>

          {/* Pro Yearly */}
          <div className="relative rounded-2xl border border-primary/30 bg-card/80 p-6 ring-1 ring-primary/10 flex flex-col pricing-yearly-glow sm:scale-[1.02]">
            {/* Gradient top highlight */}
            <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                <SparklesIcon className="size-2.5" />
                Most Popular
              </span>
            </div>
            <h3 className="text-base font-semibold">Pro Yearly</h3>
            <p className="text-[12px] text-muted-foreground mt-0.5">Best value for committed traders</p>
            <div className="mt-5">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-sm text-muted-foreground line-through">&#8377;5,999</span>
                <span className="rounded-full bg-bull/10 px-2 py-0.5 text-[9px] font-bold text-bull">Save 16%</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-3xl font-bold tracking-tight text-primary">&#8377;2,999</span>
                <span className="text-sm text-muted-foreground">/yr</span>
              </div>
            </div>
            <p className="text-[10px] text-bull font-medium mb-6">That&apos;s just &#8377;250/month</p>
            <ul className="space-y-2 mb-6 flex-1">
              {["All Nifty indices (50, 100, 200, Midcap, Smallcap)", "S&P 100 & NASDAQ 100 coverage", "Telegram & email signal alerts", "Unlimited backtests", "Unlimited trade journal", "Priority support"].map((f) => (
                <li key={f} className="flex items-start gap-2 text-[12px]">
                  {f.startsWith("Telegram") ? (
                    <BellIcon className="size-3.5 mt-0.5 shrink-0 text-heat-boiling" />
                  ) : (
                    <CheckIcon className="size-3.5 mt-0.5 shrink-0 text-primary" />
                  )}
                  <span className={f.startsWith("Telegram") ? "text-foreground font-medium" : "text-muted-foreground"}>
                    {f}{f.startsWith("Telegram") && <span className="ml-1.5 inline-flex items-center rounded-full bg-heat-boiling/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-heat-boiling">New</span>}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/sign-in"
              className="flex items-center justify-center w-full rounded-xl py-2.5 text-[13px] font-semibold bg-primary text-primary-foreground hover:brightness-110 transition-all glow-cta-primary"
            >
              <SparklesIcon className="size-3 mr-1.5" />
              Start Free Trial
            </Link>
          </div>

          {/* Lifetime */}
          <div className="relative rounded-2xl border border-heat-simmering/30 bg-gradient-to-b from-heat-simmering/[0.03] to-card/80 p-6 flex flex-col">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-heat-simmering to-heat-boiling px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                <FlameIcon className="size-2.5" />
                First 100 Only
              </span>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold">Lifetime</h3>
              <CrownIcon className="size-4 text-heat-simmering" />
            </div>
            <p className="text-[12px] text-muted-foreground mt-0.5">Pay once, Pro access forever</p>
            <div className="mt-5">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-sm text-muted-foreground line-through">&#8377;14,999</span>
                <span className="rounded-full bg-heat-boiling/10 px-2 py-0.5 text-[9px] font-bold text-heat-boiling">67% OFF</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-3xl font-bold tracking-tight bg-gradient-to-r from-heat-simmering to-heat-boiling bg-clip-text text-transparent">&#8377;4,999</span>
                <span className="text-sm text-muted-foreground">one-time</span>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mb-4">Equivalent to 17 months of Pro</p>
            <LifetimeSlots deal={deal} />
            <ul className="space-y-2 mb-6 flex-1">
              {["Everything in Pro, forever", "No recurring charges", "Early adopter badge", "Locked-in price guarantee"].map((f) => (
                <li key={f} className="flex items-start gap-2 text-[12px]">
                  <CheckIcon className="size-3.5 mt-0.5 shrink-0 text-heat-simmering" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/sign-in"
              className="flex items-center justify-center w-full rounded-xl py-2.5 text-[13px] font-semibold bg-gradient-to-r from-heat-simmering to-heat-boiling text-white hover:brightness-110 transition-all"
            >
              <CrownIcon className="size-3 mr-1.5" />
              Claim Lifetime Access
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Large center bloom */}
      <div
        className="absolute inset-0 opacity-20"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.72 0.19 220 / 0.5), transparent 70%)" }}
      />
      {/* Secondary bull bloom */}
      <div
        className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full opacity-[0.08] blur-[80px] pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.19 155), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        {/* Animated badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-2 mb-8">
          <ZapIcon className="size-4 text-primary animate-pulse" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
            Start for free — no card required
          </span>
        </div>
        <h2 className="text-3xl sm:text-[2.75rem] font-bold tracking-[-0.03em] text-foreground max-w-xl mx-auto leading-[1.1]">
          Stop missing breakouts.<br />
          <span className="bg-gradient-to-r from-primary via-[oklch(0.78_0.16_200)] to-bull bg-clip-text text-transparent">
            Start scanning today.
          </span>
        </h2>
        <p className="text-sm text-muted-foreground mt-4 max-w-md mx-auto">
          Join traders using SignalSky to find Reset &amp; Reclaim setups across India and US markets.
        </p>
        <div className="mt-10">
          <Link
            href="/sign-in"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98] glow-cta-primary"
          >
            Start your free trial
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border/15 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ZapIcon className="size-3.5" />
              </div>
              <span className="text-sm font-semibold tracking-tight text-foreground">SignalSky</span>
            </div>
            <span className="text-[10px] bg-gradient-to-r from-primary to-bull bg-clip-text text-transparent font-medium pl-9">
              Scan smarter. Trade better.
            </span>
          </div>
          <div className="flex items-center gap-5 flex-wrap justify-center">
            <Link href="/pricing" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/terms" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/refund" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">
              Refund Policy
            </Link>
            <Link href="/sign-in" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">
              Sign in
            </Link>
          </div>
          <span className="text-[11px] text-muted-foreground/60">
            &copy; 2026 SignalSky. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}

export default async function LandingPage() {
  const [dealInfo, aggregates, stats] = await Promise.all([
    getLifetimeDealInfo(),
    getBacktestAggregates(),
    getLandingStats(),
  ])
  const deal = dealInfo ?? { cap: 100, sold: 0, remaining: 100, available: true }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is SignalSky?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SignalSky is a stock signal scanner for India (NSE) and US (NASDAQ/S&P) markets that detects \"Reset & Reclaim\" breakout setups using EMA220 and all-time high proximity analysis, with 20 years of backtested data across 426+ stocks."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Reset & Reclaim trading strategy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reset & Reclaim is a breakout strategy where a stock that previously hit an all-time high pulls back below its 200-day exponential moving average (the \"reset\"), then reclaims above it (the \"reclaim\"), positioning it for a potential run back toward the prior all-time high."
        }
      },
      {
        "@type": "Question",
        "name": "Which Indian stock exchanges does SignalSky cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SignalSky covers the National Stock Exchange (NSE) of India, including Nifty 50, Nifty 100, Nifty 200, Nifty Midcap 150, and Nifty Smallcap 250 indices, scanning over 1,000 stocks daily."
        }
      },
      {
        "@type": "Question",
        "name": "Does SignalSky cover US markets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, SignalSky scans S&P 100 and NASDAQ 100 stocks for Reset & Reclaim breakout setups alongside Indian NSE stocks."
        }
      },
      {
        "@type": "Question",
        "name": "How much does SignalSky cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SignalSky offers a 7-day free trial with no card required, then Pro Monthly at ₹299/month, Pro Yearly at ₹2,999/year, and a Lifetime plan at ₹4,999 one-time (limited to 100 seats). Payment is via PhonePe/UPI."
        }
      },
      {
        "@type": "Question",
        "name": "What is SignalSky's backtest win rate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SignalSky's Reset & Reclaim strategy has been backtested across 426+ stocks over 20 years of market data, showing a 50% win rate with an average return of +29.6% on winning trades."
        }
      },
      {
        "@type": "Question",
        "name": "Does SignalSky send trading alerts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, SignalSky sends real-time signal alerts via Telegram push notifications and email when Reset & Reclaim setups fire on NSE and US stocks."
        }
      },
      {
        "@type": "Question",
        "name": "How is SignalSky different from Chartink or TradingView?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unlike generic screeners with dozens of filters, SignalSky is purpose-built around a single backtested strategy (Reset & Reclaim) and includes market health dashboards, a built-in trade journal, and 20-year backtest transparency — all in one integrated platform."
        }
      },
      {
        "@type": "Question",
        "name": "What is the market health dashboard in SignalSky?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SignalSky's market health dashboard shows the percentage of stocks trading above their 200-day EMA across each index (Nifty 50, Nifty 200, etc.), helping traders assess overall market breadth and time their entries."
        }
      },
      {
        "@type": "Question",
        "name": "Is SignalSky a stock tips service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. SignalSky is a signal scanner, not a tip service. It identifies stocks matching the Reset & Reclaim breakout pattern and presents the data. Traders make their own decisions on whether and how to trade the signals."
        }
      }
    ]
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      {/* Live stats bar */}
      <div className="pt-16">
        <div className="border-b border-border/15 bg-surface/40 backdrop-blur-sm py-2.5 px-6">
          <div className="mx-auto max-w-6xl flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-bull animate-pulse" />
              <span>Scanning <span className="font-semibold text-foreground font-mono">{stats.stockCount.toLocaleString()}+</span> stocks daily</span>
            </div>
            <span className="text-border/40 hidden sm:block">·</span>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <ZapIcon className="size-3 text-primary" />
              <span><span className="font-semibold text-foreground font-mono">{stats.signalCount}</span> active signals right now</span>
            </div>
            <span className="text-border/40 hidden sm:block">·</span>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="font-semibold text-foreground font-mono">150+</span>
              <span>traders using SignalSky</span>
            </div>
          </div>
        </div>
      </div>
      <HeroSection />
      <TickerSection />
      <FeaturesSection />
      <AppHighlightsSection />
      <TrustSection />
      <StrategySection />
      <ExplainerVideoSection />
      <PreviewSection />

      {/* Strategy Track Record */}
      {aggregates && (
        <section className="relative py-20 px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-6">
              <BarChart3Icon className="size-3.5 text-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">Strategy Track Record</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] mb-4">
              Backed by 20+ years of data
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-12">
              Every signal is powered by a strategy backtested across {aggregates.symbolCount}+ stocks on NSE &amp; US markets.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: `${aggregates.winRate.toFixed(0)}%`, label: "Avg win rate", sub: "across all backtested stocks" },
                { value: `+${aggregates.avgReturn.toFixed(1)}%`, label: "Avg return/trade", sub: "on winning setups" },
                { value: `${aggregates.symbolCount}+`, label: "Stocks backtested", sub: "NSE + US markets" },
                { value: "20 yrs", label: "Data history", sub: "NSE data going back to 2004" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border/30 bg-card/60 p-5">
                  <div className="font-mono text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-[12px] font-semibold text-foreground mb-0.5">{stat.label}</div>
                  <div className="text-[10px] text-muted-foreground">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold tracking-[-0.03em] text-center mb-10">What traders say</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                quote: "Caught the HDFCBANK reclaim setup 3 days before it ran 9%. The signal was already there — I just had to act on it.",
                name: "Rahul M.",
                handle: "NSE swing trader",
              },
              {
                quote: "I was manually scanning 200 Nifty stocks every evening. SignalSky does it in seconds and surfaces only what matters.",
                name: "Priya K.",
                handle: "Part-time trader, Bangalore",
              },
              {
                quote: "The backtest data convinced me. Seeing a 65%+ win rate across 15 years of data before I took a single trade — that's confidence.",
                name: "Vikram S.",
                handle: "Options trader, Mumbai",
              },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl border border-border/30 bg-card/60 p-5">
                <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="text-[12px] font-semibold text-foreground">{t.name}</p>
                  <p className="text-[11px] text-muted-foreground">{t.handle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingSection deal={deal} />
      <CtaSection />
      <Footer />
    </div>
  )
}

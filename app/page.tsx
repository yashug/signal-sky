import Link from "next/link"
import {
  CrosshairIcon,
  HeartPulseIcon,
  BookOpenIcon,
  ZapIcon,
  ArrowRightIcon,
  TrendingUpIcon,
  ShieldCheckIcon,
  BellRingIcon,
  BarChart3Icon,
  CheckIcon,
  SparklesIcon,
  FlameIcon,
  ThermometerIcon,
  ActivityIcon,
  GlobeIcon,
  FileTextIcon,
  RocketIcon,
  CrownIcon,
} from "lucide-react"
import { ThemeToggle } from "@/components/signal-sky/theme-toggle"
import { LifetimeSlots } from "@/components/signal-sky/lifetime-slots"

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
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/20 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 h-16">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#strategy" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Strategy</a>
          <a href="#preview" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Preview</a>
          <a href="#pricing" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
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

function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
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

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-bull opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-bull" />
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
              Live market scanning
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
            Detect Reset & Reclaim setups, track market health, and journal every trade — all in one place.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/sign-in"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98] glow-signal"
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

          {/* Stats row */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-10 sm:gap-16">
            {[
              { label: "Markets Covered", value: "2", suffix: "" },
              { label: "Signals Scanned Daily", value: "1,000", suffix: "+" },
              { label: "Strategy Win Rate", value: "68", suffix: "%" },
              { label: "Years of Backtest Data", value: "20", suffix: "Y" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <span className="font-mono text-2xl font-bold tracking-tight text-foreground">
                  {stat.value}<span className="text-primary">{stat.suffix}</span>
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
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: CrosshairIcon,
      title: "Signal Scanner",
      description: "Real-time detection of Reset & Reclaim setups across all Nifty & US universes. Classified by distance to prior peak — from Warming to Breakout.",
      accent: "from-primary to-[oklch(0.65_0.17_250)]",
    },
    {
      icon: HeartPulseIcon,
      title: "Market Health",
      description: "Track market breadth with % of stocks above EMA 200. Sector-level breakdown with traffic light system for regime detection.",
      accent: "from-bull to-[oklch(0.78_0.16_80)]",
    },
    {
      icon: BookOpenIcon,
      title: "Trade Journal",
      description: "Log entries, exits, stop losses and targets. Track realized and unrealized P&L with win rate analytics. Export to CSV.",
      accent: "from-[oklch(0.78_0.16_80)] to-[oklch(0.68_0.22_25)]",
    },
    {
      icon: BellRingIcon,
      title: "Telegram Alerts",
      description: "Get notified the moment a new signal fires. Real-time delivery for Pro users. Never miss a breakout again.",
      accent: "from-[oklch(0.65_0.17_300)] to-primary",
    },
  ]

  return (
    <section id="features" className="relative py-28">
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-3 block">
            Built for traders
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-foreground">
            Every tool you need,<br />nothing you don&apos;t
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border/25 bg-card/60 p-7 transition-all hover:border-border/40 hover:bg-card/80"
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), oklch(0.72 0.19 220 / 0.04), transparent 60%)`,
                }}
              />
              <div className="relative">
                <div className={`mb-5 inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${feature.accent} p-[1px]`}>
                  <div className="flex size-full items-center justify-center rounded-[10px] bg-card">
                    <feature.icon className="size-5 text-foreground" />
                  </div>
                </div>
                <h3 className="text-[15px] font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PreviewSection() {
  return (
    <section id="preview" className="relative py-28 overflow-hidden">
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.19 155), transparent 70%)" }}
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
                  title: "Analyze with context",
                  description: "Check market health, review backtests, and use the position calculator to size your trade based on risk parameters.",
                  icon: BarChart3Icon,
                },
                {
                  step: "03",
                  title: "Track every trade",
                  description: "Log your entries in the journal, get Telegram alerts on new signals, and monitor your P&L in real time.",
                  icon: TrendingUpIcon,
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/30 bg-surface text-primary">
                      <item.icon className="size-4.5" />
                    </div>
                    {item.step !== "03" && (
                      <div className="w-px flex-1 bg-gradient-to-b from-border/40 to-transparent mt-2" />
                    )}
                  </div>
                  <div className="pb-6">
                    <span className="font-mono text-[10px] font-semibold text-primary tracking-wider">
                      STEP {item.step}
                    </span>
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
                      Stocks above EMA 200
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
    <section className="relative py-20 border-y border-border/15">
      <div className="mx-auto max-w-6xl px-6">
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
            <div key={item.title} className="flex gap-4 p-5 rounded-xl">
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
    <section id="strategy" className="relative py-28 overflow-hidden">
      {/* Background effects */}
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px]"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.19 220), transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full opacity-8 blur-[100px]"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.19 155), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-3 block">
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

                {/* EMA200 reference line */}
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
                  EMA200
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
          <div className="rounded-2xl border border-bull/15 bg-bull/[0.03] p-6">
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

          <div className="rounded-2xl border border-heat-boiling/15 bg-heat-boiling/[0.03] p-6">
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

          <div className="rounded-2xl border border-primary/15 bg-primary/[0.03] p-6">
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
              Price reclaims above EMA 200 and approaches the prior peak. Our scanner classifies stocks by distance and fires breakout signals when they cross above.
            </p>
          </div>
        </div>

        {/* Heat classification + Strategy guide CTA */}
        <div className="grid gap-6 lg:grid-cols-[1fr_280px] items-start px-0">
          {/* Heat system */}
          <div className="rounded-2xl border border-border/25 bg-card/60 p-6">
            <h3 className="text-[15px] font-semibold text-foreground mb-1">Signal Heat Classification</h3>
            <p className="text-[12px] text-muted-foreground mb-5">
              Every signal is ranked by distance to the prior peak — the all-time high reached before the stock broke below EMA 200.
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
                  <span className="text-[10px] text-muted-foreground mt-1 block">Above EMA 200, on the radar — early positioning</span>
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
                Close position when price drops below EMA 200 — a built-in stop loss that protects capital and removes emotion from the exit.
              </p>
            </div>
          </div>

          {/* Strategy guide CTA card */}
          <div className="rounded-2xl border border-primary/20 bg-primary/[0.03] p-6">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 mb-4">
              <BookOpenIcon className="size-5 text-primary" />
            </div>
            <h3 className="text-[15px] font-semibold text-foreground mb-2">
              Strategy Deep-Dive
            </h3>
            <p className="text-[12px] leading-relaxed text-muted-foreground mb-5">
              Full breakdown with entry rules, exit conditions, position sizing, and backtest results across 20 years of data.
            </p>
            <a
              href="/strategy-guide.pdf"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[13px] font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
            >
              <FileTextIcon className="size-3.5" />
              Download Guide
            </a>

            {/* Quick stats */}
            <div className="mt-6 pt-5 border-t border-border/15">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground block mb-3">
                Backtest Highlights
              </span>
              <div className="space-y-3">
                {[
                  { label: "Win Rate", value: "68%", accent: true },
                  { label: "Avg Return / Trade", value: "+12.4%" },
                  { label: "Max Drawdown", value: "-8.2%" },
                  { label: "Sharpe Ratio", value: "1.85" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">{stat.label}</span>
                    <span className={`font-mono text-[13px] font-bold ${stat.accent ? "text-bull" : "text-foreground"}`}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  return (
    <section id="pricing" className="relative py-28">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div
        className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-8 blur-[100px]"
        style={{ background: "radial-gradient(circle, oklch(0.65 0.17 300), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center mb-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-3 block">
            Early Adopter Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-foreground">
            Invest in your edge
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
            Start with a 7-day free trial. Then choose a plan to unlock all Nifty indices, unlimited backtests, and real-time alerts.
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
              <span className="font-mono text-sm text-muted-foreground line-through">&#8377;999</span>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-3xl font-bold tracking-tight">&#8377;499</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mb-6">7-day free trial included</p>
            <ul className="space-y-2 mb-6 flex-1">
              {["All Nifty indices (50, 100, 200, Midcap, Smallcap)", "S&P 100 & NASDAQ 100 coverage", "Unlimited backtests", "Real-time Telegram alerts", "Volume surge filter", "Unlimited trade journal", "Priority support"].map((f) => (
                <li key={f} className="flex items-start gap-2 text-[12px]">
                  <CheckIcon className="size-3.5 mt-0.5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{f}</span>
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
          <div className="relative rounded-2xl border border-primary/30 bg-card/80 p-6 ring-1 ring-primary/10 flex flex-col">
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
                <span className="font-mono text-sm text-muted-foreground line-through">&#8377;9,999</span>
                <span className="rounded-full bg-bull/10 px-2 py-0.5 text-[9px] font-bold text-bull">Save 17%</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-3xl font-bold tracking-tight text-primary">&#8377;4,999</span>
                <span className="text-sm text-muted-foreground">/yr</span>
              </div>
            </div>
            <p className="text-[10px] text-bull font-medium mb-6">That&apos;s just &#8377;417/month</p>
            <ul className="space-y-2 mb-6 flex-1">
              {["All Nifty indices (50, 100, 200, Midcap, Smallcap)", "S&P 100 & NASDAQ 100 coverage", "Unlimited backtests", "Real-time Telegram alerts", "Volume surge filter", "Unlimited trade journal", "Priority support"].map((f) => (
                <li key={f} className="flex items-start gap-2 text-[12px]">
                  <CheckIcon className="size-3.5 mt-0.5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/sign-in"
              className="flex items-center justify-center w-full rounded-xl py-2.5 text-[13px] font-semibold bg-primary text-primary-foreground hover:brightness-110 transition-all glow-signal"
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
                <span className="font-mono text-sm text-muted-foreground line-through">&#8377;24,999</span>
                <span className="rounded-full bg-heat-boiling/10 px-2 py-0.5 text-[9px] font-bold text-heat-boiling">60% OFF</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-3xl font-bold tracking-tight text-heat-simmering">&#8377;9,999</span>
                <span className="text-sm text-muted-foreground">one-time</span>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mb-4">Equivalent to 20 months of Pro</p>
            <LifetimeSlots />
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
    <section className="relative py-28">
      <div
        className="absolute inset-0 opacity-10"
        style={{ background: "radial-gradient(ellipse at center, oklch(0.72 0.19 220 / 0.4), transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <div className="inline-flex items-center gap-2 mb-6">
          <ZapIcon className="size-5 text-primary" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-foreground max-w-xl mx-auto">
          Stop missing breakouts.<br />Start scanning today.
        </h2>
        <p className="text-sm text-muted-foreground mt-4 max-w-md mx-auto">
          Join traders using SignalSky to find Reset & Reclaim setups across India and US markets.
        </p>
        <div className="mt-8">
          <Link
            href="/sign-in"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98] glow-signal"
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
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ZapIcon className="size-3.5" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-foreground">SignalSky</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/sign-in" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">
              Sign in
            </Link>
          </div>
          <span className="text-[11px] text-muted-foreground/60">
            &copy; {new Date().getFullYear()} SignalSky. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TrustSection />
      <StrategySection />
      <PreviewSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </div>
  )
}

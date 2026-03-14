import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

type GuideContentProps = {
  isAuthenticated?: boolean
  /** Optional section IDs to attach to each of the 5 section headings (for scroll-jump) */
  sectionIds?: [string, string, string, string, string] | string[]
}

export function GuideContent({ isAuthenticated = false, sectionIds }: GuideContentProps) {
  const sid = (i: number) => sectionIds?.[i] ?? undefined

  return (
    <div className="space-y-8">
      {/* Section 1 */}
      <section id={sid(0)}>
        <div className="flex items-center gap-2 mb-3">
          <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">1</span>
          <h2 className="text-base font-semibold">What is EMA 200?</h2>
        </div>
        <div className="rounded-xl border border-border/30 bg-card/60 p-5 text-[13px] text-muted-foreground leading-relaxed space-y-3">
          <p>
            The <strong className="text-foreground">200-day Exponential Moving Average (EMA 200)</strong> is one of the most widely watched indicators by institutional traders. It represents the average price of a stock over the past 200 trading sessions, with more weight given to recent prices.
          </p>
          <p>
            When a stock trades <strong className="text-bull">above its EMA 200</strong>, it is in a long-term uptrend. When it falls <strong className="text-bear">below</strong>, it signals weakness. The EMA 200 acts as a major support and resistance level that large funds respect.
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section id={sid(1)}>
        <div className="flex items-center gap-2 mb-3">
          <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">2</span>
          <h2 className="text-base font-semibold">The &ldquo;Pre-Set ATH&rdquo; — not just any all-time high</h2>
        </div>
        <div className="rounded-xl border border-border/30 bg-card/60 p-5 text-[13px] text-muted-foreground leading-relaxed space-y-3">
          <p>
            The <strong className="text-foreground">Pre-Set ATH</strong> is the highest price a stock reached <em>before its most recent pullback below EMA 200</em>. This is NOT the stock&apos;s absolute all-time high.
          </p>
          <p>
            Why does this matter? Because the pre-set ATH is a specific resistance level — the exact price where buyers ran out of momentum before the reset. When the stock reclaims EMA 200 and approaches this level again, it&apos;s often a breakout setup.
          </p>
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-[12px]">
            <strong className="text-primary">Example:</strong> Stock hits ₹500 (pre-set ATH), pulls back to ₹380 (below EMA 200), then reclaims EMA 200 at ₹420. Now trading at ₹470 — 6% from its pre-set ATH. That&apos;s a simmering signal.
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id={sid(2)}>
        <div className="flex items-center gap-2 mb-3">
          <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">3</span>
          <h2 className="text-base font-semibold">The three-step setup</h2>
        </div>
        <div className="rounded-xl border border-border/30 bg-card/60 p-5">
          <div className="space-y-4">
            {[
              {
                step: "Reset",
                icon: "↓",
                color: "text-bear",
                desc: "Stock hits its Pre-Set ATH, then pulls back and closes below the EMA 200. The reset is confirmed when price crosses from above to below EMA 200.",
              },
              {
                step: "Reclaim",
                icon: "↑",
                color: "text-bull",
                desc: "Stock crosses back above the EMA 200 on a closing basis. The most recent such crossover is used — this is the 'reclaim date' in the signal detail.",
              },
              {
                step: "Range",
                icon: "◎",
                color: "text-primary",
                desc: "Stock is trading within 15% below its Pre-Set ATH (and up to 5% above it — a breakout). The closer to ATH, the hotter the signal.",
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-3">
                <span className={`text-lg font-bold ${s.color} w-5 shrink-0`}>{s.icon}</span>
                <div>
                  <p className="text-[12px] font-semibold text-foreground mb-0.5">{s.step}</p>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section id={sid(3)}>
        <div className="flex items-center gap-2 mb-3">
          <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">4</span>
          <h2 className="text-base font-semibold">Heat levels explained</h2>
        </div>
        <div className="rounded-xl border border-border/30 bg-card/60 p-5">
          <div className="space-y-3">
            {[
              { level: "Breakout", badge: "bg-heat-breakout/15 text-heat-breakout border-heat-breakout/30", desc: "Stock is at or above its Pre-Set ATH. Breakout confirmed — highest urgency." },
              { level: "Boiling", badge: "bg-heat-boiling/15 text-heat-boiling border-heat-boiling/30", desc: "0–2% below Pre-Set ATH. Approaching breakout — watch closely." },
              { level: "Simmering", badge: "bg-heat-simmering/15 text-heat-simmering border-heat-simmering/30", desc: "2–5% below Pre-Set ATH. Setup is building — good time to plan entry." },
              { level: "Warming", badge: "bg-heat-cooling/15 text-heat-cooling border-heat-cooling/30", desc: "5–15% below Pre-Set ATH. Early stage — add to watchlist and monitor." },
            ].map((h) => (
              <div key={h.level} className="flex items-start gap-3">
                <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider shrink-0 ${h.badge}`}>{h.level}</span>
                <p className="text-[12px] text-muted-foreground leading-relaxed pt-0.5">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section id={sid(4)}>
        <div className="flex items-center gap-2 mb-3">
          <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">5</span>
          <h2 className="text-base font-semibold">How to use SignalSky</h2>
        </div>
        <div className="rounded-xl border border-border/30 bg-card/60 p-5 text-[13px] text-muted-foreground leading-relaxed space-y-3">
          <p>1. <strong className="text-foreground">Open the Scanner daily</strong> after market close. New signals appear after the EOD scan runs (4:30 PM IST for India, 11:30 PM IST for US).</p>
          <p>2. <strong className="text-foreground">Check the heat level</strong> and distance from ATH. Boiling and Breakout signals are highest priority.</p>
          <p>3. <strong className="text-foreground">Read the signal detail</strong> — the chart shows the reset and reclaim, and the backtest data shows the historical win rate for that specific stock.</p>
          <p>4. <strong className="text-foreground">Add to your watchlist</strong> stocks you want to monitor. Set up Telegram or email alerts to get notified when new signals fire.</p>
          <p>5. <strong className="text-foreground">Log your trades</strong> in the journal to track P&amp;L across India and US positions.</p>
        </div>
      </section>

      {/* CTA — differs by auth state */}
      {isAuthenticated ? (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold text-foreground mb-0.5">See the strategy in action</p>
            <p className="text-[12px] text-muted-foreground">Check the Performance page for backtested win rates across 200+ stocks.</p>
          </div>
          <Link
            href="/performance"
            className="flex items-center gap-1.5 text-[12px] font-semibold text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
          >
            View Performance
            <ArrowRightIcon className="size-3" />
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold text-foreground mb-1">Ready to see live signals?</p>
            <p className="text-[12px] text-muted-foreground">Start your free 7-day trial — no credit card required.</p>
          </div>
          <Link
            href="/sign-in"
            className="flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2 text-[13px] font-semibold text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            Start Free Trial
            <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>
      )}

      {/* Footer nav — public only */}
      {!isAuthenticated && (
        <div className="flex items-center justify-between pt-4 border-t border-border/20 text-[11px] text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">← Back to home</Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/sign-in" className="hover:text-foreground transition-colors">Sign in</Link>
          </div>
        </div>
      )}
    </div>
  )
}

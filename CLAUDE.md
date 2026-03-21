# SignalSky — Claude Code Context

## What is this?

SignalSky is a stock market signal scanner and trading toolkit for India (NSE) and US (NASDAQ/S&P) markets. It detects "Reset & Reclaim" breakout setups using EMA200 and ATH proximity, provides market health dashboards, backtesting, trade journaling, and real-time Telegram alerts.

## Tech Stack

- **Frontend**: Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4, shadcn/ui (Base UI)
- **Backend API**: Fastify server in `/api/` (separate process on port 4000) — handles market data, scans, syncing
- **Database**: PostgreSQL via Supabase (hosted), Prisma ORM v7 with `@prisma/adapter-pg`
- **Auth**: Supabase Auth (Google OAuth), session via `lib/auth.ts` → `getSession()`
- **Payments**: PhonePe Payment Gateway (replaced Stripe) — 0% commission
- **Market Data**: Yahoo Finance (India .NS + US)
- **UI Components**: shadcn/ui with Base UI primitives (`@base-ui/react`), lucide-react icons

## Project Structure

```
signal-sky/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing page (public)
│   ├── sign-in/                  # Auth page
│   ├── pricing/                  # Pricing page (public, also shown on trial expiry)
│   ├── auth/callback/            # Supabase OAuth callback
│   ├── (dashboard)/              # Authenticated route group
│   │   ├── layout.tsx            # Sidebar + trial banner + access gating
│   │   ├── scanner/              # Signal scanner (main page)
│   │   │   └── [symbol]/         # Signal detail + trade ticket
│   │   ├── market-health/        # Market health dashboard
│   │   ├── watchlist/            # User watchlist
│   │   ├── backtests/            # Backtest list + [symbol] detail
│   │   ├── journal/              # Trade journal with split India/US P&L
│   │   ├── settings/             # Profile, subscription, alerts, position defaults, feedback
│   │   └── admin/
│   │       ├── panel/            # Admin dashboard (scans, data, sync, feedback)
│   │       └── data/             # CSV upload
│   └── api/                      # Next.js API routes
│       ├── admin/                # Admin endpoints (scan, sync, backtest, etc.)
│       ├── backtest/             # Backtest CRUD
│       ├── deals/lifetime/       # Lifetime deal counter
│       ├── feedback/             # User feedback CRUD
│       ├── journal/              # Trade journal CRUD
│       ├── payments/             # PhonePe checkout, callback, webhook
│       ├── user/profile/         # User profile GET/PATCH
│       └── watchlist/            # Watchlist CRUD
├── api/                          # Fastify backend (separate process)
│   ├── src/
│   │   ├── index.ts              # Entry point
│   │   ├── routes/               # API routes
│   │   ├── services/             # Business logic
│   │   ├── engine/               # Strategy engine, backtest engine
│   │   ├── providers/            # Yahoo data providers
│   │   ├── workers/              # Background jobs
│   │   └── generated/prisma/     # API's own Prisma client
│   └── prisma/schema.prisma      # API's Prisma schema (keep in sync with main)
├── components/
│   ├── ui/                       # shadcn/ui components (Base UI primitives)
│   └── signal-sky/               # App-specific components
│       ├── market-health-bar.tsx  # Top bar showing market breadth
│       ├── user-menu.tsx          # Sidebar user menu with tier badge
│       ├── theme-toggle.tsx       # Dark/light mode toggle
│       ├── lifetime-slots.tsx     # Lifetime deal counter widget
│       ├── backtest-card.tsx      # Backtest result card
│       ├── backtest-full-view.tsx # Full backtest detail view
│       └── signal-detail-drawer.tsx
├── hooks/
│   ├── use-auth.tsx              # Auth context provider + useAuth hook
│   ├── use-api.ts                # SWR-like fetch hook
│   └── use-mobile.ts            # Mobile breakpoint hook
├── lib/
│   ├── auth.ts                   # getSession() — server-side auth
│   ├── prisma.ts                 # Prisma client singleton (PrismaPg adapter)
│   ├── api.ts                    # Frontend API client (typed fetch for Fastify backend)
│   ├── plans.ts                  # Plan config, pricing, isPro(), formatINR()
│   ├── phonepe.ts                # PhonePe PG client (token, payment, order status)
│   ├── admin.ts                  # Admin check utility
│   ├── backtest-engine.ts        # Client-side backtest logic
│   ├── backtest-utils.ts         # Backtest helpers
│   ├── universes.ts              # Universe definitions (nifty50, sp100, etc.)
│   ├── utils.ts                  # cn() utility
│   ├── supabase/                 # Supabase client (server + browser)
│   ├── market-data/              # Market data utilities
│   └── generated/prisma/         # Generated Prisma client (DO NOT EDIT)
├── prisma/
│   └── schema.prisma             # Main Prisma schema (source of truth)
├── prisma.config.ts              # Prisma config (reads DATABASE_URL)
├── proxy.ts                      # Next.js middleware (session + route matching)
└── scripts/                      # Data scripts (backfill, sync, test)
```

## Key Architecture Decisions

### Two Prisma Schemas
There are TWO Prisma schemas that must stay in sync:
- `prisma/schema.prisma` — Main app (Next.js), generates to `lib/generated/prisma/`
- `api/prisma/schema.prisma` — Fastify backend, generates to `api/src/generated/prisma/`

After schema changes: run `npx prisma generate` in root AND `cd api && npx prisma generate`.

### Database
- Supabase PostgreSQL with connection pooling (pgBouncer)
- `DATABASE_URL` = pooled connection (for queries)
- `DIRECT_URL` = direct connection (for migrations)
- Prisma uses `@prisma/adapter-pg` (not the default Prisma engine)
- User IDs are UUIDs from Supabase Auth (`@db.Uuid` in main schema, `@default(uuid())` in api schema)

### Auth Flow
1. User signs in via Google OAuth → Supabase Auth
2. Supabase may auto-create a row in `public.users` via a DB trigger
3. `getSession()` in `lib/auth.ts` does an upsert — if user exists (from trigger), it checks if `trialEndsAt` is null and sets it
4. New users get 7-day free trial (`trialEndsAt = now + 7 days`)
5. After trial expires, dashboard layout redirects to `/pricing?expired=1`
6. Admin users (emails in `ADMIN_EMAILS` env var) bypass trial lockout

### Subscription & Payments
- No free tier — only 7-day trial, then must subscribe
- Plans: Monthly (₹299/mo), Yearly (₹2,999/yr), Lifetime (₹4,999 one-time)
- Payment via PhonePe Payment Gateway (Indian PG, 0% commission)
- Flow: `/api/payments/checkout` → PhonePe → `/api/payments/callback` (redirect) + `/api/payments/webhook` (server-to-server)
- On payment success: user tier → PRO, subscription record activated
- Lifetime deal has a cap tracked in `lifetime_deals` table

#### PhonePe Payment Routes
- `app/api/payments/checkout/route.ts` — creates PhonePe session; monthly/yearly → `createSubscription()`, lifetime → `createPayment()`
- `app/api/payments/callback/route.ts` — user redirected here after payment; verifies via `getOrderStatus()`, activates subscription
- `app/api/payments/webhook/route.ts` — server-to-server events from PhonePe; handles setup/redemption/cancel events
- `app/api/payments/subscription/status/route.ts` — GET billing info for settings page
- `app/api/payments/subscription/cancel/route.ts` — POST to cancel mandate, sets `cancelAtPeriodEnd: true`
- `app/api/payments/renewal/route.ts` — POST (cron) to trigger recurring charges via `notifyRedemption()`

#### PhonePe lib (`lib/phonepe.ts`) functions
- `getToken()` — OAuth2 client_credentials token (cached, auto-refreshed)
- `createPayment()` — one-time checkout via `POST /checkout/v2/pay` with `paymentFlow.type: "PG_CHECKOUT"`
- `createSubscription()` — autopay mandate setup via `POST /checkout/v2/pay` with `paymentFlow.type: "SUBSCRIPTION_CHECKOUT_SETUP"`, `subscriptionDetails: { subscriptionType:"RECURRING", productType:"UPI_MANDATE", authWorkflowType:"TRANSACTION", amountType:"FIXED", frequency, maxAmount, expireAt }`
- `getOrderStatus()` — tries `/subscriptions/v2/order/{id}/status` first, falls back to `/checkout/v2/order/{id}/status`
- `getSubscriptionStatus()` — GET `/subscriptions/v2/{merchantSubscriptionId}/status`
- `notifyRedemption()` — POST `/subscriptions/v2/notify` with `autoDebit:true` (pre-debit notification, PhonePe auto-executes after 24h)
- `executeRedemption()` — POST `/subscriptions/v2/redeem` (direct debit, bypasses 24h window)
- `cancelSubscription()` — POST `/subscriptions/v2/{id}/cancel`

#### PhonePe Webhook Events handled
- `checkout.order.completed` / `checkout.order.failed` — one-time lifetime payment
- `subscription.setup.order.completed` / `subscription.setup.order.failed` — mandate setup result
- `subscription.redemption.order.completed` / `subscription.redemption.order.failed` — recurring charge result
- `subscription.cancelled` / `subscription.revoked` — mandate cancelled

#### PhonePe Subscription Gotchas
- **`checkout` route must use `getSession()` not `getSessionForApi()`** — `getSession()` upserts the user into `public.users`, ensuring the FK on `subscriptions.user_id` doesn't fail with "Null constraint violation"
- **`subscriptions.id` needs `gen_random_uuid()` DB default** — migration applied; without it Prisma sends NULL for the PK and the insert fails
- **"Template with name not found" (500)** — PhonePe sandbox requires a subscription/autopay template configured in the merchant dashboard. Until configured, `SUBSCRIPTION_CHECKOUT_SETUP` falls back to regular payment. Card/netbanking recurring (`CARD_MANDATE`, `NB_MANDATE`) also require separate PhonePe merchant account enablement.
- **Sandbox webhooks don't reach localhost** — use ngrok or similar tunnel to test webhooks locally; callback is the fallback for local dev
- **`checkout/ui/v2/login/details` 400 on PhonePe checkout page** — PhonePe's own UI call for pre-filling user details; fails in sandbox (no real sessions). Safe to ignore — payment flow completes normally.
- **Cancel before checkout**: "Template with name not found" when cancelling a subscription that was never registered as a live PhonePe mandate (e.g., sandbox test records). Already in try/catch, non-blocking.
- **Period extension on resubscribe** — if user cancels (`cancelAtPeriodEnd:true`) then resubscribes before period ends, new `currentPeriodEnd` is calculated from existing `currentPeriodEnd` (not from today). Both callback and webhook `activateSubscription()` handle this.
- **Autopay `authWorkflowType: "TRANSACTION"`** — first payment IS an actual charge during mandate setup (not penny drop). Looks identical to one-time payment on checkout page. This is correct/expected.
- **`revalidateTag()` must NOT use `{ expire: 0 }`** — that is PPR-only syntax. Call `revalidateTag("tag")` with no options.

### User Tiers
- `FREE` — Default, no access after trial expires
- `PRO` — Full access (monthly/yearly/lifetime subscribers)
- `INSTITUTIONAL` — Full access (special tier)

### Trial Logic (IMPORTANT)
- `trialEndsAt` on User model tracks trial expiry
- Supabase Auth trigger may create user BEFORE `getSession()` runs → `trialEndsAt` can be null
- `lib/auth.ts` handles this: if `trialEndsAt` is null AND tier is FREE, sets it to 7 days from now
- Dashboard layout (`app/(dashboard)/layout.tsx`) computes `accessInfo` and redirects expired users
- Admin users always have access regardless of trial/subscription

## Design System

### Colors (Tailwind CSS tokens)
- `text-bull` / `bg-bull` — Green (profits, positive)
- `text-bear` / `bg-bear` — Red (losses, negative)
- `text-primary` / `bg-primary` — Blue accent
- `text-heat-simmering` / `text-heat-boiling` — Orange/red heat indicators
- `bg-surface` — Elevated surface background
- `border-border/40` — Standard border opacity

### Typography
- `font-mono` — For numbers, prices, timestamps
- `text-[10px]` / `text-[11px]` / `text-[12px]` — Common small text sizes
- `tracking-[-0.03em]` — Tight tracking for headings

### Component Patterns
- shadcn/ui components use Base UI (`@base-ui/react`) primitives, NOT Radix
- `Button` with `render` prop for links: `<Button render={<Link href="..." />} nativeButton={false}>`
- Always add `nativeButton={false}` when Button renders a non-button element (Link, anchor)
- Cards: `<Card className="border-border/40 bg-surface">`
- Tables: wrap in `overflow-x-auto` with `min-w-[...]` for mobile

### Responsive Design
- Mobile-first: `px-4 sm:px-6` padding pattern
- Tables: `overflow-x-auto` wrapper + `min-w-[600px]`/`min-w-[700px]` on table
- Grids: `grid-cols-2 sm:grid-cols-3` / `grid-cols-1 sm:grid-cols-3` patterns
- Headers: `flex-wrap` for mobile stacking
- Market health bar: no fixed height on mobile, `sm:h-[68px]` on desktop

## Common Commands

```bash
# Development
npm run dev              # Next.js dev server (port 3000)
npm run dev:api          # Fastify backend (port 4000)
npm run dev:all          # Both servers

# Prisma
npx prisma generate      # Regenerate Prisma client (MUST run after schema changes)
npx prisma db execute --stdin <<< "SQL"  # Run raw SQL (needs DATABASE_URL exported)

# To run SQL migration manually:
export $(grep DATABASE_URL .env.local | tr -d '"') && npx prisma db execute --stdin <<< "SQL HERE"

# Build
npm run build            # Runs prisma generate + next build
```

## Environment Variables (.env.local)

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# PhonePe Payment Gateway
PHONEPE_CLIENT_ID=
PHONEPE_CLIENT_SECRET=
PHONEPE_CLIENT_VERSION=1
PHONEPE_MERCHANT_ID=
PHONEPE_ENV=sandbox  # or production

# Admin
ADMIN_EMAILS=gosulayaswanth2@gmail.com
NEXT_PUBLIC_ADMIN_EMAILS=gosulayaswanth2@gmail.com

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:4000

# Database (Supabase PostgreSQL)
DATABASE_URL=          # Pooled connection (pgBouncer)
DIRECT_URL=            # Direct connection (for migrations)
```

## Database Models (Key ones)

- **User** — id (UUID), email, name, image, tier, trialEndsAt, settings (JSON)
- **Subscription** — userId, paymentProvider (phonepe), paymentOrderId, billingInterval, status, currentPeriodStart/End
- **Signal** — symbol, exchange, heat (breakout/boiling/simmering/cooling), price, ath, ema200, distancePct, volumeSurge
- **DailyBar** — symbol, exchange, date, OHLCV, ema200, sma200
- **Indicator** — symbol, exchange, date, ema200, ath, avgVol20, aboveEma200
- **MarketHealth** — universe, date, totalStocks, aboveEma200, pctAbove
- **JournalTrade** — userId, symbol, exchange, entry/exit details, pnl, status (OPEN/CLOSED)
- **Backtest** / **BacktestTrade** — strategy backtesting results
- **WatchlistItem** — userId, symbol, exchange
- **Feedback** — userId, category (bug/feature/general), message, isRead
- **LifetimeDeal** — cap, sold (tracks lifetime deal availability)

## Scan Pipeline — "Reset & Reclaim" Strategy

### Strategy Logic
A signal triggers when a stock:
1. Hit a **Pre-Set ATH** (all-time high before the most recent EMA200 reset)
2. **Pulled back below EMA200** (the "reset")
3. **Reclaimed above EMA200** (the "reclaim")
4. Is currently trading **within range of the pre-set ATH**

### Key Files
- `lib/scan-pipeline.ts` — Core scan logic, runs via cron or admin panel
- `lib/data/signals.ts` — Data access layer (read-time filters, chart data)
- `app/api/cron/india-eod/route.ts` — India EOD cron (Yahoo .NS → NSE)
- `app/api/cron/us-eod/route.ts` — US EOD cron
- `app/api/admin/scan/run/route.ts` — Manual scan trigger from admin panel
- `app/api/admin/sync/india/backfill/route.ts` — Historical data backfill (default 10 years, max 20)
- `app/api/admin/sync/us/backfill/route.ts` — Same for US

### Pre-Set ATH Detection (PostgreSQL SQL in `lib/scan-pipeline.ts`)
Uses PostgreSQL `LAG()` window function to detect the exact day price crossed from above → below EMA200:

```sql
bar_states → detects above/below EMA200 per bar using LAG()
break_start → DISTINCT ON (symbol) most recent day where above_ema=false AND prev_above_ema=true
              (i.e., first day of the most recent pullback below EMA200)
ath_before_break → MAX(high) from ALL bars BEFORE break_start_date (this is the pre-set ATH)
ath_data → exact date when that high was recorded
```

**No date cap on the SQL** — it queries ALL available data in `daily_bars`. History depth depends on what was loaded via backfill.

### Signal Storage vs Display Filtering
- **Scan writes ALL above-EMA200 stocks** with a valid pre-set ATH (no range filter at write time)
- **Scanner page (`getSignals`)** filters at read time: `distance_pct BETWEEN -5 AND 15`
  - `-5` allows up to 5% above pre-set ATH (breakout stocks)
  - `15` excludes stocks more than 15% below pre-set ATH
- **Watchlist** reads signals without the range filter — stocks added to watchlist remain visible even when they drift out of range

### Heat Levels (distance from pre-set ATH)
- `breakout` — at or above ATH (distancePct ≤ 0)
- `boiling` — 0–2% below ATH
- `simmering` — 2–5% below ATH
- `cooling` — >5% below ATH (stored but filtered out of scanner at >15%)

### Break Date & EMA200 at Break (`lib/data/signals.ts` — `getSignalChart`)
For the signal detail chart and "Why This Triggered" section:
- **`breakDate`** — FIRST day (scanning FORWARD from preSetATHDate) where `close < EMA200`
- **`breakEma200`** — EMA200 value on that specific break date (NOT the current EMA200)
- **`reclaimDate`** — Most recent day (scanning BACKWARD) where `close >= EMA200` AND previous day `close < EMA200` (the most recent cross from below → above)

```typescript
// Forward scan for FIRST break after pre-set ATH date
for (let i = 0; i < bars.length; i++) {
  if (Number(bars[i].close) < ema) { breakDate = ...; breakEma200 = ema; break }
}
// Backward scan for most recent reclaim
for (let i = bars.length - 1; i >= 1; i--) {
  if (bars[i].close >= ema && bars[i-1].close < prevEma) { reclaimDate = ...; break }
}
```

The `preSetATHDate` is stored in `signal.details.preSetATHDate` and used as the starting point for `daily_bars` queries in `getSignalChart`.

### Data Depth
- **Cron jobs** (daily delta): fallback to 30 days if no prior data exists — for day-to-day updates only
- **Backfill routes**: fetch up to 20 years (default 10 years), smart gap detection per symbol
- **EMA200 needs 200+ trading days** (~10 months) — must run backfill before scanning
- **Pre-set ATH detection** may need 2–3+ years depending on when the last reset occurred

### Cron Concurrency
Both cron routes use `CONCURRENCY = 15` (15 concurrent Yahoo Finance fetches per batch):
```typescript
for (let i = 0; i < symbols.length; i += CONCURRENCY) {
  await Promise.allSettled(symbols.slice(i, i + CONCURRENCY).map(processSymbol))
}
```
This keeps India EOD under 60s (Vercel Hobby plan hard limit). Do NOT use sequential loops with `await` per symbol — that causes `FUNCTION_INVOCATION_TIMEOUT`.

### revalidateTag in Next.js 16
`revalidateTag()` requires 2 arguments in Next.js 16 TypeScript types. Always pass an empty object as second arg:
```typescript
revalidateTag("signals", {})       // ✓ correct
revalidateTag("signals")           // ✗ TS error: Expected 2 arguments
```
Do NOT pass `{ expire: 0 }` — that is PPR-only syntax.

## Slingshot Filter System

### What "Slingshot" Means
Per Shashank (originator of the strategy): "add a time period for 220 to slingshot breakout within X days" — meaning **time from EMA220 reclaim → ATH breakout ≤ X days**.

- **Scanner metric**: `today − reclaimDate` (calendar days since the stock reclaimed EMA220). If the stock already broke ATH, the breakout fired inside the window. If it hasn't broken ATH yet, the stock is still inside the breakout window.
- **Backtest engine metric**: `reclaimBar → entryDate` calendar days (entry fires exactly when ATH is broken — so this is the same concept measured at the moment of the trade).
- Slingshot ≤30d means the ATH break happened (or will happen) within 30 days of reclaiming EMA220.

**`breakDate`** — first day price crossed FROM above → below EMA220 (stored in `signal.details.breakDate`, used for charts but NOT for slingshot filtering). SQL: `break_start_date` from the LAG()-based `break_start` CTE.
**`reclaimDate`** — first day price crossed FROM below → above EMA220 after the break. SQL: `reclaim_date` from `reclaim_start` CTE.

**NEVER measure `reclaimDate − breakDate`** (that's pullback duration — how long below EMA — not the slingshot). **NEVER measure `reclaimBar − entryBar`** (that's nearly 0, filters nothing).

### Where the Filter Is Applied

| Layer | File | How |
|---|---|---|
| Scanner (client) | `app/(dashboard)/scanner/scanner-client.tsx` | `(today - reclaimDate) <= slingshotDays` in `filteredData` memo |
| Backtest engine | `lib/backtest-engine.ts` | `tradingDaysBetween(reclaimBar, bar.date) > slingshotDays → skip entry` |
| Performance page | `app/(dashboard)/performance/page.tsx` | Reads pre-computed `parametersHash = "v2-ath-ema220-s{N}"` from DB |
| Backtest detail | `app/(dashboard)/backtests/[symbol]/backtest-detail-client.tsx` | Switches between pre-loaded `initialVariants` (s30/s60/s90) instantly |

### How Data Flows

**Signals (Scanner):**
1. Scan pipeline SQL computes `break_start_date` and `reclaim_date` via LAG() window functions
2. Stored in `signal.details.breakDate` and `signal.details.reclaimDate`
3. Serialized to `ApiSignal.breakDate` and `ApiSignal.reclaimDate` in `lib/data/signals.ts`
4. Scanner client computes days since reclaim (`today − reclaimDate`) client-side and filters

**Backtests (Performance/Detail):**
1. Admin bulk run (`POST /api/admin/backtest/run`) calls `runBacktest(bars)` 4 times per symbol:
   - `"v2-ath-ema220"` — baseline (no slingshot filter)
   - `"v2-ath-ema220-s30"` — slingshot ≤30d
   - `"v2-ath-ema220-s60"` — slingshot ≤60d
   - `"v2-ath-ema220-s90"` — slingshot ≤90d
2. Each variant is a **fully independent backtest run** — the engine skips entries at simulation time, so each has its own trade list, win rate, avg return, etc.
3. All 4 variants stored as separate DB rows (`backtests` table) with distinct `parameters_hash`
4. Performance page queries by `parameters_hash` — aggregates over all pre-computed symbols
5. Backtest detail page fetches all 4 variants server-side in parallel; chip switches are instant (no API call)

### Backtest Engine Internals (`lib/backtest-engine.ts`)
```typescript
let reclaimBar: string | null = null  // first day back above EMA in current reclaim attempt

// seeking_entry, bar crosses above EMA:
if (reclaimBar === null) reclaimBar = bar.date

// At entry (bar.close > preSetATH && bar.close > ema):
// bar.date IS the ATH breakout day — measure reclaim → breakout duration
const daysToBreakout = tradingDaysBetween(reclaimBar, bar.date)
if (daysToBreakout > options.slingshotDays) continue  // skip this entry
```

`reclaimBar` = first day back above EMA220. Duration is `reclaimBar → bar.date` (the ATH breakout bar). `pullbackStartDate` is still tracked and stored on trade records for transparency but is NOT used for the slingshot filter decision.

### `getBacktestDetail` Signature
```typescript
getBacktestDetail(symbol: string, parametersHash = "v2-ath-ema220")
```
Always pass the `parametersHash` explicitly when fetching slingshot variants. Cache key includes `"parametersHash"`.

### "Generate" Fallback
If a slingshot variant is missing for a symbol (not yet bulk-run), the backtest detail page shows a "Generate slingshot data" CTA. This calls `POST /api/backtest/run-single` with `{ symbol, slingshotDays }`, stores the result to DB, and updates the detail view. The new record is also included in performance page aggregates after cache revalidation.

### Known Gotchas
- **Don't revert scanner filter to `reclaimDate − breakDate`** — that's pullback duration (time below EMA), NOT the slingshot metric. The correct scanner filter is `today − reclaimDate` (days since reclaim).
- **Don't revert backtest engine filter to `pullbackStartDate → reclaimBar`** — that's also pullback duration, not the slingshot metric. The correct engine filter is `tradingDaysBetween(reclaimBar, bar.date)` (reclaim → ATH breakout).
- **Each slingshot variant has its own win rate** — it is NOT a post-hoc filter on baseline trades. Always run the engine separately per variant.
- **`breakDate` on `ApiSignal` vs `getSignalChart`**: `ApiSignal.breakDate` comes from the scan SQL's `break_start_date` (LAG-detected most-recent above→below crossing). `ApiSignalChart.breakDate` in `lib/data/signals.ts → getSignalChart` is computed by a forward scan from `preSetATHDate` — same concept, different code path used for the chart view only. `breakDate` is kept on `ApiSignal` for charts but NOT used for slingshot filtering.
- **Signals need re-scanning to populate `reclaimDate`** — signals without `reclaimDate` are excluded from slingshot filtering. Re-running the scan fixes this.

## Known Gotchas

1. **Supabase Auth trigger creates users** — Users may exist in `public.users` before `getSession()` runs. The upsert `update: {}` block won't set `trialEndsAt`. This is handled by a follow-up check in `lib/auth.ts`.

2. **Two Prisma schemas** — Always keep `prisma/schema.prisma` and `api/prisma/schema.prisma` in sync. Regenerate both after changes.

3. **Base UI, not Radix** — shadcn/ui components use `@base-ui/react` primitives. Button uses `render` prop (not `asChild`). Always add `nativeButton={false}` when rendering as Link.

4. **PrismaPg adapter** — Using `@prisma/adapter-pg` driver adapter, not default Prisma engine. The `prisma.config.ts` configures this.

5. **Exchange field** — Signals and trades have `exchange` field: `"NSE"` for India, `"US"` for US stocks. Currency follows: ₹ for NSE, $ for US.

6. **User settings JSON** — `user.settings` stores preferences like `defaultCapitalINR`, `defaultCapitalUSD`, `defaultRiskPct`. Merged on PATCH, not replaced.

7. **Middleware** — `proxy.ts` handles session refresh. Excludes `/api/payments/webhook` from auth middleware.

8. **Heat levels** — Signal strength: `breakout` > `boiling` > `simmering` > `cooling`. Each has associated colors in the UI.

9. **Dev server lock** — If `next dev` crashes, you may need to `rm .next/dev/lock` and kill orphaned processes on port 3000.

10. **Pre-existing TS error** — `app/(dashboard)/scanner/page.tsx:444` has a `string | null` type issue that predates recent changes.

11. **NEVER use `cacheComponents: true`** — In Next.js 16, `cacheComponents: true` activates global PPR (Partial Pre-Rendering) which silently excludes ALL `app/api/` route handlers from the Vercel build output. Every API call returns a cached 404. Never add this to `next.config.ts`.

12. **Data caching: use `unstable_cache`** — The `"use cache"` directive is the preferred Next.js 16 API, but it requires `cacheComponents: true` which breaks API routes (see above). Use `unstable_cache` from `next/cache` for all server-side data caching in `lib/data/*.ts`. Do NOT use `cacheTag`/`cacheLife` — those only work with `"use cache"`. Do NOT pass `{ expire: 0 }` to `revalidateTag()` — that is PPR-only syntax.

13. **Admin backtest/scan routes run in-process** — `app/api/admin/backtest/run/route.ts` and `app/api/admin/scan/run/route.ts` use in-process execution (Prisma + `runBacktest()`), NOT `exec()`/`child_process`. The Fastify worker scripts they used to shell out to no longer exist. Do NOT add `exec()` calls back.

14. **Mobile sidebar auto-close** — `app/(dashboard)/dashboard-shell.tsx` uses a `NavLink` wrapper component that calls `setOpenMobile(false)` from `useSidebar()` on click. All sidebar nav items use `NavLink` instead of `Link` directly.

15. **iOS Safari zoom prevention** — `app/layout.tsx` exports `viewport` with `maximumScale: 1, userScalable: false`. All search/filter inputs use `text-[16px] sm:text-xs` (16px on mobile prevents auto-zoom, small on desktop).

16. **`getSessionForApi()` uses `getUser()` not `getSession()`** — `lib/auth.ts` has two auth helpers: `getSession()` (for dashboard pages, does DB upsert) and `getSessionForApi()` (for API routes). The API helper uses `supabase.auth.getUser()` which validates with the Supabase Auth server — NOT `getSession()` which only reads cookies and can be spoofed. Never switch `getSessionForApi()` back to `getSession()`.

17. **Pre-set ATH ≠ All-Time High** — The pre-set ATH is the MAX(high) from BEFORE the most recent pullback below EMA200, NOT the absolute all-time high. A stock may have made a new ATH after recovering — only the high from before the most recent reset counts. This is what the LAG-based SQL detects in `lib/scan-pipeline.ts`.


## Alert & Notification System

### Overview
Multi-channel notification system that fires after each EOD scan. Supports immediate signal alerts (Telegram + email), daily/weekly digest emails, invoice receipts on payment, trial expiry reminders, and admin broadcast emails.

| Trigger | Channel | Route/File |
|---|---|---|
| After EOD scan | Telegram + Email | `lib/alerts/dispatch.ts` |
| Daily 7 AM IST | Email digest | `app/api/cron/digest/route.ts` |
| 2 days before trial ends | Email | `app/api/cron/trial-reminder/route.ts` |
| Payment success | Email invoice | `app/api/payments/callback` + `webhook` |
| Admin manual blast | Email | `app/api/admin/alerts/broadcast/route.ts` |

### Environment Variables
```
RESEND_API_KEY=re_...                          # Resend email API
TELEGRAM_BOT_TOKEN=...                         # BotFather token
TELEGRAM_WEBHOOK_SECRET=...                    # Secret header Telegram sends on every update
NEXT_PUBLIC_TELEGRAM_BOT_NAME=signalskyin_bot  # Used in deep link URLs
```

### Email System (Resend)
- **Domain**: `signalsky.app` — verified on Resend (DKIM + SPF, region: ap-northeast-1)
- **Transactional sender**: `support@signalsky.app` (alerts, invoices, trial reminders)
- **Marketing sender**: `hi@signalsky.app` (digest, promos)
- **Client**: `lib/email/resend.ts` — singleton `getResend()`
- **Send helpers**: `lib/email/send.ts`
  - `sendSignalAlert()` — single signal, immediate
  - `sendDigest()` — daily or weekly batch
  - `sendInvoice()` — payment receipt with GSTIN
  - `sendTrialReminder()` — upgrade CTA, sent once per user
  - `sendWelcome()` — sent on first sign-up
- **Templates**: `lib/email/templates/` — React Email components (dark theme, `@react-email/components`)
- All marketing/digest emails include `List-Unsubscribe` header and footer unsubscribe links

### Telegram Bot (`@signalskyin_bot`)
- **Webhook**: `POST https://signalsky.app/api/telegram/webhook` (excluded from auth middleware in `proxy.ts`)
- **Secret**: Telegram sends `X-Telegram-Bot-Api-Secret-Token` header on every update — must match `TELEGRAM_WEBHOOK_SECRET` exactly (no trailing newline in env var — use `--value` flag or `printf`, NOT `echo`)
- **Bot lib**: `lib/telegram.ts`
  - `sendTelegramMessage(chatId, text)` — sends HTML-formatted message
  - `generateVerifyToken(userId)` — creates 10-min token, stores on user
  - `getTelegramDeepLink(token)` — `https://t.me/signalskyin_bot?start=TOKEN`
  - `formatSignalMessage(opts)` — formats signal with heat emoji, prices, deep link

#### Telegram Verification Flow
1. User clicks "Connect Telegram" in Settings → `POST /api/alerts/telegram/connect` → returns deep link
2. Deep link opens `t.me/signalskyin_bot?start=TOKEN`
3. User taps Start → Telegram POSTs `/start TOKEN` to webhook
4. Webhook finds user by token (checks expiry), saves `telegramChatId`, creates/activates `AlertPreference` for channel "telegram"
5. Bot replies "✅ Connected!"
6. Settings page shows "Connected ✓" on next load

### Alert Dispatch (`lib/alerts/dispatch.ts`)
Called from cron jobs after scan: `dispatchAlerts(market, createdSignals)`
- Loads `AlertPreference` rows with `isActive: true`
- Filters to PRO users + active trial users only
- Applies each user's `heatFilter` (empty = all heats)
- Deduplicates via `AlertHistory` — skips if already sent today for this signal+user+channel
- **Telegram**: batches of 25, 1.1s delay between batches (Telegram limit: 30 msg/sec)
- **Email**: batches of 50
- Logs every send attempt to `AlertHistory` with `status: "sent" | "error"`
- Lazy-generates `emailUnsubscribeToken` (UUID) on User if missing

### Alert Preferences API
- `GET /api/alerts/preferences` — returns preferences array + `telegramConnected`, `emailDigest`, `emailMarketing`
- `PATCH /api/alerts/preferences` — upserts preference for a channel, also updates `emailDigest`/`emailMarketing` on User
- `POST /api/alerts/telegram/connect` — generates verify token, returns deep link
- `POST /api/alerts/telegram/disconnect` — clears `telegramChatId`, deactivates telegram preference

### Cron Routes
- `GET /api/cron/digest` — schedule `0 1 * * *` (1 AM UTC = 7 AM IST)
  - Sends daily digest every day; weekly digest only on Sunday
  - Only to users with `emailDigest = "daily" | "weekly"` who are PRO or on active trial
- `GET /api/cron/trial-reminder` — schedule `0 2 * * *` (2 AM UTC)
  - Finds users with `trialEndsAt` in 2–3 day window
  - Checks `AlertHistory` for `channel: "trial-reminder"` to avoid re-sending
  - Only to users with `emailMarketing = true`

### Unsubscribe
- `GET /api/email/unsubscribe?token=XXX&type=alerts|digest|all` — excluded from auth middleware
- `type=alerts` → deactivates email AlertPreference
- `type=digest` → sets `emailDigest = "off"`
- `type=all` → sets `emailDigest = "off"`, `emailMarketing = false`, deactivates all email preferences
- Returns plain HTML confirmation page (no JS, works in any email client)

### Admin Broadcast
- `POST /api/admin/alerts/broadcast` — requires admin session
- Body: `{ subject, heading, body, ctaLabel?, ctaUrl? }`
- Targets all PRO + active trial users with `emailMarketing = true`
- Sends from `hi@signalsky.app` with unsubscribe footer

### New User Fields (added via migration)
```
users.telegram_chat_id           TEXT         — linked Telegram chat ID
users.telegram_verify_token      TEXT         — short-lived token (10 min)
users.telegram_verify_token_expiry TIMESTAMPTZ
users.email_digest               TEXT         — 'daily' | 'weekly' | 'off' (default 'daily')
users.email_marketing            BOOLEAN      — default true
users.email_unsubscribe_token    TEXT         — UUID, lazy-generated on first email send
```

### Invoice Email Content
Sent on every successful payment (callback + webhook). Includes:
- Plan name + billing interval
- Amount in ₹
- PhonePe transaction/order ID
- Business: YG IT Global Solutions, GSTIN: 36BKTPG1266J1ZS
- Contact: support@signalsky.app

### Settings Page — Alerts Card
`app/(dashboard)/settings/page.tsx` → `AlertsCard` component:
- Telegram: connect/disconnect button, connection status, heat filter toggles, enabled toggle
- Email: immediate alerts toggle, heat filter, digest cadence (daily/weekly/off), marketing toggle
- Saves via `PATCH /api/alerts/preferences`

### Known Gotchas
- **`TELEGRAM_WEBHOOK_SECRET` must have no trailing newline** — use `npx vercel env add ... --value VALUE` not `echo VALUE | vercel env add`. A newline mismatch causes 401 on every Telegram update.
- **`/start` without token** — bot replies with instructions but does NOT link the account. Account linking requires going through Settings → Connect Telegram to get the deep link with the token.
- **`scan-pipeline.ts` now returns `createdSignals`** — the return type of `runScanForMarket()` includes `createdSignals: Array<{id, symbol, exchange, heat, price, ath, ema200, distancePct}>`. Cron jobs use this to dispatch alerts.
- **Alert dispatch is non-blocking** — cron jobs call `dispatchAlerts(...).then(...).catch(...)` so alert failures never break the scan response.
- **`proxy.ts` exclusions** — `/api/telegram/webhook` and `/api/email/unsubscribe` are excluded from Supabase session middleware so unauthenticated requests (from Telegram servers and email clients) reach the handlers.

## Rules
Always use Context7 MCP when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.
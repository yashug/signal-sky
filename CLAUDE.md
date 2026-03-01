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
- Plans: Monthly (₹499), Yearly (₹4,999), Lifetime (₹9,999)
- Payment via PhonePe Payment Gateway (Indian PG, 0% commission)
- Flow: `/api/payments/checkout` → PhonePe → `/api/payments/callback` (redirect) + `/api/payments/webhook` (server-to-server)
- On payment success: user tier → PRO, subscription record activated
- Lifetime deal has a cap of 100 seats tracked in `lifetime_deals` table

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

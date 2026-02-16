---
name: SignalSky_MVP_TechStack_and_Roadmap
overview: Define a production-shaped MVP architecture and phased delivery plan for SignalSky using Next.js + a TypeScript HTTP API + background workers, with a hybrid data-ingestion approach (Yahoo Finance + user/admin CSV uploads) to support both NSE and US universes and a future mobile app.
source: Copied from Cursor plan output so it lives in-repo.
---

# SignalSky MVP (API-first, multi-market)

## Context (what you already have)

- The repo is already a Next.js App Router dashboard scaffold with shadcn UI and dark-mode tokens.
- Current dashboard entrypoint is `app/page.tsx` using existing dashboard components.

## Key product decisions (locked)

- **Markets day 1**: India + US.
- **Clients**: Web now + **mobile soon**, so we need a stable **HTTP API** (not only server actions).
- **Backend language**: JavaScript/TypeScript (no Python/FastAPI).

## Recommended tech stack (MVP that can scale)

- **Web**: Next.js (existing), Tailwind, shadcn, TanStack Table.
- **API**: Separate Node/TypeScript HTTP API (clean contract for mobile).
  - Implementation choices:
    - **Option A (recommended)**: `Fastify` + `zod` validation (fast, minimal, very \"API\"-shaped).
    - Option B: `NestJS` (more structure, heavier).
- **Background scanning + alerting**: Worker process using **BullMQ** (Redis-backed) so scanning/alerts aren’t tied to request lifecycles.
- **Database**: PostgreSQL.
  - Store user/org, watchlists, subscriptions, alerts, computed daily indicators.
  - Optional later: TimescaleDB extension if you decide to store full OHLCV history at scale.
- **Cache/queue**: Redis.
  - Cache latest snapshots & computed SMA200 status.
  - Queue scan jobs + alert deliveries.
- **Data adapters** (pluggable):
  - **Yahoo Finance adapter** for fast MVP coverage (US + some NSE via `.NS`).
  - **CSV upload adapter** for NSE reliability (user/admin downloads from NSE and uploads; avoids scraping).
  - Later: Paid adapters (Polygon/Alpaca for US; broker/data vendor for India).

## Data ingestion strategy (best path vs your options)

### What not to do (MVP)

- **Do not scrape NSE webpages**: brittle, often blocked, ToS risk, constant maintenance.

### MVP approach (hybrid)

- **Primary**: Yahoo Finance (fastest to ship; acceptable for MVP signals).
- **Reliability backstop for India**: **CSV upload** flow:
  - Admin (or user, if you want per-user) can upload downloaded historical/bhavcopy CSV.
  - System validates/normalizes into a common OHLCV schema.

### Canonical OHLCV schema

- `symbol`, `exchange`, `date`, `open`, `high`, `low`, `close`, `volume`, plus `adjustmentFactor`/`splitFactor` when available.
- Strategy rule “ATH adjusted for splits” is implemented by applying split-adjustment to OHLC series (provider-dependent; for CSV we assume already split-adjusted or we treat it as raw and document limitations).

## Core engine design (extensible for more strategies)

- Create a strategy framework with:
  - `DataProvider` interface (fetch bars, latest quote, corporate actions if available)
  - `Indicator` utilities (SMA200, avgVol20, ATH)
  - `Strategy` interface: `evaluate(symbol, context) -> Signal | null` and `evaluateExit(...)`
- Implement Strategy #1 “Reset & Reclaim”:
  - **ATH**: absolute high in available split-adjusted history.
  - **Reset**: at least one daily low below SMA200 *after* ATH.
  - **Signal**:
    - price > SMA200
    - price >= ATH
    - price <= ATH * 1.05
    - optional filter: volume >= 1.5x avgVol20
  - **Exit**: price < 200 SMA.

## API surface (mobile-ready)

- Public-ish read endpoints:
  - `GET /health`
  - `GET /market-health?universe=nifty500|sp500` → percent above SMA200 + traffic light.
  - `GET /signals?universe=...&heat=boiling|simmering|cooling` → table feed.
  - `GET /symbols/search?q=...`
- Auth/user endpoints (phase-dependent):
  - watchlist CRUD
  - alert preferences (Telegram handle, etc.)
- Admin endpoints:
  - `POST /admin/data/upload` (CSV)
  - `POST /admin/scan/run` (manual trigger)

## Web UX (TradingView-style)

- Add a global header widget for **Market Health Index**.
- Scanner table sorted by **Distance to Breakout %** with Heat buckets:
  - Boiling: within 2% of ATH
  - Simmering: above 200 SMA but >5% from ATH
  - Cooling: stocks currently below 200 SMA
- Signal detail drawer/card:
  - Strategy explanation (why it triggered)
  - Position size calculator (capital, risk %, stop at SMA200)

## Alerting (Telegram first)

- Worker watches newly-created signals and sends Telegram messages as clean cards:
  - Ticker, Price, ATH, SMA200, Distance to breakout, Volume surge status
  - Risk calc: stop = SMA200; position size from user inputs

## Deployment model (simple + compatible with workers)

- Because scanning + queues need long-running compute, prefer container hosting:
  - **API + Worker**: Fly.io / Render / Railway (Docker)
  - **Web**: Vercel (optional) or same host
- Redis + Postgres managed (Railway/Render/Supabase/Neon).

## Milestones

- **M0**: Data layer + strategy engine runs locally for a fixed universe.
- **M1**: API endpoints + worker scan schedule + Telegram alerts.
- **M2**: Next.js dashboard consumes API; market health header + heat sorting.
- **M3**: CSV upload for NSE + data validation.
- **M4**: Tiering + auth + subscriptions (if/when needed).


# Market Data Sources

SignalSky ingests daily OHLCV bars from two providers:

| Market | Provider | Source Tag | Exchange Tag |
|--------|----------|------------|--------------|
| India (NSE) | Zerodha Kite Connect | `kite` | `NSE` |
| US | Yahoo Finance | `yahoo` | `US` |

---

## Kite Connect (India)

### Setup

1. Create a Kite Connect app at [developers.kite.trade](https://developers.kite.trade/)
2. Note your **API Key** and **API Secret**
3. Generate an access token via the Kite login flow
4. Add to `.env.local`:

```env
KITE_API_KEY=your_api_key
KITE_API_SECRET=your_api_secret
KITE_ACCESS_TOKEN=your_access_token
```

> **Note:** The access token expires daily. For MVP, manually regenerate it.
> TODO: Implement admin re-auth flow for automatic token rotation.

### Usage

#### 1. Refresh Instrument Master

Fetches the full NSE instrument list (equities only) and stores in `kite_instruments` table.
Run once daily, ideally before market open (~8:30 AM IST).

```
POST /api/admin/kite/instruments
```

#### 2. Backfill Historical Data

Fetches 10 years of daily candles for all symbols in a universe.

```
POST /api/admin/sync/india/backfill
Body: { "universe": "nifty50", "years": 10 }
```

Symbol matching: UniverseMember symbols are matched against `kite_instruments.tradingsymbol`.
Symbols with `.NS` suffix are stripped automatically.

#### 3. Daily Incremental Sync

Fetches bars from last stored date to today.

```
POST /api/admin/sync/india/daily
Body: { "universe": "nifty50" }
```

### Rate Limits

- Kite historical API allows ~3 requests/second
- The batch fetcher adds a 350ms delay between requests
- A full NIFTY 50 backfill (~50 symbols x 10y) takes ~20-30 minutes

---

## Yahoo Finance (US)

### Setup

No API key required. Uses the `yahoo-finance2` npm package.

### Usage

#### 1. Backfill

```
POST /api/admin/sync/us/backfill
Body: { "symbols": ["AAPL", "NVDA", "MSFT"], "years": 10 }
```

Or leave `symbols` empty to backfill the entire `sp500` universe:

```
POST /api/admin/sync/us/backfill
Body: { "years": 10 }
```

#### 2. Daily Incremental Sync

```
POST /api/admin/sync/us/daily
Body: { "symbols": ["AAPL", "NVDA"] }
```

Or leave `symbols` empty to sync all S&P 500 members.

### Adjusted Close

Yahoo provides adjusted close prices. The adapter computes `adjFactor = adjClose / close`
and stores it in the `adj_factor` column (6 decimal places).

---

## Data Storage

All bars go into the `daily_bars` table with unique constraint on `(symbol, exchange, date)`.

- Duplicate inserts are safely skipped via `skipDuplicates`
- Dates are stored as UTC midnight
- OHLC stored as `Decimal(14,4)`, volume as `BigInt`

---

## Admin UI

All data source operations are available at:
- `/admin/panel` — Admin panel with Kite connection, universe explorer, sync & backfill controls
- `/admin/data` — Manual CSV upload (alternative ingestion method)

Access is restricted to emails in `ADMIN_EMAILS` env var.

---

## Known Limitations

- **Kite access token rotation**: Currently manual. Must regenerate daily.
- **Yahoo reliability**: Yahoo Finance is unofficial and may rate-limit or block.
- **Kite data gaps**: Kite may not have data for newly listed stocks going back 10 years.
- **No real-time data**: This system only handles end-of-day bars.
- **Long backfills**: First-time 10Y backfill for 50+ symbols takes 20-30 minutes due to rate limits.

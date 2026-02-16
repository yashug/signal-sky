# CSV Upload Formats

Admin-only endpoints for uploading universe constituents and daily OHLCV bars.

## 1. Universe Constituents

**Endpoint:** `POST /api/admin/universe-members/upload`

| Column | Required | Description |
|--------|----------|-------------|
| symbol | Yes | Stock ticker (e.g. RELIANCE). Uppercased automatically. No `.NS` suffix. |
| name | No | Company name (e.g. Reliance Industries) |
| sector | No | Sector (e.g. Energy) |

### Example CSV

```csv
symbol,name,sector
RELIANCE,Reliance Industries,Energy
TCS,Tata Consultancy Services,IT
HDFCBANK,HDFC Bank,Financials
INFY,Infosys,IT
ITC,ITC Limited,Consumer Staples
```

### Form fields

- `file` — the CSV file
- `universe` — target universe tag (e.g. `nifty50`, `niftynext50`, `sp500`)

### Response

```json
{
  "inserted": 3,
  "updated": 2,
  "total": 5,
  "errors": []
}
```

---

## 2. Daily Bars (OHLCV)

**Endpoint:** `POST /api/admin/daily-bars/upload`

| Column | Required | Description |
|--------|----------|-------------|
| symbol | Yes | Stock ticker (e.g. RELIANCE). Uppercased automatically. |
| date | Yes | Trading date in `YYYY-MM-DD` format |
| open | Yes | Opening price |
| high | Yes | High price |
| low | Yes | Low price |
| close | Yes | Closing price |
| volume | Yes | Volume (integer >= 0) |
| adjFactor | No | Adjustment factor (default 1.0). Also accepts `adj_factor` header. |

### Example CSV

```csv
symbol,date,open,high,low,close,volume,adjFactor
RELIANCE,2026-02-06,2840.50,2880.00,2835.00,2869.20,12345678,1.0
RELIANCE,2026-02-07,2870.00,2910.00,2860.00,2905.50,9876543,1.0
TCS,2026-02-06,3920.00,3955.00,3910.00,3945.75,4567890,1.0
TCS,2026-02-07,3950.00,3980.00,3935.00,3960.25,3456789,1.0
```

### Form fields

- `file` — the CSV file
- `exchange` — exchange code (default `NSE`). Options: NSE, BSE, NASDAQ, NYSE
- `source` — data source label (default `csv`)

### Response

```json
{
  "inserted": 4,
  "skippedDuplicates": 0,
  "total": 4,
  "errors": []
}
```

---

## Notes

- Duplicate rows are handled gracefully: universe members get upserted, daily bars are skipped.
- Errors are capped at 20 per upload in the response.
- Dates are stored as UTC midnight to avoid timezone issues.
- Access is restricted to emails listed in the `ADMIN_EMAILS` environment variable.

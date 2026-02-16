-- SignalSky Database Schema
-- PostgreSQL

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── OHLCV Price History ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ohlcv (
  id            BIGSERIAL PRIMARY KEY,
  symbol        VARCHAR(20) NOT NULL,
  exchange      VARCHAR(10) NOT NULL,
  date          DATE NOT NULL,
  open          NUMERIC(14,4) NOT NULL,
  high          NUMERIC(14,4) NOT NULL,
  low           NUMERIC(14,4) NOT NULL,
  close         NUMERIC(14,4) NOT NULL,
  volume        BIGINT NOT NULL DEFAULT 0,
  adj_factor    NUMERIC(10,6) DEFAULT 1.0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(symbol, exchange, date)
);

CREATE INDEX idx_ohlcv_symbol_date ON ohlcv(symbol, date DESC);
CREATE INDEX idx_ohlcv_exchange ON ohlcv(exchange);

-- ─── Computed Daily Indicators ────────────────────────────────────
CREATE TABLE IF NOT EXISTS indicators (
  id            BIGSERIAL PRIMARY KEY,
  symbol        VARCHAR(20) NOT NULL,
  exchange      VARCHAR(10) NOT NULL,
  date          DATE NOT NULL,
  sma200        NUMERIC(14,4),
  ath           NUMERIC(14,4),
  ath_date      DATE,
  avg_vol_20    BIGINT,
  above_sma200  BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(symbol, exchange, date)
);

CREATE INDEX idx_indicators_symbol_date ON indicators(symbol, date DESC);

-- ─── Signals ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS signals (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  symbol        VARCHAR(20) NOT NULL,
  exchange      VARCHAR(10) NOT NULL,
  strategy_name VARCHAR(50) NOT NULL,
  heat          VARCHAR(15) NOT NULL CHECK (heat IN ('breakout', 'boiling', 'simmering', 'cooling')),
  price         NUMERIC(14,4) NOT NULL,
  ath           NUMERIC(14,4) NOT NULL,
  sma200        NUMERIC(14,4) NOT NULL,
  distance_pct  NUMERIC(8,4) NOT NULL,
  volume_surge  NUMERIC(6,2),
  volume_today  BIGINT,
  volume_avg20  BIGINT,
  signal_date   DATE NOT NULL,
  details       JSONB DEFAULT '{}',
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_signals_heat ON signals(heat) WHERE is_active = TRUE;
CREATE INDEX idx_signals_symbol ON signals(symbol);
CREATE INDEX idx_signals_active ON signals(is_active, signal_date DESC);

-- ─── Market Health Snapshots ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS market_health (
  id            BIGSERIAL PRIMARY KEY,
  universe      VARCHAR(20) NOT NULL, -- 'nifty500', 'sp500'
  date          DATE NOT NULL,
  total_stocks  INT NOT NULL,
  above_sma200  INT NOT NULL,
  pct_above     NUMERIC(5,2) NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(universe, date)
);

CREATE INDEX idx_market_health_universe ON market_health(universe, date DESC);

-- ─── Universes (stock lists) ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS universe_members (
  id            BIGSERIAL PRIMARY KEY,
  universe      VARCHAR(20) NOT NULL, -- 'nifty500', 'sp500'
  symbol        VARCHAR(20) NOT NULL,
  name          VARCHAR(120),
  sector        VARCHAR(60),
  added_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(universe, symbol)
);

CREATE INDEX idx_universe_members ON universe_members(universe);

-- ─── Users (future auth) ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email         VARCHAR(255) UNIQUE,
  telegram_id   VARCHAR(50),
  telegram_handle VARCHAR(50),
  tier          VARCHAR(20) DEFAULT 'free',
  settings      JSONB DEFAULT '{}',
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Watchlists ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS watchlist_items (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
  symbol        VARCHAR(20) NOT NULL,
  exchange      VARCHAR(10) NOT NULL,
  added_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, symbol, exchange)
);

-- ─── Alert Preferences ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS alert_preferences (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
  channel       VARCHAR(20) NOT NULL DEFAULT 'telegram',
  heat_filter   VARCHAR(15)[], -- which heat levels to alert on
  universes     VARCHAR(20)[], -- which universes to watch
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Alert History ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS alert_history (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id       UUID REFERENCES users(id) ON DELETE SET NULL,
  signal_id     UUID REFERENCES signals(id) ON DELETE SET NULL,
  channel       VARCHAR(20) NOT NULL,
  status        VARCHAR(20) NOT NULL DEFAULT 'pending',
  sent_at       TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

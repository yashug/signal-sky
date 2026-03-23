import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT } from "../../config/theme";
import { AppShell } from "../../components/AppShell";

interface JournalEntry {
  symbol: string;
  exchange: "NSE" | "US";
  status: "CLOSED" | "OPEN";
  entryDate: string;
  exitDate: string;
  entryPrice: string;
  exitPrice: string;
  qty: number;
  pnl: string;
  pnlPct: string;
  isGain: boolean;
  heat: "breakout" | "boiling" | "simmering" | "cooling";
}

const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    symbol: "RELIANCE",  exchange: "NSE", status: "CLOSED",
    entryDate: "Jan 22", exitDate: "Feb 14",
    entryPrice: "₹2,298", exitPrice: "₹2,641",
    qty: 61, pnl: "+₹20,923", pnlPct: "+14.9%",
    isGain: true, heat: "breakout",
  },
  {
    symbol: "NVDA", exchange: "US", status: "CLOSED",
    entryDate: "Dec 05", exitDate: "Jan 18",
    entryPrice: "$791", exitPrice: "$898",
    qty: 12, pnl: "+$1,284", pnlPct: "+13.5%",
    isGain: true, heat: "breakout",
  },
  {
    symbol: "TCS", exchange: "NSE", status: "CLOSED",
    entryDate: "Nov 12", exitDate: "Dec 28",
    entryPrice: "₹3,018", exitPrice: "₹3,312",
    qty: 33, pnl: "+₹9,702", pnlPct: "+9.7%",
    isGain: true, heat: "boiling",
  },
  {
    symbol: "INFY", exchange: "NSE", status: "CLOSED",
    entryDate: "Oct 08", exitDate: "Nov 03",
    entryPrice: "₹1,521", exitPrice: "₹1,482",
    qty: 65, pnl: "-₹2,535", pnlPct: "-2.6%",
    isGain: false, heat: "simmering",
  },
  {
    symbol: "AAPL", exchange: "US", status: "OPEN",
    entryDate: "Feb 02", exitDate: "—",
    entryPrice: "$168", exitPrice: "$182.40",
    qty: 25, pnl: "+$360", pnlPct: "+8.6%",
    isGain: true, heat: "boiling",
  },
];

const HEAT_COLORS = {
  breakout:  LIGHT.heat.breakout,
  boiling:   LIGHT.heat.boiling,
  simmering: LIGHT.heat.simmering,
  cooling:   LIGHT.heat.cooling,
};

export const D7Journal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chromeScale = spring({ frame, fps, config: { stiffness: 160, damping: 22 } });

  // P&L totals animate in
  const totalsProgress = spring({
    frame: frame - 30,
    fps,
    config: { stiffness: 200, damping: 24 },
  });

  const indiaPnl = Math.round(28090 * totalsProgress);
  const usPnl    = Math.round(1644  * totalsProgress);

  const appWidth  = 1160;
  const appHeight = 600;

  const COL_HEADERS = [
    { label: "Symbol",       w: "14%" },
    { label: "Mkt",          w: "7%" },
    { label: "Status",       w: "9%" },
    { label: "Entry",        w: "10%" },
    { label: "Exit",         w: "10%" },
    { label: "Entry Price",  w: "12%" },
    { label: "Exit Price",   w: "12%" },
    { label: "Qty",          w: "7%" },
    { label: "P&L",          w: "19%" },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: LIGHT.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          transform: `scale(${chromeScale * 1.3})`,
          opacity: chromeScale,
        }}
      >
        <AppShell
          activePage="journal"
          width={appWidth}
          height={appHeight}
          sidebarWidth={188}
          signalCount={28}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflow: "hidden",
            }}
          >
            {/* P&L summary bar */}
            <div
              style={{
                padding: "14px 22px",
                borderBottom: `1px solid ${LIGHT.border}`,
                display: "flex",
                gap: 36,
                flexShrink: 0,
                opacity: totalsProgress,
                transform: `translateY(${(1 - totalsProgress) * 10}px)`,
                backgroundColor: LIGHT.card,
                alignItems: "center",
              }}
            >
              {/* India P&L */}
              <div>
                <div
                  style={{
                    fontSize: 9,
                    color: LIGHT.mutedFg,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 3,
                    fontWeight: 600,
                  }}
                >
                  India P&amp;L (NSE)
                </div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: LIGHT.bull,
                    fontFamily: "monospace",
                    letterSpacing: "-0.04em",
                  }}
                >
                  +₹{indiaPnl.toLocaleString("en-IN")}
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  width: 1,
                  height: 36,
                  backgroundColor: LIGHT.border,
                }}
              />

              {/* US P&L */}
              <div>
                <div
                  style={{
                    fontSize: 9,
                    color: LIGHT.mutedFg,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 3,
                    fontWeight: 600,
                  }}
                >
                  US P&amp;L (NASDAQ / S&amp;P)
                </div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: LIGHT.bull,
                    fontFamily: "monospace",
                    letterSpacing: "-0.04em",
                  }}
                >
                  +${usPnl.toLocaleString("en-US")}
                </div>
              </div>

              {/* Right: summary chips */}
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    padding: "4px 12px",
                    borderRadius: 20,
                    backgroundColor: `${LIGHT.bull}12`,
                    border: `1px solid ${LIGHT.bull}30`,
                    fontSize: 11,
                    color: LIGHT.bull,
                    fontWeight: 600,
                  }}
                >
                  4 wins
                </div>
                <div
                  style={{
                    padding: "4px 12px",
                    borderRadius: 20,
                    backgroundColor: `${LIGHT.bear}10`,
                    border: `1px solid ${LIGHT.bear}30`,
                    fontSize: 11,
                    color: LIGHT.bear,
                    fontWeight: 600,
                  }}
                >
                  1 loss
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: LIGHT.mutedFg,
                    fontFamily: "monospace",
                  }}
                >
                  5 closed trades
                </div>
              </div>
            </div>

            {/* Table header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: 18,
                paddingRight: 18,
                height: 34,
                borderBottom: `1px solid ${LIGHT.border}`,
                backgroundColor: LIGHT.surface,
                flexShrink: 0,
              }}
            >
              {COL_HEADERS.map((col) => (
                <div
                  key={col.label}
                  style={{
                    width: col.w,
                    fontSize: 9,
                    fontWeight: 700,
                    color: LIGHT.mutedFg,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    flexShrink: 0,
                  }}
                >
                  {col.label}
                </div>
              ))}
            </div>

            {/* Journal rows */}
            <div style={{ flex: 1, overflow: "hidden" }}>
              {JOURNAL_ENTRIES.map((entry, i) => {
                const rowProgress = spring({
                  frame: frame - (i * 18 + 35),
                  fps,
                  config: { stiffness: 200, damping: 24 },
                });
                const heatColor = HEAT_COLORS[entry.heat];

                return (
                  <div
                    key={`${entry.symbol}-${i}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: 18,
                      paddingRight: 18,
                      height: 52,
                      borderBottom: `1px solid ${LIGHT.border}`,
                      borderLeft: `3px solid ${heatColor}`,
                      backgroundColor: entry.status === "OPEN"
                        ? `${LIGHT.primary}05`
                        : "transparent",
                      opacity: rowProgress,
                      transform: `translateY(${(1 - rowProgress) * 12}px)`,
                      flexShrink: 0,
                    }}
                  >
                    {/* Symbol */}
                    <div style={{ width: "14%", flexShrink: 0 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: LIGHT.foreground,
                          fontFamily: "monospace",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {entry.symbol}
                      </div>
                    </div>

                    {/* Market */}
                    <div style={{ width: "7%", flexShrink: 0 }}>
                      <div
                        style={{
                          display: "inline-block",
                          padding: "1px 5px",
                          borderRadius: 3,
                          backgroundColor:
                            entry.exchange === "NSE"
                              ? `${LIGHT.primary}10`
                              : `${LIGHT.simmering}10`,
                          fontSize: 9,
                          fontWeight: 700,
                          color:
                            entry.exchange === "NSE"
                              ? LIGHT.primary
                              : LIGHT.simmering,
                          fontFamily: "monospace",
                        }}
                      >
                        {entry.exchange}
                      </div>
                    </div>

                    {/* Status */}
                    <div style={{ width: "9%", flexShrink: 0 }}>
                      <div
                        style={{
                          display: "inline-block",
                          padding: "2px 7px",
                          borderRadius: 999,
                          backgroundColor:
                            entry.status === "CLOSED"
                              ? `${LIGHT.mutedFg}12`
                              : `${LIGHT.bull}12`,
                          border: `1px solid ${
                            entry.status === "CLOSED"
                              ? `${LIGHT.mutedFg}20`
                              : `${LIGHT.bull}25`
                          }`,
                          fontSize: 9,
                          fontWeight: 700,
                          color:
                            entry.status === "CLOSED"
                              ? LIGHT.mutedFg
                              : LIGHT.bull,
                        }}
                      >
                        {entry.status}
                      </div>
                    </div>

                    {/* Entry date */}
                    <div style={{ width: "10%", flexShrink: 0 }}>
                      <div
                        style={{
                          fontSize: 11,
                          color: LIGHT.mutedFg,
                          fontFamily: "monospace",
                        }}
                      >
                        {entry.entryDate}
                      </div>
                    </div>

                    {/* Exit date */}
                    <div style={{ width: "10%", flexShrink: 0 }}>
                      <div
                        style={{
                          fontSize: 11,
                          color: LIGHT.mutedFg,
                          fontFamily: "monospace",
                        }}
                      >
                        {entry.exitDate}
                      </div>
                    </div>

                    {/* Entry price */}
                    <div style={{ width: "12%", flexShrink: 0 }}>
                      <div
                        style={{
                          fontSize: 12,
                          color: LIGHT.foreground,
                          fontFamily: "monospace",
                        }}
                      >
                        {entry.entryPrice}
                      </div>
                    </div>

                    {/* Exit price */}
                    <div style={{ width: "12%", flexShrink: 0 }}>
                      <div
                        style={{
                          fontSize: 12,
                          color:
                            entry.status === "OPEN"
                              ? LIGHT.mutedFg
                              : LIGHT.foreground,
                          fontFamily: "monospace",
                        }}
                      >
                        {entry.exitPrice}
                      </div>
                    </div>

                    {/* Qty */}
                    <div style={{ width: "7%", flexShrink: 0 }}>
                      <div
                        style={{
                          fontSize: 12,
                          color: LIGHT.mutedFg,
                          fontFamily: "monospace",
                        }}
                      >
                        {entry.qty}
                      </div>
                    </div>

                    {/* P&L */}
                    <div style={{ width: "19%", flexShrink: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 800,
                            color: entry.isGain ? LIGHT.bull : LIGHT.bear,
                            fontFamily: "monospace",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {entry.pnl}
                        </div>
                        <div
                          style={{
                            padding: "2px 7px",
                            borderRadius: 4,
                            backgroundColor: entry.isGain
                              ? `${LIGHT.bull}12`
                              : `${LIGHT.bear}12`,
                            fontSize: 10,
                            fontWeight: 700,
                            color: entry.isGain ? LIGHT.bull : LIGHT.bear,
                            fontFamily: "monospace",
                          }}
                        >
                          {entry.pnlPct}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AppShell>
      </div>
    </div>
  );
};

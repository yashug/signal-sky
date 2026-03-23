import React from "react";
import { LIGHT } from "../config/theme";

export type AppPage =
  | "scanner"
  | "market-health"
  | "watchlist"
  | "backtests"
  | "performance"
  | "journal"
  | "settings";

// Inline SVG icons matching lucide-react icons used in the real app
const icons: Record<AppPage, React.ReactNode> = {
  scanner: (
    // CrosshairIcon
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="22" y1="12" x2="18" y2="12" />
      <line x1="6" y1="12" x2="2" y2="12" />
      <line x1="12" y1="6" x2="12" y2="2" />
      <line x1="12" y1="22" x2="12" y2="18" />
    </svg>
  ),
  "market-health": (
    // HeartPulseIcon
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </svg>
  ),
  watchlist: (
    // StarIcon
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  backtests: (
    // BarChart3Icon
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  ),
  performance: (
    // TrendingUpIcon
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  journal: (
    // BookOpenIcon
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  settings: (
    // SettingsIcon (gear)
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
};

const NAV_ORDER: AppPage[] = [
  "scanner",
  "market-health",
  "watchlist",
  "backtests",
  "performance",
  "journal",
];

const NAV_LABELS: Record<AppPage, string> = {
  scanner: "Scanner",
  "market-health": "Market Health",
  watchlist: "Watchlist",
  backtests: "Backtests",
  performance: "Performance",
  journal: "Journal",
  settings: "Settings",
};

interface AppShellProps {
  activePage: AppPage;
  children: React.ReactNode;
  width?: number;
  height?: number;
  sidebarWidth?: number;
  signalCount?: number;
  lastScan?: string;
}

export const AppShell: React.FC<AppShellProps> = ({
  activePage,
  children,
  width = 1600,
  height = 900,
  sidebarWidth = 220,
  signalCount = 47,
}) => {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: LIGHT.background,
        display: "flex",
        overflow: "hidden",
        borderRadius: 12,
        border: `1px solid ${LIGHT.border}`,
        boxShadow:
          "0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
        fontFamily:
          "'Inter', 'SF Pro Display', -apple-system, sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: sidebarWidth,
          height: "100%",
          backgroundColor: LIGHT.sidebar,
          borderRight: `1px solid ${LIGHT.sidebarBorder}`,
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "14px 16px 12px",
            borderBottom: `1px solid ${LIGHT.sidebarBorder}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: `linear-gradient(135deg, ${LIGHT.primary} 0%, #5a9fe8 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* ZapIcon */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: LIGHT.foreground,
              letterSpacing: "-0.03em",
            }}
          >
            SignalSky
          </span>
        </div>

        {/* Market health bar */}
        <div
          style={{
            padding: "8px 12px",
            borderBottom: `1px solid ${LIGHT.sidebarBorder}`,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              backgroundColor: LIGHT.border,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "76%",
                height: "100%",
                backgroundColor: LIGHT.bull,
                borderRadius: 2,
              }}
            />
          </div>
          <span
            style={{
              fontSize: 10,
              color: LIGHT.mutedFg,
              fontFamily: "monospace",
            }}
          >
            76%
          </span>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: "6px 0", overflowY: "hidden" }}>
          {NAV_ORDER.map((page) => {
            const isActive = page === activePage;
            return (
              <div
                key={page}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "7px 14px",
                  margin: "1px 6px",
                  borderRadius: 6,
                  backgroundColor: isActive
                    ? `${LIGHT.primary}12`
                    : "transparent",
                  color: isActive ? LIGHT.primary : LIGHT.mutedFg,
                  position: "relative",
                }}
              >
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 4,
                      bottom: 4,
                      width: 3,
                      backgroundColor: LIGHT.primary,
                      borderRadius: "0 3px 3px 0",
                      marginLeft: -6,
                    }}
                  />
                )}
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {icons[page]}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 450,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {NAV_LABELS[page]}
                </span>
                {page === "scanner" && signalCount > 0 && (
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: 10,
                      fontWeight: 700,
                      fontFamily: "monospace",
                      color: LIGHT.primary,
                      backgroundColor: `${LIGHT.primary}15`,
                      padding: "1px 6px",
                      borderRadius: 10,
                    }}
                  >
                    {signalCount}
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Settings at bottom */}
        <div style={{ padding: "0 0 8px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "7px 14px",
              margin: "1px 6px",
              borderRadius: 6,
              backgroundColor:
                activePage === "settings"
                  ? `${LIGHT.primary}12`
                  : "transparent",
              color:
                activePage === "settings" ? LIGHT.primary : LIGHT.mutedFg,
            }}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              {icons.settings}
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: activePage === "settings" ? 600 : 450,
              }}
            >
              Settings
            </span>
          </div>
        </div>

        {/* User row */}
        <div
          style={{
            padding: "10px 14px",
            borderTop: `1px solid ${LIGHT.sidebarBorder}`,
            display: "flex",
            alignItems: "center",
            gap: 9,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              backgroundColor: `${LIGHT.primary}20`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
              color: LIGHT.primary,
            }}
          >
            Y
          </div>
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: LIGHT.foreground,
              }}
            >
              Yaswanth
            </div>
            <div
              style={{
                fontSize: 10,
                color: LIGHT.primary,
                backgroundColor: `${LIGHT.primary}15`,
                padding: "0px 5px",
                borderRadius: 4,
                fontWeight: 600,
                display: "inline-block",
              }}
            >
              PRO
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};

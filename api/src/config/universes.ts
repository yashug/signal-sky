/**
 * Universe definitions for Nifty indices and US indices.
 *
 * Each stock is stored ONCE in `universe_members` with its most granular
 * universe tag (e.g. "nifty50", "niftynext50").  Composite indices like
 * "Nifty 100" are resolved at query time by combining the underlying tags.
 */

/** The raw universe tag stored in the DB */
export type UniverseTag =
  | "nifty50"
  | "niftynext50"
  | "nifty200"
  | "niftymidcap50"
  | "niftymidcap100"
  | "niftysmallcap50"
  | "niftysmallcap100"
  | "niftybank"
  | "sp100"
  | "nasdaq100"

/** User-facing index group key used in API queries & frontend */
export type UniverseGroupKey =
  | "all"
  | "india"
  | "us"
  | "nifty50"
  | "niftynext50"
  | "nifty100"
  | "nifty200"
  | "niftymidcap50"
  | "niftymidcap100"
  | "niftysmallcap50"
  | "niftysmallcap100"
  | "niftybank"
  | "sp100"
  | "nasdaq100"

export interface UniverseGroup {
  label: string
  /** DB universe tags that compose this index */
  tags: UniverseTag[]
  market: "IN" | "US"
}

export const UNIVERSE_GROUPS: Record<UniverseGroupKey, UniverseGroup> = {
  all: {
    label: "All Markets",
    tags: [
      "nifty50", "niftynext50", "nifty200",
      "niftymidcap50", "niftymidcap100",
      "niftysmallcap50", "niftysmallcap100",
      "niftybank",
      "sp100", "nasdaq100",
    ],
    market: "IN",
  },
  india: {
    label: "All India",
    tags: [
      "nifty50", "niftynext50", "nifty200",
      "niftymidcap50", "niftymidcap100",
      "niftysmallcap50", "niftysmallcap100",
      "niftybank",
    ],
    market: "IN",
  },
  us: {
    label: "All US",
    tags: ["sp100", "nasdaq100"],
    market: "US",
  },
  nifty50: {
    label: "Nifty 50",
    tags: ["nifty50"],
    market: "IN",
  },
  niftynext50: {
    label: "Nifty Next 50",
    tags: ["niftynext50"],
    market: "IN",
  },
  nifty100: {
    label: "Nifty 100",
    tags: ["nifty50", "niftynext50"],
    market: "IN",
  },
  nifty200: {
    label: "Nifty 200",
    tags: ["nifty50", "niftynext50", "nifty200"],
    market: "IN",
  },
  niftymidcap50: {
    label: "Nifty Midcap 50",
    tags: ["niftymidcap50"],
    market: "IN",
  },
  niftymidcap100: {
    label: "Nifty Midcap 100",
    tags: ["niftymidcap50", "niftymidcap100"],
    market: "IN",
  },
  niftysmallcap50: {
    label: "Nifty Smallcap 50",
    tags: ["niftysmallcap50"],
    market: "IN",
  },
  niftysmallcap100: {
    label: "Nifty Smallcap 100",
    tags: ["niftysmallcap50", "niftysmallcap100"],
    market: "IN",
  },
  niftybank: {
    label: "Nifty Bank",
    tags: ["niftybank"],
    market: "IN",
  },
  sp100: {
    label: "S&P 100",
    tags: ["sp100"],
    market: "US",
  },
  nasdaq100: {
    label: "NASDAQ 100",
    tags: ["nasdaq100"],
    market: "US",
  },
}

/** All raw universe tags used in the DB */
export const ALL_UNIVERSE_TAGS: UniverseTag[] = [
  "nifty50", "niftynext50", "nifty200",
  "niftymidcap50", "niftymidcap100",
  "niftysmallcap50", "niftysmallcap100",
  "niftybank",
  "sp100", "nasdaq100",
]

/** Resolve a group key to its DB universe tags */
export function resolveUniverseTags(key: UniverseGroupKey): UniverseTag[] {
  return UNIVERSE_GROUPS[key]?.tags ?? ALL_UNIVERSE_TAGS
}

/** Label map for market health display */
export const UNIVERSE_LABELS: Record<string, string> = Object.fromEntries(
  Object.entries(UNIVERSE_GROUPS).map(([k, v]) => [k, v.label])
)

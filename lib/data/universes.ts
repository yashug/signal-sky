/**
 * Universe resolution for server-side data fetching.
 * Mirrors api/src/config/universes.ts — kept in sync manually.
 */

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

const UNIVERSE_GROUPS: Record<UniverseGroupKey, UniverseTag[]> = {
  all: [
    "nifty50", "niftynext50", "nifty200",
    "niftymidcap50", "niftymidcap100",
    "niftysmallcap50", "niftysmallcap100",
    "niftybank", "sp100", "nasdaq100",
  ],
  india: [
    "nifty50", "niftynext50", "nifty200",
    "niftymidcap50", "niftymidcap100",
    "niftysmallcap50", "niftysmallcap100",
    "niftybank",
  ],
  us: ["sp100", "nasdaq100"],
  nifty50: ["nifty50"],
  niftynext50: ["niftynext50"],
  nifty100: ["nifty50", "niftynext50"],
  nifty200: ["nifty50", "niftynext50", "nifty200"],
  niftymidcap50: ["niftymidcap50"],
  niftymidcap100: ["niftymidcap50", "niftymidcap100"],
  niftysmallcap50: ["niftysmallcap50"],
  niftysmallcap100: ["niftysmallcap50", "niftysmallcap100"],
  niftybank: ["niftybank"],
  sp100: ["sp100"],
  nasdaq100: ["nasdaq100"],
}

export function resolveUniverseTags(key: string): UniverseTag[] {
  return UNIVERSE_GROUPS[key as UniverseGroupKey] ?? UNIVERSE_GROUPS.all
}

/**
 * Build a SQL WHERE fragment for filtering by universe.
 * Returns empty string for "all" (no filter needed).
 */
export function universeWhereSQL(table: string, universe: string): string {
  if (universe === "all") return ""
  const tags = resolveUniverseTags(universe)
  const tagList = tags.map((t) => `'${t}'`).join(", ")
  return `AND ${table}.symbol IN (SELECT symbol FROM universe_members WHERE universe IN (${tagList}))`
}

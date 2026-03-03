/** Universe group options for the frontend scanner filter */

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

export interface UniverseOption {
  value: UniverseGroupKey
  label: string
  group: "all" | "india" | "us"
}

const UNIVERSE_GROUPS: Record<string, string[]> = {
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

export function resolveUniverseTags(key: string): string[] {
  return UNIVERSE_GROUPS[key] ?? UNIVERSE_GROUPS.all
}

export const UNIVERSE_OPTIONS: UniverseOption[] = [
  { value: "all", label: "All Markets", group: "all" },
  { value: "india", label: "All India", group: "all" },
  { value: "us", label: "All US", group: "all" },
  { value: "nifty50", label: "Nifty 50", group: "india" },
  { value: "niftynext50", label: "Nifty Next 50", group: "india" },
  { value: "nifty100", label: "Nifty 100", group: "india" },
  { value: "nifty200", label: "Nifty 200", group: "india" },
  { value: "niftymidcap50", label: "Nifty Midcap 50", group: "india" },
  { value: "niftymidcap100", label: "Nifty Midcap 100", group: "india" },
  { value: "niftysmallcap50", label: "Nifty Smallcap 50", group: "india" },
  { value: "niftysmallcap100", label: "Nifty Smallcap 100", group: "india" },
  { value: "niftybank", label: "Nifty Bank", group: "india" },
  { value: "sp100", label: "S&P 100", group: "us" },
  { value: "nasdaq100", label: "NASDAQ 100", group: "us" },
]

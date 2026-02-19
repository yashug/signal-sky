/**
 * Universe definitions for Nifty indices and US indices.
 *
 * Each stock is stored ONCE in `universe_members` with its most granular
 * universe tag (e.g. "nifty50", "niftynext50").  Composite indices like
 * "Nifty 100" are resolved at query time by combining the underlying tags.
 */
/** The raw universe tag stored in the DB */
export type UniverseTag = "nifty50" | "niftynext50" | "nifty200" | "niftymidcap50" | "niftymidcap100" | "niftysmallcap50" | "niftysmallcap100" | "niftybank" | "sp100" | "nasdaq100";
/** User-facing index group key used in API queries & frontend */
export type UniverseGroupKey = "all" | "nifty50" | "niftynext50" | "nifty100" | "nifty200" | "niftymidcap50" | "niftymidcap100" | "niftysmallcap50" | "niftysmallcap100" | "niftybank" | "sp100" | "nasdaq100";
export interface UniverseGroup {
    label: string;
    /** DB universe tags that compose this index */
    tags: UniverseTag[];
    market: "IN" | "US";
}
export declare const UNIVERSE_GROUPS: Record<UniverseGroupKey, UniverseGroup>;
/** All raw universe tags used in the DB */
export declare const ALL_UNIVERSE_TAGS: UniverseTag[];
/** Resolve a group key to its DB universe tags */
export declare function resolveUniverseTags(key: UniverseGroupKey): UniverseTag[];
/** Label map for market health display */
export declare const UNIVERSE_LABELS: Record<string, string>;
//# sourceMappingURL=universes.d.ts.map
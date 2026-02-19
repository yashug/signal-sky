export declare const Tier: {
    readonly FREE: "FREE";
    readonly PRO: "PRO";
    readonly INSTITUTIONAL: "INSTITUTIONAL";
};
export type Tier = (typeof Tier)[keyof typeof Tier];
export declare const Heat: {
    readonly breakout: "breakout";
    readonly boiling: "boiling";
    readonly simmering: "simmering";
    readonly cooling: "cooling";
};
export type Heat = (typeof Heat)[keyof typeof Heat];
export declare const TradeSide: {
    readonly LONG: "LONG";
    readonly SHORT: "SHORT";
};
export type TradeSide = (typeof TradeSide)[keyof typeof TradeSide];
export declare const TradeStatus: {
    readonly OPEN: "OPEN";
    readonly CLOSED: "CLOSED";
    readonly STOPPED_OUT: "STOPPED_OUT";
};
export type TradeStatus = (typeof TradeStatus)[keyof typeof TradeStatus];
//# sourceMappingURL=enums.d.ts.map
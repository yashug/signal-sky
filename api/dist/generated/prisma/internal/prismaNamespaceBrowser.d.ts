import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Account: "Account";
    readonly Session: "Session";
    readonly VerificationToken: "VerificationToken";
    readonly Subscription: "Subscription";
    readonly LifetimeDeal: "LifetimeDeal";
    readonly KiteToken: "KiteToken";
    readonly KiteInstrument: "KiteInstrument";
    readonly DailyBar: "DailyBar";
    readonly Indicator: "Indicator";
    readonly Signal: "Signal";
    readonly MarketHealth: "MarketHealth";
    readonly UniverseMember: "UniverseMember";
    readonly WatchlistItem: "WatchlistItem";
    readonly JournalTrade: "JournalTrade";
    readonly Backtest: "Backtest";
    readonly BacktestTrade: "BacktestTrade";
    readonly AlertPreference: "AlertPreference";
    readonly AlertHistory: "AlertHistory";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly name: "name";
    readonly image: "image";
    readonly telegramId: "telegramId";
    readonly telegramHandle: "telegramHandle";
    readonly tier: "tier";
    readonly settings: "settings";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const AccountScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly type: "type";
    readonly provider: "provider";
    readonly providerAccountId: "providerAccountId";
    readonly refresh_token: "refresh_token";
    readonly access_token: "access_token";
    readonly expires_at: "expires_at";
    readonly token_type: "token_type";
    readonly scope: "scope";
    readonly id_token: "id_token";
    readonly session_state: "session_state";
};
export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: "id";
    readonly sessionToken: "sessionToken";
    readonly userId: "userId";
    readonly expires: "expires";
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const VerificationTokenScalarFieldEnum: {
    readonly identifier: "identifier";
    readonly token: "token";
    readonly expires: "expires";
};
export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum];
export declare const SubscriptionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly stripeCustomerId: "stripeCustomerId";
    readonly stripeSubscriptionId: "stripeSubscriptionId";
    readonly stripePriceId: "stripePriceId";
    readonly status: "status";
    readonly currentPeriodStart: "currentPeriodStart";
    readonly currentPeriodEnd: "currentPeriodEnd";
    readonly cancelAtPeriodEnd: "cancelAtPeriodEnd";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum];
export declare const LifetimeDealScalarFieldEnum: {
    readonly id: "id";
    readonly cap: "cap";
    readonly sold: "sold";
    readonly updatedAt: "updatedAt";
};
export type LifetimeDealScalarFieldEnum = (typeof LifetimeDealScalarFieldEnum)[keyof typeof LifetimeDealScalarFieldEnum];
export declare const KiteTokenScalarFieldEnum: {
    readonly id: "id";
    readonly accessToken: "accessToken";
    readonly publicToken: "publicToken";
    readonly userId: "userId";
    readonly loginTime: "loginTime";
    readonly updatedAt: "updatedAt";
};
export type KiteTokenScalarFieldEnum = (typeof KiteTokenScalarFieldEnum)[keyof typeof KiteTokenScalarFieldEnum];
export declare const KiteInstrumentScalarFieldEnum: {
    readonly instrumentToken: "instrumentToken";
    readonly exchangeToken: "exchangeToken";
    readonly tradingsymbol: "tradingsymbol";
    readonly name: "name";
    readonly exchange: "exchange";
    readonly segment: "segment";
    readonly instrumentType: "instrumentType";
    readonly lotSize: "lotSize";
    readonly updatedAt: "updatedAt";
};
export type KiteInstrumentScalarFieldEnum = (typeof KiteInstrumentScalarFieldEnum)[keyof typeof KiteInstrumentScalarFieldEnum];
export declare const DailyBarScalarFieldEnum: {
    readonly id: "id";
    readonly symbol: "symbol";
    readonly exchange: "exchange";
    readonly date: "date";
    readonly open: "open";
    readonly high: "high";
    readonly low: "low";
    readonly close: "close";
    readonly volume: "volume";
    readonly adjFactor: "adjFactor";
    readonly sma200: "sma200";
    readonly ema200: "ema200";
    readonly source: "source";
    readonly createdAt: "createdAt";
};
export type DailyBarScalarFieldEnum = (typeof DailyBarScalarFieldEnum)[keyof typeof DailyBarScalarFieldEnum];
export declare const IndicatorScalarFieldEnum: {
    readonly id: "id";
    readonly symbol: "symbol";
    readonly exchange: "exchange";
    readonly date: "date";
    readonly ema200: "ema200";
    readonly ath: "ath";
    readonly athDate: "athDate";
    readonly avgVol20: "avgVol20";
    readonly aboveEma200: "aboveEma200";
    readonly createdAt: "createdAt";
};
export type IndicatorScalarFieldEnum = (typeof IndicatorScalarFieldEnum)[keyof typeof IndicatorScalarFieldEnum];
export declare const SignalScalarFieldEnum: {
    readonly id: "id";
    readonly symbol: "symbol";
    readonly exchange: "exchange";
    readonly strategyName: "strategyName";
    readonly heat: "heat";
    readonly price: "price";
    readonly ath: "ath";
    readonly ema200: "ema200";
    readonly distancePct: "distancePct";
    readonly volumeSurge: "volumeSurge";
    readonly volumeToday: "volumeToday";
    readonly volumeAvg20: "volumeAvg20";
    readonly signalDate: "signalDate";
    readonly details: "details";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SignalScalarFieldEnum = (typeof SignalScalarFieldEnum)[keyof typeof SignalScalarFieldEnum];
export declare const MarketHealthScalarFieldEnum: {
    readonly id: "id";
    readonly universe: "universe";
    readonly date: "date";
    readonly totalStocks: "totalStocks";
    readonly aboveEma200: "aboveEma200";
    readonly pctAbove: "pctAbove";
    readonly createdAt: "createdAt";
};
export type MarketHealthScalarFieldEnum = (typeof MarketHealthScalarFieldEnum)[keyof typeof MarketHealthScalarFieldEnum];
export declare const UniverseMemberScalarFieldEnum: {
    readonly id: "id";
    readonly universe: "universe";
    readonly symbol: "symbol";
    readonly name: "name";
    readonly sector: "sector";
    readonly addedAt: "addedAt";
};
export type UniverseMemberScalarFieldEnum = (typeof UniverseMemberScalarFieldEnum)[keyof typeof UniverseMemberScalarFieldEnum];
export declare const WatchlistItemScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly symbol: "symbol";
    readonly exchange: "exchange";
    readonly notes: "notes";
    readonly addedAt: "addedAt";
};
export type WatchlistItemScalarFieldEnum = (typeof WatchlistItemScalarFieldEnum)[keyof typeof WatchlistItemScalarFieldEnum];
export declare const JournalTradeScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly symbol: "symbol";
    readonly exchange: "exchange";
    readonly side: "side";
    readonly entryDate: "entryDate";
    readonly entryPrice: "entryPrice";
    readonly quantity: "quantity";
    readonly stopLoss: "stopLoss";
    readonly targetPrice: "targetPrice";
    readonly exitDate: "exitDate";
    readonly exitPrice: "exitPrice";
    readonly exitReason: "exitReason";
    readonly pnl: "pnl";
    readonly pnlPercent: "pnlPercent";
    readonly notes: "notes";
    readonly linkedSignalId: "linkedSignalId";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type JournalTradeScalarFieldEnum = (typeof JournalTradeScalarFieldEnum)[keyof typeof JournalTradeScalarFieldEnum];
export declare const BacktestScalarFieldEnum: {
    readonly id: "id";
    readonly symbol: "symbol";
    readonly exchange: "exchange";
    readonly strategyName: "strategyName";
    readonly parametersHash: "parametersHash";
    readonly fromDate: "fromDate";
    readonly toDate: "toDate";
    readonly totalTrades: "totalTrades";
    readonly winRate: "winRate";
    readonly avgReturn: "avgReturn";
    readonly maxDrawdown: "maxDrawdown";
    readonly profitFactor: "profitFactor";
    readonly sharpeRatio: "sharpeRatio";
    readonly trades: "trades";
    readonly summary: "summary";
    readonly signalId: "signalId";
    readonly computedAt: "computedAt";
};
export type BacktestScalarFieldEnum = (typeof BacktestScalarFieldEnum)[keyof typeof BacktestScalarFieldEnum];
export declare const BacktestTradeScalarFieldEnum: {
    readonly id: "id";
    readonly backtestId: "backtestId";
    readonly symbol: "symbol";
    readonly exchange: "exchange";
    readonly entryDate: "entryDate";
    readonly entryPrice: "entryPrice";
    readonly exitDate: "exitDate";
    readonly exitPrice: "exitPrice";
    readonly pnlPercent: "pnlPercent";
    readonly daysHeld: "daysHeld";
    readonly preSetATHAtEntry: "preSetATHAtEntry";
};
export type BacktestTradeScalarFieldEnum = (typeof BacktestTradeScalarFieldEnum)[keyof typeof BacktestTradeScalarFieldEnum];
export declare const AlertPreferenceScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly channel: "channel";
    readonly heatFilter: "heatFilter";
    readonly universes: "universes";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
};
export type AlertPreferenceScalarFieldEnum = (typeof AlertPreferenceScalarFieldEnum)[keyof typeof AlertPreferenceScalarFieldEnum];
export declare const AlertHistoryScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly signalId: "signalId";
    readonly channel: "channel";
    readonly status: "status";
    readonly sentAt: "sentAt";
    readonly createdAt: "createdAt";
};
export type AlertHistoryScalarFieldEnum = (typeof AlertHistoryScalarFieldEnum)[keyof typeof AlertHistoryScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const JsonNullValueInput: {
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map
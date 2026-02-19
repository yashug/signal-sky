import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model Account
 *
 */
export type Account = Prisma.AccountModel;
/**
 * Model Session
 *
 */
export type Session = Prisma.SessionModel;
/**
 * Model VerificationToken
 *
 */
export type VerificationToken = Prisma.VerificationTokenModel;
/**
 * Model Subscription
 *
 */
export type Subscription = Prisma.SubscriptionModel;
/**
 * Model LifetimeDeal
 *
 */
export type LifetimeDeal = Prisma.LifetimeDealModel;
/**
 * Model KiteToken
 *
 */
export type KiteToken = Prisma.KiteTokenModel;
/**
 * Model KiteInstrument
 *
 */
export type KiteInstrument = Prisma.KiteInstrumentModel;
/**
 * Model DailyBar
 *
 */
export type DailyBar = Prisma.DailyBarModel;
/**
 * Model Indicator
 *
 */
export type Indicator = Prisma.IndicatorModel;
/**
 * Model Signal
 *
 */
export type Signal = Prisma.SignalModel;
/**
 * Model MarketHealth
 *
 */
export type MarketHealth = Prisma.MarketHealthModel;
/**
 * Model UniverseMember
 *
 */
export type UniverseMember = Prisma.UniverseMemberModel;
/**
 * Model WatchlistItem
 *
 */
export type WatchlistItem = Prisma.WatchlistItemModel;
/**
 * Model JournalTrade
 *
 */
export type JournalTrade = Prisma.JournalTradeModel;
/**
 * Model Backtest
 *
 */
export type Backtest = Prisma.BacktestModel;
/**
 * Model BacktestTrade
 *
 */
export type BacktestTrade = Prisma.BacktestTradeModel;
/**
 * Model AlertPreference
 *
 */
export type AlertPreference = Prisma.AlertPreferenceModel;
/**
 * Model AlertHistory
 *
 */
export type AlertHistory = Prisma.AlertHistoryModel;
//# sourceMappingURL=client.d.ts.map
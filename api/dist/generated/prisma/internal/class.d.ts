import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
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
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
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
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://pris.ly/d/raw-queries).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.user`: Exposes CRUD operations for the **User** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more Users
  * const users = await prisma.user.findMany()
  * ```
  */
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.account`: Exposes CRUD operations for the **Account** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Accounts
      * const accounts = await prisma.account.findMany()
      * ```
      */
    get account(): Prisma.AccountDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.session`: Exposes CRUD operations for the **Session** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Sessions
      * const sessions = await prisma.session.findMany()
      * ```
      */
    get session(): Prisma.SessionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more VerificationTokens
      * const verificationTokens = await prisma.verificationToken.findMany()
      * ```
      */
    get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Subscriptions
      * const subscriptions = await prisma.subscription.findMany()
      * ```
      */
    get subscription(): Prisma.SubscriptionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.lifetimeDeal`: Exposes CRUD operations for the **LifetimeDeal** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more LifetimeDeals
      * const lifetimeDeals = await prisma.lifetimeDeal.findMany()
      * ```
      */
    get lifetimeDeal(): Prisma.LifetimeDealDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.kiteToken`: Exposes CRUD operations for the **KiteToken** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more KiteTokens
      * const kiteTokens = await prisma.kiteToken.findMany()
      * ```
      */
    get kiteToken(): Prisma.KiteTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.kiteInstrument`: Exposes CRUD operations for the **KiteInstrument** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more KiteInstruments
      * const kiteInstruments = await prisma.kiteInstrument.findMany()
      * ```
      */
    get kiteInstrument(): Prisma.KiteInstrumentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.dailyBar`: Exposes CRUD operations for the **DailyBar** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more DailyBars
      * const dailyBars = await prisma.dailyBar.findMany()
      * ```
      */
    get dailyBar(): Prisma.DailyBarDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.indicator`: Exposes CRUD operations for the **Indicator** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Indicators
      * const indicators = await prisma.indicator.findMany()
      * ```
      */
    get indicator(): Prisma.IndicatorDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.signal`: Exposes CRUD operations for the **Signal** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Signals
      * const signals = await prisma.signal.findMany()
      * ```
      */
    get signal(): Prisma.SignalDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.marketHealth`: Exposes CRUD operations for the **MarketHealth** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more MarketHealths
      * const marketHealths = await prisma.marketHealth.findMany()
      * ```
      */
    get marketHealth(): Prisma.MarketHealthDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.universeMember`: Exposes CRUD operations for the **UniverseMember** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more UniverseMembers
      * const universeMembers = await prisma.universeMember.findMany()
      * ```
      */
    get universeMember(): Prisma.UniverseMemberDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.watchlistItem`: Exposes CRUD operations for the **WatchlistItem** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more WatchlistItems
      * const watchlistItems = await prisma.watchlistItem.findMany()
      * ```
      */
    get watchlistItem(): Prisma.WatchlistItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.journalTrade`: Exposes CRUD operations for the **JournalTrade** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more JournalTrades
      * const journalTrades = await prisma.journalTrade.findMany()
      * ```
      */
    get journalTrade(): Prisma.JournalTradeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.backtest`: Exposes CRUD operations for the **Backtest** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Backtests
      * const backtests = await prisma.backtest.findMany()
      * ```
      */
    get backtest(): Prisma.BacktestDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.backtestTrade`: Exposes CRUD operations for the **BacktestTrade** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more BacktestTrades
      * const backtestTrades = await prisma.backtestTrade.findMany()
      * ```
      */
    get backtestTrade(): Prisma.BacktestTradeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.alertPreference`: Exposes CRUD operations for the **AlertPreference** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more AlertPreferences
      * const alertPreferences = await prisma.alertPreference.findMany()
      * ```
      */
    get alertPreference(): Prisma.AlertPreferenceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.alertHistory`: Exposes CRUD operations for the **AlertHistory** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more AlertHistories
      * const alertHistories = await prisma.alertHistory.findMany()
      * ```
      */
    get alertHistory(): Prisma.AlertHistoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map
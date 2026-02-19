import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
/**
 * Prisma Errors
 */
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
/**
 * Re-export of sql-template-tag
 */
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
/**
 * Decimal.js
 */
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
/**
* Extensions
*/
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
/**
 * Prisma Client JS version: 7.3.0
 * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
 */
export declare const prismaVersion: PrismaVersion;
/**
 * Utility Types
 */
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
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
export declare const DbNull: runtime.DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: runtime.JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
/**
 * SelectSubset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
 * Additionally, it validates, if both select and include are present. If the case, it errors.
 */
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
/**
 * Subset + Intersection
 * @desc From `T` pick properties that exist in `U` and intersect `K`
 */
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
/**
 * If it's T[], return T
 */
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
/**
 * From ts-toolbelt
 */
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
/**
 * Like `Pick`, but additionally can also accept an array of keys
 */
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
/**
 * Exclude all keys with underscores
 */
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
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
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "account" | "session" | "verificationToken" | "subscription" | "lifetimeDeal" | "kiteToken" | "kiteInstrument" | "dailyBar" | "indicator" | "signal" | "marketHealth" | "universeMember" | "watchlistItem" | "journalTrade" | "backtest" | "backtestTrade" | "alertPreference" | "alertHistory";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        Account: {
            payload: Prisma.$AccountPayload<ExtArgs>;
            fields: Prisma.AccountFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AccountFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                findFirst: {
                    args: Prisma.AccountFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                findMany: {
                    args: Prisma.AccountFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>[];
                };
                create: {
                    args: Prisma.AccountCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                createMany: {
                    args: Prisma.AccountCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>[];
                };
                delete: {
                    args: Prisma.AccountDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                update: {
                    args: Prisma.AccountUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                deleteMany: {
                    args: Prisma.AccountDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AccountUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>[];
                };
                upsert: {
                    args: Prisma.AccountUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                aggregate: {
                    args: Prisma.AccountAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAccount>;
                };
                groupBy: {
                    args: Prisma.AccountGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AccountGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AccountCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AccountCountAggregateOutputType> | number;
                };
            };
        };
        Session: {
            payload: Prisma.$SessionPayload<ExtArgs>;
            fields: Prisma.SessionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SessionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                findFirst: {
                    args: Prisma.SessionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                findMany: {
                    args: Prisma.SessionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
                };
                create: {
                    args: Prisma.SessionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                createMany: {
                    args: Prisma.SessionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
                };
                delete: {
                    args: Prisma.SessionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                update: {
                    args: Prisma.SessionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                deleteMany: {
                    args: Prisma.SessionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SessionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
                };
                upsert: {
                    args: Prisma.SessionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                aggregate: {
                    args: Prisma.SessionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSession>;
                };
                groupBy: {
                    args: Prisma.SessionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SessionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SessionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SessionCountAggregateOutputType> | number;
                };
            };
        };
        VerificationToken: {
            payload: Prisma.$VerificationTokenPayload<ExtArgs>;
            fields: Prisma.VerificationTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
                };
                findFirst: {
                    args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
                };
                findMany: {
                    args: Prisma.VerificationTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[];
                };
                create: {
                    args: Prisma.VerificationTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
                };
                createMany: {
                    args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[];
                };
                delete: {
                    args: Prisma.VerificationTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
                };
                update: {
                    args: Prisma.VerificationTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[];
                };
                upsert: {
                    args: Prisma.VerificationTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
                };
                aggregate: {
                    args: Prisma.VerificationTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVerificationToken>;
                };
                groupBy: {
                    args: Prisma.VerificationTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VerificationTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VerificationTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VerificationTokenCountAggregateOutputType> | number;
                };
            };
        };
        Subscription: {
            payload: Prisma.$SubscriptionPayload<ExtArgs>;
            fields: Prisma.SubscriptionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SubscriptionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SubscriptionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>;
                };
                findFirst: {
                    args: Prisma.SubscriptionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SubscriptionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>;
                };
                findMany: {
                    args: Prisma.SubscriptionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>[];
                };
                create: {
                    args: Prisma.SubscriptionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>;
                };
                createMany: {
                    args: Prisma.SubscriptionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SubscriptionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>[];
                };
                delete: {
                    args: Prisma.SubscriptionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>;
                };
                update: {
                    args: Prisma.SubscriptionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>;
                };
                deleteMany: {
                    args: Prisma.SubscriptionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SubscriptionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SubscriptionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>[];
                };
                upsert: {
                    args: Prisma.SubscriptionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>;
                };
                aggregate: {
                    args: Prisma.SubscriptionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSubscription>;
                };
                groupBy: {
                    args: Prisma.SubscriptionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SubscriptionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SubscriptionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SubscriptionCountAggregateOutputType> | number;
                };
            };
        };
        LifetimeDeal: {
            payload: Prisma.$LifetimeDealPayload<ExtArgs>;
            fields: Prisma.LifetimeDealFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LifetimeDealFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LifetimeDealPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LifetimeDealFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LifetimeDealPayload>;
                };
                findFirst: {
                    args: Prisma.LifetimeDealFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LifetimeDealPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LifetimeDealFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LifetimeDealPayload>;
                };
                findMany: {
                    args: Prisma.LifetimeDealFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LifetimeDealPayload>[];
                };
                create: {
                    args: Prisma.LifetimeDealCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LifetimeDealPayload>;
                };
                createMany: {
                    args: Prisma.LifetimeDealCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LifetimeDealCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LifetimeDealPayload>[];
                };
                delete: {
                    args: Prisma.LifetimeDealDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LifetimeDealPayload>;
                };
                update: {
                    args: Prisma.LifetimeDealUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LifetimeDealPayload>;
                };
                deleteMany: {
                    args: Prisma.LifetimeDealDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LifetimeDealUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LifetimeDealUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LifetimeDealPayload>[];
                };
                upsert: {
                    args: Prisma.LifetimeDealUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LifetimeDealPayload>;
                };
                aggregate: {
                    args: Prisma.LifetimeDealAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLifetimeDeal>;
                };
                groupBy: {
                    args: Prisma.LifetimeDealGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LifetimeDealGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LifetimeDealCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LifetimeDealCountAggregateOutputType> | number;
                };
            };
        };
        KiteToken: {
            payload: Prisma.$KiteTokenPayload<ExtArgs>;
            fields: Prisma.KiteTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.KiteTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KiteTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.KiteTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KiteTokenPayload>;
                };
                findFirst: {
                    args: Prisma.KiteTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KiteTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.KiteTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KiteTokenPayload>;
                };
                findMany: {
                    args: Prisma.KiteTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KiteTokenPayload>[];
                };
                create: {
                    args: Prisma.KiteTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KiteTokenPayload>;
                };
                createMany: {
                    args: Prisma.KiteTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.KiteTokenCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KiteTokenPayload>[];
                };
                delete: {
                    args: Prisma.KiteTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KiteTokenPayload>;
                };
                update: {
                    args: Prisma.KiteTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KiteTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.KiteTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.KiteTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.KiteTokenUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KiteTokenPayload>[];
                };
                upsert: {
                    args: Prisma.KiteTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KiteTokenPayload>;
                };
                aggregate: {
                    args: Prisma.KiteTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateKiteToken>;
                };
                groupBy: {
                    args: Prisma.KiteTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.KiteTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.KiteTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.KiteTokenCountAggregateOutputType> | number;
                };
            };
        };
        KiteInstrument: {
            payload: Prisma.$KiteInstrumentPayload<ExtArgs>;
            fields: Prisma.KiteInstrumentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.KiteInstrumentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KiteInstrumentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.KiteInstrumentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KiteInstrumentPayload>;
                };
                findFirst: {
                    args: Prisma.KiteInstrumentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KiteInstrumentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.KiteInstrumentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KiteInstrumentPayload>;
                };
                findMany: {
                    args: Prisma.KiteInstrumentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KiteInstrumentPayload>[];
                };
                create: {
                    args: Prisma.KiteInstrumentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KiteInstrumentPayload>;
                };
                createMany: {
                    args: Prisma.KiteInstrumentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.KiteInstrumentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KiteInstrumentPayload>[];
                };
                delete: {
                    args: Prisma.KiteInstrumentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KiteInstrumentPayload>;
                };
                update: {
                    args: Prisma.KiteInstrumentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KiteInstrumentPayload>;
                };
                deleteMany: {
                    args: Prisma.KiteInstrumentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.KiteInstrumentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.KiteInstrumentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KiteInstrumentPayload>[];
                };
                upsert: {
                    args: Prisma.KiteInstrumentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KiteInstrumentPayload>;
                };
                aggregate: {
                    args: Prisma.KiteInstrumentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateKiteInstrument>;
                };
                groupBy: {
                    args: Prisma.KiteInstrumentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.KiteInstrumentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.KiteInstrumentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.KiteInstrumentCountAggregateOutputType> | number;
                };
            };
        };
        DailyBar: {
            payload: Prisma.$DailyBarPayload<ExtArgs>;
            fields: Prisma.DailyBarFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DailyBarFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyBarPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DailyBarFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyBarPayload>;
                };
                findFirst: {
                    args: Prisma.DailyBarFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyBarPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DailyBarFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyBarPayload>;
                };
                findMany: {
                    args: Prisma.DailyBarFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyBarPayload>[];
                };
                create: {
                    args: Prisma.DailyBarCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyBarPayload>;
                };
                createMany: {
                    args: Prisma.DailyBarCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DailyBarCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyBarPayload>[];
                };
                delete: {
                    args: Prisma.DailyBarDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyBarPayload>;
                };
                update: {
                    args: Prisma.DailyBarUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyBarPayload>;
                };
                deleteMany: {
                    args: Prisma.DailyBarDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DailyBarUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DailyBarUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyBarPayload>[];
                };
                upsert: {
                    args: Prisma.DailyBarUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyBarPayload>;
                };
                aggregate: {
                    args: Prisma.DailyBarAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDailyBar>;
                };
                groupBy: {
                    args: Prisma.DailyBarGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DailyBarGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DailyBarCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DailyBarCountAggregateOutputType> | number;
                };
            };
        };
        Indicator: {
            payload: Prisma.$IndicatorPayload<ExtArgs>;
            fields: Prisma.IndicatorFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.IndicatorFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IndicatorPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.IndicatorFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IndicatorPayload>;
                };
                findFirst: {
                    args: Prisma.IndicatorFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IndicatorPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.IndicatorFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IndicatorPayload>;
                };
                findMany: {
                    args: Prisma.IndicatorFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IndicatorPayload>[];
                };
                create: {
                    args: Prisma.IndicatorCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IndicatorPayload>;
                };
                createMany: {
                    args: Prisma.IndicatorCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.IndicatorCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IndicatorPayload>[];
                };
                delete: {
                    args: Prisma.IndicatorDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IndicatorPayload>;
                };
                update: {
                    args: Prisma.IndicatorUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IndicatorPayload>;
                };
                deleteMany: {
                    args: Prisma.IndicatorDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.IndicatorUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.IndicatorUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IndicatorPayload>[];
                };
                upsert: {
                    args: Prisma.IndicatorUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IndicatorPayload>;
                };
                aggregate: {
                    args: Prisma.IndicatorAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateIndicator>;
                };
                groupBy: {
                    args: Prisma.IndicatorGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IndicatorGroupByOutputType>[];
                };
                count: {
                    args: Prisma.IndicatorCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IndicatorCountAggregateOutputType> | number;
                };
            };
        };
        Signal: {
            payload: Prisma.$SignalPayload<ExtArgs>;
            fields: Prisma.SignalFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SignalFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SignalPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SignalFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SignalPayload>;
                };
                findFirst: {
                    args: Prisma.SignalFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SignalPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SignalFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SignalPayload>;
                };
                findMany: {
                    args: Prisma.SignalFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SignalPayload>[];
                };
                create: {
                    args: Prisma.SignalCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SignalPayload>;
                };
                createMany: {
                    args: Prisma.SignalCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SignalCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SignalPayload>[];
                };
                delete: {
                    args: Prisma.SignalDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SignalPayload>;
                };
                update: {
                    args: Prisma.SignalUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SignalPayload>;
                };
                deleteMany: {
                    args: Prisma.SignalDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SignalUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SignalUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SignalPayload>[];
                };
                upsert: {
                    args: Prisma.SignalUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SignalPayload>;
                };
                aggregate: {
                    args: Prisma.SignalAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSignal>;
                };
                groupBy: {
                    args: Prisma.SignalGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SignalGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SignalCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SignalCountAggregateOutputType> | number;
                };
            };
        };
        MarketHealth: {
            payload: Prisma.$MarketHealthPayload<ExtArgs>;
            fields: Prisma.MarketHealthFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MarketHealthFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketHealthPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MarketHealthFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketHealthPayload>;
                };
                findFirst: {
                    args: Prisma.MarketHealthFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketHealthPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MarketHealthFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketHealthPayload>;
                };
                findMany: {
                    args: Prisma.MarketHealthFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketHealthPayload>[];
                };
                create: {
                    args: Prisma.MarketHealthCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketHealthPayload>;
                };
                createMany: {
                    args: Prisma.MarketHealthCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MarketHealthCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketHealthPayload>[];
                };
                delete: {
                    args: Prisma.MarketHealthDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketHealthPayload>;
                };
                update: {
                    args: Prisma.MarketHealthUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketHealthPayload>;
                };
                deleteMany: {
                    args: Prisma.MarketHealthDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MarketHealthUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MarketHealthUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketHealthPayload>[];
                };
                upsert: {
                    args: Prisma.MarketHealthUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketHealthPayload>;
                };
                aggregate: {
                    args: Prisma.MarketHealthAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMarketHealth>;
                };
                groupBy: {
                    args: Prisma.MarketHealthGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MarketHealthGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MarketHealthCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MarketHealthCountAggregateOutputType> | number;
                };
            };
        };
        UniverseMember: {
            payload: Prisma.$UniverseMemberPayload<ExtArgs>;
            fields: Prisma.UniverseMemberFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UniverseMemberFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UniverseMemberPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UniverseMemberFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UniverseMemberPayload>;
                };
                findFirst: {
                    args: Prisma.UniverseMemberFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UniverseMemberPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UniverseMemberFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UniverseMemberPayload>;
                };
                findMany: {
                    args: Prisma.UniverseMemberFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UniverseMemberPayload>[];
                };
                create: {
                    args: Prisma.UniverseMemberCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UniverseMemberPayload>;
                };
                createMany: {
                    args: Prisma.UniverseMemberCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UniverseMemberCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UniverseMemberPayload>[];
                };
                delete: {
                    args: Prisma.UniverseMemberDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UniverseMemberPayload>;
                };
                update: {
                    args: Prisma.UniverseMemberUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UniverseMemberPayload>;
                };
                deleteMany: {
                    args: Prisma.UniverseMemberDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UniverseMemberUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UniverseMemberUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UniverseMemberPayload>[];
                };
                upsert: {
                    args: Prisma.UniverseMemberUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UniverseMemberPayload>;
                };
                aggregate: {
                    args: Prisma.UniverseMemberAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUniverseMember>;
                };
                groupBy: {
                    args: Prisma.UniverseMemberGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UniverseMemberGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UniverseMemberCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UniverseMemberCountAggregateOutputType> | number;
                };
            };
        };
        WatchlistItem: {
            payload: Prisma.$WatchlistItemPayload<ExtArgs>;
            fields: Prisma.WatchlistItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WatchlistItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WatchlistItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WatchlistItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WatchlistItemPayload>;
                };
                findFirst: {
                    args: Prisma.WatchlistItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WatchlistItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WatchlistItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WatchlistItemPayload>;
                };
                findMany: {
                    args: Prisma.WatchlistItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WatchlistItemPayload>[];
                };
                create: {
                    args: Prisma.WatchlistItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WatchlistItemPayload>;
                };
                createMany: {
                    args: Prisma.WatchlistItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WatchlistItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WatchlistItemPayload>[];
                };
                delete: {
                    args: Prisma.WatchlistItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WatchlistItemPayload>;
                };
                update: {
                    args: Prisma.WatchlistItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WatchlistItemPayload>;
                };
                deleteMany: {
                    args: Prisma.WatchlistItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WatchlistItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WatchlistItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WatchlistItemPayload>[];
                };
                upsert: {
                    args: Prisma.WatchlistItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WatchlistItemPayload>;
                };
                aggregate: {
                    args: Prisma.WatchlistItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWatchlistItem>;
                };
                groupBy: {
                    args: Prisma.WatchlistItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WatchlistItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WatchlistItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WatchlistItemCountAggregateOutputType> | number;
                };
            };
        };
        JournalTrade: {
            payload: Prisma.$JournalTradePayload<ExtArgs>;
            fields: Prisma.JournalTradeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.JournalTradeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalTradePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.JournalTradeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalTradePayload>;
                };
                findFirst: {
                    args: Prisma.JournalTradeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalTradePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.JournalTradeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalTradePayload>;
                };
                findMany: {
                    args: Prisma.JournalTradeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalTradePayload>[];
                };
                create: {
                    args: Prisma.JournalTradeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalTradePayload>;
                };
                createMany: {
                    args: Prisma.JournalTradeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.JournalTradeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalTradePayload>[];
                };
                delete: {
                    args: Prisma.JournalTradeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalTradePayload>;
                };
                update: {
                    args: Prisma.JournalTradeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalTradePayload>;
                };
                deleteMany: {
                    args: Prisma.JournalTradeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.JournalTradeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.JournalTradeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalTradePayload>[];
                };
                upsert: {
                    args: Prisma.JournalTradeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalTradePayload>;
                };
                aggregate: {
                    args: Prisma.JournalTradeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateJournalTrade>;
                };
                groupBy: {
                    args: Prisma.JournalTradeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JournalTradeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.JournalTradeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JournalTradeCountAggregateOutputType> | number;
                };
            };
        };
        Backtest: {
            payload: Prisma.$BacktestPayload<ExtArgs>;
            fields: Prisma.BacktestFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BacktestFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BacktestPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BacktestFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BacktestPayload>;
                };
                findFirst: {
                    args: Prisma.BacktestFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BacktestPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BacktestFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BacktestPayload>;
                };
                findMany: {
                    args: Prisma.BacktestFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BacktestPayload>[];
                };
                create: {
                    args: Prisma.BacktestCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BacktestPayload>;
                };
                createMany: {
                    args: Prisma.BacktestCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BacktestCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BacktestPayload>[];
                };
                delete: {
                    args: Prisma.BacktestDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BacktestPayload>;
                };
                update: {
                    args: Prisma.BacktestUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BacktestPayload>;
                };
                deleteMany: {
                    args: Prisma.BacktestDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BacktestUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BacktestUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BacktestPayload>[];
                };
                upsert: {
                    args: Prisma.BacktestUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BacktestPayload>;
                };
                aggregate: {
                    args: Prisma.BacktestAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBacktest>;
                };
                groupBy: {
                    args: Prisma.BacktestGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BacktestGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BacktestCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BacktestCountAggregateOutputType> | number;
                };
            };
        };
        BacktestTrade: {
            payload: Prisma.$BacktestTradePayload<ExtArgs>;
            fields: Prisma.BacktestTradeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BacktestTradeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BacktestTradePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BacktestTradeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BacktestTradePayload>;
                };
                findFirst: {
                    args: Prisma.BacktestTradeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BacktestTradePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BacktestTradeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BacktestTradePayload>;
                };
                findMany: {
                    args: Prisma.BacktestTradeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BacktestTradePayload>[];
                };
                create: {
                    args: Prisma.BacktestTradeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BacktestTradePayload>;
                };
                createMany: {
                    args: Prisma.BacktestTradeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BacktestTradeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BacktestTradePayload>[];
                };
                delete: {
                    args: Prisma.BacktestTradeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BacktestTradePayload>;
                };
                update: {
                    args: Prisma.BacktestTradeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BacktestTradePayload>;
                };
                deleteMany: {
                    args: Prisma.BacktestTradeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BacktestTradeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BacktestTradeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BacktestTradePayload>[];
                };
                upsert: {
                    args: Prisma.BacktestTradeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BacktestTradePayload>;
                };
                aggregate: {
                    args: Prisma.BacktestTradeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBacktestTrade>;
                };
                groupBy: {
                    args: Prisma.BacktestTradeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BacktestTradeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BacktestTradeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BacktestTradeCountAggregateOutputType> | number;
                };
            };
        };
        AlertPreference: {
            payload: Prisma.$AlertPreferencePayload<ExtArgs>;
            fields: Prisma.AlertPreferenceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AlertPreferenceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AlertPreferencePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AlertPreferenceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AlertPreferencePayload>;
                };
                findFirst: {
                    args: Prisma.AlertPreferenceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AlertPreferencePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AlertPreferenceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AlertPreferencePayload>;
                };
                findMany: {
                    args: Prisma.AlertPreferenceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AlertPreferencePayload>[];
                };
                create: {
                    args: Prisma.AlertPreferenceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AlertPreferencePayload>;
                };
                createMany: {
                    args: Prisma.AlertPreferenceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AlertPreferenceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AlertPreferencePayload>[];
                };
                delete: {
                    args: Prisma.AlertPreferenceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AlertPreferencePayload>;
                };
                update: {
                    args: Prisma.AlertPreferenceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AlertPreferencePayload>;
                };
                deleteMany: {
                    args: Prisma.AlertPreferenceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AlertPreferenceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AlertPreferenceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AlertPreferencePayload>[];
                };
                upsert: {
                    args: Prisma.AlertPreferenceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AlertPreferencePayload>;
                };
                aggregate: {
                    args: Prisma.AlertPreferenceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAlertPreference>;
                };
                groupBy: {
                    args: Prisma.AlertPreferenceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AlertPreferenceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AlertPreferenceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AlertPreferenceCountAggregateOutputType> | number;
                };
            };
        };
        AlertHistory: {
            payload: Prisma.$AlertHistoryPayload<ExtArgs>;
            fields: Prisma.AlertHistoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AlertHistoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AlertHistoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AlertHistoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AlertHistoryPayload>;
                };
                findFirst: {
                    args: Prisma.AlertHistoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AlertHistoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AlertHistoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AlertHistoryPayload>;
                };
                findMany: {
                    args: Prisma.AlertHistoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AlertHistoryPayload>[];
                };
                create: {
                    args: Prisma.AlertHistoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AlertHistoryPayload>;
                };
                createMany: {
                    args: Prisma.AlertHistoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AlertHistoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AlertHistoryPayload>[];
                };
                delete: {
                    args: Prisma.AlertHistoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AlertHistoryPayload>;
                };
                update: {
                    args: Prisma.AlertHistoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AlertHistoryPayload>;
                };
                deleteMany: {
                    args: Prisma.AlertHistoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AlertHistoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AlertHistoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AlertHistoryPayload>[];
                };
                upsert: {
                    args: Prisma.AlertHistoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AlertHistoryPayload>;
                };
                aggregate: {
                    args: Prisma.AlertHistoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAlertHistory>;
                };
                groupBy: {
                    args: Prisma.AlertHistoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AlertHistoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AlertHistoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AlertHistoryCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
/**
 * Enums
 */
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
    readonly JsonNull: runtime.JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
/**
 * Field references
 */
/**
 * Reference to a field of type 'String'
 */
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
/**
 * Reference to a field of type 'String[]'
 */
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
/**
 * Reference to a field of type 'Tier'
 */
export type EnumTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Tier'>;
/**
 * Reference to a field of type 'Tier[]'
 */
export type ListEnumTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Tier[]'>;
/**
 * Reference to a field of type 'Json'
 */
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
/**
 * Reference to a field of type 'QueryMode'
 */
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
/**
 * Reference to a field of type 'DateTime'
 */
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
/**
 * Reference to a field of type 'DateTime[]'
 */
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
/**
 * Reference to a field of type 'Int'
 */
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
/**
 * Reference to a field of type 'Int[]'
 */
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
/**
 * Reference to a field of type 'Boolean'
 */
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
/**
 * Reference to a field of type 'Decimal'
 */
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
/**
 * Reference to a field of type 'Decimal[]'
 */
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
/**
 * Reference to a field of type 'BigInt'
 */
export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>;
/**
 * Reference to a field of type 'BigInt[]'
 */
export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>;
/**
 * Reference to a field of type 'Heat'
 */
export type EnumHeatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Heat'>;
/**
 * Reference to a field of type 'Heat[]'
 */
export type ListEnumHeatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Heat[]'>;
/**
 * Reference to a field of type 'TradeSide'
 */
export type EnumTradeSideFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TradeSide'>;
/**
 * Reference to a field of type 'TradeSide[]'
 */
export type ListEnumTradeSideFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TradeSide[]'>;
/**
 * Reference to a field of type 'TradeStatus'
 */
export type EnumTradeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TradeStatus'>;
/**
 * Reference to a field of type 'TradeStatus[]'
 */
export type ListEnumTradeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TradeStatus[]'>;
/**
 * Reference to a field of type 'Float'
 */
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
/**
 * Reference to a field of type 'Float[]'
 */
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
/**
 * Batch Payload for updateMany & deleteMany & createMany
 */
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-pg`.
     */
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl: string;
    adapter?: never;
}) & {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
};
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    account?: Prisma.AccountOmit;
    session?: Prisma.SessionOmit;
    verificationToken?: Prisma.VerificationTokenOmit;
    subscription?: Prisma.SubscriptionOmit;
    lifetimeDeal?: Prisma.LifetimeDealOmit;
    kiteToken?: Prisma.KiteTokenOmit;
    kiteInstrument?: Prisma.KiteInstrumentOmit;
    dailyBar?: Prisma.DailyBarOmit;
    indicator?: Prisma.IndicatorOmit;
    signal?: Prisma.SignalOmit;
    marketHealth?: Prisma.MarketHealthOmit;
    universeMember?: Prisma.UniverseMemberOmit;
    watchlistItem?: Prisma.WatchlistItemOmit;
    journalTrade?: Prisma.JournalTradeOmit;
    backtest?: Prisma.BacktestOmit;
    backtestTrade?: Prisma.BacktestTradeOmit;
    alertPreference?: Prisma.AlertPreferenceOmit;
    alertHistory?: Prisma.AlertHistoryOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
/**
 * `PrismaClient` proxy available in interactive transactions.
 */
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
//# sourceMappingURL=prismaNamespace.d.ts.map
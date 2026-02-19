import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model DailyBar
 *
 */
export type DailyBarModel = runtime.Types.Result.DefaultSelection<Prisma.$DailyBarPayload>;
export type AggregateDailyBar = {
    _count: DailyBarCountAggregateOutputType | null;
    _avg: DailyBarAvgAggregateOutputType | null;
    _sum: DailyBarSumAggregateOutputType | null;
    _min: DailyBarMinAggregateOutputType | null;
    _max: DailyBarMaxAggregateOutputType | null;
};
export type DailyBarAvgAggregateOutputType = {
    id: number | null;
    open: runtime.Decimal | null;
    high: runtime.Decimal | null;
    low: runtime.Decimal | null;
    close: runtime.Decimal | null;
    volume: number | null;
    adjFactor: runtime.Decimal | null;
    sma200: runtime.Decimal | null;
    ema200: runtime.Decimal | null;
};
export type DailyBarSumAggregateOutputType = {
    id: number | null;
    open: runtime.Decimal | null;
    high: runtime.Decimal | null;
    low: runtime.Decimal | null;
    close: runtime.Decimal | null;
    volume: bigint | null;
    adjFactor: runtime.Decimal | null;
    sma200: runtime.Decimal | null;
    ema200: runtime.Decimal | null;
};
export type DailyBarMinAggregateOutputType = {
    id: number | null;
    symbol: string | null;
    exchange: string | null;
    date: Date | null;
    open: runtime.Decimal | null;
    high: runtime.Decimal | null;
    low: runtime.Decimal | null;
    close: runtime.Decimal | null;
    volume: bigint | null;
    adjFactor: runtime.Decimal | null;
    sma200: runtime.Decimal | null;
    ema200: runtime.Decimal | null;
    source: string | null;
    createdAt: Date | null;
};
export type DailyBarMaxAggregateOutputType = {
    id: number | null;
    symbol: string | null;
    exchange: string | null;
    date: Date | null;
    open: runtime.Decimal | null;
    high: runtime.Decimal | null;
    low: runtime.Decimal | null;
    close: runtime.Decimal | null;
    volume: bigint | null;
    adjFactor: runtime.Decimal | null;
    sma200: runtime.Decimal | null;
    ema200: runtime.Decimal | null;
    source: string | null;
    createdAt: Date | null;
};
export type DailyBarCountAggregateOutputType = {
    id: number;
    symbol: number;
    exchange: number;
    date: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    adjFactor: number;
    sma200: number;
    ema200: number;
    source: number;
    createdAt: number;
    _all: number;
};
export type DailyBarAvgAggregateInputType = {
    id?: true;
    open?: true;
    high?: true;
    low?: true;
    close?: true;
    volume?: true;
    adjFactor?: true;
    sma200?: true;
    ema200?: true;
};
export type DailyBarSumAggregateInputType = {
    id?: true;
    open?: true;
    high?: true;
    low?: true;
    close?: true;
    volume?: true;
    adjFactor?: true;
    sma200?: true;
    ema200?: true;
};
export type DailyBarMinAggregateInputType = {
    id?: true;
    symbol?: true;
    exchange?: true;
    date?: true;
    open?: true;
    high?: true;
    low?: true;
    close?: true;
    volume?: true;
    adjFactor?: true;
    sma200?: true;
    ema200?: true;
    source?: true;
    createdAt?: true;
};
export type DailyBarMaxAggregateInputType = {
    id?: true;
    symbol?: true;
    exchange?: true;
    date?: true;
    open?: true;
    high?: true;
    low?: true;
    close?: true;
    volume?: true;
    adjFactor?: true;
    sma200?: true;
    ema200?: true;
    source?: true;
    createdAt?: true;
};
export type DailyBarCountAggregateInputType = {
    id?: true;
    symbol?: true;
    exchange?: true;
    date?: true;
    open?: true;
    high?: true;
    low?: true;
    close?: true;
    volume?: true;
    adjFactor?: true;
    sma200?: true;
    ema200?: true;
    source?: true;
    createdAt?: true;
    _all?: true;
};
export type DailyBarAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DailyBar to aggregate.
     */
    where?: Prisma.DailyBarWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DailyBars to fetch.
     */
    orderBy?: Prisma.DailyBarOrderByWithRelationInput | Prisma.DailyBarOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.DailyBarWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DailyBars from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DailyBars.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned DailyBars
    **/
    _count?: true | DailyBarCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: DailyBarAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: DailyBarSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DailyBarMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DailyBarMaxAggregateInputType;
};
export type GetDailyBarAggregateType<T extends DailyBarAggregateArgs> = {
    [P in keyof T & keyof AggregateDailyBar]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDailyBar[P]> : Prisma.GetScalarType<T[P], AggregateDailyBar[P]>;
};
export type DailyBarGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DailyBarWhereInput;
    orderBy?: Prisma.DailyBarOrderByWithAggregationInput | Prisma.DailyBarOrderByWithAggregationInput[];
    by: Prisma.DailyBarScalarFieldEnum[] | Prisma.DailyBarScalarFieldEnum;
    having?: Prisma.DailyBarScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DailyBarCountAggregateInputType | true;
    _avg?: DailyBarAvgAggregateInputType;
    _sum?: DailyBarSumAggregateInputType;
    _min?: DailyBarMinAggregateInputType;
    _max?: DailyBarMaxAggregateInputType;
};
export type DailyBarGroupByOutputType = {
    id: number;
    symbol: string;
    exchange: string;
    date: Date;
    open: runtime.Decimal;
    high: runtime.Decimal;
    low: runtime.Decimal;
    close: runtime.Decimal;
    volume: bigint;
    adjFactor: runtime.Decimal;
    sma200: runtime.Decimal | null;
    ema200: runtime.Decimal | null;
    source: string;
    createdAt: Date;
    _count: DailyBarCountAggregateOutputType | null;
    _avg: DailyBarAvgAggregateOutputType | null;
    _sum: DailyBarSumAggregateOutputType | null;
    _min: DailyBarMinAggregateOutputType | null;
    _max: DailyBarMaxAggregateOutputType | null;
};
type GetDailyBarGroupByPayload<T extends DailyBarGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DailyBarGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DailyBarGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DailyBarGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DailyBarGroupByOutputType[P]>;
}>>;
export type DailyBarWhereInput = {
    AND?: Prisma.DailyBarWhereInput | Prisma.DailyBarWhereInput[];
    OR?: Prisma.DailyBarWhereInput[];
    NOT?: Prisma.DailyBarWhereInput | Prisma.DailyBarWhereInput[];
    id?: Prisma.IntFilter<"DailyBar"> | number;
    symbol?: Prisma.StringFilter<"DailyBar"> | string;
    exchange?: Prisma.StringFilter<"DailyBar"> | string;
    date?: Prisma.DateTimeFilter<"DailyBar"> | Date | string;
    open?: Prisma.DecimalFilter<"DailyBar"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    high?: Prisma.DecimalFilter<"DailyBar"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    low?: Prisma.DecimalFilter<"DailyBar"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    close?: Prisma.DecimalFilter<"DailyBar"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    volume?: Prisma.BigIntFilter<"DailyBar"> | bigint | number;
    adjFactor?: Prisma.DecimalFilter<"DailyBar"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sma200?: Prisma.DecimalNullableFilter<"DailyBar"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    ema200?: Prisma.DecimalNullableFilter<"DailyBar"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: Prisma.StringFilter<"DailyBar"> | string;
    createdAt?: Prisma.DateTimeFilter<"DailyBar"> | Date | string;
};
export type DailyBarOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
    volume?: Prisma.SortOrder;
    adjFactor?: Prisma.SortOrder;
    sma200?: Prisma.SortOrderInput | Prisma.SortOrder;
    ema200?: Prisma.SortOrderInput | Prisma.SortOrder;
    source?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DailyBarWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    symbol_exchange_date?: Prisma.DailyBarSymbolExchangeDateCompoundUniqueInput;
    AND?: Prisma.DailyBarWhereInput | Prisma.DailyBarWhereInput[];
    OR?: Prisma.DailyBarWhereInput[];
    NOT?: Prisma.DailyBarWhereInput | Prisma.DailyBarWhereInput[];
    symbol?: Prisma.StringFilter<"DailyBar"> | string;
    exchange?: Prisma.StringFilter<"DailyBar"> | string;
    date?: Prisma.DateTimeFilter<"DailyBar"> | Date | string;
    open?: Prisma.DecimalFilter<"DailyBar"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    high?: Prisma.DecimalFilter<"DailyBar"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    low?: Prisma.DecimalFilter<"DailyBar"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    close?: Prisma.DecimalFilter<"DailyBar"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    volume?: Prisma.BigIntFilter<"DailyBar"> | bigint | number;
    adjFactor?: Prisma.DecimalFilter<"DailyBar"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sma200?: Prisma.DecimalNullableFilter<"DailyBar"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    ema200?: Prisma.DecimalNullableFilter<"DailyBar"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: Prisma.StringFilter<"DailyBar"> | string;
    createdAt?: Prisma.DateTimeFilter<"DailyBar"> | Date | string;
}, "id" | "symbol_exchange_date">;
export type DailyBarOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
    volume?: Prisma.SortOrder;
    adjFactor?: Prisma.SortOrder;
    sma200?: Prisma.SortOrderInput | Prisma.SortOrder;
    ema200?: Prisma.SortOrderInput | Prisma.SortOrder;
    source?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.DailyBarCountOrderByAggregateInput;
    _avg?: Prisma.DailyBarAvgOrderByAggregateInput;
    _max?: Prisma.DailyBarMaxOrderByAggregateInput;
    _min?: Prisma.DailyBarMinOrderByAggregateInput;
    _sum?: Prisma.DailyBarSumOrderByAggregateInput;
};
export type DailyBarScalarWhereWithAggregatesInput = {
    AND?: Prisma.DailyBarScalarWhereWithAggregatesInput | Prisma.DailyBarScalarWhereWithAggregatesInput[];
    OR?: Prisma.DailyBarScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DailyBarScalarWhereWithAggregatesInput | Prisma.DailyBarScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"DailyBar"> | number;
    symbol?: Prisma.StringWithAggregatesFilter<"DailyBar"> | string;
    exchange?: Prisma.StringWithAggregatesFilter<"DailyBar"> | string;
    date?: Prisma.DateTimeWithAggregatesFilter<"DailyBar"> | Date | string;
    open?: Prisma.DecimalWithAggregatesFilter<"DailyBar"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    high?: Prisma.DecimalWithAggregatesFilter<"DailyBar"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    low?: Prisma.DecimalWithAggregatesFilter<"DailyBar"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    close?: Prisma.DecimalWithAggregatesFilter<"DailyBar"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    volume?: Prisma.BigIntWithAggregatesFilter<"DailyBar"> | bigint | number;
    adjFactor?: Prisma.DecimalWithAggregatesFilter<"DailyBar"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sma200?: Prisma.DecimalNullableWithAggregatesFilter<"DailyBar"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    ema200?: Prisma.DecimalNullableWithAggregatesFilter<"DailyBar"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: Prisma.StringWithAggregatesFilter<"DailyBar"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DailyBar"> | Date | string;
};
export type DailyBarCreateInput = {
    symbol: string;
    exchange: string;
    date: Date | string;
    open: runtime.Decimal | runtime.DecimalJsLike | number | string;
    high: runtime.Decimal | runtime.DecimalJsLike | number | string;
    low: runtime.Decimal | runtime.DecimalJsLike | number | string;
    close: runtime.Decimal | runtime.DecimalJsLike | number | string;
    volume?: bigint | number;
    adjFactor?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sma200?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    ema200?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: string;
    createdAt?: Date | string;
};
export type DailyBarUncheckedCreateInput = {
    id?: number;
    symbol: string;
    exchange: string;
    date: Date | string;
    open: runtime.Decimal | runtime.DecimalJsLike | number | string;
    high: runtime.Decimal | runtime.DecimalJsLike | number | string;
    low: runtime.Decimal | runtime.DecimalJsLike | number | string;
    close: runtime.Decimal | runtime.DecimalJsLike | number | string;
    volume?: bigint | number;
    adjFactor?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sma200?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    ema200?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: string;
    createdAt?: Date | string;
};
export type DailyBarUpdateInput = {
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    open?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    high?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    low?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    close?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    volume?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    adjFactor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sma200?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    ema200?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DailyBarUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    open?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    high?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    low?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    close?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    volume?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    adjFactor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sma200?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    ema200?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DailyBarCreateManyInput = {
    id?: number;
    symbol: string;
    exchange: string;
    date: Date | string;
    open: runtime.Decimal | runtime.DecimalJsLike | number | string;
    high: runtime.Decimal | runtime.DecimalJsLike | number | string;
    low: runtime.Decimal | runtime.DecimalJsLike | number | string;
    close: runtime.Decimal | runtime.DecimalJsLike | number | string;
    volume?: bigint | number;
    adjFactor?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sma200?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    ema200?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: string;
    createdAt?: Date | string;
};
export type DailyBarUpdateManyMutationInput = {
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    open?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    high?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    low?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    close?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    volume?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    adjFactor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sma200?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    ema200?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DailyBarUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    open?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    high?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    low?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    close?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    volume?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    adjFactor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sma200?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    ema200?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DailyBarSymbolExchangeDateCompoundUniqueInput = {
    symbol: string;
    exchange: string;
    date: Date | string;
};
export type DailyBarCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
    volume?: Prisma.SortOrder;
    adjFactor?: Prisma.SortOrder;
    sma200?: Prisma.SortOrder;
    ema200?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DailyBarAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
    volume?: Prisma.SortOrder;
    adjFactor?: Prisma.SortOrder;
    sma200?: Prisma.SortOrder;
    ema200?: Prisma.SortOrder;
};
export type DailyBarMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
    volume?: Prisma.SortOrder;
    adjFactor?: Prisma.SortOrder;
    sma200?: Prisma.SortOrder;
    ema200?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DailyBarMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
    volume?: Prisma.SortOrder;
    adjFactor?: Prisma.SortOrder;
    sma200?: Prisma.SortOrder;
    ema200?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DailyBarSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
    volume?: Prisma.SortOrder;
    adjFactor?: Prisma.SortOrder;
    sma200?: Prisma.SortOrder;
    ema200?: Prisma.SortOrder;
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number;
    increment?: bigint | number;
    decrement?: bigint | number;
    multiply?: bigint | number;
    divide?: bigint | number;
};
export type NullableDecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type DailyBarSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    symbol?: boolean;
    exchange?: boolean;
    date?: boolean;
    open?: boolean;
    high?: boolean;
    low?: boolean;
    close?: boolean;
    volume?: boolean;
    adjFactor?: boolean;
    sma200?: boolean;
    ema200?: boolean;
    source?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["dailyBar"]>;
export type DailyBarSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    symbol?: boolean;
    exchange?: boolean;
    date?: boolean;
    open?: boolean;
    high?: boolean;
    low?: boolean;
    close?: boolean;
    volume?: boolean;
    adjFactor?: boolean;
    sma200?: boolean;
    ema200?: boolean;
    source?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["dailyBar"]>;
export type DailyBarSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    symbol?: boolean;
    exchange?: boolean;
    date?: boolean;
    open?: boolean;
    high?: boolean;
    low?: boolean;
    close?: boolean;
    volume?: boolean;
    adjFactor?: boolean;
    sma200?: boolean;
    ema200?: boolean;
    source?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["dailyBar"]>;
export type DailyBarSelectScalar = {
    id?: boolean;
    symbol?: boolean;
    exchange?: boolean;
    date?: boolean;
    open?: boolean;
    high?: boolean;
    low?: boolean;
    close?: boolean;
    volume?: boolean;
    adjFactor?: boolean;
    sma200?: boolean;
    ema200?: boolean;
    source?: boolean;
    createdAt?: boolean;
};
export type DailyBarOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "symbol" | "exchange" | "date" | "open" | "high" | "low" | "close" | "volume" | "adjFactor" | "sma200" | "ema200" | "source" | "createdAt", ExtArgs["result"]["dailyBar"]>;
export type $DailyBarPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DailyBar";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        symbol: string;
        exchange: string;
        date: Date;
        open: runtime.Decimal;
        high: runtime.Decimal;
        low: runtime.Decimal;
        close: runtime.Decimal;
        volume: bigint;
        adjFactor: runtime.Decimal;
        sma200: runtime.Decimal | null;
        ema200: runtime.Decimal | null;
        source: string;
        createdAt: Date;
    }, ExtArgs["result"]["dailyBar"]>;
    composites: {};
};
export type DailyBarGetPayload<S extends boolean | null | undefined | DailyBarDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DailyBarPayload, S>;
export type DailyBarCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DailyBarFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DailyBarCountAggregateInputType | true;
};
export interface DailyBarDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DailyBar'];
        meta: {
            name: 'DailyBar';
        };
    };
    /**
     * Find zero or one DailyBar that matches the filter.
     * @param {DailyBarFindUniqueArgs} args - Arguments to find a DailyBar
     * @example
     * // Get one DailyBar
     * const dailyBar = await prisma.dailyBar.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyBarFindUniqueArgs>(args: Prisma.SelectSubset<T, DailyBarFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DailyBarClient<runtime.Types.Result.GetResult<Prisma.$DailyBarPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one DailyBar that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DailyBarFindUniqueOrThrowArgs} args - Arguments to find a DailyBar
     * @example
     * // Get one DailyBar
     * const dailyBar = await prisma.dailyBar.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyBarFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DailyBarFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DailyBarClient<runtime.Types.Result.GetResult<Prisma.$DailyBarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DailyBar that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyBarFindFirstArgs} args - Arguments to find a DailyBar
     * @example
     * // Get one DailyBar
     * const dailyBar = await prisma.dailyBar.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyBarFindFirstArgs>(args?: Prisma.SelectSubset<T, DailyBarFindFirstArgs<ExtArgs>>): Prisma.Prisma__DailyBarClient<runtime.Types.Result.GetResult<Prisma.$DailyBarPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DailyBar that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyBarFindFirstOrThrowArgs} args - Arguments to find a DailyBar
     * @example
     * // Get one DailyBar
     * const dailyBar = await prisma.dailyBar.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyBarFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DailyBarFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DailyBarClient<runtime.Types.Result.GetResult<Prisma.$DailyBarPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more DailyBars that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyBarFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyBars
     * const dailyBars = await prisma.dailyBar.findMany()
     *
     * // Get first 10 DailyBars
     * const dailyBars = await prisma.dailyBar.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const dailyBarWithIdOnly = await prisma.dailyBar.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DailyBarFindManyArgs>(args?: Prisma.SelectSubset<T, DailyBarFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DailyBarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a DailyBar.
     * @param {DailyBarCreateArgs} args - Arguments to create a DailyBar.
     * @example
     * // Create one DailyBar
     * const DailyBar = await prisma.dailyBar.create({
     *   data: {
     *     // ... data to create a DailyBar
     *   }
     * })
     *
     */
    create<T extends DailyBarCreateArgs>(args: Prisma.SelectSubset<T, DailyBarCreateArgs<ExtArgs>>): Prisma.Prisma__DailyBarClient<runtime.Types.Result.GetResult<Prisma.$DailyBarPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many DailyBars.
     * @param {DailyBarCreateManyArgs} args - Arguments to create many DailyBars.
     * @example
     * // Create many DailyBars
     * const dailyBar = await prisma.dailyBar.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DailyBarCreateManyArgs>(args?: Prisma.SelectSubset<T, DailyBarCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many DailyBars and returns the data saved in the database.
     * @param {DailyBarCreateManyAndReturnArgs} args - Arguments to create many DailyBars.
     * @example
     * // Create many DailyBars
     * const dailyBar = await prisma.dailyBar.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many DailyBars and only return the `id`
     * const dailyBarWithIdOnly = await prisma.dailyBar.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DailyBarCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DailyBarCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DailyBarPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a DailyBar.
     * @param {DailyBarDeleteArgs} args - Arguments to delete one DailyBar.
     * @example
     * // Delete one DailyBar
     * const DailyBar = await prisma.dailyBar.delete({
     *   where: {
     *     // ... filter to delete one DailyBar
     *   }
     * })
     *
     */
    delete<T extends DailyBarDeleteArgs>(args: Prisma.SelectSubset<T, DailyBarDeleteArgs<ExtArgs>>): Prisma.Prisma__DailyBarClient<runtime.Types.Result.GetResult<Prisma.$DailyBarPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one DailyBar.
     * @param {DailyBarUpdateArgs} args - Arguments to update one DailyBar.
     * @example
     * // Update one DailyBar
     * const dailyBar = await prisma.dailyBar.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DailyBarUpdateArgs>(args: Prisma.SelectSubset<T, DailyBarUpdateArgs<ExtArgs>>): Prisma.Prisma__DailyBarClient<runtime.Types.Result.GetResult<Prisma.$DailyBarPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more DailyBars.
     * @param {DailyBarDeleteManyArgs} args - Arguments to filter DailyBars to delete.
     * @example
     * // Delete a few DailyBars
     * const { count } = await prisma.dailyBar.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DailyBarDeleteManyArgs>(args?: Prisma.SelectSubset<T, DailyBarDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DailyBars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyBarUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyBars
     * const dailyBar = await prisma.dailyBar.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DailyBarUpdateManyArgs>(args: Prisma.SelectSubset<T, DailyBarUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DailyBars and returns the data updated in the database.
     * @param {DailyBarUpdateManyAndReturnArgs} args - Arguments to update many DailyBars.
     * @example
     * // Update many DailyBars
     * const dailyBar = await prisma.dailyBar.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more DailyBars and only return the `id`
     * const dailyBarWithIdOnly = await prisma.dailyBar.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends DailyBarUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DailyBarUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DailyBarPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one DailyBar.
     * @param {DailyBarUpsertArgs} args - Arguments to update or create a DailyBar.
     * @example
     * // Update or create a DailyBar
     * const dailyBar = await prisma.dailyBar.upsert({
     *   create: {
     *     // ... data to create a DailyBar
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyBar we want to update
     *   }
     * })
     */
    upsert<T extends DailyBarUpsertArgs>(args: Prisma.SelectSubset<T, DailyBarUpsertArgs<ExtArgs>>): Prisma.Prisma__DailyBarClient<runtime.Types.Result.GetResult<Prisma.$DailyBarPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of DailyBars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyBarCountArgs} args - Arguments to filter DailyBars to count.
     * @example
     * // Count the number of DailyBars
     * const count = await prisma.dailyBar.count({
     *   where: {
     *     // ... the filter for the DailyBars we want to count
     *   }
     * })
    **/
    count<T extends DailyBarCountArgs>(args?: Prisma.Subset<T, DailyBarCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DailyBarCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a DailyBar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyBarAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DailyBarAggregateArgs>(args: Prisma.Subset<T, DailyBarAggregateArgs>): Prisma.PrismaPromise<GetDailyBarAggregateType<T>>;
    /**
     * Group by DailyBar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyBarGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends DailyBarGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DailyBarGroupByArgs['orderBy'];
    } : {
        orderBy?: DailyBarGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DailyBarGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyBarGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the DailyBar model
     */
    readonly fields: DailyBarFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for DailyBar.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__DailyBarClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the DailyBar model
 */
export interface DailyBarFieldRefs {
    readonly id: Prisma.FieldRef<"DailyBar", 'Int'>;
    readonly symbol: Prisma.FieldRef<"DailyBar", 'String'>;
    readonly exchange: Prisma.FieldRef<"DailyBar", 'String'>;
    readonly date: Prisma.FieldRef<"DailyBar", 'DateTime'>;
    readonly open: Prisma.FieldRef<"DailyBar", 'Decimal'>;
    readonly high: Prisma.FieldRef<"DailyBar", 'Decimal'>;
    readonly low: Prisma.FieldRef<"DailyBar", 'Decimal'>;
    readonly close: Prisma.FieldRef<"DailyBar", 'Decimal'>;
    readonly volume: Prisma.FieldRef<"DailyBar", 'BigInt'>;
    readonly adjFactor: Prisma.FieldRef<"DailyBar", 'Decimal'>;
    readonly sma200: Prisma.FieldRef<"DailyBar", 'Decimal'>;
    readonly ema200: Prisma.FieldRef<"DailyBar", 'Decimal'>;
    readonly source: Prisma.FieldRef<"DailyBar", 'String'>;
    readonly createdAt: Prisma.FieldRef<"DailyBar", 'DateTime'>;
}
/**
 * DailyBar findUnique
 */
export type DailyBarFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyBar
     */
    select?: Prisma.DailyBarSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyBar
     */
    omit?: Prisma.DailyBarOmit<ExtArgs> | null;
    /**
     * Filter, which DailyBar to fetch.
     */
    where: Prisma.DailyBarWhereUniqueInput;
};
/**
 * DailyBar findUniqueOrThrow
 */
export type DailyBarFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyBar
     */
    select?: Prisma.DailyBarSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyBar
     */
    omit?: Prisma.DailyBarOmit<ExtArgs> | null;
    /**
     * Filter, which DailyBar to fetch.
     */
    where: Prisma.DailyBarWhereUniqueInput;
};
/**
 * DailyBar findFirst
 */
export type DailyBarFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyBar
     */
    select?: Prisma.DailyBarSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyBar
     */
    omit?: Prisma.DailyBarOmit<ExtArgs> | null;
    /**
     * Filter, which DailyBar to fetch.
     */
    where?: Prisma.DailyBarWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DailyBars to fetch.
     */
    orderBy?: Prisma.DailyBarOrderByWithRelationInput | Prisma.DailyBarOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DailyBars.
     */
    cursor?: Prisma.DailyBarWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DailyBars from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DailyBars.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DailyBars.
     */
    distinct?: Prisma.DailyBarScalarFieldEnum | Prisma.DailyBarScalarFieldEnum[];
};
/**
 * DailyBar findFirstOrThrow
 */
export type DailyBarFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyBar
     */
    select?: Prisma.DailyBarSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyBar
     */
    omit?: Prisma.DailyBarOmit<ExtArgs> | null;
    /**
     * Filter, which DailyBar to fetch.
     */
    where?: Prisma.DailyBarWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DailyBars to fetch.
     */
    orderBy?: Prisma.DailyBarOrderByWithRelationInput | Prisma.DailyBarOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DailyBars.
     */
    cursor?: Prisma.DailyBarWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DailyBars from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DailyBars.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DailyBars.
     */
    distinct?: Prisma.DailyBarScalarFieldEnum | Prisma.DailyBarScalarFieldEnum[];
};
/**
 * DailyBar findMany
 */
export type DailyBarFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyBar
     */
    select?: Prisma.DailyBarSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyBar
     */
    omit?: Prisma.DailyBarOmit<ExtArgs> | null;
    /**
     * Filter, which DailyBars to fetch.
     */
    where?: Prisma.DailyBarWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DailyBars to fetch.
     */
    orderBy?: Prisma.DailyBarOrderByWithRelationInput | Prisma.DailyBarOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing DailyBars.
     */
    cursor?: Prisma.DailyBarWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DailyBars from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DailyBars.
     */
    skip?: number;
    distinct?: Prisma.DailyBarScalarFieldEnum | Prisma.DailyBarScalarFieldEnum[];
};
/**
 * DailyBar create
 */
export type DailyBarCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyBar
     */
    select?: Prisma.DailyBarSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyBar
     */
    omit?: Prisma.DailyBarOmit<ExtArgs> | null;
    /**
     * The data needed to create a DailyBar.
     */
    data: Prisma.XOR<Prisma.DailyBarCreateInput, Prisma.DailyBarUncheckedCreateInput>;
};
/**
 * DailyBar createMany
 */
export type DailyBarCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyBars.
     */
    data: Prisma.DailyBarCreateManyInput | Prisma.DailyBarCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * DailyBar createManyAndReturn
 */
export type DailyBarCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyBar
     */
    select?: Prisma.DailyBarSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyBar
     */
    omit?: Prisma.DailyBarOmit<ExtArgs> | null;
    /**
     * The data used to create many DailyBars.
     */
    data: Prisma.DailyBarCreateManyInput | Prisma.DailyBarCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * DailyBar update
 */
export type DailyBarUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyBar
     */
    select?: Prisma.DailyBarSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyBar
     */
    omit?: Prisma.DailyBarOmit<ExtArgs> | null;
    /**
     * The data needed to update a DailyBar.
     */
    data: Prisma.XOR<Prisma.DailyBarUpdateInput, Prisma.DailyBarUncheckedUpdateInput>;
    /**
     * Choose, which DailyBar to update.
     */
    where: Prisma.DailyBarWhereUniqueInput;
};
/**
 * DailyBar updateMany
 */
export type DailyBarUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyBars.
     */
    data: Prisma.XOR<Prisma.DailyBarUpdateManyMutationInput, Prisma.DailyBarUncheckedUpdateManyInput>;
    /**
     * Filter which DailyBars to update
     */
    where?: Prisma.DailyBarWhereInput;
    /**
     * Limit how many DailyBars to update.
     */
    limit?: number;
};
/**
 * DailyBar updateManyAndReturn
 */
export type DailyBarUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyBar
     */
    select?: Prisma.DailyBarSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyBar
     */
    omit?: Prisma.DailyBarOmit<ExtArgs> | null;
    /**
     * The data used to update DailyBars.
     */
    data: Prisma.XOR<Prisma.DailyBarUpdateManyMutationInput, Prisma.DailyBarUncheckedUpdateManyInput>;
    /**
     * Filter which DailyBars to update
     */
    where?: Prisma.DailyBarWhereInput;
    /**
     * Limit how many DailyBars to update.
     */
    limit?: number;
};
/**
 * DailyBar upsert
 */
export type DailyBarUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyBar
     */
    select?: Prisma.DailyBarSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyBar
     */
    omit?: Prisma.DailyBarOmit<ExtArgs> | null;
    /**
     * The filter to search for the DailyBar to update in case it exists.
     */
    where: Prisma.DailyBarWhereUniqueInput;
    /**
     * In case the DailyBar found by the `where` argument doesn't exist, create a new DailyBar with this data.
     */
    create: Prisma.XOR<Prisma.DailyBarCreateInput, Prisma.DailyBarUncheckedCreateInput>;
    /**
     * In case the DailyBar was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.DailyBarUpdateInput, Prisma.DailyBarUncheckedUpdateInput>;
};
/**
 * DailyBar delete
 */
export type DailyBarDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyBar
     */
    select?: Prisma.DailyBarSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyBar
     */
    omit?: Prisma.DailyBarOmit<ExtArgs> | null;
    /**
     * Filter which DailyBar to delete.
     */
    where: Prisma.DailyBarWhereUniqueInput;
};
/**
 * DailyBar deleteMany
 */
export type DailyBarDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DailyBars to delete
     */
    where?: Prisma.DailyBarWhereInput;
    /**
     * Limit how many DailyBars to delete.
     */
    limit?: number;
};
/**
 * DailyBar without action
 */
export type DailyBarDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyBar
     */
    select?: Prisma.DailyBarSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DailyBar
     */
    omit?: Prisma.DailyBarOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=DailyBar.d.ts.map
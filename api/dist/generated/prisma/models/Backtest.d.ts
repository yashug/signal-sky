import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Backtest
 *
 */
export type BacktestModel = runtime.Types.Result.DefaultSelection<Prisma.$BacktestPayload>;
export type AggregateBacktest = {
    _count: BacktestCountAggregateOutputType | null;
    _avg: BacktestAvgAggregateOutputType | null;
    _sum: BacktestSumAggregateOutputType | null;
    _min: BacktestMinAggregateOutputType | null;
    _max: BacktestMaxAggregateOutputType | null;
};
export type BacktestAvgAggregateOutputType = {
    totalTrades: number | null;
    winRate: runtime.Decimal | null;
    avgReturn: runtime.Decimal | null;
    maxDrawdown: runtime.Decimal | null;
    profitFactor: runtime.Decimal | null;
    sharpeRatio: runtime.Decimal | null;
};
export type BacktestSumAggregateOutputType = {
    totalTrades: number | null;
    winRate: runtime.Decimal | null;
    avgReturn: runtime.Decimal | null;
    maxDrawdown: runtime.Decimal | null;
    profitFactor: runtime.Decimal | null;
    sharpeRatio: runtime.Decimal | null;
};
export type BacktestMinAggregateOutputType = {
    id: string | null;
    symbol: string | null;
    exchange: string | null;
    strategyName: string | null;
    parametersHash: string | null;
    fromDate: Date | null;
    toDate: Date | null;
    totalTrades: number | null;
    winRate: runtime.Decimal | null;
    avgReturn: runtime.Decimal | null;
    maxDrawdown: runtime.Decimal | null;
    profitFactor: runtime.Decimal | null;
    sharpeRatio: runtime.Decimal | null;
    signalId: string | null;
    computedAt: Date | null;
};
export type BacktestMaxAggregateOutputType = {
    id: string | null;
    symbol: string | null;
    exchange: string | null;
    strategyName: string | null;
    parametersHash: string | null;
    fromDate: Date | null;
    toDate: Date | null;
    totalTrades: number | null;
    winRate: runtime.Decimal | null;
    avgReturn: runtime.Decimal | null;
    maxDrawdown: runtime.Decimal | null;
    profitFactor: runtime.Decimal | null;
    sharpeRatio: runtime.Decimal | null;
    signalId: string | null;
    computedAt: Date | null;
};
export type BacktestCountAggregateOutputType = {
    id: number;
    symbol: number;
    exchange: number;
    strategyName: number;
    parametersHash: number;
    fromDate: number;
    toDate: number;
    totalTrades: number;
    winRate: number;
    avgReturn: number;
    maxDrawdown: number;
    profitFactor: number;
    sharpeRatio: number;
    trades: number;
    summary: number;
    signalId: number;
    computedAt: number;
    _all: number;
};
export type BacktestAvgAggregateInputType = {
    totalTrades?: true;
    winRate?: true;
    avgReturn?: true;
    maxDrawdown?: true;
    profitFactor?: true;
    sharpeRatio?: true;
};
export type BacktestSumAggregateInputType = {
    totalTrades?: true;
    winRate?: true;
    avgReturn?: true;
    maxDrawdown?: true;
    profitFactor?: true;
    sharpeRatio?: true;
};
export type BacktestMinAggregateInputType = {
    id?: true;
    symbol?: true;
    exchange?: true;
    strategyName?: true;
    parametersHash?: true;
    fromDate?: true;
    toDate?: true;
    totalTrades?: true;
    winRate?: true;
    avgReturn?: true;
    maxDrawdown?: true;
    profitFactor?: true;
    sharpeRatio?: true;
    signalId?: true;
    computedAt?: true;
};
export type BacktestMaxAggregateInputType = {
    id?: true;
    symbol?: true;
    exchange?: true;
    strategyName?: true;
    parametersHash?: true;
    fromDate?: true;
    toDate?: true;
    totalTrades?: true;
    winRate?: true;
    avgReturn?: true;
    maxDrawdown?: true;
    profitFactor?: true;
    sharpeRatio?: true;
    signalId?: true;
    computedAt?: true;
};
export type BacktestCountAggregateInputType = {
    id?: true;
    symbol?: true;
    exchange?: true;
    strategyName?: true;
    parametersHash?: true;
    fromDate?: true;
    toDate?: true;
    totalTrades?: true;
    winRate?: true;
    avgReturn?: true;
    maxDrawdown?: true;
    profitFactor?: true;
    sharpeRatio?: true;
    trades?: true;
    summary?: true;
    signalId?: true;
    computedAt?: true;
    _all?: true;
};
export type BacktestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Backtest to aggregate.
     */
    where?: Prisma.BacktestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Backtests to fetch.
     */
    orderBy?: Prisma.BacktestOrderByWithRelationInput | Prisma.BacktestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.BacktestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Backtests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Backtests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Backtests
    **/
    _count?: true | BacktestCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: BacktestAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: BacktestSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: BacktestMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: BacktestMaxAggregateInputType;
};
export type GetBacktestAggregateType<T extends BacktestAggregateArgs> = {
    [P in keyof T & keyof AggregateBacktest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBacktest[P]> : Prisma.GetScalarType<T[P], AggregateBacktest[P]>;
};
export type BacktestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BacktestWhereInput;
    orderBy?: Prisma.BacktestOrderByWithAggregationInput | Prisma.BacktestOrderByWithAggregationInput[];
    by: Prisma.BacktestScalarFieldEnum[] | Prisma.BacktestScalarFieldEnum;
    having?: Prisma.BacktestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BacktestCountAggregateInputType | true;
    _avg?: BacktestAvgAggregateInputType;
    _sum?: BacktestSumAggregateInputType;
    _min?: BacktestMinAggregateInputType;
    _max?: BacktestMaxAggregateInputType;
};
export type BacktestGroupByOutputType = {
    id: string;
    symbol: string;
    exchange: string;
    strategyName: string;
    parametersHash: string;
    fromDate: Date;
    toDate: Date;
    totalTrades: number;
    winRate: runtime.Decimal;
    avgReturn: runtime.Decimal;
    maxDrawdown: runtime.Decimal;
    profitFactor: runtime.Decimal;
    sharpeRatio: runtime.Decimal | null;
    trades: runtime.JsonValue;
    summary: runtime.JsonValue;
    signalId: string | null;
    computedAt: Date;
    _count: BacktestCountAggregateOutputType | null;
    _avg: BacktestAvgAggregateOutputType | null;
    _sum: BacktestSumAggregateOutputType | null;
    _min: BacktestMinAggregateOutputType | null;
    _max: BacktestMaxAggregateOutputType | null;
};
type GetBacktestGroupByPayload<T extends BacktestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BacktestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BacktestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BacktestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BacktestGroupByOutputType[P]>;
}>>;
export type BacktestWhereInput = {
    AND?: Prisma.BacktestWhereInput | Prisma.BacktestWhereInput[];
    OR?: Prisma.BacktestWhereInput[];
    NOT?: Prisma.BacktestWhereInput | Prisma.BacktestWhereInput[];
    id?: Prisma.StringFilter<"Backtest"> | string;
    symbol?: Prisma.StringFilter<"Backtest"> | string;
    exchange?: Prisma.StringFilter<"Backtest"> | string;
    strategyName?: Prisma.StringFilter<"Backtest"> | string;
    parametersHash?: Prisma.StringFilter<"Backtest"> | string;
    fromDate?: Prisma.DateTimeFilter<"Backtest"> | Date | string;
    toDate?: Prisma.DateTimeFilter<"Backtest"> | Date | string;
    totalTrades?: Prisma.IntFilter<"Backtest"> | number;
    winRate?: Prisma.DecimalFilter<"Backtest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgReturn?: Prisma.DecimalFilter<"Backtest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDrawdown?: Prisma.DecimalFilter<"Backtest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    profitFactor?: Prisma.DecimalFilter<"Backtest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sharpeRatio?: Prisma.DecimalNullableFilter<"Backtest"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trades?: Prisma.JsonFilter<"Backtest">;
    summary?: Prisma.JsonFilter<"Backtest">;
    signalId?: Prisma.StringNullableFilter<"Backtest"> | string | null;
    computedAt?: Prisma.DateTimeFilter<"Backtest"> | Date | string;
    signal?: Prisma.XOR<Prisma.SignalNullableScalarRelationFilter, Prisma.SignalWhereInput> | null;
    backtestTrades?: Prisma.BacktestTradeListRelationFilter;
};
export type BacktestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    strategyName?: Prisma.SortOrder;
    parametersHash?: Prisma.SortOrder;
    fromDate?: Prisma.SortOrder;
    toDate?: Prisma.SortOrder;
    totalTrades?: Prisma.SortOrder;
    winRate?: Prisma.SortOrder;
    avgReturn?: Prisma.SortOrder;
    maxDrawdown?: Prisma.SortOrder;
    profitFactor?: Prisma.SortOrder;
    sharpeRatio?: Prisma.SortOrderInput | Prisma.SortOrder;
    trades?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    signalId?: Prisma.SortOrderInput | Prisma.SortOrder;
    computedAt?: Prisma.SortOrder;
    signal?: Prisma.SignalOrderByWithRelationInput;
    backtestTrades?: Prisma.BacktestTradeOrderByRelationAggregateInput;
};
export type BacktestWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.BacktestWhereInput | Prisma.BacktestWhereInput[];
    OR?: Prisma.BacktestWhereInput[];
    NOT?: Prisma.BacktestWhereInput | Prisma.BacktestWhereInput[];
    symbol?: Prisma.StringFilter<"Backtest"> | string;
    exchange?: Prisma.StringFilter<"Backtest"> | string;
    strategyName?: Prisma.StringFilter<"Backtest"> | string;
    parametersHash?: Prisma.StringFilter<"Backtest"> | string;
    fromDate?: Prisma.DateTimeFilter<"Backtest"> | Date | string;
    toDate?: Prisma.DateTimeFilter<"Backtest"> | Date | string;
    totalTrades?: Prisma.IntFilter<"Backtest"> | number;
    winRate?: Prisma.DecimalFilter<"Backtest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgReturn?: Prisma.DecimalFilter<"Backtest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDrawdown?: Prisma.DecimalFilter<"Backtest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    profitFactor?: Prisma.DecimalFilter<"Backtest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sharpeRatio?: Prisma.DecimalNullableFilter<"Backtest"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trades?: Prisma.JsonFilter<"Backtest">;
    summary?: Prisma.JsonFilter<"Backtest">;
    signalId?: Prisma.StringNullableFilter<"Backtest"> | string | null;
    computedAt?: Prisma.DateTimeFilter<"Backtest"> | Date | string;
    signal?: Prisma.XOR<Prisma.SignalNullableScalarRelationFilter, Prisma.SignalWhereInput> | null;
    backtestTrades?: Prisma.BacktestTradeListRelationFilter;
}, "id">;
export type BacktestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    strategyName?: Prisma.SortOrder;
    parametersHash?: Prisma.SortOrder;
    fromDate?: Prisma.SortOrder;
    toDate?: Prisma.SortOrder;
    totalTrades?: Prisma.SortOrder;
    winRate?: Prisma.SortOrder;
    avgReturn?: Prisma.SortOrder;
    maxDrawdown?: Prisma.SortOrder;
    profitFactor?: Prisma.SortOrder;
    sharpeRatio?: Prisma.SortOrderInput | Prisma.SortOrder;
    trades?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    signalId?: Prisma.SortOrderInput | Prisma.SortOrder;
    computedAt?: Prisma.SortOrder;
    _count?: Prisma.BacktestCountOrderByAggregateInput;
    _avg?: Prisma.BacktestAvgOrderByAggregateInput;
    _max?: Prisma.BacktestMaxOrderByAggregateInput;
    _min?: Prisma.BacktestMinOrderByAggregateInput;
    _sum?: Prisma.BacktestSumOrderByAggregateInput;
};
export type BacktestScalarWhereWithAggregatesInput = {
    AND?: Prisma.BacktestScalarWhereWithAggregatesInput | Prisma.BacktestScalarWhereWithAggregatesInput[];
    OR?: Prisma.BacktestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BacktestScalarWhereWithAggregatesInput | Prisma.BacktestScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Backtest"> | string;
    symbol?: Prisma.StringWithAggregatesFilter<"Backtest"> | string;
    exchange?: Prisma.StringWithAggregatesFilter<"Backtest"> | string;
    strategyName?: Prisma.StringWithAggregatesFilter<"Backtest"> | string;
    parametersHash?: Prisma.StringWithAggregatesFilter<"Backtest"> | string;
    fromDate?: Prisma.DateTimeWithAggregatesFilter<"Backtest"> | Date | string;
    toDate?: Prisma.DateTimeWithAggregatesFilter<"Backtest"> | Date | string;
    totalTrades?: Prisma.IntWithAggregatesFilter<"Backtest"> | number;
    winRate?: Prisma.DecimalWithAggregatesFilter<"Backtest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgReturn?: Prisma.DecimalWithAggregatesFilter<"Backtest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDrawdown?: Prisma.DecimalWithAggregatesFilter<"Backtest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    profitFactor?: Prisma.DecimalWithAggregatesFilter<"Backtest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sharpeRatio?: Prisma.DecimalNullableWithAggregatesFilter<"Backtest"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trades?: Prisma.JsonWithAggregatesFilter<"Backtest">;
    summary?: Prisma.JsonWithAggregatesFilter<"Backtest">;
    signalId?: Prisma.StringNullableWithAggregatesFilter<"Backtest"> | string | null;
    computedAt?: Prisma.DateTimeWithAggregatesFilter<"Backtest"> | Date | string;
};
export type BacktestCreateInput = {
    id?: string;
    symbol: string;
    exchange: string;
    strategyName: string;
    parametersHash: string;
    fromDate: Date | string;
    toDate: Date | string;
    totalTrades: number;
    winRate: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgReturn: runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDrawdown: runtime.Decimal | runtime.DecimalJsLike | number | string;
    profitFactor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sharpeRatio?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trades?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    computedAt?: Date | string;
    signal?: Prisma.SignalCreateNestedOneWithoutBacktestsInput;
    backtestTrades?: Prisma.BacktestTradeCreateNestedManyWithoutBacktestInput;
};
export type BacktestUncheckedCreateInput = {
    id?: string;
    symbol: string;
    exchange: string;
    strategyName: string;
    parametersHash: string;
    fromDate: Date | string;
    toDate: Date | string;
    totalTrades: number;
    winRate: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgReturn: runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDrawdown: runtime.Decimal | runtime.DecimalJsLike | number | string;
    profitFactor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sharpeRatio?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trades?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    signalId?: string | null;
    computedAt?: Date | string;
    backtestTrades?: Prisma.BacktestTradeUncheckedCreateNestedManyWithoutBacktestInput;
};
export type BacktestUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    strategyName?: Prisma.StringFieldUpdateOperationsInput | string;
    parametersHash?: Prisma.StringFieldUpdateOperationsInput | string;
    fromDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    toDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    totalTrades?: Prisma.IntFieldUpdateOperationsInput | number;
    winRate?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgReturn?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDrawdown?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    profitFactor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sharpeRatio?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trades?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    signal?: Prisma.SignalUpdateOneWithoutBacktestsNestedInput;
    backtestTrades?: Prisma.BacktestTradeUpdateManyWithoutBacktestNestedInput;
};
export type BacktestUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    strategyName?: Prisma.StringFieldUpdateOperationsInput | string;
    parametersHash?: Prisma.StringFieldUpdateOperationsInput | string;
    fromDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    toDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    totalTrades?: Prisma.IntFieldUpdateOperationsInput | number;
    winRate?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgReturn?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDrawdown?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    profitFactor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sharpeRatio?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trades?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    signalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    backtestTrades?: Prisma.BacktestTradeUncheckedUpdateManyWithoutBacktestNestedInput;
};
export type BacktestCreateManyInput = {
    id?: string;
    symbol: string;
    exchange: string;
    strategyName: string;
    parametersHash: string;
    fromDate: Date | string;
    toDate: Date | string;
    totalTrades: number;
    winRate: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgReturn: runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDrawdown: runtime.Decimal | runtime.DecimalJsLike | number | string;
    profitFactor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sharpeRatio?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trades?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    signalId?: string | null;
    computedAt?: Date | string;
};
export type BacktestUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    strategyName?: Prisma.StringFieldUpdateOperationsInput | string;
    parametersHash?: Prisma.StringFieldUpdateOperationsInput | string;
    fromDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    toDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    totalTrades?: Prisma.IntFieldUpdateOperationsInput | number;
    winRate?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgReturn?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDrawdown?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    profitFactor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sharpeRatio?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trades?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BacktestUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    strategyName?: Prisma.StringFieldUpdateOperationsInput | string;
    parametersHash?: Prisma.StringFieldUpdateOperationsInput | string;
    fromDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    toDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    totalTrades?: Prisma.IntFieldUpdateOperationsInput | number;
    winRate?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgReturn?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDrawdown?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    profitFactor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sharpeRatio?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trades?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    signalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BacktestListRelationFilter = {
    every?: Prisma.BacktestWhereInput;
    some?: Prisma.BacktestWhereInput;
    none?: Prisma.BacktestWhereInput;
};
export type BacktestOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BacktestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    strategyName?: Prisma.SortOrder;
    parametersHash?: Prisma.SortOrder;
    fromDate?: Prisma.SortOrder;
    toDate?: Prisma.SortOrder;
    totalTrades?: Prisma.SortOrder;
    winRate?: Prisma.SortOrder;
    avgReturn?: Prisma.SortOrder;
    maxDrawdown?: Prisma.SortOrder;
    profitFactor?: Prisma.SortOrder;
    sharpeRatio?: Prisma.SortOrder;
    trades?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    signalId?: Prisma.SortOrder;
    computedAt?: Prisma.SortOrder;
};
export type BacktestAvgOrderByAggregateInput = {
    totalTrades?: Prisma.SortOrder;
    winRate?: Prisma.SortOrder;
    avgReturn?: Prisma.SortOrder;
    maxDrawdown?: Prisma.SortOrder;
    profitFactor?: Prisma.SortOrder;
    sharpeRatio?: Prisma.SortOrder;
};
export type BacktestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    strategyName?: Prisma.SortOrder;
    parametersHash?: Prisma.SortOrder;
    fromDate?: Prisma.SortOrder;
    toDate?: Prisma.SortOrder;
    totalTrades?: Prisma.SortOrder;
    winRate?: Prisma.SortOrder;
    avgReturn?: Prisma.SortOrder;
    maxDrawdown?: Prisma.SortOrder;
    profitFactor?: Prisma.SortOrder;
    sharpeRatio?: Prisma.SortOrder;
    signalId?: Prisma.SortOrder;
    computedAt?: Prisma.SortOrder;
};
export type BacktestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    strategyName?: Prisma.SortOrder;
    parametersHash?: Prisma.SortOrder;
    fromDate?: Prisma.SortOrder;
    toDate?: Prisma.SortOrder;
    totalTrades?: Prisma.SortOrder;
    winRate?: Prisma.SortOrder;
    avgReturn?: Prisma.SortOrder;
    maxDrawdown?: Prisma.SortOrder;
    profitFactor?: Prisma.SortOrder;
    sharpeRatio?: Prisma.SortOrder;
    signalId?: Prisma.SortOrder;
    computedAt?: Prisma.SortOrder;
};
export type BacktestSumOrderByAggregateInput = {
    totalTrades?: Prisma.SortOrder;
    winRate?: Prisma.SortOrder;
    avgReturn?: Prisma.SortOrder;
    maxDrawdown?: Prisma.SortOrder;
    profitFactor?: Prisma.SortOrder;
    sharpeRatio?: Prisma.SortOrder;
};
export type BacktestScalarRelationFilter = {
    is?: Prisma.BacktestWhereInput;
    isNot?: Prisma.BacktestWhereInput;
};
export type BacktestCreateNestedManyWithoutSignalInput = {
    create?: Prisma.XOR<Prisma.BacktestCreateWithoutSignalInput, Prisma.BacktestUncheckedCreateWithoutSignalInput> | Prisma.BacktestCreateWithoutSignalInput[] | Prisma.BacktestUncheckedCreateWithoutSignalInput[];
    connectOrCreate?: Prisma.BacktestCreateOrConnectWithoutSignalInput | Prisma.BacktestCreateOrConnectWithoutSignalInput[];
    createMany?: Prisma.BacktestCreateManySignalInputEnvelope;
    connect?: Prisma.BacktestWhereUniqueInput | Prisma.BacktestWhereUniqueInput[];
};
export type BacktestUncheckedCreateNestedManyWithoutSignalInput = {
    create?: Prisma.XOR<Prisma.BacktestCreateWithoutSignalInput, Prisma.BacktestUncheckedCreateWithoutSignalInput> | Prisma.BacktestCreateWithoutSignalInput[] | Prisma.BacktestUncheckedCreateWithoutSignalInput[];
    connectOrCreate?: Prisma.BacktestCreateOrConnectWithoutSignalInput | Prisma.BacktestCreateOrConnectWithoutSignalInput[];
    createMany?: Prisma.BacktestCreateManySignalInputEnvelope;
    connect?: Prisma.BacktestWhereUniqueInput | Prisma.BacktestWhereUniqueInput[];
};
export type BacktestUpdateManyWithoutSignalNestedInput = {
    create?: Prisma.XOR<Prisma.BacktestCreateWithoutSignalInput, Prisma.BacktestUncheckedCreateWithoutSignalInput> | Prisma.BacktestCreateWithoutSignalInput[] | Prisma.BacktestUncheckedCreateWithoutSignalInput[];
    connectOrCreate?: Prisma.BacktestCreateOrConnectWithoutSignalInput | Prisma.BacktestCreateOrConnectWithoutSignalInput[];
    upsert?: Prisma.BacktestUpsertWithWhereUniqueWithoutSignalInput | Prisma.BacktestUpsertWithWhereUniqueWithoutSignalInput[];
    createMany?: Prisma.BacktestCreateManySignalInputEnvelope;
    set?: Prisma.BacktestWhereUniqueInput | Prisma.BacktestWhereUniqueInput[];
    disconnect?: Prisma.BacktestWhereUniqueInput | Prisma.BacktestWhereUniqueInput[];
    delete?: Prisma.BacktestWhereUniqueInput | Prisma.BacktestWhereUniqueInput[];
    connect?: Prisma.BacktestWhereUniqueInput | Prisma.BacktestWhereUniqueInput[];
    update?: Prisma.BacktestUpdateWithWhereUniqueWithoutSignalInput | Prisma.BacktestUpdateWithWhereUniqueWithoutSignalInput[];
    updateMany?: Prisma.BacktestUpdateManyWithWhereWithoutSignalInput | Prisma.BacktestUpdateManyWithWhereWithoutSignalInput[];
    deleteMany?: Prisma.BacktestScalarWhereInput | Prisma.BacktestScalarWhereInput[];
};
export type BacktestUncheckedUpdateManyWithoutSignalNestedInput = {
    create?: Prisma.XOR<Prisma.BacktestCreateWithoutSignalInput, Prisma.BacktestUncheckedCreateWithoutSignalInput> | Prisma.BacktestCreateWithoutSignalInput[] | Prisma.BacktestUncheckedCreateWithoutSignalInput[];
    connectOrCreate?: Prisma.BacktestCreateOrConnectWithoutSignalInput | Prisma.BacktestCreateOrConnectWithoutSignalInput[];
    upsert?: Prisma.BacktestUpsertWithWhereUniqueWithoutSignalInput | Prisma.BacktestUpsertWithWhereUniqueWithoutSignalInput[];
    createMany?: Prisma.BacktestCreateManySignalInputEnvelope;
    set?: Prisma.BacktestWhereUniqueInput | Prisma.BacktestWhereUniqueInput[];
    disconnect?: Prisma.BacktestWhereUniqueInput | Prisma.BacktestWhereUniqueInput[];
    delete?: Prisma.BacktestWhereUniqueInput | Prisma.BacktestWhereUniqueInput[];
    connect?: Prisma.BacktestWhereUniqueInput | Prisma.BacktestWhereUniqueInput[];
    update?: Prisma.BacktestUpdateWithWhereUniqueWithoutSignalInput | Prisma.BacktestUpdateWithWhereUniqueWithoutSignalInput[];
    updateMany?: Prisma.BacktestUpdateManyWithWhereWithoutSignalInput | Prisma.BacktestUpdateManyWithWhereWithoutSignalInput[];
    deleteMany?: Prisma.BacktestScalarWhereInput | Prisma.BacktestScalarWhereInput[];
};
export type BacktestCreateNestedOneWithoutBacktestTradesInput = {
    create?: Prisma.XOR<Prisma.BacktestCreateWithoutBacktestTradesInput, Prisma.BacktestUncheckedCreateWithoutBacktestTradesInput>;
    connectOrCreate?: Prisma.BacktestCreateOrConnectWithoutBacktestTradesInput;
    connect?: Prisma.BacktestWhereUniqueInput;
};
export type BacktestUpdateOneRequiredWithoutBacktestTradesNestedInput = {
    create?: Prisma.XOR<Prisma.BacktestCreateWithoutBacktestTradesInput, Prisma.BacktestUncheckedCreateWithoutBacktestTradesInput>;
    connectOrCreate?: Prisma.BacktestCreateOrConnectWithoutBacktestTradesInput;
    upsert?: Prisma.BacktestUpsertWithoutBacktestTradesInput;
    connect?: Prisma.BacktestWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BacktestUpdateToOneWithWhereWithoutBacktestTradesInput, Prisma.BacktestUpdateWithoutBacktestTradesInput>, Prisma.BacktestUncheckedUpdateWithoutBacktestTradesInput>;
};
export type BacktestCreateWithoutSignalInput = {
    id?: string;
    symbol: string;
    exchange: string;
    strategyName: string;
    parametersHash: string;
    fromDate: Date | string;
    toDate: Date | string;
    totalTrades: number;
    winRate: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgReturn: runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDrawdown: runtime.Decimal | runtime.DecimalJsLike | number | string;
    profitFactor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sharpeRatio?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trades?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    computedAt?: Date | string;
    backtestTrades?: Prisma.BacktestTradeCreateNestedManyWithoutBacktestInput;
};
export type BacktestUncheckedCreateWithoutSignalInput = {
    id?: string;
    symbol: string;
    exchange: string;
    strategyName: string;
    parametersHash: string;
    fromDate: Date | string;
    toDate: Date | string;
    totalTrades: number;
    winRate: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgReturn: runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDrawdown: runtime.Decimal | runtime.DecimalJsLike | number | string;
    profitFactor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sharpeRatio?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trades?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    computedAt?: Date | string;
    backtestTrades?: Prisma.BacktestTradeUncheckedCreateNestedManyWithoutBacktestInput;
};
export type BacktestCreateOrConnectWithoutSignalInput = {
    where: Prisma.BacktestWhereUniqueInput;
    create: Prisma.XOR<Prisma.BacktestCreateWithoutSignalInput, Prisma.BacktestUncheckedCreateWithoutSignalInput>;
};
export type BacktestCreateManySignalInputEnvelope = {
    data: Prisma.BacktestCreateManySignalInput | Prisma.BacktestCreateManySignalInput[];
    skipDuplicates?: boolean;
};
export type BacktestUpsertWithWhereUniqueWithoutSignalInput = {
    where: Prisma.BacktestWhereUniqueInput;
    update: Prisma.XOR<Prisma.BacktestUpdateWithoutSignalInput, Prisma.BacktestUncheckedUpdateWithoutSignalInput>;
    create: Prisma.XOR<Prisma.BacktestCreateWithoutSignalInput, Prisma.BacktestUncheckedCreateWithoutSignalInput>;
};
export type BacktestUpdateWithWhereUniqueWithoutSignalInput = {
    where: Prisma.BacktestWhereUniqueInput;
    data: Prisma.XOR<Prisma.BacktestUpdateWithoutSignalInput, Prisma.BacktestUncheckedUpdateWithoutSignalInput>;
};
export type BacktestUpdateManyWithWhereWithoutSignalInput = {
    where: Prisma.BacktestScalarWhereInput;
    data: Prisma.XOR<Prisma.BacktestUpdateManyMutationInput, Prisma.BacktestUncheckedUpdateManyWithoutSignalInput>;
};
export type BacktestScalarWhereInput = {
    AND?: Prisma.BacktestScalarWhereInput | Prisma.BacktestScalarWhereInput[];
    OR?: Prisma.BacktestScalarWhereInput[];
    NOT?: Prisma.BacktestScalarWhereInput | Prisma.BacktestScalarWhereInput[];
    id?: Prisma.StringFilter<"Backtest"> | string;
    symbol?: Prisma.StringFilter<"Backtest"> | string;
    exchange?: Prisma.StringFilter<"Backtest"> | string;
    strategyName?: Prisma.StringFilter<"Backtest"> | string;
    parametersHash?: Prisma.StringFilter<"Backtest"> | string;
    fromDate?: Prisma.DateTimeFilter<"Backtest"> | Date | string;
    toDate?: Prisma.DateTimeFilter<"Backtest"> | Date | string;
    totalTrades?: Prisma.IntFilter<"Backtest"> | number;
    winRate?: Prisma.DecimalFilter<"Backtest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgReturn?: Prisma.DecimalFilter<"Backtest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDrawdown?: Prisma.DecimalFilter<"Backtest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    profitFactor?: Prisma.DecimalFilter<"Backtest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sharpeRatio?: Prisma.DecimalNullableFilter<"Backtest"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trades?: Prisma.JsonFilter<"Backtest">;
    summary?: Prisma.JsonFilter<"Backtest">;
    signalId?: Prisma.StringNullableFilter<"Backtest"> | string | null;
    computedAt?: Prisma.DateTimeFilter<"Backtest"> | Date | string;
};
export type BacktestCreateWithoutBacktestTradesInput = {
    id?: string;
    symbol: string;
    exchange: string;
    strategyName: string;
    parametersHash: string;
    fromDate: Date | string;
    toDate: Date | string;
    totalTrades: number;
    winRate: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgReturn: runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDrawdown: runtime.Decimal | runtime.DecimalJsLike | number | string;
    profitFactor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sharpeRatio?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trades?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    computedAt?: Date | string;
    signal?: Prisma.SignalCreateNestedOneWithoutBacktestsInput;
};
export type BacktestUncheckedCreateWithoutBacktestTradesInput = {
    id?: string;
    symbol: string;
    exchange: string;
    strategyName: string;
    parametersHash: string;
    fromDate: Date | string;
    toDate: Date | string;
    totalTrades: number;
    winRate: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgReturn: runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDrawdown: runtime.Decimal | runtime.DecimalJsLike | number | string;
    profitFactor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sharpeRatio?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trades?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    signalId?: string | null;
    computedAt?: Date | string;
};
export type BacktestCreateOrConnectWithoutBacktestTradesInput = {
    where: Prisma.BacktestWhereUniqueInput;
    create: Prisma.XOR<Prisma.BacktestCreateWithoutBacktestTradesInput, Prisma.BacktestUncheckedCreateWithoutBacktestTradesInput>;
};
export type BacktestUpsertWithoutBacktestTradesInput = {
    update: Prisma.XOR<Prisma.BacktestUpdateWithoutBacktestTradesInput, Prisma.BacktestUncheckedUpdateWithoutBacktestTradesInput>;
    create: Prisma.XOR<Prisma.BacktestCreateWithoutBacktestTradesInput, Prisma.BacktestUncheckedCreateWithoutBacktestTradesInput>;
    where?: Prisma.BacktestWhereInput;
};
export type BacktestUpdateToOneWithWhereWithoutBacktestTradesInput = {
    where?: Prisma.BacktestWhereInput;
    data: Prisma.XOR<Prisma.BacktestUpdateWithoutBacktestTradesInput, Prisma.BacktestUncheckedUpdateWithoutBacktestTradesInput>;
};
export type BacktestUpdateWithoutBacktestTradesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    strategyName?: Prisma.StringFieldUpdateOperationsInput | string;
    parametersHash?: Prisma.StringFieldUpdateOperationsInput | string;
    fromDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    toDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    totalTrades?: Prisma.IntFieldUpdateOperationsInput | number;
    winRate?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgReturn?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDrawdown?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    profitFactor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sharpeRatio?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trades?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    signal?: Prisma.SignalUpdateOneWithoutBacktestsNestedInput;
};
export type BacktestUncheckedUpdateWithoutBacktestTradesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    strategyName?: Prisma.StringFieldUpdateOperationsInput | string;
    parametersHash?: Prisma.StringFieldUpdateOperationsInput | string;
    fromDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    toDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    totalTrades?: Prisma.IntFieldUpdateOperationsInput | number;
    winRate?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgReturn?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDrawdown?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    profitFactor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sharpeRatio?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trades?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    signalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BacktestCreateManySignalInput = {
    id?: string;
    symbol: string;
    exchange: string;
    strategyName: string;
    parametersHash: string;
    fromDate: Date | string;
    toDate: Date | string;
    totalTrades: number;
    winRate: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgReturn: runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDrawdown: runtime.Decimal | runtime.DecimalJsLike | number | string;
    profitFactor: runtime.Decimal | runtime.DecimalJsLike | number | string;
    sharpeRatio?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trades?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    computedAt?: Date | string;
};
export type BacktestUpdateWithoutSignalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    strategyName?: Prisma.StringFieldUpdateOperationsInput | string;
    parametersHash?: Prisma.StringFieldUpdateOperationsInput | string;
    fromDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    toDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    totalTrades?: Prisma.IntFieldUpdateOperationsInput | number;
    winRate?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgReturn?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDrawdown?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    profitFactor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sharpeRatio?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trades?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    backtestTrades?: Prisma.BacktestTradeUpdateManyWithoutBacktestNestedInput;
};
export type BacktestUncheckedUpdateWithoutSignalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    strategyName?: Prisma.StringFieldUpdateOperationsInput | string;
    parametersHash?: Prisma.StringFieldUpdateOperationsInput | string;
    fromDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    toDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    totalTrades?: Prisma.IntFieldUpdateOperationsInput | number;
    winRate?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgReturn?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDrawdown?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    profitFactor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sharpeRatio?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trades?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    backtestTrades?: Prisma.BacktestTradeUncheckedUpdateManyWithoutBacktestNestedInput;
};
export type BacktestUncheckedUpdateManyWithoutSignalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    strategyName?: Prisma.StringFieldUpdateOperationsInput | string;
    parametersHash?: Prisma.StringFieldUpdateOperationsInput | string;
    fromDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    toDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    totalTrades?: Prisma.IntFieldUpdateOperationsInput | number;
    winRate?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgReturn?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDrawdown?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    profitFactor?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    sharpeRatio?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trades?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type BacktestCountOutputType
 */
export type BacktestCountOutputType = {
    backtestTrades: number;
};
export type BacktestCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    backtestTrades?: boolean | BacktestCountOutputTypeCountBacktestTradesArgs;
};
/**
 * BacktestCountOutputType without action
 */
export type BacktestCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BacktestCountOutputType
     */
    select?: Prisma.BacktestCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * BacktestCountOutputType without action
 */
export type BacktestCountOutputTypeCountBacktestTradesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BacktestTradeWhereInput;
};
export type BacktestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    symbol?: boolean;
    exchange?: boolean;
    strategyName?: boolean;
    parametersHash?: boolean;
    fromDate?: boolean;
    toDate?: boolean;
    totalTrades?: boolean;
    winRate?: boolean;
    avgReturn?: boolean;
    maxDrawdown?: boolean;
    profitFactor?: boolean;
    sharpeRatio?: boolean;
    trades?: boolean;
    summary?: boolean;
    signalId?: boolean;
    computedAt?: boolean;
    signal?: boolean | Prisma.Backtest$signalArgs<ExtArgs>;
    backtestTrades?: boolean | Prisma.Backtest$backtestTradesArgs<ExtArgs>;
    _count?: boolean | Prisma.BacktestCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["backtest"]>;
export type BacktestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    symbol?: boolean;
    exchange?: boolean;
    strategyName?: boolean;
    parametersHash?: boolean;
    fromDate?: boolean;
    toDate?: boolean;
    totalTrades?: boolean;
    winRate?: boolean;
    avgReturn?: boolean;
    maxDrawdown?: boolean;
    profitFactor?: boolean;
    sharpeRatio?: boolean;
    trades?: boolean;
    summary?: boolean;
    signalId?: boolean;
    computedAt?: boolean;
    signal?: boolean | Prisma.Backtest$signalArgs<ExtArgs>;
}, ExtArgs["result"]["backtest"]>;
export type BacktestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    symbol?: boolean;
    exchange?: boolean;
    strategyName?: boolean;
    parametersHash?: boolean;
    fromDate?: boolean;
    toDate?: boolean;
    totalTrades?: boolean;
    winRate?: boolean;
    avgReturn?: boolean;
    maxDrawdown?: boolean;
    profitFactor?: boolean;
    sharpeRatio?: boolean;
    trades?: boolean;
    summary?: boolean;
    signalId?: boolean;
    computedAt?: boolean;
    signal?: boolean | Prisma.Backtest$signalArgs<ExtArgs>;
}, ExtArgs["result"]["backtest"]>;
export type BacktestSelectScalar = {
    id?: boolean;
    symbol?: boolean;
    exchange?: boolean;
    strategyName?: boolean;
    parametersHash?: boolean;
    fromDate?: boolean;
    toDate?: boolean;
    totalTrades?: boolean;
    winRate?: boolean;
    avgReturn?: boolean;
    maxDrawdown?: boolean;
    profitFactor?: boolean;
    sharpeRatio?: boolean;
    trades?: boolean;
    summary?: boolean;
    signalId?: boolean;
    computedAt?: boolean;
};
export type BacktestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "symbol" | "exchange" | "strategyName" | "parametersHash" | "fromDate" | "toDate" | "totalTrades" | "winRate" | "avgReturn" | "maxDrawdown" | "profitFactor" | "sharpeRatio" | "trades" | "summary" | "signalId" | "computedAt", ExtArgs["result"]["backtest"]>;
export type BacktestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    signal?: boolean | Prisma.Backtest$signalArgs<ExtArgs>;
    backtestTrades?: boolean | Prisma.Backtest$backtestTradesArgs<ExtArgs>;
    _count?: boolean | Prisma.BacktestCountOutputTypeDefaultArgs<ExtArgs>;
};
export type BacktestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    signal?: boolean | Prisma.Backtest$signalArgs<ExtArgs>;
};
export type BacktestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    signal?: boolean | Prisma.Backtest$signalArgs<ExtArgs>;
};
export type $BacktestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Backtest";
    objects: {
        signal: Prisma.$SignalPayload<ExtArgs> | null;
        backtestTrades: Prisma.$BacktestTradePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        symbol: string;
        exchange: string;
        strategyName: string;
        parametersHash: string;
        fromDate: Date;
        toDate: Date;
        totalTrades: number;
        winRate: runtime.Decimal;
        avgReturn: runtime.Decimal;
        maxDrawdown: runtime.Decimal;
        profitFactor: runtime.Decimal;
        sharpeRatio: runtime.Decimal | null;
        trades: runtime.JsonValue;
        summary: runtime.JsonValue;
        signalId: string | null;
        computedAt: Date;
    }, ExtArgs["result"]["backtest"]>;
    composites: {};
};
export type BacktestGetPayload<S extends boolean | null | undefined | BacktestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BacktestPayload, S>;
export type BacktestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BacktestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BacktestCountAggregateInputType | true;
};
export interface BacktestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Backtest'];
        meta: {
            name: 'Backtest';
        };
    };
    /**
     * Find zero or one Backtest that matches the filter.
     * @param {BacktestFindUniqueArgs} args - Arguments to find a Backtest
     * @example
     * // Get one Backtest
     * const backtest = await prisma.backtest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BacktestFindUniqueArgs>(args: Prisma.SelectSubset<T, BacktestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BacktestClient<runtime.Types.Result.GetResult<Prisma.$BacktestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Backtest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BacktestFindUniqueOrThrowArgs} args - Arguments to find a Backtest
     * @example
     * // Get one Backtest
     * const backtest = await prisma.backtest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BacktestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BacktestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BacktestClient<runtime.Types.Result.GetResult<Prisma.$BacktestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Backtest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BacktestFindFirstArgs} args - Arguments to find a Backtest
     * @example
     * // Get one Backtest
     * const backtest = await prisma.backtest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BacktestFindFirstArgs>(args?: Prisma.SelectSubset<T, BacktestFindFirstArgs<ExtArgs>>): Prisma.Prisma__BacktestClient<runtime.Types.Result.GetResult<Prisma.$BacktestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Backtest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BacktestFindFirstOrThrowArgs} args - Arguments to find a Backtest
     * @example
     * // Get one Backtest
     * const backtest = await prisma.backtest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BacktestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BacktestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BacktestClient<runtime.Types.Result.GetResult<Prisma.$BacktestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Backtests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BacktestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Backtests
     * const backtests = await prisma.backtest.findMany()
     *
     * // Get first 10 Backtests
     * const backtests = await prisma.backtest.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const backtestWithIdOnly = await prisma.backtest.findMany({ select: { id: true } })
     *
     */
    findMany<T extends BacktestFindManyArgs>(args?: Prisma.SelectSubset<T, BacktestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BacktestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Backtest.
     * @param {BacktestCreateArgs} args - Arguments to create a Backtest.
     * @example
     * // Create one Backtest
     * const Backtest = await prisma.backtest.create({
     *   data: {
     *     // ... data to create a Backtest
     *   }
     * })
     *
     */
    create<T extends BacktestCreateArgs>(args: Prisma.SelectSubset<T, BacktestCreateArgs<ExtArgs>>): Prisma.Prisma__BacktestClient<runtime.Types.Result.GetResult<Prisma.$BacktestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Backtests.
     * @param {BacktestCreateManyArgs} args - Arguments to create many Backtests.
     * @example
     * // Create many Backtests
     * const backtest = await prisma.backtest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends BacktestCreateManyArgs>(args?: Prisma.SelectSubset<T, BacktestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Backtests and returns the data saved in the database.
     * @param {BacktestCreateManyAndReturnArgs} args - Arguments to create many Backtests.
     * @example
     * // Create many Backtests
     * const backtest = await prisma.backtest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Backtests and only return the `id`
     * const backtestWithIdOnly = await prisma.backtest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends BacktestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BacktestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BacktestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Backtest.
     * @param {BacktestDeleteArgs} args - Arguments to delete one Backtest.
     * @example
     * // Delete one Backtest
     * const Backtest = await prisma.backtest.delete({
     *   where: {
     *     // ... filter to delete one Backtest
     *   }
     * })
     *
     */
    delete<T extends BacktestDeleteArgs>(args: Prisma.SelectSubset<T, BacktestDeleteArgs<ExtArgs>>): Prisma.Prisma__BacktestClient<runtime.Types.Result.GetResult<Prisma.$BacktestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Backtest.
     * @param {BacktestUpdateArgs} args - Arguments to update one Backtest.
     * @example
     * // Update one Backtest
     * const backtest = await prisma.backtest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends BacktestUpdateArgs>(args: Prisma.SelectSubset<T, BacktestUpdateArgs<ExtArgs>>): Prisma.Prisma__BacktestClient<runtime.Types.Result.GetResult<Prisma.$BacktestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Backtests.
     * @param {BacktestDeleteManyArgs} args - Arguments to filter Backtests to delete.
     * @example
     * // Delete a few Backtests
     * const { count } = await prisma.backtest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends BacktestDeleteManyArgs>(args?: Prisma.SelectSubset<T, BacktestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Backtests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BacktestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Backtests
     * const backtest = await prisma.backtest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends BacktestUpdateManyArgs>(args: Prisma.SelectSubset<T, BacktestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Backtests and returns the data updated in the database.
     * @param {BacktestUpdateManyAndReturnArgs} args - Arguments to update many Backtests.
     * @example
     * // Update many Backtests
     * const backtest = await prisma.backtest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Backtests and only return the `id`
     * const backtestWithIdOnly = await prisma.backtest.updateManyAndReturn({
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
    updateManyAndReturn<T extends BacktestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BacktestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BacktestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Backtest.
     * @param {BacktestUpsertArgs} args - Arguments to update or create a Backtest.
     * @example
     * // Update or create a Backtest
     * const backtest = await prisma.backtest.upsert({
     *   create: {
     *     // ... data to create a Backtest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Backtest we want to update
     *   }
     * })
     */
    upsert<T extends BacktestUpsertArgs>(args: Prisma.SelectSubset<T, BacktestUpsertArgs<ExtArgs>>): Prisma.Prisma__BacktestClient<runtime.Types.Result.GetResult<Prisma.$BacktestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Backtests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BacktestCountArgs} args - Arguments to filter Backtests to count.
     * @example
     * // Count the number of Backtests
     * const count = await prisma.backtest.count({
     *   where: {
     *     // ... the filter for the Backtests we want to count
     *   }
     * })
    **/
    count<T extends BacktestCountArgs>(args?: Prisma.Subset<T, BacktestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BacktestCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Backtest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BacktestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BacktestAggregateArgs>(args: Prisma.Subset<T, BacktestAggregateArgs>): Prisma.PrismaPromise<GetBacktestAggregateType<T>>;
    /**
     * Group by Backtest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BacktestGroupByArgs} args - Group by arguments.
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
    groupBy<T extends BacktestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BacktestGroupByArgs['orderBy'];
    } : {
        orderBy?: BacktestGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BacktestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBacktestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Backtest model
     */
    readonly fields: BacktestFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Backtest.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__BacktestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    signal<T extends Prisma.Backtest$signalArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Backtest$signalArgs<ExtArgs>>): Prisma.Prisma__SignalClient<runtime.Types.Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    backtestTrades<T extends Prisma.Backtest$backtestTradesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Backtest$backtestTradesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BacktestTradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Backtest model
 */
export interface BacktestFieldRefs {
    readonly id: Prisma.FieldRef<"Backtest", 'String'>;
    readonly symbol: Prisma.FieldRef<"Backtest", 'String'>;
    readonly exchange: Prisma.FieldRef<"Backtest", 'String'>;
    readonly strategyName: Prisma.FieldRef<"Backtest", 'String'>;
    readonly parametersHash: Prisma.FieldRef<"Backtest", 'String'>;
    readonly fromDate: Prisma.FieldRef<"Backtest", 'DateTime'>;
    readonly toDate: Prisma.FieldRef<"Backtest", 'DateTime'>;
    readonly totalTrades: Prisma.FieldRef<"Backtest", 'Int'>;
    readonly winRate: Prisma.FieldRef<"Backtest", 'Decimal'>;
    readonly avgReturn: Prisma.FieldRef<"Backtest", 'Decimal'>;
    readonly maxDrawdown: Prisma.FieldRef<"Backtest", 'Decimal'>;
    readonly profitFactor: Prisma.FieldRef<"Backtest", 'Decimal'>;
    readonly sharpeRatio: Prisma.FieldRef<"Backtest", 'Decimal'>;
    readonly trades: Prisma.FieldRef<"Backtest", 'Json'>;
    readonly summary: Prisma.FieldRef<"Backtest", 'Json'>;
    readonly signalId: Prisma.FieldRef<"Backtest", 'String'>;
    readonly computedAt: Prisma.FieldRef<"Backtest", 'DateTime'>;
}
/**
 * Backtest findUnique
 */
export type BacktestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Backtest
     */
    select?: Prisma.BacktestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Backtest
     */
    omit?: Prisma.BacktestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BacktestInclude<ExtArgs> | null;
    /**
     * Filter, which Backtest to fetch.
     */
    where: Prisma.BacktestWhereUniqueInput;
};
/**
 * Backtest findUniqueOrThrow
 */
export type BacktestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Backtest
     */
    select?: Prisma.BacktestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Backtest
     */
    omit?: Prisma.BacktestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BacktestInclude<ExtArgs> | null;
    /**
     * Filter, which Backtest to fetch.
     */
    where: Prisma.BacktestWhereUniqueInput;
};
/**
 * Backtest findFirst
 */
export type BacktestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Backtest
     */
    select?: Prisma.BacktestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Backtest
     */
    omit?: Prisma.BacktestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BacktestInclude<ExtArgs> | null;
    /**
     * Filter, which Backtest to fetch.
     */
    where?: Prisma.BacktestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Backtests to fetch.
     */
    orderBy?: Prisma.BacktestOrderByWithRelationInput | Prisma.BacktestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Backtests.
     */
    cursor?: Prisma.BacktestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Backtests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Backtests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Backtests.
     */
    distinct?: Prisma.BacktestScalarFieldEnum | Prisma.BacktestScalarFieldEnum[];
};
/**
 * Backtest findFirstOrThrow
 */
export type BacktestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Backtest
     */
    select?: Prisma.BacktestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Backtest
     */
    omit?: Prisma.BacktestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BacktestInclude<ExtArgs> | null;
    /**
     * Filter, which Backtest to fetch.
     */
    where?: Prisma.BacktestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Backtests to fetch.
     */
    orderBy?: Prisma.BacktestOrderByWithRelationInput | Prisma.BacktestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Backtests.
     */
    cursor?: Prisma.BacktestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Backtests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Backtests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Backtests.
     */
    distinct?: Prisma.BacktestScalarFieldEnum | Prisma.BacktestScalarFieldEnum[];
};
/**
 * Backtest findMany
 */
export type BacktestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Backtest
     */
    select?: Prisma.BacktestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Backtest
     */
    omit?: Prisma.BacktestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BacktestInclude<ExtArgs> | null;
    /**
     * Filter, which Backtests to fetch.
     */
    where?: Prisma.BacktestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Backtests to fetch.
     */
    orderBy?: Prisma.BacktestOrderByWithRelationInput | Prisma.BacktestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Backtests.
     */
    cursor?: Prisma.BacktestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Backtests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Backtests.
     */
    skip?: number;
    distinct?: Prisma.BacktestScalarFieldEnum | Prisma.BacktestScalarFieldEnum[];
};
/**
 * Backtest create
 */
export type BacktestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Backtest
     */
    select?: Prisma.BacktestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Backtest
     */
    omit?: Prisma.BacktestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BacktestInclude<ExtArgs> | null;
    /**
     * The data needed to create a Backtest.
     */
    data: Prisma.XOR<Prisma.BacktestCreateInput, Prisma.BacktestUncheckedCreateInput>;
};
/**
 * Backtest createMany
 */
export type BacktestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Backtests.
     */
    data: Prisma.BacktestCreateManyInput | Prisma.BacktestCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Backtest createManyAndReturn
 */
export type BacktestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Backtest
     */
    select?: Prisma.BacktestSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Backtest
     */
    omit?: Prisma.BacktestOmit<ExtArgs> | null;
    /**
     * The data used to create many Backtests.
     */
    data: Prisma.BacktestCreateManyInput | Prisma.BacktestCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BacktestIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Backtest update
 */
export type BacktestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Backtest
     */
    select?: Prisma.BacktestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Backtest
     */
    omit?: Prisma.BacktestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BacktestInclude<ExtArgs> | null;
    /**
     * The data needed to update a Backtest.
     */
    data: Prisma.XOR<Prisma.BacktestUpdateInput, Prisma.BacktestUncheckedUpdateInput>;
    /**
     * Choose, which Backtest to update.
     */
    where: Prisma.BacktestWhereUniqueInput;
};
/**
 * Backtest updateMany
 */
export type BacktestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Backtests.
     */
    data: Prisma.XOR<Prisma.BacktestUpdateManyMutationInput, Prisma.BacktestUncheckedUpdateManyInput>;
    /**
     * Filter which Backtests to update
     */
    where?: Prisma.BacktestWhereInput;
    /**
     * Limit how many Backtests to update.
     */
    limit?: number;
};
/**
 * Backtest updateManyAndReturn
 */
export type BacktestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Backtest
     */
    select?: Prisma.BacktestSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Backtest
     */
    omit?: Prisma.BacktestOmit<ExtArgs> | null;
    /**
     * The data used to update Backtests.
     */
    data: Prisma.XOR<Prisma.BacktestUpdateManyMutationInput, Prisma.BacktestUncheckedUpdateManyInput>;
    /**
     * Filter which Backtests to update
     */
    where?: Prisma.BacktestWhereInput;
    /**
     * Limit how many Backtests to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BacktestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Backtest upsert
 */
export type BacktestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Backtest
     */
    select?: Prisma.BacktestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Backtest
     */
    omit?: Prisma.BacktestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BacktestInclude<ExtArgs> | null;
    /**
     * The filter to search for the Backtest to update in case it exists.
     */
    where: Prisma.BacktestWhereUniqueInput;
    /**
     * In case the Backtest found by the `where` argument doesn't exist, create a new Backtest with this data.
     */
    create: Prisma.XOR<Prisma.BacktestCreateInput, Prisma.BacktestUncheckedCreateInput>;
    /**
     * In case the Backtest was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.BacktestUpdateInput, Prisma.BacktestUncheckedUpdateInput>;
};
/**
 * Backtest delete
 */
export type BacktestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Backtest
     */
    select?: Prisma.BacktestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Backtest
     */
    omit?: Prisma.BacktestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BacktestInclude<ExtArgs> | null;
    /**
     * Filter which Backtest to delete.
     */
    where: Prisma.BacktestWhereUniqueInput;
};
/**
 * Backtest deleteMany
 */
export type BacktestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Backtests to delete
     */
    where?: Prisma.BacktestWhereInput;
    /**
     * Limit how many Backtests to delete.
     */
    limit?: number;
};
/**
 * Backtest.signal
 */
export type Backtest$signalArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signal
     */
    select?: Prisma.SignalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Signal
     */
    omit?: Prisma.SignalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SignalInclude<ExtArgs> | null;
    where?: Prisma.SignalWhereInput;
};
/**
 * Backtest.backtestTrades
 */
export type Backtest$backtestTradesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BacktestTrade
     */
    select?: Prisma.BacktestTradeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BacktestTrade
     */
    omit?: Prisma.BacktestTradeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BacktestTradeInclude<ExtArgs> | null;
    where?: Prisma.BacktestTradeWhereInput;
    orderBy?: Prisma.BacktestTradeOrderByWithRelationInput | Prisma.BacktestTradeOrderByWithRelationInput[];
    cursor?: Prisma.BacktestTradeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BacktestTradeScalarFieldEnum | Prisma.BacktestTradeScalarFieldEnum[];
};
/**
 * Backtest without action
 */
export type BacktestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Backtest
     */
    select?: Prisma.BacktestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Backtest
     */
    omit?: Prisma.BacktestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BacktestInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Backtest.d.ts.map
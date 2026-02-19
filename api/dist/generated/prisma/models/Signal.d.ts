import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Signal
 *
 */
export type SignalModel = runtime.Types.Result.DefaultSelection<Prisma.$SignalPayload>;
export type AggregateSignal = {
    _count: SignalCountAggregateOutputType | null;
    _avg: SignalAvgAggregateOutputType | null;
    _sum: SignalSumAggregateOutputType | null;
    _min: SignalMinAggregateOutputType | null;
    _max: SignalMaxAggregateOutputType | null;
};
export type SignalAvgAggregateOutputType = {
    price: runtime.Decimal | null;
    ath: runtime.Decimal | null;
    ema200: runtime.Decimal | null;
    distancePct: runtime.Decimal | null;
    volumeSurge: runtime.Decimal | null;
    volumeToday: number | null;
    volumeAvg20: number | null;
};
export type SignalSumAggregateOutputType = {
    price: runtime.Decimal | null;
    ath: runtime.Decimal | null;
    ema200: runtime.Decimal | null;
    distancePct: runtime.Decimal | null;
    volumeSurge: runtime.Decimal | null;
    volumeToday: bigint | null;
    volumeAvg20: bigint | null;
};
export type SignalMinAggregateOutputType = {
    id: string | null;
    symbol: string | null;
    exchange: string | null;
    strategyName: string | null;
    heat: $Enums.Heat | null;
    price: runtime.Decimal | null;
    ath: runtime.Decimal | null;
    ema200: runtime.Decimal | null;
    distancePct: runtime.Decimal | null;
    volumeSurge: runtime.Decimal | null;
    volumeToday: bigint | null;
    volumeAvg20: bigint | null;
    signalDate: Date | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SignalMaxAggregateOutputType = {
    id: string | null;
    symbol: string | null;
    exchange: string | null;
    strategyName: string | null;
    heat: $Enums.Heat | null;
    price: runtime.Decimal | null;
    ath: runtime.Decimal | null;
    ema200: runtime.Decimal | null;
    distancePct: runtime.Decimal | null;
    volumeSurge: runtime.Decimal | null;
    volumeToday: bigint | null;
    volumeAvg20: bigint | null;
    signalDate: Date | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SignalCountAggregateOutputType = {
    id: number;
    symbol: number;
    exchange: number;
    strategyName: number;
    heat: number;
    price: number;
    ath: number;
    ema200: number;
    distancePct: number;
    volumeSurge: number;
    volumeToday: number;
    volumeAvg20: number;
    signalDate: number;
    details: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type SignalAvgAggregateInputType = {
    price?: true;
    ath?: true;
    ema200?: true;
    distancePct?: true;
    volumeSurge?: true;
    volumeToday?: true;
    volumeAvg20?: true;
};
export type SignalSumAggregateInputType = {
    price?: true;
    ath?: true;
    ema200?: true;
    distancePct?: true;
    volumeSurge?: true;
    volumeToday?: true;
    volumeAvg20?: true;
};
export type SignalMinAggregateInputType = {
    id?: true;
    symbol?: true;
    exchange?: true;
    strategyName?: true;
    heat?: true;
    price?: true;
    ath?: true;
    ema200?: true;
    distancePct?: true;
    volumeSurge?: true;
    volumeToday?: true;
    volumeAvg20?: true;
    signalDate?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SignalMaxAggregateInputType = {
    id?: true;
    symbol?: true;
    exchange?: true;
    strategyName?: true;
    heat?: true;
    price?: true;
    ath?: true;
    ema200?: true;
    distancePct?: true;
    volumeSurge?: true;
    volumeToday?: true;
    volumeAvg20?: true;
    signalDate?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SignalCountAggregateInputType = {
    id?: true;
    symbol?: true;
    exchange?: true;
    strategyName?: true;
    heat?: true;
    price?: true;
    ath?: true;
    ema200?: true;
    distancePct?: true;
    volumeSurge?: true;
    volumeToday?: true;
    volumeAvg20?: true;
    signalDate?: true;
    details?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type SignalAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Signal to aggregate.
     */
    where?: Prisma.SignalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Signals to fetch.
     */
    orderBy?: Prisma.SignalOrderByWithRelationInput | Prisma.SignalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.SignalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Signals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Signals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Signals
    **/
    _count?: true | SignalCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: SignalAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: SignalSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: SignalMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: SignalMaxAggregateInputType;
};
export type GetSignalAggregateType<T extends SignalAggregateArgs> = {
    [P in keyof T & keyof AggregateSignal]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSignal[P]> : Prisma.GetScalarType<T[P], AggregateSignal[P]>;
};
export type SignalGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SignalWhereInput;
    orderBy?: Prisma.SignalOrderByWithAggregationInput | Prisma.SignalOrderByWithAggregationInput[];
    by: Prisma.SignalScalarFieldEnum[] | Prisma.SignalScalarFieldEnum;
    having?: Prisma.SignalScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SignalCountAggregateInputType | true;
    _avg?: SignalAvgAggregateInputType;
    _sum?: SignalSumAggregateInputType;
    _min?: SignalMinAggregateInputType;
    _max?: SignalMaxAggregateInputType;
};
export type SignalGroupByOutputType = {
    id: string;
    symbol: string;
    exchange: string;
    strategyName: string;
    heat: $Enums.Heat;
    price: runtime.Decimal;
    ath: runtime.Decimal;
    ema200: runtime.Decimal;
    distancePct: runtime.Decimal;
    volumeSurge: runtime.Decimal | null;
    volumeToday: bigint | null;
    volumeAvg20: bigint | null;
    signalDate: Date;
    details: runtime.JsonValue;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: SignalCountAggregateOutputType | null;
    _avg: SignalAvgAggregateOutputType | null;
    _sum: SignalSumAggregateOutputType | null;
    _min: SignalMinAggregateOutputType | null;
    _max: SignalMaxAggregateOutputType | null;
};
type GetSignalGroupByPayload<T extends SignalGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SignalGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SignalGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SignalGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SignalGroupByOutputType[P]>;
}>>;
export type SignalWhereInput = {
    AND?: Prisma.SignalWhereInput | Prisma.SignalWhereInput[];
    OR?: Prisma.SignalWhereInput[];
    NOT?: Prisma.SignalWhereInput | Prisma.SignalWhereInput[];
    id?: Prisma.StringFilter<"Signal"> | string;
    symbol?: Prisma.StringFilter<"Signal"> | string;
    exchange?: Prisma.StringFilter<"Signal"> | string;
    strategyName?: Prisma.StringFilter<"Signal"> | string;
    heat?: Prisma.EnumHeatFilter<"Signal"> | $Enums.Heat;
    price?: Prisma.DecimalFilter<"Signal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ath?: Prisma.DecimalFilter<"Signal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ema200?: Prisma.DecimalFilter<"Signal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    distancePct?: Prisma.DecimalFilter<"Signal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    volumeSurge?: Prisma.DecimalNullableFilter<"Signal"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    volumeToday?: Prisma.BigIntNullableFilter<"Signal"> | bigint | number | null;
    volumeAvg20?: Prisma.BigIntNullableFilter<"Signal"> | bigint | number | null;
    signalDate?: Prisma.DateTimeFilter<"Signal"> | Date | string;
    details?: Prisma.JsonFilter<"Signal">;
    isActive?: Prisma.BoolFilter<"Signal"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Signal"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Signal"> | Date | string;
    alertHistory?: Prisma.AlertHistoryListRelationFilter;
    journalTrades?: Prisma.JournalTradeListRelationFilter;
    backtests?: Prisma.BacktestListRelationFilter;
};
export type SignalOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    strategyName?: Prisma.SortOrder;
    heat?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    ath?: Prisma.SortOrder;
    ema200?: Prisma.SortOrder;
    distancePct?: Prisma.SortOrder;
    volumeSurge?: Prisma.SortOrderInput | Prisma.SortOrder;
    volumeToday?: Prisma.SortOrderInput | Prisma.SortOrder;
    volumeAvg20?: Prisma.SortOrderInput | Prisma.SortOrder;
    signalDate?: Prisma.SortOrder;
    details?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    alertHistory?: Prisma.AlertHistoryOrderByRelationAggregateInput;
    journalTrades?: Prisma.JournalTradeOrderByRelationAggregateInput;
    backtests?: Prisma.BacktestOrderByRelationAggregateInput;
};
export type SignalWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SignalWhereInput | Prisma.SignalWhereInput[];
    OR?: Prisma.SignalWhereInput[];
    NOT?: Prisma.SignalWhereInput | Prisma.SignalWhereInput[];
    symbol?: Prisma.StringFilter<"Signal"> | string;
    exchange?: Prisma.StringFilter<"Signal"> | string;
    strategyName?: Prisma.StringFilter<"Signal"> | string;
    heat?: Prisma.EnumHeatFilter<"Signal"> | $Enums.Heat;
    price?: Prisma.DecimalFilter<"Signal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ath?: Prisma.DecimalFilter<"Signal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ema200?: Prisma.DecimalFilter<"Signal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    distancePct?: Prisma.DecimalFilter<"Signal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    volumeSurge?: Prisma.DecimalNullableFilter<"Signal"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    volumeToday?: Prisma.BigIntNullableFilter<"Signal"> | bigint | number | null;
    volumeAvg20?: Prisma.BigIntNullableFilter<"Signal"> | bigint | number | null;
    signalDate?: Prisma.DateTimeFilter<"Signal"> | Date | string;
    details?: Prisma.JsonFilter<"Signal">;
    isActive?: Prisma.BoolFilter<"Signal"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Signal"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Signal"> | Date | string;
    alertHistory?: Prisma.AlertHistoryListRelationFilter;
    journalTrades?: Prisma.JournalTradeListRelationFilter;
    backtests?: Prisma.BacktestListRelationFilter;
}, "id">;
export type SignalOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    strategyName?: Prisma.SortOrder;
    heat?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    ath?: Prisma.SortOrder;
    ema200?: Prisma.SortOrder;
    distancePct?: Prisma.SortOrder;
    volumeSurge?: Prisma.SortOrderInput | Prisma.SortOrder;
    volumeToday?: Prisma.SortOrderInput | Prisma.SortOrder;
    volumeAvg20?: Prisma.SortOrderInput | Prisma.SortOrder;
    signalDate?: Prisma.SortOrder;
    details?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.SignalCountOrderByAggregateInput;
    _avg?: Prisma.SignalAvgOrderByAggregateInput;
    _max?: Prisma.SignalMaxOrderByAggregateInput;
    _min?: Prisma.SignalMinOrderByAggregateInput;
    _sum?: Prisma.SignalSumOrderByAggregateInput;
};
export type SignalScalarWhereWithAggregatesInput = {
    AND?: Prisma.SignalScalarWhereWithAggregatesInput | Prisma.SignalScalarWhereWithAggregatesInput[];
    OR?: Prisma.SignalScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SignalScalarWhereWithAggregatesInput | Prisma.SignalScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Signal"> | string;
    symbol?: Prisma.StringWithAggregatesFilter<"Signal"> | string;
    exchange?: Prisma.StringWithAggregatesFilter<"Signal"> | string;
    strategyName?: Prisma.StringWithAggregatesFilter<"Signal"> | string;
    heat?: Prisma.EnumHeatWithAggregatesFilter<"Signal"> | $Enums.Heat;
    price?: Prisma.DecimalWithAggregatesFilter<"Signal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ath?: Prisma.DecimalWithAggregatesFilter<"Signal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ema200?: Prisma.DecimalWithAggregatesFilter<"Signal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    distancePct?: Prisma.DecimalWithAggregatesFilter<"Signal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    volumeSurge?: Prisma.DecimalNullableWithAggregatesFilter<"Signal"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    volumeToday?: Prisma.BigIntNullableWithAggregatesFilter<"Signal"> | bigint | number | null;
    volumeAvg20?: Prisma.BigIntNullableWithAggregatesFilter<"Signal"> | bigint | number | null;
    signalDate?: Prisma.DateTimeWithAggregatesFilter<"Signal"> | Date | string;
    details?: Prisma.JsonWithAggregatesFilter<"Signal">;
    isActive?: Prisma.BoolWithAggregatesFilter<"Signal"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Signal"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Signal"> | Date | string;
};
export type SignalCreateInput = {
    id?: string;
    symbol: string;
    exchange: string;
    strategyName: string;
    heat: $Enums.Heat;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ath: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ema200: runtime.Decimal | runtime.DecimalJsLike | number | string;
    distancePct: runtime.Decimal | runtime.DecimalJsLike | number | string;
    volumeSurge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    volumeToday?: bigint | number | null;
    volumeAvg20?: bigint | number | null;
    signalDate: Date | string;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    alertHistory?: Prisma.AlertHistoryCreateNestedManyWithoutSignalInput;
    journalTrades?: Prisma.JournalTradeCreateNestedManyWithoutSignalInput;
    backtests?: Prisma.BacktestCreateNestedManyWithoutSignalInput;
};
export type SignalUncheckedCreateInput = {
    id?: string;
    symbol: string;
    exchange: string;
    strategyName: string;
    heat: $Enums.Heat;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ath: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ema200: runtime.Decimal | runtime.DecimalJsLike | number | string;
    distancePct: runtime.Decimal | runtime.DecimalJsLike | number | string;
    volumeSurge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    volumeToday?: bigint | number | null;
    volumeAvg20?: bigint | number | null;
    signalDate: Date | string;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    alertHistory?: Prisma.AlertHistoryUncheckedCreateNestedManyWithoutSignalInput;
    journalTrades?: Prisma.JournalTradeUncheckedCreateNestedManyWithoutSignalInput;
    backtests?: Prisma.BacktestUncheckedCreateNestedManyWithoutSignalInput;
};
export type SignalUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    strategyName?: Prisma.StringFieldUpdateOperationsInput | string;
    heat?: Prisma.EnumHeatFieldUpdateOperationsInput | $Enums.Heat;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ath?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ema200?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    distancePct?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    volumeSurge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    volumeToday?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    volumeAvg20?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    signalDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    alertHistory?: Prisma.AlertHistoryUpdateManyWithoutSignalNestedInput;
    journalTrades?: Prisma.JournalTradeUpdateManyWithoutSignalNestedInput;
    backtests?: Prisma.BacktestUpdateManyWithoutSignalNestedInput;
};
export type SignalUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    strategyName?: Prisma.StringFieldUpdateOperationsInput | string;
    heat?: Prisma.EnumHeatFieldUpdateOperationsInput | $Enums.Heat;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ath?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ema200?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    distancePct?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    volumeSurge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    volumeToday?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    volumeAvg20?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    signalDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    alertHistory?: Prisma.AlertHistoryUncheckedUpdateManyWithoutSignalNestedInput;
    journalTrades?: Prisma.JournalTradeUncheckedUpdateManyWithoutSignalNestedInput;
    backtests?: Prisma.BacktestUncheckedUpdateManyWithoutSignalNestedInput;
};
export type SignalCreateManyInput = {
    id?: string;
    symbol: string;
    exchange: string;
    strategyName: string;
    heat: $Enums.Heat;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ath: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ema200: runtime.Decimal | runtime.DecimalJsLike | number | string;
    distancePct: runtime.Decimal | runtime.DecimalJsLike | number | string;
    volumeSurge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    volumeToday?: bigint | number | null;
    volumeAvg20?: bigint | number | null;
    signalDate: Date | string;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SignalUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    strategyName?: Prisma.StringFieldUpdateOperationsInput | string;
    heat?: Prisma.EnumHeatFieldUpdateOperationsInput | $Enums.Heat;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ath?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ema200?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    distancePct?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    volumeSurge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    volumeToday?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    volumeAvg20?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    signalDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SignalUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    strategyName?: Prisma.StringFieldUpdateOperationsInput | string;
    heat?: Prisma.EnumHeatFieldUpdateOperationsInput | $Enums.Heat;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ath?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ema200?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    distancePct?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    volumeSurge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    volumeToday?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    volumeAvg20?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    signalDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SignalCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    strategyName?: Prisma.SortOrder;
    heat?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    ath?: Prisma.SortOrder;
    ema200?: Prisma.SortOrder;
    distancePct?: Prisma.SortOrder;
    volumeSurge?: Prisma.SortOrder;
    volumeToday?: Prisma.SortOrder;
    volumeAvg20?: Prisma.SortOrder;
    signalDate?: Prisma.SortOrder;
    details?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SignalAvgOrderByAggregateInput = {
    price?: Prisma.SortOrder;
    ath?: Prisma.SortOrder;
    ema200?: Prisma.SortOrder;
    distancePct?: Prisma.SortOrder;
    volumeSurge?: Prisma.SortOrder;
    volumeToday?: Prisma.SortOrder;
    volumeAvg20?: Prisma.SortOrder;
};
export type SignalMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    strategyName?: Prisma.SortOrder;
    heat?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    ath?: Prisma.SortOrder;
    ema200?: Prisma.SortOrder;
    distancePct?: Prisma.SortOrder;
    volumeSurge?: Prisma.SortOrder;
    volumeToday?: Prisma.SortOrder;
    volumeAvg20?: Prisma.SortOrder;
    signalDate?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SignalMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    strategyName?: Prisma.SortOrder;
    heat?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    ath?: Prisma.SortOrder;
    ema200?: Prisma.SortOrder;
    distancePct?: Prisma.SortOrder;
    volumeSurge?: Prisma.SortOrder;
    volumeToday?: Prisma.SortOrder;
    volumeAvg20?: Prisma.SortOrder;
    signalDate?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SignalSumOrderByAggregateInput = {
    price?: Prisma.SortOrder;
    ath?: Prisma.SortOrder;
    ema200?: Prisma.SortOrder;
    distancePct?: Prisma.SortOrder;
    volumeSurge?: Prisma.SortOrder;
    volumeToday?: Prisma.SortOrder;
    volumeAvg20?: Prisma.SortOrder;
};
export type SignalNullableScalarRelationFilter = {
    is?: Prisma.SignalWhereInput | null;
    isNot?: Prisma.SignalWhereInput | null;
};
export type EnumHeatFieldUpdateOperationsInput = {
    set?: $Enums.Heat;
};
export type SignalCreateNestedOneWithoutJournalTradesInput = {
    create?: Prisma.XOR<Prisma.SignalCreateWithoutJournalTradesInput, Prisma.SignalUncheckedCreateWithoutJournalTradesInput>;
    connectOrCreate?: Prisma.SignalCreateOrConnectWithoutJournalTradesInput;
    connect?: Prisma.SignalWhereUniqueInput;
};
export type SignalUpdateOneWithoutJournalTradesNestedInput = {
    create?: Prisma.XOR<Prisma.SignalCreateWithoutJournalTradesInput, Prisma.SignalUncheckedCreateWithoutJournalTradesInput>;
    connectOrCreate?: Prisma.SignalCreateOrConnectWithoutJournalTradesInput;
    upsert?: Prisma.SignalUpsertWithoutJournalTradesInput;
    disconnect?: Prisma.SignalWhereInput | boolean;
    delete?: Prisma.SignalWhereInput | boolean;
    connect?: Prisma.SignalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SignalUpdateToOneWithWhereWithoutJournalTradesInput, Prisma.SignalUpdateWithoutJournalTradesInput>, Prisma.SignalUncheckedUpdateWithoutJournalTradesInput>;
};
export type SignalCreateNestedOneWithoutBacktestsInput = {
    create?: Prisma.XOR<Prisma.SignalCreateWithoutBacktestsInput, Prisma.SignalUncheckedCreateWithoutBacktestsInput>;
    connectOrCreate?: Prisma.SignalCreateOrConnectWithoutBacktestsInput;
    connect?: Prisma.SignalWhereUniqueInput;
};
export type SignalUpdateOneWithoutBacktestsNestedInput = {
    create?: Prisma.XOR<Prisma.SignalCreateWithoutBacktestsInput, Prisma.SignalUncheckedCreateWithoutBacktestsInput>;
    connectOrCreate?: Prisma.SignalCreateOrConnectWithoutBacktestsInput;
    upsert?: Prisma.SignalUpsertWithoutBacktestsInput;
    disconnect?: Prisma.SignalWhereInput | boolean;
    delete?: Prisma.SignalWhereInput | boolean;
    connect?: Prisma.SignalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SignalUpdateToOneWithWhereWithoutBacktestsInput, Prisma.SignalUpdateWithoutBacktestsInput>, Prisma.SignalUncheckedUpdateWithoutBacktestsInput>;
};
export type SignalCreateNestedOneWithoutAlertHistoryInput = {
    create?: Prisma.XOR<Prisma.SignalCreateWithoutAlertHistoryInput, Prisma.SignalUncheckedCreateWithoutAlertHistoryInput>;
    connectOrCreate?: Prisma.SignalCreateOrConnectWithoutAlertHistoryInput;
    connect?: Prisma.SignalWhereUniqueInput;
};
export type SignalUpdateOneWithoutAlertHistoryNestedInput = {
    create?: Prisma.XOR<Prisma.SignalCreateWithoutAlertHistoryInput, Prisma.SignalUncheckedCreateWithoutAlertHistoryInput>;
    connectOrCreate?: Prisma.SignalCreateOrConnectWithoutAlertHistoryInput;
    upsert?: Prisma.SignalUpsertWithoutAlertHistoryInput;
    disconnect?: Prisma.SignalWhereInput | boolean;
    delete?: Prisma.SignalWhereInput | boolean;
    connect?: Prisma.SignalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SignalUpdateToOneWithWhereWithoutAlertHistoryInput, Prisma.SignalUpdateWithoutAlertHistoryInput>, Prisma.SignalUncheckedUpdateWithoutAlertHistoryInput>;
};
export type SignalCreateWithoutJournalTradesInput = {
    id?: string;
    symbol: string;
    exchange: string;
    strategyName: string;
    heat: $Enums.Heat;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ath: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ema200: runtime.Decimal | runtime.DecimalJsLike | number | string;
    distancePct: runtime.Decimal | runtime.DecimalJsLike | number | string;
    volumeSurge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    volumeToday?: bigint | number | null;
    volumeAvg20?: bigint | number | null;
    signalDate: Date | string;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    alertHistory?: Prisma.AlertHistoryCreateNestedManyWithoutSignalInput;
    backtests?: Prisma.BacktestCreateNestedManyWithoutSignalInput;
};
export type SignalUncheckedCreateWithoutJournalTradesInput = {
    id?: string;
    symbol: string;
    exchange: string;
    strategyName: string;
    heat: $Enums.Heat;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ath: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ema200: runtime.Decimal | runtime.DecimalJsLike | number | string;
    distancePct: runtime.Decimal | runtime.DecimalJsLike | number | string;
    volumeSurge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    volumeToday?: bigint | number | null;
    volumeAvg20?: bigint | number | null;
    signalDate: Date | string;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    alertHistory?: Prisma.AlertHistoryUncheckedCreateNestedManyWithoutSignalInput;
    backtests?: Prisma.BacktestUncheckedCreateNestedManyWithoutSignalInput;
};
export type SignalCreateOrConnectWithoutJournalTradesInput = {
    where: Prisma.SignalWhereUniqueInput;
    create: Prisma.XOR<Prisma.SignalCreateWithoutJournalTradesInput, Prisma.SignalUncheckedCreateWithoutJournalTradesInput>;
};
export type SignalUpsertWithoutJournalTradesInput = {
    update: Prisma.XOR<Prisma.SignalUpdateWithoutJournalTradesInput, Prisma.SignalUncheckedUpdateWithoutJournalTradesInput>;
    create: Prisma.XOR<Prisma.SignalCreateWithoutJournalTradesInput, Prisma.SignalUncheckedCreateWithoutJournalTradesInput>;
    where?: Prisma.SignalWhereInput;
};
export type SignalUpdateToOneWithWhereWithoutJournalTradesInput = {
    where?: Prisma.SignalWhereInput;
    data: Prisma.XOR<Prisma.SignalUpdateWithoutJournalTradesInput, Prisma.SignalUncheckedUpdateWithoutJournalTradesInput>;
};
export type SignalUpdateWithoutJournalTradesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    strategyName?: Prisma.StringFieldUpdateOperationsInput | string;
    heat?: Prisma.EnumHeatFieldUpdateOperationsInput | $Enums.Heat;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ath?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ema200?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    distancePct?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    volumeSurge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    volumeToday?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    volumeAvg20?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    signalDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    alertHistory?: Prisma.AlertHistoryUpdateManyWithoutSignalNestedInput;
    backtests?: Prisma.BacktestUpdateManyWithoutSignalNestedInput;
};
export type SignalUncheckedUpdateWithoutJournalTradesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    strategyName?: Prisma.StringFieldUpdateOperationsInput | string;
    heat?: Prisma.EnumHeatFieldUpdateOperationsInput | $Enums.Heat;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ath?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ema200?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    distancePct?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    volumeSurge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    volumeToday?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    volumeAvg20?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    signalDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    alertHistory?: Prisma.AlertHistoryUncheckedUpdateManyWithoutSignalNestedInput;
    backtests?: Prisma.BacktestUncheckedUpdateManyWithoutSignalNestedInput;
};
export type SignalCreateWithoutBacktestsInput = {
    id?: string;
    symbol: string;
    exchange: string;
    strategyName: string;
    heat: $Enums.Heat;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ath: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ema200: runtime.Decimal | runtime.DecimalJsLike | number | string;
    distancePct: runtime.Decimal | runtime.DecimalJsLike | number | string;
    volumeSurge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    volumeToday?: bigint | number | null;
    volumeAvg20?: bigint | number | null;
    signalDate: Date | string;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    alertHistory?: Prisma.AlertHistoryCreateNestedManyWithoutSignalInput;
    journalTrades?: Prisma.JournalTradeCreateNestedManyWithoutSignalInput;
};
export type SignalUncheckedCreateWithoutBacktestsInput = {
    id?: string;
    symbol: string;
    exchange: string;
    strategyName: string;
    heat: $Enums.Heat;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ath: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ema200: runtime.Decimal | runtime.DecimalJsLike | number | string;
    distancePct: runtime.Decimal | runtime.DecimalJsLike | number | string;
    volumeSurge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    volumeToday?: bigint | number | null;
    volumeAvg20?: bigint | number | null;
    signalDate: Date | string;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    alertHistory?: Prisma.AlertHistoryUncheckedCreateNestedManyWithoutSignalInput;
    journalTrades?: Prisma.JournalTradeUncheckedCreateNestedManyWithoutSignalInput;
};
export type SignalCreateOrConnectWithoutBacktestsInput = {
    where: Prisma.SignalWhereUniqueInput;
    create: Prisma.XOR<Prisma.SignalCreateWithoutBacktestsInput, Prisma.SignalUncheckedCreateWithoutBacktestsInput>;
};
export type SignalUpsertWithoutBacktestsInput = {
    update: Prisma.XOR<Prisma.SignalUpdateWithoutBacktestsInput, Prisma.SignalUncheckedUpdateWithoutBacktestsInput>;
    create: Prisma.XOR<Prisma.SignalCreateWithoutBacktestsInput, Prisma.SignalUncheckedCreateWithoutBacktestsInput>;
    where?: Prisma.SignalWhereInput;
};
export type SignalUpdateToOneWithWhereWithoutBacktestsInput = {
    where?: Prisma.SignalWhereInput;
    data: Prisma.XOR<Prisma.SignalUpdateWithoutBacktestsInput, Prisma.SignalUncheckedUpdateWithoutBacktestsInput>;
};
export type SignalUpdateWithoutBacktestsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    strategyName?: Prisma.StringFieldUpdateOperationsInput | string;
    heat?: Prisma.EnumHeatFieldUpdateOperationsInput | $Enums.Heat;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ath?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ema200?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    distancePct?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    volumeSurge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    volumeToday?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    volumeAvg20?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    signalDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    alertHistory?: Prisma.AlertHistoryUpdateManyWithoutSignalNestedInput;
    journalTrades?: Prisma.JournalTradeUpdateManyWithoutSignalNestedInput;
};
export type SignalUncheckedUpdateWithoutBacktestsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    strategyName?: Prisma.StringFieldUpdateOperationsInput | string;
    heat?: Prisma.EnumHeatFieldUpdateOperationsInput | $Enums.Heat;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ath?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ema200?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    distancePct?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    volumeSurge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    volumeToday?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    volumeAvg20?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    signalDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    alertHistory?: Prisma.AlertHistoryUncheckedUpdateManyWithoutSignalNestedInput;
    journalTrades?: Prisma.JournalTradeUncheckedUpdateManyWithoutSignalNestedInput;
};
export type SignalCreateWithoutAlertHistoryInput = {
    id?: string;
    symbol: string;
    exchange: string;
    strategyName: string;
    heat: $Enums.Heat;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ath: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ema200: runtime.Decimal | runtime.DecimalJsLike | number | string;
    distancePct: runtime.Decimal | runtime.DecimalJsLike | number | string;
    volumeSurge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    volumeToday?: bigint | number | null;
    volumeAvg20?: bigint | number | null;
    signalDate: Date | string;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    journalTrades?: Prisma.JournalTradeCreateNestedManyWithoutSignalInput;
    backtests?: Prisma.BacktestCreateNestedManyWithoutSignalInput;
};
export type SignalUncheckedCreateWithoutAlertHistoryInput = {
    id?: string;
    symbol: string;
    exchange: string;
    strategyName: string;
    heat: $Enums.Heat;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ath: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ema200: runtime.Decimal | runtime.DecimalJsLike | number | string;
    distancePct: runtime.Decimal | runtime.DecimalJsLike | number | string;
    volumeSurge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    volumeToday?: bigint | number | null;
    volumeAvg20?: bigint | number | null;
    signalDate: Date | string;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    journalTrades?: Prisma.JournalTradeUncheckedCreateNestedManyWithoutSignalInput;
    backtests?: Prisma.BacktestUncheckedCreateNestedManyWithoutSignalInput;
};
export type SignalCreateOrConnectWithoutAlertHistoryInput = {
    where: Prisma.SignalWhereUniqueInput;
    create: Prisma.XOR<Prisma.SignalCreateWithoutAlertHistoryInput, Prisma.SignalUncheckedCreateWithoutAlertHistoryInput>;
};
export type SignalUpsertWithoutAlertHistoryInput = {
    update: Prisma.XOR<Prisma.SignalUpdateWithoutAlertHistoryInput, Prisma.SignalUncheckedUpdateWithoutAlertHistoryInput>;
    create: Prisma.XOR<Prisma.SignalCreateWithoutAlertHistoryInput, Prisma.SignalUncheckedCreateWithoutAlertHistoryInput>;
    where?: Prisma.SignalWhereInput;
};
export type SignalUpdateToOneWithWhereWithoutAlertHistoryInput = {
    where?: Prisma.SignalWhereInput;
    data: Prisma.XOR<Prisma.SignalUpdateWithoutAlertHistoryInput, Prisma.SignalUncheckedUpdateWithoutAlertHistoryInput>;
};
export type SignalUpdateWithoutAlertHistoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    strategyName?: Prisma.StringFieldUpdateOperationsInput | string;
    heat?: Prisma.EnumHeatFieldUpdateOperationsInput | $Enums.Heat;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ath?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ema200?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    distancePct?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    volumeSurge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    volumeToday?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    volumeAvg20?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    signalDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    journalTrades?: Prisma.JournalTradeUpdateManyWithoutSignalNestedInput;
    backtests?: Prisma.BacktestUpdateManyWithoutSignalNestedInput;
};
export type SignalUncheckedUpdateWithoutAlertHistoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    strategyName?: Prisma.StringFieldUpdateOperationsInput | string;
    heat?: Prisma.EnumHeatFieldUpdateOperationsInput | $Enums.Heat;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ath?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ema200?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    distancePct?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    volumeSurge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    volumeToday?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    volumeAvg20?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    signalDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    journalTrades?: Prisma.JournalTradeUncheckedUpdateManyWithoutSignalNestedInput;
    backtests?: Prisma.BacktestUncheckedUpdateManyWithoutSignalNestedInput;
};
/**
 * Count Type SignalCountOutputType
 */
export type SignalCountOutputType = {
    alertHistory: number;
    journalTrades: number;
    backtests: number;
};
export type SignalCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    alertHistory?: boolean | SignalCountOutputTypeCountAlertHistoryArgs;
    journalTrades?: boolean | SignalCountOutputTypeCountJournalTradesArgs;
    backtests?: boolean | SignalCountOutputTypeCountBacktestsArgs;
};
/**
 * SignalCountOutputType without action
 */
export type SignalCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalCountOutputType
     */
    select?: Prisma.SignalCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * SignalCountOutputType without action
 */
export type SignalCountOutputTypeCountAlertHistoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AlertHistoryWhereInput;
};
/**
 * SignalCountOutputType without action
 */
export type SignalCountOutputTypeCountJournalTradesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JournalTradeWhereInput;
};
/**
 * SignalCountOutputType without action
 */
export type SignalCountOutputTypeCountBacktestsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BacktestWhereInput;
};
export type SignalSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    symbol?: boolean;
    exchange?: boolean;
    strategyName?: boolean;
    heat?: boolean;
    price?: boolean;
    ath?: boolean;
    ema200?: boolean;
    distancePct?: boolean;
    volumeSurge?: boolean;
    volumeToday?: boolean;
    volumeAvg20?: boolean;
    signalDate?: boolean;
    details?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    alertHistory?: boolean | Prisma.Signal$alertHistoryArgs<ExtArgs>;
    journalTrades?: boolean | Prisma.Signal$journalTradesArgs<ExtArgs>;
    backtests?: boolean | Prisma.Signal$backtestsArgs<ExtArgs>;
    _count?: boolean | Prisma.SignalCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["signal"]>;
export type SignalSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    symbol?: boolean;
    exchange?: boolean;
    strategyName?: boolean;
    heat?: boolean;
    price?: boolean;
    ath?: boolean;
    ema200?: boolean;
    distancePct?: boolean;
    volumeSurge?: boolean;
    volumeToday?: boolean;
    volumeAvg20?: boolean;
    signalDate?: boolean;
    details?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["signal"]>;
export type SignalSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    symbol?: boolean;
    exchange?: boolean;
    strategyName?: boolean;
    heat?: boolean;
    price?: boolean;
    ath?: boolean;
    ema200?: boolean;
    distancePct?: boolean;
    volumeSurge?: boolean;
    volumeToday?: boolean;
    volumeAvg20?: boolean;
    signalDate?: boolean;
    details?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["signal"]>;
export type SignalSelectScalar = {
    id?: boolean;
    symbol?: boolean;
    exchange?: boolean;
    strategyName?: boolean;
    heat?: boolean;
    price?: boolean;
    ath?: boolean;
    ema200?: boolean;
    distancePct?: boolean;
    volumeSurge?: boolean;
    volumeToday?: boolean;
    volumeAvg20?: boolean;
    signalDate?: boolean;
    details?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type SignalOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "symbol" | "exchange" | "strategyName" | "heat" | "price" | "ath" | "ema200" | "distancePct" | "volumeSurge" | "volumeToday" | "volumeAvg20" | "signalDate" | "details" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["signal"]>;
export type SignalInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    alertHistory?: boolean | Prisma.Signal$alertHistoryArgs<ExtArgs>;
    journalTrades?: boolean | Prisma.Signal$journalTradesArgs<ExtArgs>;
    backtests?: boolean | Prisma.Signal$backtestsArgs<ExtArgs>;
    _count?: boolean | Prisma.SignalCountOutputTypeDefaultArgs<ExtArgs>;
};
export type SignalIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type SignalIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $SignalPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Signal";
    objects: {
        alertHistory: Prisma.$AlertHistoryPayload<ExtArgs>[];
        journalTrades: Prisma.$JournalTradePayload<ExtArgs>[];
        backtests: Prisma.$BacktestPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        symbol: string;
        exchange: string;
        strategyName: string;
        heat: $Enums.Heat;
        price: runtime.Decimal;
        ath: runtime.Decimal;
        ema200: runtime.Decimal;
        distancePct: runtime.Decimal;
        volumeSurge: runtime.Decimal | null;
        volumeToday: bigint | null;
        volumeAvg20: bigint | null;
        signalDate: Date;
        details: runtime.JsonValue;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["signal"]>;
    composites: {};
};
export type SignalGetPayload<S extends boolean | null | undefined | SignalDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SignalPayload, S>;
export type SignalCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SignalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SignalCountAggregateInputType | true;
};
export interface SignalDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Signal'];
        meta: {
            name: 'Signal';
        };
    };
    /**
     * Find zero or one Signal that matches the filter.
     * @param {SignalFindUniqueArgs} args - Arguments to find a Signal
     * @example
     * // Get one Signal
     * const signal = await prisma.signal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SignalFindUniqueArgs>(args: Prisma.SelectSubset<T, SignalFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SignalClient<runtime.Types.Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Signal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SignalFindUniqueOrThrowArgs} args - Arguments to find a Signal
     * @example
     * // Get one Signal
     * const signal = await prisma.signal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SignalFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SignalFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SignalClient<runtime.Types.Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Signal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalFindFirstArgs} args - Arguments to find a Signal
     * @example
     * // Get one Signal
     * const signal = await prisma.signal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SignalFindFirstArgs>(args?: Prisma.SelectSubset<T, SignalFindFirstArgs<ExtArgs>>): Prisma.Prisma__SignalClient<runtime.Types.Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Signal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalFindFirstOrThrowArgs} args - Arguments to find a Signal
     * @example
     * // Get one Signal
     * const signal = await prisma.signal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SignalFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SignalFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SignalClient<runtime.Types.Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Signals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Signals
     * const signals = await prisma.signal.findMany()
     *
     * // Get first 10 Signals
     * const signals = await prisma.signal.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const signalWithIdOnly = await prisma.signal.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SignalFindManyArgs>(args?: Prisma.SelectSubset<T, SignalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Signal.
     * @param {SignalCreateArgs} args - Arguments to create a Signal.
     * @example
     * // Create one Signal
     * const Signal = await prisma.signal.create({
     *   data: {
     *     // ... data to create a Signal
     *   }
     * })
     *
     */
    create<T extends SignalCreateArgs>(args: Prisma.SelectSubset<T, SignalCreateArgs<ExtArgs>>): Prisma.Prisma__SignalClient<runtime.Types.Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Signals.
     * @param {SignalCreateManyArgs} args - Arguments to create many Signals.
     * @example
     * // Create many Signals
     * const signal = await prisma.signal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SignalCreateManyArgs>(args?: Prisma.SelectSubset<T, SignalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Signals and returns the data saved in the database.
     * @param {SignalCreateManyAndReturnArgs} args - Arguments to create many Signals.
     * @example
     * // Create many Signals
     * const signal = await prisma.signal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Signals and only return the `id`
     * const signalWithIdOnly = await prisma.signal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SignalCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SignalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Signal.
     * @param {SignalDeleteArgs} args - Arguments to delete one Signal.
     * @example
     * // Delete one Signal
     * const Signal = await prisma.signal.delete({
     *   where: {
     *     // ... filter to delete one Signal
     *   }
     * })
     *
     */
    delete<T extends SignalDeleteArgs>(args: Prisma.SelectSubset<T, SignalDeleteArgs<ExtArgs>>): Prisma.Prisma__SignalClient<runtime.Types.Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Signal.
     * @param {SignalUpdateArgs} args - Arguments to update one Signal.
     * @example
     * // Update one Signal
     * const signal = await prisma.signal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SignalUpdateArgs>(args: Prisma.SelectSubset<T, SignalUpdateArgs<ExtArgs>>): Prisma.Prisma__SignalClient<runtime.Types.Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Signals.
     * @param {SignalDeleteManyArgs} args - Arguments to filter Signals to delete.
     * @example
     * // Delete a few Signals
     * const { count } = await prisma.signal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SignalDeleteManyArgs>(args?: Prisma.SelectSubset<T, SignalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Signals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Signals
     * const signal = await prisma.signal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SignalUpdateManyArgs>(args: Prisma.SelectSubset<T, SignalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Signals and returns the data updated in the database.
     * @param {SignalUpdateManyAndReturnArgs} args - Arguments to update many Signals.
     * @example
     * // Update many Signals
     * const signal = await prisma.signal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Signals and only return the `id`
     * const signalWithIdOnly = await prisma.signal.updateManyAndReturn({
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
    updateManyAndReturn<T extends SignalUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SignalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Signal.
     * @param {SignalUpsertArgs} args - Arguments to update or create a Signal.
     * @example
     * // Update or create a Signal
     * const signal = await prisma.signal.upsert({
     *   create: {
     *     // ... data to create a Signal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Signal we want to update
     *   }
     * })
     */
    upsert<T extends SignalUpsertArgs>(args: Prisma.SelectSubset<T, SignalUpsertArgs<ExtArgs>>): Prisma.Prisma__SignalClient<runtime.Types.Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Signals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalCountArgs} args - Arguments to filter Signals to count.
     * @example
     * // Count the number of Signals
     * const count = await prisma.signal.count({
     *   where: {
     *     // ... the filter for the Signals we want to count
     *   }
     * })
    **/
    count<T extends SignalCountArgs>(args?: Prisma.Subset<T, SignalCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SignalCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Signal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SignalAggregateArgs>(args: Prisma.Subset<T, SignalAggregateArgs>): Prisma.PrismaPromise<GetSignalAggregateType<T>>;
    /**
     * Group by Signal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalGroupByArgs} args - Group by arguments.
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
    groupBy<T extends SignalGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SignalGroupByArgs['orderBy'];
    } : {
        orderBy?: SignalGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SignalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSignalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Signal model
     */
    readonly fields: SignalFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Signal.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__SignalClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    alertHistory<T extends Prisma.Signal$alertHistoryArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Signal$alertHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    journalTrades<T extends Prisma.Signal$journalTradesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Signal$journalTradesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JournalTradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    backtests<T extends Prisma.Signal$backtestsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Signal$backtestsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BacktestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Signal model
 */
export interface SignalFieldRefs {
    readonly id: Prisma.FieldRef<"Signal", 'String'>;
    readonly symbol: Prisma.FieldRef<"Signal", 'String'>;
    readonly exchange: Prisma.FieldRef<"Signal", 'String'>;
    readonly strategyName: Prisma.FieldRef<"Signal", 'String'>;
    readonly heat: Prisma.FieldRef<"Signal", 'Heat'>;
    readonly price: Prisma.FieldRef<"Signal", 'Decimal'>;
    readonly ath: Prisma.FieldRef<"Signal", 'Decimal'>;
    readonly ema200: Prisma.FieldRef<"Signal", 'Decimal'>;
    readonly distancePct: Prisma.FieldRef<"Signal", 'Decimal'>;
    readonly volumeSurge: Prisma.FieldRef<"Signal", 'Decimal'>;
    readonly volumeToday: Prisma.FieldRef<"Signal", 'BigInt'>;
    readonly volumeAvg20: Prisma.FieldRef<"Signal", 'BigInt'>;
    readonly signalDate: Prisma.FieldRef<"Signal", 'DateTime'>;
    readonly details: Prisma.FieldRef<"Signal", 'Json'>;
    readonly isActive: Prisma.FieldRef<"Signal", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Signal", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Signal", 'DateTime'>;
}
/**
 * Signal findUnique
 */
export type SignalFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Signal to fetch.
     */
    where: Prisma.SignalWhereUniqueInput;
};
/**
 * Signal findUniqueOrThrow
 */
export type SignalFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Signal to fetch.
     */
    where: Prisma.SignalWhereUniqueInput;
};
/**
 * Signal findFirst
 */
export type SignalFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Signal to fetch.
     */
    where?: Prisma.SignalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Signals to fetch.
     */
    orderBy?: Prisma.SignalOrderByWithRelationInput | Prisma.SignalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Signals.
     */
    cursor?: Prisma.SignalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Signals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Signals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Signals.
     */
    distinct?: Prisma.SignalScalarFieldEnum | Prisma.SignalScalarFieldEnum[];
};
/**
 * Signal findFirstOrThrow
 */
export type SignalFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Signal to fetch.
     */
    where?: Prisma.SignalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Signals to fetch.
     */
    orderBy?: Prisma.SignalOrderByWithRelationInput | Prisma.SignalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Signals.
     */
    cursor?: Prisma.SignalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Signals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Signals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Signals.
     */
    distinct?: Prisma.SignalScalarFieldEnum | Prisma.SignalScalarFieldEnum[];
};
/**
 * Signal findMany
 */
export type SignalFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Signals to fetch.
     */
    where?: Prisma.SignalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Signals to fetch.
     */
    orderBy?: Prisma.SignalOrderByWithRelationInput | Prisma.SignalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Signals.
     */
    cursor?: Prisma.SignalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Signals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Signals.
     */
    skip?: number;
    distinct?: Prisma.SignalScalarFieldEnum | Prisma.SignalScalarFieldEnum[];
};
/**
 * Signal create
 */
export type SignalCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a Signal.
     */
    data: Prisma.XOR<Prisma.SignalCreateInput, Prisma.SignalUncheckedCreateInput>;
};
/**
 * Signal createMany
 */
export type SignalCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Signals.
     */
    data: Prisma.SignalCreateManyInput | Prisma.SignalCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Signal createManyAndReturn
 */
export type SignalCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signal
     */
    select?: Prisma.SignalSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Signal
     */
    omit?: Prisma.SignalOmit<ExtArgs> | null;
    /**
     * The data used to create many Signals.
     */
    data: Prisma.SignalCreateManyInput | Prisma.SignalCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Signal update
 */
export type SignalUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a Signal.
     */
    data: Prisma.XOR<Prisma.SignalUpdateInput, Prisma.SignalUncheckedUpdateInput>;
    /**
     * Choose, which Signal to update.
     */
    where: Prisma.SignalWhereUniqueInput;
};
/**
 * Signal updateMany
 */
export type SignalUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Signals.
     */
    data: Prisma.XOR<Prisma.SignalUpdateManyMutationInput, Prisma.SignalUncheckedUpdateManyInput>;
    /**
     * Filter which Signals to update
     */
    where?: Prisma.SignalWhereInput;
    /**
     * Limit how many Signals to update.
     */
    limit?: number;
};
/**
 * Signal updateManyAndReturn
 */
export type SignalUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signal
     */
    select?: Prisma.SignalSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Signal
     */
    omit?: Prisma.SignalOmit<ExtArgs> | null;
    /**
     * The data used to update Signals.
     */
    data: Prisma.XOR<Prisma.SignalUpdateManyMutationInput, Prisma.SignalUncheckedUpdateManyInput>;
    /**
     * Filter which Signals to update
     */
    where?: Prisma.SignalWhereInput;
    /**
     * Limit how many Signals to update.
     */
    limit?: number;
};
/**
 * Signal upsert
 */
export type SignalUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the Signal to update in case it exists.
     */
    where: Prisma.SignalWhereUniqueInput;
    /**
     * In case the Signal found by the `where` argument doesn't exist, create a new Signal with this data.
     */
    create: Prisma.XOR<Prisma.SignalCreateInput, Prisma.SignalUncheckedCreateInput>;
    /**
     * In case the Signal was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.SignalUpdateInput, Prisma.SignalUncheckedUpdateInput>;
};
/**
 * Signal delete
 */
export type SignalDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which Signal to delete.
     */
    where: Prisma.SignalWhereUniqueInput;
};
/**
 * Signal deleteMany
 */
export type SignalDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Signals to delete
     */
    where?: Prisma.SignalWhereInput;
    /**
     * Limit how many Signals to delete.
     */
    limit?: number;
};
/**
 * Signal.alertHistory
 */
export type Signal$alertHistoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: Prisma.AlertHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AlertHistory
     */
    omit?: Prisma.AlertHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AlertHistoryInclude<ExtArgs> | null;
    where?: Prisma.AlertHistoryWhereInput;
    orderBy?: Prisma.AlertHistoryOrderByWithRelationInput | Prisma.AlertHistoryOrderByWithRelationInput[];
    cursor?: Prisma.AlertHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AlertHistoryScalarFieldEnum | Prisma.AlertHistoryScalarFieldEnum[];
};
/**
 * Signal.journalTrades
 */
export type Signal$journalTradesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalTrade
     */
    select?: Prisma.JournalTradeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the JournalTrade
     */
    omit?: Prisma.JournalTradeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.JournalTradeInclude<ExtArgs> | null;
    where?: Prisma.JournalTradeWhereInput;
    orderBy?: Prisma.JournalTradeOrderByWithRelationInput | Prisma.JournalTradeOrderByWithRelationInput[];
    cursor?: Prisma.JournalTradeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JournalTradeScalarFieldEnum | Prisma.JournalTradeScalarFieldEnum[];
};
/**
 * Signal.backtests
 */
export type Signal$backtestsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.BacktestWhereInput;
    orderBy?: Prisma.BacktestOrderByWithRelationInput | Prisma.BacktestOrderByWithRelationInput[];
    cursor?: Prisma.BacktestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BacktestScalarFieldEnum | Prisma.BacktestScalarFieldEnum[];
};
/**
 * Signal without action
 */
export type SignalDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=Signal.d.ts.map
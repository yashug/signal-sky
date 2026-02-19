import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model MarketHealth
 *
 */
export type MarketHealthModel = runtime.Types.Result.DefaultSelection<Prisma.$MarketHealthPayload>;
export type AggregateMarketHealth = {
    _count: MarketHealthCountAggregateOutputType | null;
    _avg: MarketHealthAvgAggregateOutputType | null;
    _sum: MarketHealthSumAggregateOutputType | null;
    _min: MarketHealthMinAggregateOutputType | null;
    _max: MarketHealthMaxAggregateOutputType | null;
};
export type MarketHealthAvgAggregateOutputType = {
    id: number | null;
    totalStocks: number | null;
    aboveEma200: number | null;
    pctAbove: runtime.Decimal | null;
};
export type MarketHealthSumAggregateOutputType = {
    id: number | null;
    totalStocks: number | null;
    aboveEma200: number | null;
    pctAbove: runtime.Decimal | null;
};
export type MarketHealthMinAggregateOutputType = {
    id: number | null;
    universe: string | null;
    date: Date | null;
    totalStocks: number | null;
    aboveEma200: number | null;
    pctAbove: runtime.Decimal | null;
    createdAt: Date | null;
};
export type MarketHealthMaxAggregateOutputType = {
    id: number | null;
    universe: string | null;
    date: Date | null;
    totalStocks: number | null;
    aboveEma200: number | null;
    pctAbove: runtime.Decimal | null;
    createdAt: Date | null;
};
export type MarketHealthCountAggregateOutputType = {
    id: number;
    universe: number;
    date: number;
    totalStocks: number;
    aboveEma200: number;
    pctAbove: number;
    createdAt: number;
    _all: number;
};
export type MarketHealthAvgAggregateInputType = {
    id?: true;
    totalStocks?: true;
    aboveEma200?: true;
    pctAbove?: true;
};
export type MarketHealthSumAggregateInputType = {
    id?: true;
    totalStocks?: true;
    aboveEma200?: true;
    pctAbove?: true;
};
export type MarketHealthMinAggregateInputType = {
    id?: true;
    universe?: true;
    date?: true;
    totalStocks?: true;
    aboveEma200?: true;
    pctAbove?: true;
    createdAt?: true;
};
export type MarketHealthMaxAggregateInputType = {
    id?: true;
    universe?: true;
    date?: true;
    totalStocks?: true;
    aboveEma200?: true;
    pctAbove?: true;
    createdAt?: true;
};
export type MarketHealthCountAggregateInputType = {
    id?: true;
    universe?: true;
    date?: true;
    totalStocks?: true;
    aboveEma200?: true;
    pctAbove?: true;
    createdAt?: true;
    _all?: true;
};
export type MarketHealthAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MarketHealth to aggregate.
     */
    where?: Prisma.MarketHealthWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MarketHealths to fetch.
     */
    orderBy?: Prisma.MarketHealthOrderByWithRelationInput | Prisma.MarketHealthOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.MarketHealthWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MarketHealths from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MarketHealths.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned MarketHealths
    **/
    _count?: true | MarketHealthCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: MarketHealthAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: MarketHealthSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: MarketHealthMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: MarketHealthMaxAggregateInputType;
};
export type GetMarketHealthAggregateType<T extends MarketHealthAggregateArgs> = {
    [P in keyof T & keyof AggregateMarketHealth]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMarketHealth[P]> : Prisma.GetScalarType<T[P], AggregateMarketHealth[P]>;
};
export type MarketHealthGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MarketHealthWhereInput;
    orderBy?: Prisma.MarketHealthOrderByWithAggregationInput | Prisma.MarketHealthOrderByWithAggregationInput[];
    by: Prisma.MarketHealthScalarFieldEnum[] | Prisma.MarketHealthScalarFieldEnum;
    having?: Prisma.MarketHealthScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MarketHealthCountAggregateInputType | true;
    _avg?: MarketHealthAvgAggregateInputType;
    _sum?: MarketHealthSumAggregateInputType;
    _min?: MarketHealthMinAggregateInputType;
    _max?: MarketHealthMaxAggregateInputType;
};
export type MarketHealthGroupByOutputType = {
    id: number;
    universe: string;
    date: Date;
    totalStocks: number;
    aboveEma200: number;
    pctAbove: runtime.Decimal;
    createdAt: Date;
    _count: MarketHealthCountAggregateOutputType | null;
    _avg: MarketHealthAvgAggregateOutputType | null;
    _sum: MarketHealthSumAggregateOutputType | null;
    _min: MarketHealthMinAggregateOutputType | null;
    _max: MarketHealthMaxAggregateOutputType | null;
};
type GetMarketHealthGroupByPayload<T extends MarketHealthGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MarketHealthGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MarketHealthGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MarketHealthGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MarketHealthGroupByOutputType[P]>;
}>>;
export type MarketHealthWhereInput = {
    AND?: Prisma.MarketHealthWhereInput | Prisma.MarketHealthWhereInput[];
    OR?: Prisma.MarketHealthWhereInput[];
    NOT?: Prisma.MarketHealthWhereInput | Prisma.MarketHealthWhereInput[];
    id?: Prisma.IntFilter<"MarketHealth"> | number;
    universe?: Prisma.StringFilter<"MarketHealth"> | string;
    date?: Prisma.DateTimeFilter<"MarketHealth"> | Date | string;
    totalStocks?: Prisma.IntFilter<"MarketHealth"> | number;
    aboveEma200?: Prisma.IntFilter<"MarketHealth"> | number;
    pctAbove?: Prisma.DecimalFilter<"MarketHealth"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"MarketHealth"> | Date | string;
};
export type MarketHealthOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    universe?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    totalStocks?: Prisma.SortOrder;
    aboveEma200?: Prisma.SortOrder;
    pctAbove?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MarketHealthWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    universe_date?: Prisma.MarketHealthUniverseDateCompoundUniqueInput;
    AND?: Prisma.MarketHealthWhereInput | Prisma.MarketHealthWhereInput[];
    OR?: Prisma.MarketHealthWhereInput[];
    NOT?: Prisma.MarketHealthWhereInput | Prisma.MarketHealthWhereInput[];
    universe?: Prisma.StringFilter<"MarketHealth"> | string;
    date?: Prisma.DateTimeFilter<"MarketHealth"> | Date | string;
    totalStocks?: Prisma.IntFilter<"MarketHealth"> | number;
    aboveEma200?: Prisma.IntFilter<"MarketHealth"> | number;
    pctAbove?: Prisma.DecimalFilter<"MarketHealth"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"MarketHealth"> | Date | string;
}, "id" | "universe_date">;
export type MarketHealthOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    universe?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    totalStocks?: Prisma.SortOrder;
    aboveEma200?: Prisma.SortOrder;
    pctAbove?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.MarketHealthCountOrderByAggregateInput;
    _avg?: Prisma.MarketHealthAvgOrderByAggregateInput;
    _max?: Prisma.MarketHealthMaxOrderByAggregateInput;
    _min?: Prisma.MarketHealthMinOrderByAggregateInput;
    _sum?: Prisma.MarketHealthSumOrderByAggregateInput;
};
export type MarketHealthScalarWhereWithAggregatesInput = {
    AND?: Prisma.MarketHealthScalarWhereWithAggregatesInput | Prisma.MarketHealthScalarWhereWithAggregatesInput[];
    OR?: Prisma.MarketHealthScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MarketHealthScalarWhereWithAggregatesInput | Prisma.MarketHealthScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"MarketHealth"> | number;
    universe?: Prisma.StringWithAggregatesFilter<"MarketHealth"> | string;
    date?: Prisma.DateTimeWithAggregatesFilter<"MarketHealth"> | Date | string;
    totalStocks?: Prisma.IntWithAggregatesFilter<"MarketHealth"> | number;
    aboveEma200?: Prisma.IntWithAggregatesFilter<"MarketHealth"> | number;
    pctAbove?: Prisma.DecimalWithAggregatesFilter<"MarketHealth"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MarketHealth"> | Date | string;
};
export type MarketHealthCreateInput = {
    universe: string;
    date: Date | string;
    totalStocks: number;
    aboveEma200: number;
    pctAbove: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
};
export type MarketHealthUncheckedCreateInput = {
    id?: number;
    universe: string;
    date: Date | string;
    totalStocks: number;
    aboveEma200: number;
    pctAbove: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
};
export type MarketHealthUpdateInput = {
    universe?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    totalStocks?: Prisma.IntFieldUpdateOperationsInput | number;
    aboveEma200?: Prisma.IntFieldUpdateOperationsInput | number;
    pctAbove?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MarketHealthUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    universe?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    totalStocks?: Prisma.IntFieldUpdateOperationsInput | number;
    aboveEma200?: Prisma.IntFieldUpdateOperationsInput | number;
    pctAbove?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MarketHealthCreateManyInput = {
    id?: number;
    universe: string;
    date: Date | string;
    totalStocks: number;
    aboveEma200: number;
    pctAbove: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
};
export type MarketHealthUpdateManyMutationInput = {
    universe?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    totalStocks?: Prisma.IntFieldUpdateOperationsInput | number;
    aboveEma200?: Prisma.IntFieldUpdateOperationsInput | number;
    pctAbove?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MarketHealthUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    universe?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    totalStocks?: Prisma.IntFieldUpdateOperationsInput | number;
    aboveEma200?: Prisma.IntFieldUpdateOperationsInput | number;
    pctAbove?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MarketHealthUniverseDateCompoundUniqueInput = {
    universe: string;
    date: Date | string;
};
export type MarketHealthCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    universe?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    totalStocks?: Prisma.SortOrder;
    aboveEma200?: Prisma.SortOrder;
    pctAbove?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MarketHealthAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    totalStocks?: Prisma.SortOrder;
    aboveEma200?: Prisma.SortOrder;
    pctAbove?: Prisma.SortOrder;
};
export type MarketHealthMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    universe?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    totalStocks?: Prisma.SortOrder;
    aboveEma200?: Prisma.SortOrder;
    pctAbove?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MarketHealthMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    universe?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    totalStocks?: Prisma.SortOrder;
    aboveEma200?: Prisma.SortOrder;
    pctAbove?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MarketHealthSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    totalStocks?: Prisma.SortOrder;
    aboveEma200?: Prisma.SortOrder;
    pctAbove?: Prisma.SortOrder;
};
export type MarketHealthSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    universe?: boolean;
    date?: boolean;
    totalStocks?: boolean;
    aboveEma200?: boolean;
    pctAbove?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["marketHealth"]>;
export type MarketHealthSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    universe?: boolean;
    date?: boolean;
    totalStocks?: boolean;
    aboveEma200?: boolean;
    pctAbove?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["marketHealth"]>;
export type MarketHealthSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    universe?: boolean;
    date?: boolean;
    totalStocks?: boolean;
    aboveEma200?: boolean;
    pctAbove?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["marketHealth"]>;
export type MarketHealthSelectScalar = {
    id?: boolean;
    universe?: boolean;
    date?: boolean;
    totalStocks?: boolean;
    aboveEma200?: boolean;
    pctAbove?: boolean;
    createdAt?: boolean;
};
export type MarketHealthOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "universe" | "date" | "totalStocks" | "aboveEma200" | "pctAbove" | "createdAt", ExtArgs["result"]["marketHealth"]>;
export type $MarketHealthPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MarketHealth";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        universe: string;
        date: Date;
        totalStocks: number;
        aboveEma200: number;
        pctAbove: runtime.Decimal;
        createdAt: Date;
    }, ExtArgs["result"]["marketHealth"]>;
    composites: {};
};
export type MarketHealthGetPayload<S extends boolean | null | undefined | MarketHealthDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MarketHealthPayload, S>;
export type MarketHealthCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MarketHealthFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MarketHealthCountAggregateInputType | true;
};
export interface MarketHealthDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MarketHealth'];
        meta: {
            name: 'MarketHealth';
        };
    };
    /**
     * Find zero or one MarketHealth that matches the filter.
     * @param {MarketHealthFindUniqueArgs} args - Arguments to find a MarketHealth
     * @example
     * // Get one MarketHealth
     * const marketHealth = await prisma.marketHealth.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MarketHealthFindUniqueArgs>(args: Prisma.SelectSubset<T, MarketHealthFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MarketHealthClient<runtime.Types.Result.GetResult<Prisma.$MarketHealthPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one MarketHealth that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MarketHealthFindUniqueOrThrowArgs} args - Arguments to find a MarketHealth
     * @example
     * // Get one MarketHealth
     * const marketHealth = await prisma.marketHealth.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MarketHealthFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MarketHealthFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MarketHealthClient<runtime.Types.Result.GetResult<Prisma.$MarketHealthPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MarketHealth that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketHealthFindFirstArgs} args - Arguments to find a MarketHealth
     * @example
     * // Get one MarketHealth
     * const marketHealth = await prisma.marketHealth.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MarketHealthFindFirstArgs>(args?: Prisma.SelectSubset<T, MarketHealthFindFirstArgs<ExtArgs>>): Prisma.Prisma__MarketHealthClient<runtime.Types.Result.GetResult<Prisma.$MarketHealthPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MarketHealth that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketHealthFindFirstOrThrowArgs} args - Arguments to find a MarketHealth
     * @example
     * // Get one MarketHealth
     * const marketHealth = await prisma.marketHealth.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MarketHealthFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MarketHealthFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MarketHealthClient<runtime.Types.Result.GetResult<Prisma.$MarketHealthPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more MarketHealths that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketHealthFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MarketHealths
     * const marketHealths = await prisma.marketHealth.findMany()
     *
     * // Get first 10 MarketHealths
     * const marketHealths = await prisma.marketHealth.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const marketHealthWithIdOnly = await prisma.marketHealth.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MarketHealthFindManyArgs>(args?: Prisma.SelectSubset<T, MarketHealthFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MarketHealthPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a MarketHealth.
     * @param {MarketHealthCreateArgs} args - Arguments to create a MarketHealth.
     * @example
     * // Create one MarketHealth
     * const MarketHealth = await prisma.marketHealth.create({
     *   data: {
     *     // ... data to create a MarketHealth
     *   }
     * })
     *
     */
    create<T extends MarketHealthCreateArgs>(args: Prisma.SelectSubset<T, MarketHealthCreateArgs<ExtArgs>>): Prisma.Prisma__MarketHealthClient<runtime.Types.Result.GetResult<Prisma.$MarketHealthPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many MarketHealths.
     * @param {MarketHealthCreateManyArgs} args - Arguments to create many MarketHealths.
     * @example
     * // Create many MarketHealths
     * const marketHealth = await prisma.marketHealth.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MarketHealthCreateManyArgs>(args?: Prisma.SelectSubset<T, MarketHealthCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many MarketHealths and returns the data saved in the database.
     * @param {MarketHealthCreateManyAndReturnArgs} args - Arguments to create many MarketHealths.
     * @example
     * // Create many MarketHealths
     * const marketHealth = await prisma.marketHealth.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many MarketHealths and only return the `id`
     * const marketHealthWithIdOnly = await prisma.marketHealth.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MarketHealthCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MarketHealthCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MarketHealthPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a MarketHealth.
     * @param {MarketHealthDeleteArgs} args - Arguments to delete one MarketHealth.
     * @example
     * // Delete one MarketHealth
     * const MarketHealth = await prisma.marketHealth.delete({
     *   where: {
     *     // ... filter to delete one MarketHealth
     *   }
     * })
     *
     */
    delete<T extends MarketHealthDeleteArgs>(args: Prisma.SelectSubset<T, MarketHealthDeleteArgs<ExtArgs>>): Prisma.Prisma__MarketHealthClient<runtime.Types.Result.GetResult<Prisma.$MarketHealthPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one MarketHealth.
     * @param {MarketHealthUpdateArgs} args - Arguments to update one MarketHealth.
     * @example
     * // Update one MarketHealth
     * const marketHealth = await prisma.marketHealth.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MarketHealthUpdateArgs>(args: Prisma.SelectSubset<T, MarketHealthUpdateArgs<ExtArgs>>): Prisma.Prisma__MarketHealthClient<runtime.Types.Result.GetResult<Prisma.$MarketHealthPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more MarketHealths.
     * @param {MarketHealthDeleteManyArgs} args - Arguments to filter MarketHealths to delete.
     * @example
     * // Delete a few MarketHealths
     * const { count } = await prisma.marketHealth.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MarketHealthDeleteManyArgs>(args?: Prisma.SelectSubset<T, MarketHealthDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MarketHealths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketHealthUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MarketHealths
     * const marketHealth = await prisma.marketHealth.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MarketHealthUpdateManyArgs>(args: Prisma.SelectSubset<T, MarketHealthUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MarketHealths and returns the data updated in the database.
     * @param {MarketHealthUpdateManyAndReturnArgs} args - Arguments to update many MarketHealths.
     * @example
     * // Update many MarketHealths
     * const marketHealth = await prisma.marketHealth.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more MarketHealths and only return the `id`
     * const marketHealthWithIdOnly = await prisma.marketHealth.updateManyAndReturn({
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
    updateManyAndReturn<T extends MarketHealthUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MarketHealthUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MarketHealthPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one MarketHealth.
     * @param {MarketHealthUpsertArgs} args - Arguments to update or create a MarketHealth.
     * @example
     * // Update or create a MarketHealth
     * const marketHealth = await prisma.marketHealth.upsert({
     *   create: {
     *     // ... data to create a MarketHealth
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MarketHealth we want to update
     *   }
     * })
     */
    upsert<T extends MarketHealthUpsertArgs>(args: Prisma.SelectSubset<T, MarketHealthUpsertArgs<ExtArgs>>): Prisma.Prisma__MarketHealthClient<runtime.Types.Result.GetResult<Prisma.$MarketHealthPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of MarketHealths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketHealthCountArgs} args - Arguments to filter MarketHealths to count.
     * @example
     * // Count the number of MarketHealths
     * const count = await prisma.marketHealth.count({
     *   where: {
     *     // ... the filter for the MarketHealths we want to count
     *   }
     * })
    **/
    count<T extends MarketHealthCountArgs>(args?: Prisma.Subset<T, MarketHealthCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MarketHealthCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a MarketHealth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketHealthAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MarketHealthAggregateArgs>(args: Prisma.Subset<T, MarketHealthAggregateArgs>): Prisma.PrismaPromise<GetMarketHealthAggregateType<T>>;
    /**
     * Group by MarketHealth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketHealthGroupByArgs} args - Group by arguments.
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
    groupBy<T extends MarketHealthGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MarketHealthGroupByArgs['orderBy'];
    } : {
        orderBy?: MarketHealthGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MarketHealthGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMarketHealthGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the MarketHealth model
     */
    readonly fields: MarketHealthFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for MarketHealth.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__MarketHealthClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the MarketHealth model
 */
export interface MarketHealthFieldRefs {
    readonly id: Prisma.FieldRef<"MarketHealth", 'Int'>;
    readonly universe: Prisma.FieldRef<"MarketHealth", 'String'>;
    readonly date: Prisma.FieldRef<"MarketHealth", 'DateTime'>;
    readonly totalStocks: Prisma.FieldRef<"MarketHealth", 'Int'>;
    readonly aboveEma200: Prisma.FieldRef<"MarketHealth", 'Int'>;
    readonly pctAbove: Prisma.FieldRef<"MarketHealth", 'Decimal'>;
    readonly createdAt: Prisma.FieldRef<"MarketHealth", 'DateTime'>;
}
/**
 * MarketHealth findUnique
 */
export type MarketHealthFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketHealth
     */
    select?: Prisma.MarketHealthSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MarketHealth
     */
    omit?: Prisma.MarketHealthOmit<ExtArgs> | null;
    /**
     * Filter, which MarketHealth to fetch.
     */
    where: Prisma.MarketHealthWhereUniqueInput;
};
/**
 * MarketHealth findUniqueOrThrow
 */
export type MarketHealthFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketHealth
     */
    select?: Prisma.MarketHealthSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MarketHealth
     */
    omit?: Prisma.MarketHealthOmit<ExtArgs> | null;
    /**
     * Filter, which MarketHealth to fetch.
     */
    where: Prisma.MarketHealthWhereUniqueInput;
};
/**
 * MarketHealth findFirst
 */
export type MarketHealthFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketHealth
     */
    select?: Prisma.MarketHealthSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MarketHealth
     */
    omit?: Prisma.MarketHealthOmit<ExtArgs> | null;
    /**
     * Filter, which MarketHealth to fetch.
     */
    where?: Prisma.MarketHealthWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MarketHealths to fetch.
     */
    orderBy?: Prisma.MarketHealthOrderByWithRelationInput | Prisma.MarketHealthOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MarketHealths.
     */
    cursor?: Prisma.MarketHealthWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MarketHealths from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MarketHealths.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MarketHealths.
     */
    distinct?: Prisma.MarketHealthScalarFieldEnum | Prisma.MarketHealthScalarFieldEnum[];
};
/**
 * MarketHealth findFirstOrThrow
 */
export type MarketHealthFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketHealth
     */
    select?: Prisma.MarketHealthSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MarketHealth
     */
    omit?: Prisma.MarketHealthOmit<ExtArgs> | null;
    /**
     * Filter, which MarketHealth to fetch.
     */
    where?: Prisma.MarketHealthWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MarketHealths to fetch.
     */
    orderBy?: Prisma.MarketHealthOrderByWithRelationInput | Prisma.MarketHealthOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MarketHealths.
     */
    cursor?: Prisma.MarketHealthWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MarketHealths from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MarketHealths.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MarketHealths.
     */
    distinct?: Prisma.MarketHealthScalarFieldEnum | Prisma.MarketHealthScalarFieldEnum[];
};
/**
 * MarketHealth findMany
 */
export type MarketHealthFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketHealth
     */
    select?: Prisma.MarketHealthSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MarketHealth
     */
    omit?: Prisma.MarketHealthOmit<ExtArgs> | null;
    /**
     * Filter, which MarketHealths to fetch.
     */
    where?: Prisma.MarketHealthWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MarketHealths to fetch.
     */
    orderBy?: Prisma.MarketHealthOrderByWithRelationInput | Prisma.MarketHealthOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing MarketHealths.
     */
    cursor?: Prisma.MarketHealthWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MarketHealths from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MarketHealths.
     */
    skip?: number;
    distinct?: Prisma.MarketHealthScalarFieldEnum | Prisma.MarketHealthScalarFieldEnum[];
};
/**
 * MarketHealth create
 */
export type MarketHealthCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketHealth
     */
    select?: Prisma.MarketHealthSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MarketHealth
     */
    omit?: Prisma.MarketHealthOmit<ExtArgs> | null;
    /**
     * The data needed to create a MarketHealth.
     */
    data: Prisma.XOR<Prisma.MarketHealthCreateInput, Prisma.MarketHealthUncheckedCreateInput>;
};
/**
 * MarketHealth createMany
 */
export type MarketHealthCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many MarketHealths.
     */
    data: Prisma.MarketHealthCreateManyInput | Prisma.MarketHealthCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * MarketHealth createManyAndReturn
 */
export type MarketHealthCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketHealth
     */
    select?: Prisma.MarketHealthSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MarketHealth
     */
    omit?: Prisma.MarketHealthOmit<ExtArgs> | null;
    /**
     * The data used to create many MarketHealths.
     */
    data: Prisma.MarketHealthCreateManyInput | Prisma.MarketHealthCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * MarketHealth update
 */
export type MarketHealthUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketHealth
     */
    select?: Prisma.MarketHealthSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MarketHealth
     */
    omit?: Prisma.MarketHealthOmit<ExtArgs> | null;
    /**
     * The data needed to update a MarketHealth.
     */
    data: Prisma.XOR<Prisma.MarketHealthUpdateInput, Prisma.MarketHealthUncheckedUpdateInput>;
    /**
     * Choose, which MarketHealth to update.
     */
    where: Prisma.MarketHealthWhereUniqueInput;
};
/**
 * MarketHealth updateMany
 */
export type MarketHealthUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update MarketHealths.
     */
    data: Prisma.XOR<Prisma.MarketHealthUpdateManyMutationInput, Prisma.MarketHealthUncheckedUpdateManyInput>;
    /**
     * Filter which MarketHealths to update
     */
    where?: Prisma.MarketHealthWhereInput;
    /**
     * Limit how many MarketHealths to update.
     */
    limit?: number;
};
/**
 * MarketHealth updateManyAndReturn
 */
export type MarketHealthUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketHealth
     */
    select?: Prisma.MarketHealthSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MarketHealth
     */
    omit?: Prisma.MarketHealthOmit<ExtArgs> | null;
    /**
     * The data used to update MarketHealths.
     */
    data: Prisma.XOR<Prisma.MarketHealthUpdateManyMutationInput, Prisma.MarketHealthUncheckedUpdateManyInput>;
    /**
     * Filter which MarketHealths to update
     */
    where?: Prisma.MarketHealthWhereInput;
    /**
     * Limit how many MarketHealths to update.
     */
    limit?: number;
};
/**
 * MarketHealth upsert
 */
export type MarketHealthUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketHealth
     */
    select?: Prisma.MarketHealthSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MarketHealth
     */
    omit?: Prisma.MarketHealthOmit<ExtArgs> | null;
    /**
     * The filter to search for the MarketHealth to update in case it exists.
     */
    where: Prisma.MarketHealthWhereUniqueInput;
    /**
     * In case the MarketHealth found by the `where` argument doesn't exist, create a new MarketHealth with this data.
     */
    create: Prisma.XOR<Prisma.MarketHealthCreateInput, Prisma.MarketHealthUncheckedCreateInput>;
    /**
     * In case the MarketHealth was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.MarketHealthUpdateInput, Prisma.MarketHealthUncheckedUpdateInput>;
};
/**
 * MarketHealth delete
 */
export type MarketHealthDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketHealth
     */
    select?: Prisma.MarketHealthSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MarketHealth
     */
    omit?: Prisma.MarketHealthOmit<ExtArgs> | null;
    /**
     * Filter which MarketHealth to delete.
     */
    where: Prisma.MarketHealthWhereUniqueInput;
};
/**
 * MarketHealth deleteMany
 */
export type MarketHealthDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MarketHealths to delete
     */
    where?: Prisma.MarketHealthWhereInput;
    /**
     * Limit how many MarketHealths to delete.
     */
    limit?: number;
};
/**
 * MarketHealth without action
 */
export type MarketHealthDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketHealth
     */
    select?: Prisma.MarketHealthSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MarketHealth
     */
    omit?: Prisma.MarketHealthOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=MarketHealth.d.ts.map
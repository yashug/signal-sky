import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model LifetimeDeal
 *
 */
export type LifetimeDealModel = runtime.Types.Result.DefaultSelection<Prisma.$LifetimeDealPayload>;
export type AggregateLifetimeDeal = {
    _count: LifetimeDealCountAggregateOutputType | null;
    _avg: LifetimeDealAvgAggregateOutputType | null;
    _sum: LifetimeDealSumAggregateOutputType | null;
    _min: LifetimeDealMinAggregateOutputType | null;
    _max: LifetimeDealMaxAggregateOutputType | null;
};
export type LifetimeDealAvgAggregateOutputType = {
    id: number | null;
    cap: number | null;
    sold: number | null;
};
export type LifetimeDealSumAggregateOutputType = {
    id: number | null;
    cap: number | null;
    sold: number | null;
};
export type LifetimeDealMinAggregateOutputType = {
    id: number | null;
    cap: number | null;
    sold: number | null;
    updatedAt: Date | null;
};
export type LifetimeDealMaxAggregateOutputType = {
    id: number | null;
    cap: number | null;
    sold: number | null;
    updatedAt: Date | null;
};
export type LifetimeDealCountAggregateOutputType = {
    id: number;
    cap: number;
    sold: number;
    updatedAt: number;
    _all: number;
};
export type LifetimeDealAvgAggregateInputType = {
    id?: true;
    cap?: true;
    sold?: true;
};
export type LifetimeDealSumAggregateInputType = {
    id?: true;
    cap?: true;
    sold?: true;
};
export type LifetimeDealMinAggregateInputType = {
    id?: true;
    cap?: true;
    sold?: true;
    updatedAt?: true;
};
export type LifetimeDealMaxAggregateInputType = {
    id?: true;
    cap?: true;
    sold?: true;
    updatedAt?: true;
};
export type LifetimeDealCountAggregateInputType = {
    id?: true;
    cap?: true;
    sold?: true;
    updatedAt?: true;
    _all?: true;
};
export type LifetimeDealAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which LifetimeDeal to aggregate.
     */
    where?: Prisma.LifetimeDealWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of LifetimeDeals to fetch.
     */
    orderBy?: Prisma.LifetimeDealOrderByWithRelationInput | Prisma.LifetimeDealOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.LifetimeDealWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` LifetimeDeals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` LifetimeDeals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned LifetimeDeals
    **/
    _count?: true | LifetimeDealCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: LifetimeDealAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: LifetimeDealSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: LifetimeDealMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: LifetimeDealMaxAggregateInputType;
};
export type GetLifetimeDealAggregateType<T extends LifetimeDealAggregateArgs> = {
    [P in keyof T & keyof AggregateLifetimeDeal]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLifetimeDeal[P]> : Prisma.GetScalarType<T[P], AggregateLifetimeDeal[P]>;
};
export type LifetimeDealGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LifetimeDealWhereInput;
    orderBy?: Prisma.LifetimeDealOrderByWithAggregationInput | Prisma.LifetimeDealOrderByWithAggregationInput[];
    by: Prisma.LifetimeDealScalarFieldEnum[] | Prisma.LifetimeDealScalarFieldEnum;
    having?: Prisma.LifetimeDealScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LifetimeDealCountAggregateInputType | true;
    _avg?: LifetimeDealAvgAggregateInputType;
    _sum?: LifetimeDealSumAggregateInputType;
    _min?: LifetimeDealMinAggregateInputType;
    _max?: LifetimeDealMaxAggregateInputType;
};
export type LifetimeDealGroupByOutputType = {
    id: number;
    cap: number;
    sold: number;
    updatedAt: Date;
    _count: LifetimeDealCountAggregateOutputType | null;
    _avg: LifetimeDealAvgAggregateOutputType | null;
    _sum: LifetimeDealSumAggregateOutputType | null;
    _min: LifetimeDealMinAggregateOutputType | null;
    _max: LifetimeDealMaxAggregateOutputType | null;
};
type GetLifetimeDealGroupByPayload<T extends LifetimeDealGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LifetimeDealGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LifetimeDealGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LifetimeDealGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LifetimeDealGroupByOutputType[P]>;
}>>;
export type LifetimeDealWhereInput = {
    AND?: Prisma.LifetimeDealWhereInput | Prisma.LifetimeDealWhereInput[];
    OR?: Prisma.LifetimeDealWhereInput[];
    NOT?: Prisma.LifetimeDealWhereInput | Prisma.LifetimeDealWhereInput[];
    id?: Prisma.IntFilter<"LifetimeDeal"> | number;
    cap?: Prisma.IntFilter<"LifetimeDeal"> | number;
    sold?: Prisma.IntFilter<"LifetimeDeal"> | number;
    updatedAt?: Prisma.DateTimeFilter<"LifetimeDeal"> | Date | string;
};
export type LifetimeDealOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    cap?: Prisma.SortOrder;
    sold?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LifetimeDealWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.LifetimeDealWhereInput | Prisma.LifetimeDealWhereInput[];
    OR?: Prisma.LifetimeDealWhereInput[];
    NOT?: Prisma.LifetimeDealWhereInput | Prisma.LifetimeDealWhereInput[];
    cap?: Prisma.IntFilter<"LifetimeDeal"> | number;
    sold?: Prisma.IntFilter<"LifetimeDeal"> | number;
    updatedAt?: Prisma.DateTimeFilter<"LifetimeDeal"> | Date | string;
}, "id">;
export type LifetimeDealOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    cap?: Prisma.SortOrder;
    sold?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.LifetimeDealCountOrderByAggregateInput;
    _avg?: Prisma.LifetimeDealAvgOrderByAggregateInput;
    _max?: Prisma.LifetimeDealMaxOrderByAggregateInput;
    _min?: Prisma.LifetimeDealMinOrderByAggregateInput;
    _sum?: Prisma.LifetimeDealSumOrderByAggregateInput;
};
export type LifetimeDealScalarWhereWithAggregatesInput = {
    AND?: Prisma.LifetimeDealScalarWhereWithAggregatesInput | Prisma.LifetimeDealScalarWhereWithAggregatesInput[];
    OR?: Prisma.LifetimeDealScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LifetimeDealScalarWhereWithAggregatesInput | Prisma.LifetimeDealScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"LifetimeDeal"> | number;
    cap?: Prisma.IntWithAggregatesFilter<"LifetimeDeal"> | number;
    sold?: Prisma.IntWithAggregatesFilter<"LifetimeDeal"> | number;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"LifetimeDeal"> | Date | string;
};
export type LifetimeDealCreateInput = {
    cap?: number;
    sold?: number;
    updatedAt?: Date | string;
};
export type LifetimeDealUncheckedCreateInput = {
    id?: number;
    cap?: number;
    sold?: number;
    updatedAt?: Date | string;
};
export type LifetimeDealUpdateInput = {
    cap?: Prisma.IntFieldUpdateOperationsInput | number;
    sold?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LifetimeDealUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    cap?: Prisma.IntFieldUpdateOperationsInput | number;
    sold?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LifetimeDealCreateManyInput = {
    id?: number;
    cap?: number;
    sold?: number;
    updatedAt?: Date | string;
};
export type LifetimeDealUpdateManyMutationInput = {
    cap?: Prisma.IntFieldUpdateOperationsInput | number;
    sold?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LifetimeDealUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    cap?: Prisma.IntFieldUpdateOperationsInput | number;
    sold?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LifetimeDealCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    cap?: Prisma.SortOrder;
    sold?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LifetimeDealAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    cap?: Prisma.SortOrder;
    sold?: Prisma.SortOrder;
};
export type LifetimeDealMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    cap?: Prisma.SortOrder;
    sold?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LifetimeDealMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    cap?: Prisma.SortOrder;
    sold?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LifetimeDealSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    cap?: Prisma.SortOrder;
    sold?: Prisma.SortOrder;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type LifetimeDealSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    cap?: boolean;
    sold?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["lifetimeDeal"]>;
export type LifetimeDealSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    cap?: boolean;
    sold?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["lifetimeDeal"]>;
export type LifetimeDealSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    cap?: boolean;
    sold?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["lifetimeDeal"]>;
export type LifetimeDealSelectScalar = {
    id?: boolean;
    cap?: boolean;
    sold?: boolean;
    updatedAt?: boolean;
};
export type LifetimeDealOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "cap" | "sold" | "updatedAt", ExtArgs["result"]["lifetimeDeal"]>;
export type $LifetimeDealPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "LifetimeDeal";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        cap: number;
        sold: number;
        updatedAt: Date;
    }, ExtArgs["result"]["lifetimeDeal"]>;
    composites: {};
};
export type LifetimeDealGetPayload<S extends boolean | null | undefined | LifetimeDealDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LifetimeDealPayload, S>;
export type LifetimeDealCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LifetimeDealFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LifetimeDealCountAggregateInputType | true;
};
export interface LifetimeDealDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['LifetimeDeal'];
        meta: {
            name: 'LifetimeDeal';
        };
    };
    /**
     * Find zero or one LifetimeDeal that matches the filter.
     * @param {LifetimeDealFindUniqueArgs} args - Arguments to find a LifetimeDeal
     * @example
     * // Get one LifetimeDeal
     * const lifetimeDeal = await prisma.lifetimeDeal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LifetimeDealFindUniqueArgs>(args: Prisma.SelectSubset<T, LifetimeDealFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LifetimeDealClient<runtime.Types.Result.GetResult<Prisma.$LifetimeDealPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one LifetimeDeal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LifetimeDealFindUniqueOrThrowArgs} args - Arguments to find a LifetimeDeal
     * @example
     * // Get one LifetimeDeal
     * const lifetimeDeal = await prisma.lifetimeDeal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LifetimeDealFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LifetimeDealFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LifetimeDealClient<runtime.Types.Result.GetResult<Prisma.$LifetimeDealPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first LifetimeDeal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LifetimeDealFindFirstArgs} args - Arguments to find a LifetimeDeal
     * @example
     * // Get one LifetimeDeal
     * const lifetimeDeal = await prisma.lifetimeDeal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LifetimeDealFindFirstArgs>(args?: Prisma.SelectSubset<T, LifetimeDealFindFirstArgs<ExtArgs>>): Prisma.Prisma__LifetimeDealClient<runtime.Types.Result.GetResult<Prisma.$LifetimeDealPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first LifetimeDeal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LifetimeDealFindFirstOrThrowArgs} args - Arguments to find a LifetimeDeal
     * @example
     * // Get one LifetimeDeal
     * const lifetimeDeal = await prisma.lifetimeDeal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LifetimeDealFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LifetimeDealFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LifetimeDealClient<runtime.Types.Result.GetResult<Prisma.$LifetimeDealPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more LifetimeDeals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LifetimeDealFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LifetimeDeals
     * const lifetimeDeals = await prisma.lifetimeDeal.findMany()
     *
     * // Get first 10 LifetimeDeals
     * const lifetimeDeals = await prisma.lifetimeDeal.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const lifetimeDealWithIdOnly = await prisma.lifetimeDeal.findMany({ select: { id: true } })
     *
     */
    findMany<T extends LifetimeDealFindManyArgs>(args?: Prisma.SelectSubset<T, LifetimeDealFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LifetimeDealPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a LifetimeDeal.
     * @param {LifetimeDealCreateArgs} args - Arguments to create a LifetimeDeal.
     * @example
     * // Create one LifetimeDeal
     * const LifetimeDeal = await prisma.lifetimeDeal.create({
     *   data: {
     *     // ... data to create a LifetimeDeal
     *   }
     * })
     *
     */
    create<T extends LifetimeDealCreateArgs>(args: Prisma.SelectSubset<T, LifetimeDealCreateArgs<ExtArgs>>): Prisma.Prisma__LifetimeDealClient<runtime.Types.Result.GetResult<Prisma.$LifetimeDealPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many LifetimeDeals.
     * @param {LifetimeDealCreateManyArgs} args - Arguments to create many LifetimeDeals.
     * @example
     * // Create many LifetimeDeals
     * const lifetimeDeal = await prisma.lifetimeDeal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends LifetimeDealCreateManyArgs>(args?: Prisma.SelectSubset<T, LifetimeDealCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many LifetimeDeals and returns the data saved in the database.
     * @param {LifetimeDealCreateManyAndReturnArgs} args - Arguments to create many LifetimeDeals.
     * @example
     * // Create many LifetimeDeals
     * const lifetimeDeal = await prisma.lifetimeDeal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many LifetimeDeals and only return the `id`
     * const lifetimeDealWithIdOnly = await prisma.lifetimeDeal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends LifetimeDealCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LifetimeDealCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LifetimeDealPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a LifetimeDeal.
     * @param {LifetimeDealDeleteArgs} args - Arguments to delete one LifetimeDeal.
     * @example
     * // Delete one LifetimeDeal
     * const LifetimeDeal = await prisma.lifetimeDeal.delete({
     *   where: {
     *     // ... filter to delete one LifetimeDeal
     *   }
     * })
     *
     */
    delete<T extends LifetimeDealDeleteArgs>(args: Prisma.SelectSubset<T, LifetimeDealDeleteArgs<ExtArgs>>): Prisma.Prisma__LifetimeDealClient<runtime.Types.Result.GetResult<Prisma.$LifetimeDealPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one LifetimeDeal.
     * @param {LifetimeDealUpdateArgs} args - Arguments to update one LifetimeDeal.
     * @example
     * // Update one LifetimeDeal
     * const lifetimeDeal = await prisma.lifetimeDeal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends LifetimeDealUpdateArgs>(args: Prisma.SelectSubset<T, LifetimeDealUpdateArgs<ExtArgs>>): Prisma.Prisma__LifetimeDealClient<runtime.Types.Result.GetResult<Prisma.$LifetimeDealPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more LifetimeDeals.
     * @param {LifetimeDealDeleteManyArgs} args - Arguments to filter LifetimeDeals to delete.
     * @example
     * // Delete a few LifetimeDeals
     * const { count } = await prisma.lifetimeDeal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends LifetimeDealDeleteManyArgs>(args?: Prisma.SelectSubset<T, LifetimeDealDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more LifetimeDeals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LifetimeDealUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LifetimeDeals
     * const lifetimeDeal = await prisma.lifetimeDeal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends LifetimeDealUpdateManyArgs>(args: Prisma.SelectSubset<T, LifetimeDealUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more LifetimeDeals and returns the data updated in the database.
     * @param {LifetimeDealUpdateManyAndReturnArgs} args - Arguments to update many LifetimeDeals.
     * @example
     * // Update many LifetimeDeals
     * const lifetimeDeal = await prisma.lifetimeDeal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more LifetimeDeals and only return the `id`
     * const lifetimeDealWithIdOnly = await prisma.lifetimeDeal.updateManyAndReturn({
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
    updateManyAndReturn<T extends LifetimeDealUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LifetimeDealUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LifetimeDealPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one LifetimeDeal.
     * @param {LifetimeDealUpsertArgs} args - Arguments to update or create a LifetimeDeal.
     * @example
     * // Update or create a LifetimeDeal
     * const lifetimeDeal = await prisma.lifetimeDeal.upsert({
     *   create: {
     *     // ... data to create a LifetimeDeal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LifetimeDeal we want to update
     *   }
     * })
     */
    upsert<T extends LifetimeDealUpsertArgs>(args: Prisma.SelectSubset<T, LifetimeDealUpsertArgs<ExtArgs>>): Prisma.Prisma__LifetimeDealClient<runtime.Types.Result.GetResult<Prisma.$LifetimeDealPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of LifetimeDeals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LifetimeDealCountArgs} args - Arguments to filter LifetimeDeals to count.
     * @example
     * // Count the number of LifetimeDeals
     * const count = await prisma.lifetimeDeal.count({
     *   where: {
     *     // ... the filter for the LifetimeDeals we want to count
     *   }
     * })
    **/
    count<T extends LifetimeDealCountArgs>(args?: Prisma.Subset<T, LifetimeDealCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LifetimeDealCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a LifetimeDeal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LifetimeDealAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LifetimeDealAggregateArgs>(args: Prisma.Subset<T, LifetimeDealAggregateArgs>): Prisma.PrismaPromise<GetLifetimeDealAggregateType<T>>;
    /**
     * Group by LifetimeDeal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LifetimeDealGroupByArgs} args - Group by arguments.
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
    groupBy<T extends LifetimeDealGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LifetimeDealGroupByArgs['orderBy'];
    } : {
        orderBy?: LifetimeDealGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LifetimeDealGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLifetimeDealGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the LifetimeDeal model
     */
    readonly fields: LifetimeDealFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for LifetimeDeal.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__LifetimeDealClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the LifetimeDeal model
 */
export interface LifetimeDealFieldRefs {
    readonly id: Prisma.FieldRef<"LifetimeDeal", 'Int'>;
    readonly cap: Prisma.FieldRef<"LifetimeDeal", 'Int'>;
    readonly sold: Prisma.FieldRef<"LifetimeDeal", 'Int'>;
    readonly updatedAt: Prisma.FieldRef<"LifetimeDeal", 'DateTime'>;
}
/**
 * LifetimeDeal findUnique
 */
export type LifetimeDealFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LifetimeDeal
     */
    select?: Prisma.LifetimeDealSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LifetimeDeal
     */
    omit?: Prisma.LifetimeDealOmit<ExtArgs> | null;
    /**
     * Filter, which LifetimeDeal to fetch.
     */
    where: Prisma.LifetimeDealWhereUniqueInput;
};
/**
 * LifetimeDeal findUniqueOrThrow
 */
export type LifetimeDealFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LifetimeDeal
     */
    select?: Prisma.LifetimeDealSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LifetimeDeal
     */
    omit?: Prisma.LifetimeDealOmit<ExtArgs> | null;
    /**
     * Filter, which LifetimeDeal to fetch.
     */
    where: Prisma.LifetimeDealWhereUniqueInput;
};
/**
 * LifetimeDeal findFirst
 */
export type LifetimeDealFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LifetimeDeal
     */
    select?: Prisma.LifetimeDealSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LifetimeDeal
     */
    omit?: Prisma.LifetimeDealOmit<ExtArgs> | null;
    /**
     * Filter, which LifetimeDeal to fetch.
     */
    where?: Prisma.LifetimeDealWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of LifetimeDeals to fetch.
     */
    orderBy?: Prisma.LifetimeDealOrderByWithRelationInput | Prisma.LifetimeDealOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for LifetimeDeals.
     */
    cursor?: Prisma.LifetimeDealWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` LifetimeDeals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` LifetimeDeals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of LifetimeDeals.
     */
    distinct?: Prisma.LifetimeDealScalarFieldEnum | Prisma.LifetimeDealScalarFieldEnum[];
};
/**
 * LifetimeDeal findFirstOrThrow
 */
export type LifetimeDealFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LifetimeDeal
     */
    select?: Prisma.LifetimeDealSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LifetimeDeal
     */
    omit?: Prisma.LifetimeDealOmit<ExtArgs> | null;
    /**
     * Filter, which LifetimeDeal to fetch.
     */
    where?: Prisma.LifetimeDealWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of LifetimeDeals to fetch.
     */
    orderBy?: Prisma.LifetimeDealOrderByWithRelationInput | Prisma.LifetimeDealOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for LifetimeDeals.
     */
    cursor?: Prisma.LifetimeDealWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` LifetimeDeals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` LifetimeDeals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of LifetimeDeals.
     */
    distinct?: Prisma.LifetimeDealScalarFieldEnum | Prisma.LifetimeDealScalarFieldEnum[];
};
/**
 * LifetimeDeal findMany
 */
export type LifetimeDealFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LifetimeDeal
     */
    select?: Prisma.LifetimeDealSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LifetimeDeal
     */
    omit?: Prisma.LifetimeDealOmit<ExtArgs> | null;
    /**
     * Filter, which LifetimeDeals to fetch.
     */
    where?: Prisma.LifetimeDealWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of LifetimeDeals to fetch.
     */
    orderBy?: Prisma.LifetimeDealOrderByWithRelationInput | Prisma.LifetimeDealOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing LifetimeDeals.
     */
    cursor?: Prisma.LifetimeDealWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` LifetimeDeals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` LifetimeDeals.
     */
    skip?: number;
    distinct?: Prisma.LifetimeDealScalarFieldEnum | Prisma.LifetimeDealScalarFieldEnum[];
};
/**
 * LifetimeDeal create
 */
export type LifetimeDealCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LifetimeDeal
     */
    select?: Prisma.LifetimeDealSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LifetimeDeal
     */
    omit?: Prisma.LifetimeDealOmit<ExtArgs> | null;
    /**
     * The data needed to create a LifetimeDeal.
     */
    data: Prisma.XOR<Prisma.LifetimeDealCreateInput, Prisma.LifetimeDealUncheckedCreateInput>;
};
/**
 * LifetimeDeal createMany
 */
export type LifetimeDealCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many LifetimeDeals.
     */
    data: Prisma.LifetimeDealCreateManyInput | Prisma.LifetimeDealCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * LifetimeDeal createManyAndReturn
 */
export type LifetimeDealCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LifetimeDeal
     */
    select?: Prisma.LifetimeDealSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the LifetimeDeal
     */
    omit?: Prisma.LifetimeDealOmit<ExtArgs> | null;
    /**
     * The data used to create many LifetimeDeals.
     */
    data: Prisma.LifetimeDealCreateManyInput | Prisma.LifetimeDealCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * LifetimeDeal update
 */
export type LifetimeDealUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LifetimeDeal
     */
    select?: Prisma.LifetimeDealSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LifetimeDeal
     */
    omit?: Prisma.LifetimeDealOmit<ExtArgs> | null;
    /**
     * The data needed to update a LifetimeDeal.
     */
    data: Prisma.XOR<Prisma.LifetimeDealUpdateInput, Prisma.LifetimeDealUncheckedUpdateInput>;
    /**
     * Choose, which LifetimeDeal to update.
     */
    where: Prisma.LifetimeDealWhereUniqueInput;
};
/**
 * LifetimeDeal updateMany
 */
export type LifetimeDealUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update LifetimeDeals.
     */
    data: Prisma.XOR<Prisma.LifetimeDealUpdateManyMutationInput, Prisma.LifetimeDealUncheckedUpdateManyInput>;
    /**
     * Filter which LifetimeDeals to update
     */
    where?: Prisma.LifetimeDealWhereInput;
    /**
     * Limit how many LifetimeDeals to update.
     */
    limit?: number;
};
/**
 * LifetimeDeal updateManyAndReturn
 */
export type LifetimeDealUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LifetimeDeal
     */
    select?: Prisma.LifetimeDealSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the LifetimeDeal
     */
    omit?: Prisma.LifetimeDealOmit<ExtArgs> | null;
    /**
     * The data used to update LifetimeDeals.
     */
    data: Prisma.XOR<Prisma.LifetimeDealUpdateManyMutationInput, Prisma.LifetimeDealUncheckedUpdateManyInput>;
    /**
     * Filter which LifetimeDeals to update
     */
    where?: Prisma.LifetimeDealWhereInput;
    /**
     * Limit how many LifetimeDeals to update.
     */
    limit?: number;
};
/**
 * LifetimeDeal upsert
 */
export type LifetimeDealUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LifetimeDeal
     */
    select?: Prisma.LifetimeDealSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LifetimeDeal
     */
    omit?: Prisma.LifetimeDealOmit<ExtArgs> | null;
    /**
     * The filter to search for the LifetimeDeal to update in case it exists.
     */
    where: Prisma.LifetimeDealWhereUniqueInput;
    /**
     * In case the LifetimeDeal found by the `where` argument doesn't exist, create a new LifetimeDeal with this data.
     */
    create: Prisma.XOR<Prisma.LifetimeDealCreateInput, Prisma.LifetimeDealUncheckedCreateInput>;
    /**
     * In case the LifetimeDeal was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.LifetimeDealUpdateInput, Prisma.LifetimeDealUncheckedUpdateInput>;
};
/**
 * LifetimeDeal delete
 */
export type LifetimeDealDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LifetimeDeal
     */
    select?: Prisma.LifetimeDealSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LifetimeDeal
     */
    omit?: Prisma.LifetimeDealOmit<ExtArgs> | null;
    /**
     * Filter which LifetimeDeal to delete.
     */
    where: Prisma.LifetimeDealWhereUniqueInput;
};
/**
 * LifetimeDeal deleteMany
 */
export type LifetimeDealDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which LifetimeDeals to delete
     */
    where?: Prisma.LifetimeDealWhereInput;
    /**
     * Limit how many LifetimeDeals to delete.
     */
    limit?: number;
};
/**
 * LifetimeDeal without action
 */
export type LifetimeDealDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LifetimeDeal
     */
    select?: Prisma.LifetimeDealSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LifetimeDeal
     */
    omit?: Prisma.LifetimeDealOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=LifetimeDeal.d.ts.map
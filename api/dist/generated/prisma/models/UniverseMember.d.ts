import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model UniverseMember
 *
 */
export type UniverseMemberModel = runtime.Types.Result.DefaultSelection<Prisma.$UniverseMemberPayload>;
export type AggregateUniverseMember = {
    _count: UniverseMemberCountAggregateOutputType | null;
    _avg: UniverseMemberAvgAggregateOutputType | null;
    _sum: UniverseMemberSumAggregateOutputType | null;
    _min: UniverseMemberMinAggregateOutputType | null;
    _max: UniverseMemberMaxAggregateOutputType | null;
};
export type UniverseMemberAvgAggregateOutputType = {
    id: number | null;
};
export type UniverseMemberSumAggregateOutputType = {
    id: number | null;
};
export type UniverseMemberMinAggregateOutputType = {
    id: number | null;
    universe: string | null;
    symbol: string | null;
    name: string | null;
    sector: string | null;
    addedAt: Date | null;
};
export type UniverseMemberMaxAggregateOutputType = {
    id: number | null;
    universe: string | null;
    symbol: string | null;
    name: string | null;
    sector: string | null;
    addedAt: Date | null;
};
export type UniverseMemberCountAggregateOutputType = {
    id: number;
    universe: number;
    symbol: number;
    name: number;
    sector: number;
    addedAt: number;
    _all: number;
};
export type UniverseMemberAvgAggregateInputType = {
    id?: true;
};
export type UniverseMemberSumAggregateInputType = {
    id?: true;
};
export type UniverseMemberMinAggregateInputType = {
    id?: true;
    universe?: true;
    symbol?: true;
    name?: true;
    sector?: true;
    addedAt?: true;
};
export type UniverseMemberMaxAggregateInputType = {
    id?: true;
    universe?: true;
    symbol?: true;
    name?: true;
    sector?: true;
    addedAt?: true;
};
export type UniverseMemberCountAggregateInputType = {
    id?: true;
    universe?: true;
    symbol?: true;
    name?: true;
    sector?: true;
    addedAt?: true;
    _all?: true;
};
export type UniverseMemberAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which UniverseMember to aggregate.
     */
    where?: Prisma.UniverseMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UniverseMembers to fetch.
     */
    orderBy?: Prisma.UniverseMemberOrderByWithRelationInput | Prisma.UniverseMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UniverseMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UniverseMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UniverseMembers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned UniverseMembers
    **/
    _count?: true | UniverseMemberCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: UniverseMemberAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: UniverseMemberSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UniverseMemberMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UniverseMemberMaxAggregateInputType;
};
export type GetUniverseMemberAggregateType<T extends UniverseMemberAggregateArgs> = {
    [P in keyof T & keyof AggregateUniverseMember]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUniverseMember[P]> : Prisma.GetScalarType<T[P], AggregateUniverseMember[P]>;
};
export type UniverseMemberGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UniverseMemberWhereInput;
    orderBy?: Prisma.UniverseMemberOrderByWithAggregationInput | Prisma.UniverseMemberOrderByWithAggregationInput[];
    by: Prisma.UniverseMemberScalarFieldEnum[] | Prisma.UniverseMemberScalarFieldEnum;
    having?: Prisma.UniverseMemberScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UniverseMemberCountAggregateInputType | true;
    _avg?: UniverseMemberAvgAggregateInputType;
    _sum?: UniverseMemberSumAggregateInputType;
    _min?: UniverseMemberMinAggregateInputType;
    _max?: UniverseMemberMaxAggregateInputType;
};
export type UniverseMemberGroupByOutputType = {
    id: number;
    universe: string;
    symbol: string;
    name: string | null;
    sector: string | null;
    addedAt: Date;
    _count: UniverseMemberCountAggregateOutputType | null;
    _avg: UniverseMemberAvgAggregateOutputType | null;
    _sum: UniverseMemberSumAggregateOutputType | null;
    _min: UniverseMemberMinAggregateOutputType | null;
    _max: UniverseMemberMaxAggregateOutputType | null;
};
type GetUniverseMemberGroupByPayload<T extends UniverseMemberGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UniverseMemberGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UniverseMemberGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UniverseMemberGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UniverseMemberGroupByOutputType[P]>;
}>>;
export type UniverseMemberWhereInput = {
    AND?: Prisma.UniverseMemberWhereInput | Prisma.UniverseMemberWhereInput[];
    OR?: Prisma.UniverseMemberWhereInput[];
    NOT?: Prisma.UniverseMemberWhereInput | Prisma.UniverseMemberWhereInput[];
    id?: Prisma.IntFilter<"UniverseMember"> | number;
    universe?: Prisma.StringFilter<"UniverseMember"> | string;
    symbol?: Prisma.StringFilter<"UniverseMember"> | string;
    name?: Prisma.StringNullableFilter<"UniverseMember"> | string | null;
    sector?: Prisma.StringNullableFilter<"UniverseMember"> | string | null;
    addedAt?: Prisma.DateTimeFilter<"UniverseMember"> | Date | string;
};
export type UniverseMemberOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    universe?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    sector?: Prisma.SortOrderInput | Prisma.SortOrder;
    addedAt?: Prisma.SortOrder;
};
export type UniverseMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    universe_symbol?: Prisma.UniverseMemberUniverseSymbolCompoundUniqueInput;
    AND?: Prisma.UniverseMemberWhereInput | Prisma.UniverseMemberWhereInput[];
    OR?: Prisma.UniverseMemberWhereInput[];
    NOT?: Prisma.UniverseMemberWhereInput | Prisma.UniverseMemberWhereInput[];
    universe?: Prisma.StringFilter<"UniverseMember"> | string;
    symbol?: Prisma.StringFilter<"UniverseMember"> | string;
    name?: Prisma.StringNullableFilter<"UniverseMember"> | string | null;
    sector?: Prisma.StringNullableFilter<"UniverseMember"> | string | null;
    addedAt?: Prisma.DateTimeFilter<"UniverseMember"> | Date | string;
}, "id" | "universe_symbol">;
export type UniverseMemberOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    universe?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    sector?: Prisma.SortOrderInput | Prisma.SortOrder;
    addedAt?: Prisma.SortOrder;
    _count?: Prisma.UniverseMemberCountOrderByAggregateInput;
    _avg?: Prisma.UniverseMemberAvgOrderByAggregateInput;
    _max?: Prisma.UniverseMemberMaxOrderByAggregateInput;
    _min?: Prisma.UniverseMemberMinOrderByAggregateInput;
    _sum?: Prisma.UniverseMemberSumOrderByAggregateInput;
};
export type UniverseMemberScalarWhereWithAggregatesInput = {
    AND?: Prisma.UniverseMemberScalarWhereWithAggregatesInput | Prisma.UniverseMemberScalarWhereWithAggregatesInput[];
    OR?: Prisma.UniverseMemberScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UniverseMemberScalarWhereWithAggregatesInput | Prisma.UniverseMemberScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"UniverseMember"> | number;
    universe?: Prisma.StringWithAggregatesFilter<"UniverseMember"> | string;
    symbol?: Prisma.StringWithAggregatesFilter<"UniverseMember"> | string;
    name?: Prisma.StringNullableWithAggregatesFilter<"UniverseMember"> | string | null;
    sector?: Prisma.StringNullableWithAggregatesFilter<"UniverseMember"> | string | null;
    addedAt?: Prisma.DateTimeWithAggregatesFilter<"UniverseMember"> | Date | string;
};
export type UniverseMemberCreateInput = {
    universe: string;
    symbol: string;
    name?: string | null;
    sector?: string | null;
    addedAt?: Date | string;
};
export type UniverseMemberUncheckedCreateInput = {
    id?: number;
    universe: string;
    symbol: string;
    name?: string | null;
    sector?: string | null;
    addedAt?: Date | string;
};
export type UniverseMemberUpdateInput = {
    universe?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sector?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UniverseMemberUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    universe?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sector?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UniverseMemberCreateManyInput = {
    id?: number;
    universe: string;
    symbol: string;
    name?: string | null;
    sector?: string | null;
    addedAt?: Date | string;
};
export type UniverseMemberUpdateManyMutationInput = {
    universe?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sector?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UniverseMemberUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    universe?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sector?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UniverseMemberUniverseSymbolCompoundUniqueInput = {
    universe: string;
    symbol: string;
};
export type UniverseMemberCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    universe?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    sector?: Prisma.SortOrder;
    addedAt?: Prisma.SortOrder;
};
export type UniverseMemberAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type UniverseMemberMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    universe?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    sector?: Prisma.SortOrder;
    addedAt?: Prisma.SortOrder;
};
export type UniverseMemberMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    universe?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    sector?: Prisma.SortOrder;
    addedAt?: Prisma.SortOrder;
};
export type UniverseMemberSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type UniverseMemberSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    universe?: boolean;
    symbol?: boolean;
    name?: boolean;
    sector?: boolean;
    addedAt?: boolean;
}, ExtArgs["result"]["universeMember"]>;
export type UniverseMemberSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    universe?: boolean;
    symbol?: boolean;
    name?: boolean;
    sector?: boolean;
    addedAt?: boolean;
}, ExtArgs["result"]["universeMember"]>;
export type UniverseMemberSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    universe?: boolean;
    symbol?: boolean;
    name?: boolean;
    sector?: boolean;
    addedAt?: boolean;
}, ExtArgs["result"]["universeMember"]>;
export type UniverseMemberSelectScalar = {
    id?: boolean;
    universe?: boolean;
    symbol?: boolean;
    name?: boolean;
    sector?: boolean;
    addedAt?: boolean;
};
export type UniverseMemberOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "universe" | "symbol" | "name" | "sector" | "addedAt", ExtArgs["result"]["universeMember"]>;
export type $UniverseMemberPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UniverseMember";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        universe: string;
        symbol: string;
        name: string | null;
        sector: string | null;
        addedAt: Date;
    }, ExtArgs["result"]["universeMember"]>;
    composites: {};
};
export type UniverseMemberGetPayload<S extends boolean | null | undefined | UniverseMemberDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UniverseMemberPayload, S>;
export type UniverseMemberCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UniverseMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UniverseMemberCountAggregateInputType | true;
};
export interface UniverseMemberDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UniverseMember'];
        meta: {
            name: 'UniverseMember';
        };
    };
    /**
     * Find zero or one UniverseMember that matches the filter.
     * @param {UniverseMemberFindUniqueArgs} args - Arguments to find a UniverseMember
     * @example
     * // Get one UniverseMember
     * const universeMember = await prisma.universeMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UniverseMemberFindUniqueArgs>(args: Prisma.SelectSubset<T, UniverseMemberFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UniverseMemberClient<runtime.Types.Result.GetResult<Prisma.$UniverseMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one UniverseMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UniverseMemberFindUniqueOrThrowArgs} args - Arguments to find a UniverseMember
     * @example
     * // Get one UniverseMember
     * const universeMember = await prisma.universeMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UniverseMemberFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UniverseMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UniverseMemberClient<runtime.Types.Result.GetResult<Prisma.$UniverseMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first UniverseMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UniverseMemberFindFirstArgs} args - Arguments to find a UniverseMember
     * @example
     * // Get one UniverseMember
     * const universeMember = await prisma.universeMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UniverseMemberFindFirstArgs>(args?: Prisma.SelectSubset<T, UniverseMemberFindFirstArgs<ExtArgs>>): Prisma.Prisma__UniverseMemberClient<runtime.Types.Result.GetResult<Prisma.$UniverseMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first UniverseMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UniverseMemberFindFirstOrThrowArgs} args - Arguments to find a UniverseMember
     * @example
     * // Get one UniverseMember
     * const universeMember = await prisma.universeMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UniverseMemberFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UniverseMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UniverseMemberClient<runtime.Types.Result.GetResult<Prisma.$UniverseMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more UniverseMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UniverseMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UniverseMembers
     * const universeMembers = await prisma.universeMember.findMany()
     *
     * // Get first 10 UniverseMembers
     * const universeMembers = await prisma.universeMember.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const universeMemberWithIdOnly = await prisma.universeMember.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UniverseMemberFindManyArgs>(args?: Prisma.SelectSubset<T, UniverseMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UniverseMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a UniverseMember.
     * @param {UniverseMemberCreateArgs} args - Arguments to create a UniverseMember.
     * @example
     * // Create one UniverseMember
     * const UniverseMember = await prisma.universeMember.create({
     *   data: {
     *     // ... data to create a UniverseMember
     *   }
     * })
     *
     */
    create<T extends UniverseMemberCreateArgs>(args: Prisma.SelectSubset<T, UniverseMemberCreateArgs<ExtArgs>>): Prisma.Prisma__UniverseMemberClient<runtime.Types.Result.GetResult<Prisma.$UniverseMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many UniverseMembers.
     * @param {UniverseMemberCreateManyArgs} args - Arguments to create many UniverseMembers.
     * @example
     * // Create many UniverseMembers
     * const universeMember = await prisma.universeMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UniverseMemberCreateManyArgs>(args?: Prisma.SelectSubset<T, UniverseMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many UniverseMembers and returns the data saved in the database.
     * @param {UniverseMemberCreateManyAndReturnArgs} args - Arguments to create many UniverseMembers.
     * @example
     * // Create many UniverseMembers
     * const universeMember = await prisma.universeMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many UniverseMembers and only return the `id`
     * const universeMemberWithIdOnly = await prisma.universeMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UniverseMemberCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UniverseMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UniverseMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a UniverseMember.
     * @param {UniverseMemberDeleteArgs} args - Arguments to delete one UniverseMember.
     * @example
     * // Delete one UniverseMember
     * const UniverseMember = await prisma.universeMember.delete({
     *   where: {
     *     // ... filter to delete one UniverseMember
     *   }
     * })
     *
     */
    delete<T extends UniverseMemberDeleteArgs>(args: Prisma.SelectSubset<T, UniverseMemberDeleteArgs<ExtArgs>>): Prisma.Prisma__UniverseMemberClient<runtime.Types.Result.GetResult<Prisma.$UniverseMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one UniverseMember.
     * @param {UniverseMemberUpdateArgs} args - Arguments to update one UniverseMember.
     * @example
     * // Update one UniverseMember
     * const universeMember = await prisma.universeMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UniverseMemberUpdateArgs>(args: Prisma.SelectSubset<T, UniverseMemberUpdateArgs<ExtArgs>>): Prisma.Prisma__UniverseMemberClient<runtime.Types.Result.GetResult<Prisma.$UniverseMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more UniverseMembers.
     * @param {UniverseMemberDeleteManyArgs} args - Arguments to filter UniverseMembers to delete.
     * @example
     * // Delete a few UniverseMembers
     * const { count } = await prisma.universeMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UniverseMemberDeleteManyArgs>(args?: Prisma.SelectSubset<T, UniverseMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more UniverseMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UniverseMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UniverseMembers
     * const universeMember = await prisma.universeMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UniverseMemberUpdateManyArgs>(args: Prisma.SelectSubset<T, UniverseMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more UniverseMembers and returns the data updated in the database.
     * @param {UniverseMemberUpdateManyAndReturnArgs} args - Arguments to update many UniverseMembers.
     * @example
     * // Update many UniverseMembers
     * const universeMember = await prisma.universeMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more UniverseMembers and only return the `id`
     * const universeMemberWithIdOnly = await prisma.universeMember.updateManyAndReturn({
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
    updateManyAndReturn<T extends UniverseMemberUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UniverseMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UniverseMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one UniverseMember.
     * @param {UniverseMemberUpsertArgs} args - Arguments to update or create a UniverseMember.
     * @example
     * // Update or create a UniverseMember
     * const universeMember = await prisma.universeMember.upsert({
     *   create: {
     *     // ... data to create a UniverseMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UniverseMember we want to update
     *   }
     * })
     */
    upsert<T extends UniverseMemberUpsertArgs>(args: Prisma.SelectSubset<T, UniverseMemberUpsertArgs<ExtArgs>>): Prisma.Prisma__UniverseMemberClient<runtime.Types.Result.GetResult<Prisma.$UniverseMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of UniverseMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UniverseMemberCountArgs} args - Arguments to filter UniverseMembers to count.
     * @example
     * // Count the number of UniverseMembers
     * const count = await prisma.universeMember.count({
     *   where: {
     *     // ... the filter for the UniverseMembers we want to count
     *   }
     * })
    **/
    count<T extends UniverseMemberCountArgs>(args?: Prisma.Subset<T, UniverseMemberCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UniverseMemberCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a UniverseMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UniverseMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UniverseMemberAggregateArgs>(args: Prisma.Subset<T, UniverseMemberAggregateArgs>): Prisma.PrismaPromise<GetUniverseMemberAggregateType<T>>;
    /**
     * Group by UniverseMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UniverseMemberGroupByArgs} args - Group by arguments.
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
    groupBy<T extends UniverseMemberGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UniverseMemberGroupByArgs['orderBy'];
    } : {
        orderBy?: UniverseMemberGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UniverseMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUniverseMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the UniverseMember model
     */
    readonly fields: UniverseMemberFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for UniverseMember.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UniverseMemberClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the UniverseMember model
 */
export interface UniverseMemberFieldRefs {
    readonly id: Prisma.FieldRef<"UniverseMember", 'Int'>;
    readonly universe: Prisma.FieldRef<"UniverseMember", 'String'>;
    readonly symbol: Prisma.FieldRef<"UniverseMember", 'String'>;
    readonly name: Prisma.FieldRef<"UniverseMember", 'String'>;
    readonly sector: Prisma.FieldRef<"UniverseMember", 'String'>;
    readonly addedAt: Prisma.FieldRef<"UniverseMember", 'DateTime'>;
}
/**
 * UniverseMember findUnique
 */
export type UniverseMemberFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniverseMember
     */
    select?: Prisma.UniverseMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UniverseMember
     */
    omit?: Prisma.UniverseMemberOmit<ExtArgs> | null;
    /**
     * Filter, which UniverseMember to fetch.
     */
    where: Prisma.UniverseMemberWhereUniqueInput;
};
/**
 * UniverseMember findUniqueOrThrow
 */
export type UniverseMemberFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniverseMember
     */
    select?: Prisma.UniverseMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UniverseMember
     */
    omit?: Prisma.UniverseMemberOmit<ExtArgs> | null;
    /**
     * Filter, which UniverseMember to fetch.
     */
    where: Prisma.UniverseMemberWhereUniqueInput;
};
/**
 * UniverseMember findFirst
 */
export type UniverseMemberFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniverseMember
     */
    select?: Prisma.UniverseMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UniverseMember
     */
    omit?: Prisma.UniverseMemberOmit<ExtArgs> | null;
    /**
     * Filter, which UniverseMember to fetch.
     */
    where?: Prisma.UniverseMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UniverseMembers to fetch.
     */
    orderBy?: Prisma.UniverseMemberOrderByWithRelationInput | Prisma.UniverseMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UniverseMembers.
     */
    cursor?: Prisma.UniverseMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UniverseMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UniverseMembers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UniverseMembers.
     */
    distinct?: Prisma.UniverseMemberScalarFieldEnum | Prisma.UniverseMemberScalarFieldEnum[];
};
/**
 * UniverseMember findFirstOrThrow
 */
export type UniverseMemberFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniverseMember
     */
    select?: Prisma.UniverseMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UniverseMember
     */
    omit?: Prisma.UniverseMemberOmit<ExtArgs> | null;
    /**
     * Filter, which UniverseMember to fetch.
     */
    where?: Prisma.UniverseMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UniverseMembers to fetch.
     */
    orderBy?: Prisma.UniverseMemberOrderByWithRelationInput | Prisma.UniverseMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UniverseMembers.
     */
    cursor?: Prisma.UniverseMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UniverseMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UniverseMembers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UniverseMembers.
     */
    distinct?: Prisma.UniverseMemberScalarFieldEnum | Prisma.UniverseMemberScalarFieldEnum[];
};
/**
 * UniverseMember findMany
 */
export type UniverseMemberFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniverseMember
     */
    select?: Prisma.UniverseMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UniverseMember
     */
    omit?: Prisma.UniverseMemberOmit<ExtArgs> | null;
    /**
     * Filter, which UniverseMembers to fetch.
     */
    where?: Prisma.UniverseMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UniverseMembers to fetch.
     */
    orderBy?: Prisma.UniverseMemberOrderByWithRelationInput | Prisma.UniverseMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing UniverseMembers.
     */
    cursor?: Prisma.UniverseMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UniverseMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UniverseMembers.
     */
    skip?: number;
    distinct?: Prisma.UniverseMemberScalarFieldEnum | Prisma.UniverseMemberScalarFieldEnum[];
};
/**
 * UniverseMember create
 */
export type UniverseMemberCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniverseMember
     */
    select?: Prisma.UniverseMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UniverseMember
     */
    omit?: Prisma.UniverseMemberOmit<ExtArgs> | null;
    /**
     * The data needed to create a UniverseMember.
     */
    data: Prisma.XOR<Prisma.UniverseMemberCreateInput, Prisma.UniverseMemberUncheckedCreateInput>;
};
/**
 * UniverseMember createMany
 */
export type UniverseMemberCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many UniverseMembers.
     */
    data: Prisma.UniverseMemberCreateManyInput | Prisma.UniverseMemberCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * UniverseMember createManyAndReturn
 */
export type UniverseMemberCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniverseMember
     */
    select?: Prisma.UniverseMemberSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the UniverseMember
     */
    omit?: Prisma.UniverseMemberOmit<ExtArgs> | null;
    /**
     * The data used to create many UniverseMembers.
     */
    data: Prisma.UniverseMemberCreateManyInput | Prisma.UniverseMemberCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * UniverseMember update
 */
export type UniverseMemberUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniverseMember
     */
    select?: Prisma.UniverseMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UniverseMember
     */
    omit?: Prisma.UniverseMemberOmit<ExtArgs> | null;
    /**
     * The data needed to update a UniverseMember.
     */
    data: Prisma.XOR<Prisma.UniverseMemberUpdateInput, Prisma.UniverseMemberUncheckedUpdateInput>;
    /**
     * Choose, which UniverseMember to update.
     */
    where: Prisma.UniverseMemberWhereUniqueInput;
};
/**
 * UniverseMember updateMany
 */
export type UniverseMemberUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update UniverseMembers.
     */
    data: Prisma.XOR<Prisma.UniverseMemberUpdateManyMutationInput, Prisma.UniverseMemberUncheckedUpdateManyInput>;
    /**
     * Filter which UniverseMembers to update
     */
    where?: Prisma.UniverseMemberWhereInput;
    /**
     * Limit how many UniverseMembers to update.
     */
    limit?: number;
};
/**
 * UniverseMember updateManyAndReturn
 */
export type UniverseMemberUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniverseMember
     */
    select?: Prisma.UniverseMemberSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the UniverseMember
     */
    omit?: Prisma.UniverseMemberOmit<ExtArgs> | null;
    /**
     * The data used to update UniverseMembers.
     */
    data: Prisma.XOR<Prisma.UniverseMemberUpdateManyMutationInput, Prisma.UniverseMemberUncheckedUpdateManyInput>;
    /**
     * Filter which UniverseMembers to update
     */
    where?: Prisma.UniverseMemberWhereInput;
    /**
     * Limit how many UniverseMembers to update.
     */
    limit?: number;
};
/**
 * UniverseMember upsert
 */
export type UniverseMemberUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniverseMember
     */
    select?: Prisma.UniverseMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UniverseMember
     */
    omit?: Prisma.UniverseMemberOmit<ExtArgs> | null;
    /**
     * The filter to search for the UniverseMember to update in case it exists.
     */
    where: Prisma.UniverseMemberWhereUniqueInput;
    /**
     * In case the UniverseMember found by the `where` argument doesn't exist, create a new UniverseMember with this data.
     */
    create: Prisma.XOR<Prisma.UniverseMemberCreateInput, Prisma.UniverseMemberUncheckedCreateInput>;
    /**
     * In case the UniverseMember was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UniverseMemberUpdateInput, Prisma.UniverseMemberUncheckedUpdateInput>;
};
/**
 * UniverseMember delete
 */
export type UniverseMemberDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniverseMember
     */
    select?: Prisma.UniverseMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UniverseMember
     */
    omit?: Prisma.UniverseMemberOmit<ExtArgs> | null;
    /**
     * Filter which UniverseMember to delete.
     */
    where: Prisma.UniverseMemberWhereUniqueInput;
};
/**
 * UniverseMember deleteMany
 */
export type UniverseMemberDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which UniverseMembers to delete
     */
    where?: Prisma.UniverseMemberWhereInput;
    /**
     * Limit how many UniverseMembers to delete.
     */
    limit?: number;
};
/**
 * UniverseMember without action
 */
export type UniverseMemberDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UniverseMember
     */
    select?: Prisma.UniverseMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UniverseMember
     */
    omit?: Prisma.UniverseMemberOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=UniverseMember.d.ts.map
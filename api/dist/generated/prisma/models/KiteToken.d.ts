import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model KiteToken
 *
 */
export type KiteTokenModel = runtime.Types.Result.DefaultSelection<Prisma.$KiteTokenPayload>;
export type AggregateKiteToken = {
    _count: KiteTokenCountAggregateOutputType | null;
    _avg: KiteTokenAvgAggregateOutputType | null;
    _sum: KiteTokenSumAggregateOutputType | null;
    _min: KiteTokenMinAggregateOutputType | null;
    _max: KiteTokenMaxAggregateOutputType | null;
};
export type KiteTokenAvgAggregateOutputType = {
    id: number | null;
};
export type KiteTokenSumAggregateOutputType = {
    id: number | null;
};
export type KiteTokenMinAggregateOutputType = {
    id: number | null;
    accessToken: string | null;
    publicToken: string | null;
    userId: string | null;
    loginTime: Date | null;
    updatedAt: Date | null;
};
export type KiteTokenMaxAggregateOutputType = {
    id: number | null;
    accessToken: string | null;
    publicToken: string | null;
    userId: string | null;
    loginTime: Date | null;
    updatedAt: Date | null;
};
export type KiteTokenCountAggregateOutputType = {
    id: number;
    accessToken: number;
    publicToken: number;
    userId: number;
    loginTime: number;
    updatedAt: number;
    _all: number;
};
export type KiteTokenAvgAggregateInputType = {
    id?: true;
};
export type KiteTokenSumAggregateInputType = {
    id?: true;
};
export type KiteTokenMinAggregateInputType = {
    id?: true;
    accessToken?: true;
    publicToken?: true;
    userId?: true;
    loginTime?: true;
    updatedAt?: true;
};
export type KiteTokenMaxAggregateInputType = {
    id?: true;
    accessToken?: true;
    publicToken?: true;
    userId?: true;
    loginTime?: true;
    updatedAt?: true;
};
export type KiteTokenCountAggregateInputType = {
    id?: true;
    accessToken?: true;
    publicToken?: true;
    userId?: true;
    loginTime?: true;
    updatedAt?: true;
    _all?: true;
};
export type KiteTokenAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which KiteToken to aggregate.
     */
    where?: Prisma.KiteTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of KiteTokens to fetch.
     */
    orderBy?: Prisma.KiteTokenOrderByWithRelationInput | Prisma.KiteTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.KiteTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` KiteTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` KiteTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned KiteTokens
    **/
    _count?: true | KiteTokenCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: KiteTokenAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: KiteTokenSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: KiteTokenMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: KiteTokenMaxAggregateInputType;
};
export type GetKiteTokenAggregateType<T extends KiteTokenAggregateArgs> = {
    [P in keyof T & keyof AggregateKiteToken]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateKiteToken[P]> : Prisma.GetScalarType<T[P], AggregateKiteToken[P]>;
};
export type KiteTokenGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KiteTokenWhereInput;
    orderBy?: Prisma.KiteTokenOrderByWithAggregationInput | Prisma.KiteTokenOrderByWithAggregationInput[];
    by: Prisma.KiteTokenScalarFieldEnum[] | Prisma.KiteTokenScalarFieldEnum;
    having?: Prisma.KiteTokenScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: KiteTokenCountAggregateInputType | true;
    _avg?: KiteTokenAvgAggregateInputType;
    _sum?: KiteTokenSumAggregateInputType;
    _min?: KiteTokenMinAggregateInputType;
    _max?: KiteTokenMaxAggregateInputType;
};
export type KiteTokenGroupByOutputType = {
    id: number;
    accessToken: string;
    publicToken: string | null;
    userId: string | null;
    loginTime: Date;
    updatedAt: Date;
    _count: KiteTokenCountAggregateOutputType | null;
    _avg: KiteTokenAvgAggregateOutputType | null;
    _sum: KiteTokenSumAggregateOutputType | null;
    _min: KiteTokenMinAggregateOutputType | null;
    _max: KiteTokenMaxAggregateOutputType | null;
};
type GetKiteTokenGroupByPayload<T extends KiteTokenGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<KiteTokenGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof KiteTokenGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], KiteTokenGroupByOutputType[P]> : Prisma.GetScalarType<T[P], KiteTokenGroupByOutputType[P]>;
}>>;
export type KiteTokenWhereInput = {
    AND?: Prisma.KiteTokenWhereInput | Prisma.KiteTokenWhereInput[];
    OR?: Prisma.KiteTokenWhereInput[];
    NOT?: Prisma.KiteTokenWhereInput | Prisma.KiteTokenWhereInput[];
    id?: Prisma.IntFilter<"KiteToken"> | number;
    accessToken?: Prisma.StringFilter<"KiteToken"> | string;
    publicToken?: Prisma.StringNullableFilter<"KiteToken"> | string | null;
    userId?: Prisma.StringNullableFilter<"KiteToken"> | string | null;
    loginTime?: Prisma.DateTimeFilter<"KiteToken"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"KiteToken"> | Date | string;
};
export type KiteTokenOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    accessToken?: Prisma.SortOrder;
    publicToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    loginTime?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type KiteTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.KiteTokenWhereInput | Prisma.KiteTokenWhereInput[];
    OR?: Prisma.KiteTokenWhereInput[];
    NOT?: Prisma.KiteTokenWhereInput | Prisma.KiteTokenWhereInput[];
    accessToken?: Prisma.StringFilter<"KiteToken"> | string;
    publicToken?: Prisma.StringNullableFilter<"KiteToken"> | string | null;
    userId?: Prisma.StringNullableFilter<"KiteToken"> | string | null;
    loginTime?: Prisma.DateTimeFilter<"KiteToken"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"KiteToken"> | Date | string;
}, "id">;
export type KiteTokenOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    accessToken?: Prisma.SortOrder;
    publicToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    loginTime?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.KiteTokenCountOrderByAggregateInput;
    _avg?: Prisma.KiteTokenAvgOrderByAggregateInput;
    _max?: Prisma.KiteTokenMaxOrderByAggregateInput;
    _min?: Prisma.KiteTokenMinOrderByAggregateInput;
    _sum?: Prisma.KiteTokenSumOrderByAggregateInput;
};
export type KiteTokenScalarWhereWithAggregatesInput = {
    AND?: Prisma.KiteTokenScalarWhereWithAggregatesInput | Prisma.KiteTokenScalarWhereWithAggregatesInput[];
    OR?: Prisma.KiteTokenScalarWhereWithAggregatesInput[];
    NOT?: Prisma.KiteTokenScalarWhereWithAggregatesInput | Prisma.KiteTokenScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"KiteToken"> | number;
    accessToken?: Prisma.StringWithAggregatesFilter<"KiteToken"> | string;
    publicToken?: Prisma.StringNullableWithAggregatesFilter<"KiteToken"> | string | null;
    userId?: Prisma.StringNullableWithAggregatesFilter<"KiteToken"> | string | null;
    loginTime?: Prisma.DateTimeWithAggregatesFilter<"KiteToken"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"KiteToken"> | Date | string;
};
export type KiteTokenCreateInput = {
    id?: number;
    accessToken: string;
    publicToken?: string | null;
    userId?: string | null;
    loginTime?: Date | string;
    updatedAt?: Date | string;
};
export type KiteTokenUncheckedCreateInput = {
    id?: number;
    accessToken: string;
    publicToken?: string | null;
    userId?: string | null;
    loginTime?: Date | string;
    updatedAt?: Date | string;
};
export type KiteTokenUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    accessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    publicToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loginTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KiteTokenUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    accessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    publicToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loginTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KiteTokenCreateManyInput = {
    id?: number;
    accessToken: string;
    publicToken?: string | null;
    userId?: string | null;
    loginTime?: Date | string;
    updatedAt?: Date | string;
};
export type KiteTokenUpdateManyMutationInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    accessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    publicToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loginTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KiteTokenUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    accessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    publicToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loginTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KiteTokenCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accessToken?: Prisma.SortOrder;
    publicToken?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    loginTime?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type KiteTokenAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type KiteTokenMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accessToken?: Prisma.SortOrder;
    publicToken?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    loginTime?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type KiteTokenMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    accessToken?: Prisma.SortOrder;
    publicToken?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    loginTime?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type KiteTokenSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type KiteTokenSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accessToken?: boolean;
    publicToken?: boolean;
    userId?: boolean;
    loginTime?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["kiteToken"]>;
export type KiteTokenSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accessToken?: boolean;
    publicToken?: boolean;
    userId?: boolean;
    loginTime?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["kiteToken"]>;
export type KiteTokenSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accessToken?: boolean;
    publicToken?: boolean;
    userId?: boolean;
    loginTime?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["kiteToken"]>;
export type KiteTokenSelectScalar = {
    id?: boolean;
    accessToken?: boolean;
    publicToken?: boolean;
    userId?: boolean;
    loginTime?: boolean;
    updatedAt?: boolean;
};
export type KiteTokenOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "accessToken" | "publicToken" | "userId" | "loginTime" | "updatedAt", ExtArgs["result"]["kiteToken"]>;
export type $KiteTokenPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "KiteToken";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        accessToken: string;
        publicToken: string | null;
        userId: string | null;
        loginTime: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["kiteToken"]>;
    composites: {};
};
export type KiteTokenGetPayload<S extends boolean | null | undefined | KiteTokenDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$KiteTokenPayload, S>;
export type KiteTokenCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<KiteTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: KiteTokenCountAggregateInputType | true;
};
export interface KiteTokenDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['KiteToken'];
        meta: {
            name: 'KiteToken';
        };
    };
    /**
     * Find zero or one KiteToken that matches the filter.
     * @param {KiteTokenFindUniqueArgs} args - Arguments to find a KiteToken
     * @example
     * // Get one KiteToken
     * const kiteToken = await prisma.kiteToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KiteTokenFindUniqueArgs>(args: Prisma.SelectSubset<T, KiteTokenFindUniqueArgs<ExtArgs>>): Prisma.Prisma__KiteTokenClient<runtime.Types.Result.GetResult<Prisma.$KiteTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one KiteToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KiteTokenFindUniqueOrThrowArgs} args - Arguments to find a KiteToken
     * @example
     * // Get one KiteToken
     * const kiteToken = await prisma.kiteToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KiteTokenFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, KiteTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__KiteTokenClient<runtime.Types.Result.GetResult<Prisma.$KiteTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first KiteToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteTokenFindFirstArgs} args - Arguments to find a KiteToken
     * @example
     * // Get one KiteToken
     * const kiteToken = await prisma.kiteToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KiteTokenFindFirstArgs>(args?: Prisma.SelectSubset<T, KiteTokenFindFirstArgs<ExtArgs>>): Prisma.Prisma__KiteTokenClient<runtime.Types.Result.GetResult<Prisma.$KiteTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first KiteToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteTokenFindFirstOrThrowArgs} args - Arguments to find a KiteToken
     * @example
     * // Get one KiteToken
     * const kiteToken = await prisma.kiteToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KiteTokenFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, KiteTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__KiteTokenClient<runtime.Types.Result.GetResult<Prisma.$KiteTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more KiteTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KiteTokens
     * const kiteTokens = await prisma.kiteToken.findMany()
     *
     * // Get first 10 KiteTokens
     * const kiteTokens = await prisma.kiteToken.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const kiteTokenWithIdOnly = await prisma.kiteToken.findMany({ select: { id: true } })
     *
     */
    findMany<T extends KiteTokenFindManyArgs>(args?: Prisma.SelectSubset<T, KiteTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KiteTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a KiteToken.
     * @param {KiteTokenCreateArgs} args - Arguments to create a KiteToken.
     * @example
     * // Create one KiteToken
     * const KiteToken = await prisma.kiteToken.create({
     *   data: {
     *     // ... data to create a KiteToken
     *   }
     * })
     *
     */
    create<T extends KiteTokenCreateArgs>(args: Prisma.SelectSubset<T, KiteTokenCreateArgs<ExtArgs>>): Prisma.Prisma__KiteTokenClient<runtime.Types.Result.GetResult<Prisma.$KiteTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many KiteTokens.
     * @param {KiteTokenCreateManyArgs} args - Arguments to create many KiteTokens.
     * @example
     * // Create many KiteTokens
     * const kiteToken = await prisma.kiteToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends KiteTokenCreateManyArgs>(args?: Prisma.SelectSubset<T, KiteTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many KiteTokens and returns the data saved in the database.
     * @param {KiteTokenCreateManyAndReturnArgs} args - Arguments to create many KiteTokens.
     * @example
     * // Create many KiteTokens
     * const kiteToken = await prisma.kiteToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many KiteTokens and only return the `id`
     * const kiteTokenWithIdOnly = await prisma.kiteToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends KiteTokenCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, KiteTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KiteTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a KiteToken.
     * @param {KiteTokenDeleteArgs} args - Arguments to delete one KiteToken.
     * @example
     * // Delete one KiteToken
     * const KiteToken = await prisma.kiteToken.delete({
     *   where: {
     *     // ... filter to delete one KiteToken
     *   }
     * })
     *
     */
    delete<T extends KiteTokenDeleteArgs>(args: Prisma.SelectSubset<T, KiteTokenDeleteArgs<ExtArgs>>): Prisma.Prisma__KiteTokenClient<runtime.Types.Result.GetResult<Prisma.$KiteTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one KiteToken.
     * @param {KiteTokenUpdateArgs} args - Arguments to update one KiteToken.
     * @example
     * // Update one KiteToken
     * const kiteToken = await prisma.kiteToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends KiteTokenUpdateArgs>(args: Prisma.SelectSubset<T, KiteTokenUpdateArgs<ExtArgs>>): Prisma.Prisma__KiteTokenClient<runtime.Types.Result.GetResult<Prisma.$KiteTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more KiteTokens.
     * @param {KiteTokenDeleteManyArgs} args - Arguments to filter KiteTokens to delete.
     * @example
     * // Delete a few KiteTokens
     * const { count } = await prisma.kiteToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends KiteTokenDeleteManyArgs>(args?: Prisma.SelectSubset<T, KiteTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more KiteTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KiteTokens
     * const kiteToken = await prisma.kiteToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends KiteTokenUpdateManyArgs>(args: Prisma.SelectSubset<T, KiteTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more KiteTokens and returns the data updated in the database.
     * @param {KiteTokenUpdateManyAndReturnArgs} args - Arguments to update many KiteTokens.
     * @example
     * // Update many KiteTokens
     * const kiteToken = await prisma.kiteToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more KiteTokens and only return the `id`
     * const kiteTokenWithIdOnly = await prisma.kiteToken.updateManyAndReturn({
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
    updateManyAndReturn<T extends KiteTokenUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, KiteTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KiteTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one KiteToken.
     * @param {KiteTokenUpsertArgs} args - Arguments to update or create a KiteToken.
     * @example
     * // Update or create a KiteToken
     * const kiteToken = await prisma.kiteToken.upsert({
     *   create: {
     *     // ... data to create a KiteToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KiteToken we want to update
     *   }
     * })
     */
    upsert<T extends KiteTokenUpsertArgs>(args: Prisma.SelectSubset<T, KiteTokenUpsertArgs<ExtArgs>>): Prisma.Prisma__KiteTokenClient<runtime.Types.Result.GetResult<Prisma.$KiteTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of KiteTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteTokenCountArgs} args - Arguments to filter KiteTokens to count.
     * @example
     * // Count the number of KiteTokens
     * const count = await prisma.kiteToken.count({
     *   where: {
     *     // ... the filter for the KiteTokens we want to count
     *   }
     * })
    **/
    count<T extends KiteTokenCountArgs>(args?: Prisma.Subset<T, KiteTokenCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], KiteTokenCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a KiteToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends KiteTokenAggregateArgs>(args: Prisma.Subset<T, KiteTokenAggregateArgs>): Prisma.PrismaPromise<GetKiteTokenAggregateType<T>>;
    /**
     * Group by KiteToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteTokenGroupByArgs} args - Group by arguments.
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
    groupBy<T extends KiteTokenGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: KiteTokenGroupByArgs['orderBy'];
    } : {
        orderBy?: KiteTokenGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, KiteTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKiteTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the KiteToken model
     */
    readonly fields: KiteTokenFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for KiteToken.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__KiteTokenClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the KiteToken model
 */
export interface KiteTokenFieldRefs {
    readonly id: Prisma.FieldRef<"KiteToken", 'Int'>;
    readonly accessToken: Prisma.FieldRef<"KiteToken", 'String'>;
    readonly publicToken: Prisma.FieldRef<"KiteToken", 'String'>;
    readonly userId: Prisma.FieldRef<"KiteToken", 'String'>;
    readonly loginTime: Prisma.FieldRef<"KiteToken", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"KiteToken", 'DateTime'>;
}
/**
 * KiteToken findUnique
 */
export type KiteTokenFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteToken
     */
    select?: Prisma.KiteTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteToken
     */
    omit?: Prisma.KiteTokenOmit<ExtArgs> | null;
    /**
     * Filter, which KiteToken to fetch.
     */
    where: Prisma.KiteTokenWhereUniqueInput;
};
/**
 * KiteToken findUniqueOrThrow
 */
export type KiteTokenFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteToken
     */
    select?: Prisma.KiteTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteToken
     */
    omit?: Prisma.KiteTokenOmit<ExtArgs> | null;
    /**
     * Filter, which KiteToken to fetch.
     */
    where: Prisma.KiteTokenWhereUniqueInput;
};
/**
 * KiteToken findFirst
 */
export type KiteTokenFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteToken
     */
    select?: Prisma.KiteTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteToken
     */
    omit?: Prisma.KiteTokenOmit<ExtArgs> | null;
    /**
     * Filter, which KiteToken to fetch.
     */
    where?: Prisma.KiteTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of KiteTokens to fetch.
     */
    orderBy?: Prisma.KiteTokenOrderByWithRelationInput | Prisma.KiteTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for KiteTokens.
     */
    cursor?: Prisma.KiteTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` KiteTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` KiteTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of KiteTokens.
     */
    distinct?: Prisma.KiteTokenScalarFieldEnum | Prisma.KiteTokenScalarFieldEnum[];
};
/**
 * KiteToken findFirstOrThrow
 */
export type KiteTokenFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteToken
     */
    select?: Prisma.KiteTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteToken
     */
    omit?: Prisma.KiteTokenOmit<ExtArgs> | null;
    /**
     * Filter, which KiteToken to fetch.
     */
    where?: Prisma.KiteTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of KiteTokens to fetch.
     */
    orderBy?: Prisma.KiteTokenOrderByWithRelationInput | Prisma.KiteTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for KiteTokens.
     */
    cursor?: Prisma.KiteTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` KiteTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` KiteTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of KiteTokens.
     */
    distinct?: Prisma.KiteTokenScalarFieldEnum | Prisma.KiteTokenScalarFieldEnum[];
};
/**
 * KiteToken findMany
 */
export type KiteTokenFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteToken
     */
    select?: Prisma.KiteTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteToken
     */
    omit?: Prisma.KiteTokenOmit<ExtArgs> | null;
    /**
     * Filter, which KiteTokens to fetch.
     */
    where?: Prisma.KiteTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of KiteTokens to fetch.
     */
    orderBy?: Prisma.KiteTokenOrderByWithRelationInput | Prisma.KiteTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing KiteTokens.
     */
    cursor?: Prisma.KiteTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` KiteTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` KiteTokens.
     */
    skip?: number;
    distinct?: Prisma.KiteTokenScalarFieldEnum | Prisma.KiteTokenScalarFieldEnum[];
};
/**
 * KiteToken create
 */
export type KiteTokenCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteToken
     */
    select?: Prisma.KiteTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteToken
     */
    omit?: Prisma.KiteTokenOmit<ExtArgs> | null;
    /**
     * The data needed to create a KiteToken.
     */
    data: Prisma.XOR<Prisma.KiteTokenCreateInput, Prisma.KiteTokenUncheckedCreateInput>;
};
/**
 * KiteToken createMany
 */
export type KiteTokenCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many KiteTokens.
     */
    data: Prisma.KiteTokenCreateManyInput | Prisma.KiteTokenCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * KiteToken createManyAndReturn
 */
export type KiteTokenCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteToken
     */
    select?: Prisma.KiteTokenSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteToken
     */
    omit?: Prisma.KiteTokenOmit<ExtArgs> | null;
    /**
     * The data used to create many KiteTokens.
     */
    data: Prisma.KiteTokenCreateManyInput | Prisma.KiteTokenCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * KiteToken update
 */
export type KiteTokenUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteToken
     */
    select?: Prisma.KiteTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteToken
     */
    omit?: Prisma.KiteTokenOmit<ExtArgs> | null;
    /**
     * The data needed to update a KiteToken.
     */
    data: Prisma.XOR<Prisma.KiteTokenUpdateInput, Prisma.KiteTokenUncheckedUpdateInput>;
    /**
     * Choose, which KiteToken to update.
     */
    where: Prisma.KiteTokenWhereUniqueInput;
};
/**
 * KiteToken updateMany
 */
export type KiteTokenUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update KiteTokens.
     */
    data: Prisma.XOR<Prisma.KiteTokenUpdateManyMutationInput, Prisma.KiteTokenUncheckedUpdateManyInput>;
    /**
     * Filter which KiteTokens to update
     */
    where?: Prisma.KiteTokenWhereInput;
    /**
     * Limit how many KiteTokens to update.
     */
    limit?: number;
};
/**
 * KiteToken updateManyAndReturn
 */
export type KiteTokenUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteToken
     */
    select?: Prisma.KiteTokenSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteToken
     */
    omit?: Prisma.KiteTokenOmit<ExtArgs> | null;
    /**
     * The data used to update KiteTokens.
     */
    data: Prisma.XOR<Prisma.KiteTokenUpdateManyMutationInput, Prisma.KiteTokenUncheckedUpdateManyInput>;
    /**
     * Filter which KiteTokens to update
     */
    where?: Prisma.KiteTokenWhereInput;
    /**
     * Limit how many KiteTokens to update.
     */
    limit?: number;
};
/**
 * KiteToken upsert
 */
export type KiteTokenUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteToken
     */
    select?: Prisma.KiteTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteToken
     */
    omit?: Prisma.KiteTokenOmit<ExtArgs> | null;
    /**
     * The filter to search for the KiteToken to update in case it exists.
     */
    where: Prisma.KiteTokenWhereUniqueInput;
    /**
     * In case the KiteToken found by the `where` argument doesn't exist, create a new KiteToken with this data.
     */
    create: Prisma.XOR<Prisma.KiteTokenCreateInput, Prisma.KiteTokenUncheckedCreateInput>;
    /**
     * In case the KiteToken was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.KiteTokenUpdateInput, Prisma.KiteTokenUncheckedUpdateInput>;
};
/**
 * KiteToken delete
 */
export type KiteTokenDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteToken
     */
    select?: Prisma.KiteTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteToken
     */
    omit?: Prisma.KiteTokenOmit<ExtArgs> | null;
    /**
     * Filter which KiteToken to delete.
     */
    where: Prisma.KiteTokenWhereUniqueInput;
};
/**
 * KiteToken deleteMany
 */
export type KiteTokenDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which KiteTokens to delete
     */
    where?: Prisma.KiteTokenWhereInput;
    /**
     * Limit how many KiteTokens to delete.
     */
    limit?: number;
};
/**
 * KiteToken without action
 */
export type KiteTokenDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteToken
     */
    select?: Prisma.KiteTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteToken
     */
    omit?: Prisma.KiteTokenOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=KiteToken.d.ts.map
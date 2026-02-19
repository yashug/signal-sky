import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model KiteInstrument
 *
 */
export type KiteInstrumentModel = runtime.Types.Result.DefaultSelection<Prisma.$KiteInstrumentPayload>;
export type AggregateKiteInstrument = {
    _count: KiteInstrumentCountAggregateOutputType | null;
    _avg: KiteInstrumentAvgAggregateOutputType | null;
    _sum: KiteInstrumentSumAggregateOutputType | null;
    _min: KiteInstrumentMinAggregateOutputType | null;
    _max: KiteInstrumentMaxAggregateOutputType | null;
};
export type KiteInstrumentAvgAggregateOutputType = {
    instrumentToken: number | null;
    exchangeToken: number | null;
    lotSize: number | null;
};
export type KiteInstrumentSumAggregateOutputType = {
    instrumentToken: number | null;
    exchangeToken: number | null;
    lotSize: number | null;
};
export type KiteInstrumentMinAggregateOutputType = {
    instrumentToken: number | null;
    exchangeToken: number | null;
    tradingsymbol: string | null;
    name: string | null;
    exchange: string | null;
    segment: string | null;
    instrumentType: string | null;
    lotSize: number | null;
    updatedAt: Date | null;
};
export type KiteInstrumentMaxAggregateOutputType = {
    instrumentToken: number | null;
    exchangeToken: number | null;
    tradingsymbol: string | null;
    name: string | null;
    exchange: string | null;
    segment: string | null;
    instrumentType: string | null;
    lotSize: number | null;
    updatedAt: Date | null;
};
export type KiteInstrumentCountAggregateOutputType = {
    instrumentToken: number;
    exchangeToken: number;
    tradingsymbol: number;
    name: number;
    exchange: number;
    segment: number;
    instrumentType: number;
    lotSize: number;
    updatedAt: number;
    _all: number;
};
export type KiteInstrumentAvgAggregateInputType = {
    instrumentToken?: true;
    exchangeToken?: true;
    lotSize?: true;
};
export type KiteInstrumentSumAggregateInputType = {
    instrumentToken?: true;
    exchangeToken?: true;
    lotSize?: true;
};
export type KiteInstrumentMinAggregateInputType = {
    instrumentToken?: true;
    exchangeToken?: true;
    tradingsymbol?: true;
    name?: true;
    exchange?: true;
    segment?: true;
    instrumentType?: true;
    lotSize?: true;
    updatedAt?: true;
};
export type KiteInstrumentMaxAggregateInputType = {
    instrumentToken?: true;
    exchangeToken?: true;
    tradingsymbol?: true;
    name?: true;
    exchange?: true;
    segment?: true;
    instrumentType?: true;
    lotSize?: true;
    updatedAt?: true;
};
export type KiteInstrumentCountAggregateInputType = {
    instrumentToken?: true;
    exchangeToken?: true;
    tradingsymbol?: true;
    name?: true;
    exchange?: true;
    segment?: true;
    instrumentType?: true;
    lotSize?: true;
    updatedAt?: true;
    _all?: true;
};
export type KiteInstrumentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which KiteInstrument to aggregate.
     */
    where?: Prisma.KiteInstrumentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of KiteInstruments to fetch.
     */
    orderBy?: Prisma.KiteInstrumentOrderByWithRelationInput | Prisma.KiteInstrumentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.KiteInstrumentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` KiteInstruments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` KiteInstruments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned KiteInstruments
    **/
    _count?: true | KiteInstrumentCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: KiteInstrumentAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: KiteInstrumentSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: KiteInstrumentMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: KiteInstrumentMaxAggregateInputType;
};
export type GetKiteInstrumentAggregateType<T extends KiteInstrumentAggregateArgs> = {
    [P in keyof T & keyof AggregateKiteInstrument]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateKiteInstrument[P]> : Prisma.GetScalarType<T[P], AggregateKiteInstrument[P]>;
};
export type KiteInstrumentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KiteInstrumentWhereInput;
    orderBy?: Prisma.KiteInstrumentOrderByWithAggregationInput | Prisma.KiteInstrumentOrderByWithAggregationInput[];
    by: Prisma.KiteInstrumentScalarFieldEnum[] | Prisma.KiteInstrumentScalarFieldEnum;
    having?: Prisma.KiteInstrumentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: KiteInstrumentCountAggregateInputType | true;
    _avg?: KiteInstrumentAvgAggregateInputType;
    _sum?: KiteInstrumentSumAggregateInputType;
    _min?: KiteInstrumentMinAggregateInputType;
    _max?: KiteInstrumentMaxAggregateInputType;
};
export type KiteInstrumentGroupByOutputType = {
    instrumentToken: number;
    exchangeToken: number;
    tradingsymbol: string;
    name: string | null;
    exchange: string;
    segment: string;
    instrumentType: string;
    lotSize: number;
    updatedAt: Date;
    _count: KiteInstrumentCountAggregateOutputType | null;
    _avg: KiteInstrumentAvgAggregateOutputType | null;
    _sum: KiteInstrumentSumAggregateOutputType | null;
    _min: KiteInstrumentMinAggregateOutputType | null;
    _max: KiteInstrumentMaxAggregateOutputType | null;
};
type GetKiteInstrumentGroupByPayload<T extends KiteInstrumentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<KiteInstrumentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof KiteInstrumentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], KiteInstrumentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], KiteInstrumentGroupByOutputType[P]>;
}>>;
export type KiteInstrumentWhereInput = {
    AND?: Prisma.KiteInstrumentWhereInput | Prisma.KiteInstrumentWhereInput[];
    OR?: Prisma.KiteInstrumentWhereInput[];
    NOT?: Prisma.KiteInstrumentWhereInput | Prisma.KiteInstrumentWhereInput[];
    instrumentToken?: Prisma.IntFilter<"KiteInstrument"> | number;
    exchangeToken?: Prisma.IntFilter<"KiteInstrument"> | number;
    tradingsymbol?: Prisma.StringFilter<"KiteInstrument"> | string;
    name?: Prisma.StringNullableFilter<"KiteInstrument"> | string | null;
    exchange?: Prisma.StringFilter<"KiteInstrument"> | string;
    segment?: Prisma.StringFilter<"KiteInstrument"> | string;
    instrumentType?: Prisma.StringFilter<"KiteInstrument"> | string;
    lotSize?: Prisma.IntFilter<"KiteInstrument"> | number;
    updatedAt?: Prisma.DateTimeFilter<"KiteInstrument"> | Date | string;
};
export type KiteInstrumentOrderByWithRelationInput = {
    instrumentToken?: Prisma.SortOrder;
    exchangeToken?: Prisma.SortOrder;
    tradingsymbol?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    segment?: Prisma.SortOrder;
    instrumentType?: Prisma.SortOrder;
    lotSize?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type KiteInstrumentWhereUniqueInput = Prisma.AtLeast<{
    instrumentToken?: number;
    AND?: Prisma.KiteInstrumentWhereInput | Prisma.KiteInstrumentWhereInput[];
    OR?: Prisma.KiteInstrumentWhereInput[];
    NOT?: Prisma.KiteInstrumentWhereInput | Prisma.KiteInstrumentWhereInput[];
    exchangeToken?: Prisma.IntFilter<"KiteInstrument"> | number;
    tradingsymbol?: Prisma.StringFilter<"KiteInstrument"> | string;
    name?: Prisma.StringNullableFilter<"KiteInstrument"> | string | null;
    exchange?: Prisma.StringFilter<"KiteInstrument"> | string;
    segment?: Prisma.StringFilter<"KiteInstrument"> | string;
    instrumentType?: Prisma.StringFilter<"KiteInstrument"> | string;
    lotSize?: Prisma.IntFilter<"KiteInstrument"> | number;
    updatedAt?: Prisma.DateTimeFilter<"KiteInstrument"> | Date | string;
}, "instrumentToken">;
export type KiteInstrumentOrderByWithAggregationInput = {
    instrumentToken?: Prisma.SortOrder;
    exchangeToken?: Prisma.SortOrder;
    tradingsymbol?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    segment?: Prisma.SortOrder;
    instrumentType?: Prisma.SortOrder;
    lotSize?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.KiteInstrumentCountOrderByAggregateInput;
    _avg?: Prisma.KiteInstrumentAvgOrderByAggregateInput;
    _max?: Prisma.KiteInstrumentMaxOrderByAggregateInput;
    _min?: Prisma.KiteInstrumentMinOrderByAggregateInput;
    _sum?: Prisma.KiteInstrumentSumOrderByAggregateInput;
};
export type KiteInstrumentScalarWhereWithAggregatesInput = {
    AND?: Prisma.KiteInstrumentScalarWhereWithAggregatesInput | Prisma.KiteInstrumentScalarWhereWithAggregatesInput[];
    OR?: Prisma.KiteInstrumentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.KiteInstrumentScalarWhereWithAggregatesInput | Prisma.KiteInstrumentScalarWhereWithAggregatesInput[];
    instrumentToken?: Prisma.IntWithAggregatesFilter<"KiteInstrument"> | number;
    exchangeToken?: Prisma.IntWithAggregatesFilter<"KiteInstrument"> | number;
    tradingsymbol?: Prisma.StringWithAggregatesFilter<"KiteInstrument"> | string;
    name?: Prisma.StringNullableWithAggregatesFilter<"KiteInstrument"> | string | null;
    exchange?: Prisma.StringWithAggregatesFilter<"KiteInstrument"> | string;
    segment?: Prisma.StringWithAggregatesFilter<"KiteInstrument"> | string;
    instrumentType?: Prisma.StringWithAggregatesFilter<"KiteInstrument"> | string;
    lotSize?: Prisma.IntWithAggregatesFilter<"KiteInstrument"> | number;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"KiteInstrument"> | Date | string;
};
export type KiteInstrumentCreateInput = {
    instrumentToken: number;
    exchangeToken: number;
    tradingsymbol: string;
    name?: string | null;
    exchange: string;
    segment: string;
    instrumentType: string;
    lotSize?: number;
    updatedAt?: Date | string;
};
export type KiteInstrumentUncheckedCreateInput = {
    instrumentToken: number;
    exchangeToken: number;
    tradingsymbol: string;
    name?: string | null;
    exchange: string;
    segment: string;
    instrumentType: string;
    lotSize?: number;
    updatedAt?: Date | string;
};
export type KiteInstrumentUpdateInput = {
    instrumentToken?: Prisma.IntFieldUpdateOperationsInput | number;
    exchangeToken?: Prisma.IntFieldUpdateOperationsInput | number;
    tradingsymbol?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    segment?: Prisma.StringFieldUpdateOperationsInput | string;
    instrumentType?: Prisma.StringFieldUpdateOperationsInput | string;
    lotSize?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KiteInstrumentUncheckedUpdateInput = {
    instrumentToken?: Prisma.IntFieldUpdateOperationsInput | number;
    exchangeToken?: Prisma.IntFieldUpdateOperationsInput | number;
    tradingsymbol?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    segment?: Prisma.StringFieldUpdateOperationsInput | string;
    instrumentType?: Prisma.StringFieldUpdateOperationsInput | string;
    lotSize?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KiteInstrumentCreateManyInput = {
    instrumentToken: number;
    exchangeToken: number;
    tradingsymbol: string;
    name?: string | null;
    exchange: string;
    segment: string;
    instrumentType: string;
    lotSize?: number;
    updatedAt?: Date | string;
};
export type KiteInstrumentUpdateManyMutationInput = {
    instrumentToken?: Prisma.IntFieldUpdateOperationsInput | number;
    exchangeToken?: Prisma.IntFieldUpdateOperationsInput | number;
    tradingsymbol?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    segment?: Prisma.StringFieldUpdateOperationsInput | string;
    instrumentType?: Prisma.StringFieldUpdateOperationsInput | string;
    lotSize?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KiteInstrumentUncheckedUpdateManyInput = {
    instrumentToken?: Prisma.IntFieldUpdateOperationsInput | number;
    exchangeToken?: Prisma.IntFieldUpdateOperationsInput | number;
    tradingsymbol?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    segment?: Prisma.StringFieldUpdateOperationsInput | string;
    instrumentType?: Prisma.StringFieldUpdateOperationsInput | string;
    lotSize?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KiteInstrumentCountOrderByAggregateInput = {
    instrumentToken?: Prisma.SortOrder;
    exchangeToken?: Prisma.SortOrder;
    tradingsymbol?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    segment?: Prisma.SortOrder;
    instrumentType?: Prisma.SortOrder;
    lotSize?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type KiteInstrumentAvgOrderByAggregateInput = {
    instrumentToken?: Prisma.SortOrder;
    exchangeToken?: Prisma.SortOrder;
    lotSize?: Prisma.SortOrder;
};
export type KiteInstrumentMaxOrderByAggregateInput = {
    instrumentToken?: Prisma.SortOrder;
    exchangeToken?: Prisma.SortOrder;
    tradingsymbol?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    segment?: Prisma.SortOrder;
    instrumentType?: Prisma.SortOrder;
    lotSize?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type KiteInstrumentMinOrderByAggregateInput = {
    instrumentToken?: Prisma.SortOrder;
    exchangeToken?: Prisma.SortOrder;
    tradingsymbol?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    segment?: Prisma.SortOrder;
    instrumentType?: Prisma.SortOrder;
    lotSize?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type KiteInstrumentSumOrderByAggregateInput = {
    instrumentToken?: Prisma.SortOrder;
    exchangeToken?: Prisma.SortOrder;
    lotSize?: Prisma.SortOrder;
};
export type KiteInstrumentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    instrumentToken?: boolean;
    exchangeToken?: boolean;
    tradingsymbol?: boolean;
    name?: boolean;
    exchange?: boolean;
    segment?: boolean;
    instrumentType?: boolean;
    lotSize?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["kiteInstrument"]>;
export type KiteInstrumentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    instrumentToken?: boolean;
    exchangeToken?: boolean;
    tradingsymbol?: boolean;
    name?: boolean;
    exchange?: boolean;
    segment?: boolean;
    instrumentType?: boolean;
    lotSize?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["kiteInstrument"]>;
export type KiteInstrumentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    instrumentToken?: boolean;
    exchangeToken?: boolean;
    tradingsymbol?: boolean;
    name?: boolean;
    exchange?: boolean;
    segment?: boolean;
    instrumentType?: boolean;
    lotSize?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["kiteInstrument"]>;
export type KiteInstrumentSelectScalar = {
    instrumentToken?: boolean;
    exchangeToken?: boolean;
    tradingsymbol?: boolean;
    name?: boolean;
    exchange?: boolean;
    segment?: boolean;
    instrumentType?: boolean;
    lotSize?: boolean;
    updatedAt?: boolean;
};
export type KiteInstrumentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"instrumentToken" | "exchangeToken" | "tradingsymbol" | "name" | "exchange" | "segment" | "instrumentType" | "lotSize" | "updatedAt", ExtArgs["result"]["kiteInstrument"]>;
export type $KiteInstrumentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "KiteInstrument";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        instrumentToken: number;
        exchangeToken: number;
        tradingsymbol: string;
        name: string | null;
        exchange: string;
        segment: string;
        instrumentType: string;
        lotSize: number;
        updatedAt: Date;
    }, ExtArgs["result"]["kiteInstrument"]>;
    composites: {};
};
export type KiteInstrumentGetPayload<S extends boolean | null | undefined | KiteInstrumentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$KiteInstrumentPayload, S>;
export type KiteInstrumentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<KiteInstrumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: KiteInstrumentCountAggregateInputType | true;
};
export interface KiteInstrumentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['KiteInstrument'];
        meta: {
            name: 'KiteInstrument';
        };
    };
    /**
     * Find zero or one KiteInstrument that matches the filter.
     * @param {KiteInstrumentFindUniqueArgs} args - Arguments to find a KiteInstrument
     * @example
     * // Get one KiteInstrument
     * const kiteInstrument = await prisma.kiteInstrument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KiteInstrumentFindUniqueArgs>(args: Prisma.SelectSubset<T, KiteInstrumentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__KiteInstrumentClient<runtime.Types.Result.GetResult<Prisma.$KiteInstrumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one KiteInstrument that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KiteInstrumentFindUniqueOrThrowArgs} args - Arguments to find a KiteInstrument
     * @example
     * // Get one KiteInstrument
     * const kiteInstrument = await prisma.kiteInstrument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KiteInstrumentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, KiteInstrumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__KiteInstrumentClient<runtime.Types.Result.GetResult<Prisma.$KiteInstrumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first KiteInstrument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteInstrumentFindFirstArgs} args - Arguments to find a KiteInstrument
     * @example
     * // Get one KiteInstrument
     * const kiteInstrument = await prisma.kiteInstrument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KiteInstrumentFindFirstArgs>(args?: Prisma.SelectSubset<T, KiteInstrumentFindFirstArgs<ExtArgs>>): Prisma.Prisma__KiteInstrumentClient<runtime.Types.Result.GetResult<Prisma.$KiteInstrumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first KiteInstrument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteInstrumentFindFirstOrThrowArgs} args - Arguments to find a KiteInstrument
     * @example
     * // Get one KiteInstrument
     * const kiteInstrument = await prisma.kiteInstrument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KiteInstrumentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, KiteInstrumentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__KiteInstrumentClient<runtime.Types.Result.GetResult<Prisma.$KiteInstrumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more KiteInstruments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteInstrumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KiteInstruments
     * const kiteInstruments = await prisma.kiteInstrument.findMany()
     *
     * // Get first 10 KiteInstruments
     * const kiteInstruments = await prisma.kiteInstrument.findMany({ take: 10 })
     *
     * // Only select the `instrumentToken`
     * const kiteInstrumentWithInstrumentTokenOnly = await prisma.kiteInstrument.findMany({ select: { instrumentToken: true } })
     *
     */
    findMany<T extends KiteInstrumentFindManyArgs>(args?: Prisma.SelectSubset<T, KiteInstrumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KiteInstrumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a KiteInstrument.
     * @param {KiteInstrumentCreateArgs} args - Arguments to create a KiteInstrument.
     * @example
     * // Create one KiteInstrument
     * const KiteInstrument = await prisma.kiteInstrument.create({
     *   data: {
     *     // ... data to create a KiteInstrument
     *   }
     * })
     *
     */
    create<T extends KiteInstrumentCreateArgs>(args: Prisma.SelectSubset<T, KiteInstrumentCreateArgs<ExtArgs>>): Prisma.Prisma__KiteInstrumentClient<runtime.Types.Result.GetResult<Prisma.$KiteInstrumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many KiteInstruments.
     * @param {KiteInstrumentCreateManyArgs} args - Arguments to create many KiteInstruments.
     * @example
     * // Create many KiteInstruments
     * const kiteInstrument = await prisma.kiteInstrument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends KiteInstrumentCreateManyArgs>(args?: Prisma.SelectSubset<T, KiteInstrumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many KiteInstruments and returns the data saved in the database.
     * @param {KiteInstrumentCreateManyAndReturnArgs} args - Arguments to create many KiteInstruments.
     * @example
     * // Create many KiteInstruments
     * const kiteInstrument = await prisma.kiteInstrument.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many KiteInstruments and only return the `instrumentToken`
     * const kiteInstrumentWithInstrumentTokenOnly = await prisma.kiteInstrument.createManyAndReturn({
     *   select: { instrumentToken: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends KiteInstrumentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, KiteInstrumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KiteInstrumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a KiteInstrument.
     * @param {KiteInstrumentDeleteArgs} args - Arguments to delete one KiteInstrument.
     * @example
     * // Delete one KiteInstrument
     * const KiteInstrument = await prisma.kiteInstrument.delete({
     *   where: {
     *     // ... filter to delete one KiteInstrument
     *   }
     * })
     *
     */
    delete<T extends KiteInstrumentDeleteArgs>(args: Prisma.SelectSubset<T, KiteInstrumentDeleteArgs<ExtArgs>>): Prisma.Prisma__KiteInstrumentClient<runtime.Types.Result.GetResult<Prisma.$KiteInstrumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one KiteInstrument.
     * @param {KiteInstrumentUpdateArgs} args - Arguments to update one KiteInstrument.
     * @example
     * // Update one KiteInstrument
     * const kiteInstrument = await prisma.kiteInstrument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends KiteInstrumentUpdateArgs>(args: Prisma.SelectSubset<T, KiteInstrumentUpdateArgs<ExtArgs>>): Prisma.Prisma__KiteInstrumentClient<runtime.Types.Result.GetResult<Prisma.$KiteInstrumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more KiteInstruments.
     * @param {KiteInstrumentDeleteManyArgs} args - Arguments to filter KiteInstruments to delete.
     * @example
     * // Delete a few KiteInstruments
     * const { count } = await prisma.kiteInstrument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends KiteInstrumentDeleteManyArgs>(args?: Prisma.SelectSubset<T, KiteInstrumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more KiteInstruments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteInstrumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KiteInstruments
     * const kiteInstrument = await prisma.kiteInstrument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends KiteInstrumentUpdateManyArgs>(args: Prisma.SelectSubset<T, KiteInstrumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more KiteInstruments and returns the data updated in the database.
     * @param {KiteInstrumentUpdateManyAndReturnArgs} args - Arguments to update many KiteInstruments.
     * @example
     * // Update many KiteInstruments
     * const kiteInstrument = await prisma.kiteInstrument.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more KiteInstruments and only return the `instrumentToken`
     * const kiteInstrumentWithInstrumentTokenOnly = await prisma.kiteInstrument.updateManyAndReturn({
     *   select: { instrumentToken: true },
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
    updateManyAndReturn<T extends KiteInstrumentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, KiteInstrumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KiteInstrumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one KiteInstrument.
     * @param {KiteInstrumentUpsertArgs} args - Arguments to update or create a KiteInstrument.
     * @example
     * // Update or create a KiteInstrument
     * const kiteInstrument = await prisma.kiteInstrument.upsert({
     *   create: {
     *     // ... data to create a KiteInstrument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KiteInstrument we want to update
     *   }
     * })
     */
    upsert<T extends KiteInstrumentUpsertArgs>(args: Prisma.SelectSubset<T, KiteInstrumentUpsertArgs<ExtArgs>>): Prisma.Prisma__KiteInstrumentClient<runtime.Types.Result.GetResult<Prisma.$KiteInstrumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of KiteInstruments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteInstrumentCountArgs} args - Arguments to filter KiteInstruments to count.
     * @example
     * // Count the number of KiteInstruments
     * const count = await prisma.kiteInstrument.count({
     *   where: {
     *     // ... the filter for the KiteInstruments we want to count
     *   }
     * })
    **/
    count<T extends KiteInstrumentCountArgs>(args?: Prisma.Subset<T, KiteInstrumentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], KiteInstrumentCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a KiteInstrument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteInstrumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends KiteInstrumentAggregateArgs>(args: Prisma.Subset<T, KiteInstrumentAggregateArgs>): Prisma.PrismaPromise<GetKiteInstrumentAggregateType<T>>;
    /**
     * Group by KiteInstrument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteInstrumentGroupByArgs} args - Group by arguments.
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
    groupBy<T extends KiteInstrumentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: KiteInstrumentGroupByArgs['orderBy'];
    } : {
        orderBy?: KiteInstrumentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, KiteInstrumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKiteInstrumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the KiteInstrument model
     */
    readonly fields: KiteInstrumentFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for KiteInstrument.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__KiteInstrumentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the KiteInstrument model
 */
export interface KiteInstrumentFieldRefs {
    readonly instrumentToken: Prisma.FieldRef<"KiteInstrument", 'Int'>;
    readonly exchangeToken: Prisma.FieldRef<"KiteInstrument", 'Int'>;
    readonly tradingsymbol: Prisma.FieldRef<"KiteInstrument", 'String'>;
    readonly name: Prisma.FieldRef<"KiteInstrument", 'String'>;
    readonly exchange: Prisma.FieldRef<"KiteInstrument", 'String'>;
    readonly segment: Prisma.FieldRef<"KiteInstrument", 'String'>;
    readonly instrumentType: Prisma.FieldRef<"KiteInstrument", 'String'>;
    readonly lotSize: Prisma.FieldRef<"KiteInstrument", 'Int'>;
    readonly updatedAt: Prisma.FieldRef<"KiteInstrument", 'DateTime'>;
}
/**
 * KiteInstrument findUnique
 */
export type KiteInstrumentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteInstrument
     */
    select?: Prisma.KiteInstrumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteInstrument
     */
    omit?: Prisma.KiteInstrumentOmit<ExtArgs> | null;
    /**
     * Filter, which KiteInstrument to fetch.
     */
    where: Prisma.KiteInstrumentWhereUniqueInput;
};
/**
 * KiteInstrument findUniqueOrThrow
 */
export type KiteInstrumentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteInstrument
     */
    select?: Prisma.KiteInstrumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteInstrument
     */
    omit?: Prisma.KiteInstrumentOmit<ExtArgs> | null;
    /**
     * Filter, which KiteInstrument to fetch.
     */
    where: Prisma.KiteInstrumentWhereUniqueInput;
};
/**
 * KiteInstrument findFirst
 */
export type KiteInstrumentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteInstrument
     */
    select?: Prisma.KiteInstrumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteInstrument
     */
    omit?: Prisma.KiteInstrumentOmit<ExtArgs> | null;
    /**
     * Filter, which KiteInstrument to fetch.
     */
    where?: Prisma.KiteInstrumentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of KiteInstruments to fetch.
     */
    orderBy?: Prisma.KiteInstrumentOrderByWithRelationInput | Prisma.KiteInstrumentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for KiteInstruments.
     */
    cursor?: Prisma.KiteInstrumentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` KiteInstruments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` KiteInstruments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of KiteInstruments.
     */
    distinct?: Prisma.KiteInstrumentScalarFieldEnum | Prisma.KiteInstrumentScalarFieldEnum[];
};
/**
 * KiteInstrument findFirstOrThrow
 */
export type KiteInstrumentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteInstrument
     */
    select?: Prisma.KiteInstrumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteInstrument
     */
    omit?: Prisma.KiteInstrumentOmit<ExtArgs> | null;
    /**
     * Filter, which KiteInstrument to fetch.
     */
    where?: Prisma.KiteInstrumentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of KiteInstruments to fetch.
     */
    orderBy?: Prisma.KiteInstrumentOrderByWithRelationInput | Prisma.KiteInstrumentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for KiteInstruments.
     */
    cursor?: Prisma.KiteInstrumentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` KiteInstruments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` KiteInstruments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of KiteInstruments.
     */
    distinct?: Prisma.KiteInstrumentScalarFieldEnum | Prisma.KiteInstrumentScalarFieldEnum[];
};
/**
 * KiteInstrument findMany
 */
export type KiteInstrumentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteInstrument
     */
    select?: Prisma.KiteInstrumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteInstrument
     */
    omit?: Prisma.KiteInstrumentOmit<ExtArgs> | null;
    /**
     * Filter, which KiteInstruments to fetch.
     */
    where?: Prisma.KiteInstrumentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of KiteInstruments to fetch.
     */
    orderBy?: Prisma.KiteInstrumentOrderByWithRelationInput | Prisma.KiteInstrumentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing KiteInstruments.
     */
    cursor?: Prisma.KiteInstrumentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` KiteInstruments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` KiteInstruments.
     */
    skip?: number;
    distinct?: Prisma.KiteInstrumentScalarFieldEnum | Prisma.KiteInstrumentScalarFieldEnum[];
};
/**
 * KiteInstrument create
 */
export type KiteInstrumentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteInstrument
     */
    select?: Prisma.KiteInstrumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteInstrument
     */
    omit?: Prisma.KiteInstrumentOmit<ExtArgs> | null;
    /**
     * The data needed to create a KiteInstrument.
     */
    data: Prisma.XOR<Prisma.KiteInstrumentCreateInput, Prisma.KiteInstrumentUncheckedCreateInput>;
};
/**
 * KiteInstrument createMany
 */
export type KiteInstrumentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many KiteInstruments.
     */
    data: Prisma.KiteInstrumentCreateManyInput | Prisma.KiteInstrumentCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * KiteInstrument createManyAndReturn
 */
export type KiteInstrumentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteInstrument
     */
    select?: Prisma.KiteInstrumentSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteInstrument
     */
    omit?: Prisma.KiteInstrumentOmit<ExtArgs> | null;
    /**
     * The data used to create many KiteInstruments.
     */
    data: Prisma.KiteInstrumentCreateManyInput | Prisma.KiteInstrumentCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * KiteInstrument update
 */
export type KiteInstrumentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteInstrument
     */
    select?: Prisma.KiteInstrumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteInstrument
     */
    omit?: Prisma.KiteInstrumentOmit<ExtArgs> | null;
    /**
     * The data needed to update a KiteInstrument.
     */
    data: Prisma.XOR<Prisma.KiteInstrumentUpdateInput, Prisma.KiteInstrumentUncheckedUpdateInput>;
    /**
     * Choose, which KiteInstrument to update.
     */
    where: Prisma.KiteInstrumentWhereUniqueInput;
};
/**
 * KiteInstrument updateMany
 */
export type KiteInstrumentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update KiteInstruments.
     */
    data: Prisma.XOR<Prisma.KiteInstrumentUpdateManyMutationInput, Prisma.KiteInstrumentUncheckedUpdateManyInput>;
    /**
     * Filter which KiteInstruments to update
     */
    where?: Prisma.KiteInstrumentWhereInput;
    /**
     * Limit how many KiteInstruments to update.
     */
    limit?: number;
};
/**
 * KiteInstrument updateManyAndReturn
 */
export type KiteInstrumentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteInstrument
     */
    select?: Prisma.KiteInstrumentSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteInstrument
     */
    omit?: Prisma.KiteInstrumentOmit<ExtArgs> | null;
    /**
     * The data used to update KiteInstruments.
     */
    data: Prisma.XOR<Prisma.KiteInstrumentUpdateManyMutationInput, Prisma.KiteInstrumentUncheckedUpdateManyInput>;
    /**
     * Filter which KiteInstruments to update
     */
    where?: Prisma.KiteInstrumentWhereInput;
    /**
     * Limit how many KiteInstruments to update.
     */
    limit?: number;
};
/**
 * KiteInstrument upsert
 */
export type KiteInstrumentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteInstrument
     */
    select?: Prisma.KiteInstrumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteInstrument
     */
    omit?: Prisma.KiteInstrumentOmit<ExtArgs> | null;
    /**
     * The filter to search for the KiteInstrument to update in case it exists.
     */
    where: Prisma.KiteInstrumentWhereUniqueInput;
    /**
     * In case the KiteInstrument found by the `where` argument doesn't exist, create a new KiteInstrument with this data.
     */
    create: Prisma.XOR<Prisma.KiteInstrumentCreateInput, Prisma.KiteInstrumentUncheckedCreateInput>;
    /**
     * In case the KiteInstrument was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.KiteInstrumentUpdateInput, Prisma.KiteInstrumentUncheckedUpdateInput>;
};
/**
 * KiteInstrument delete
 */
export type KiteInstrumentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteInstrument
     */
    select?: Prisma.KiteInstrumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteInstrument
     */
    omit?: Prisma.KiteInstrumentOmit<ExtArgs> | null;
    /**
     * Filter which KiteInstrument to delete.
     */
    where: Prisma.KiteInstrumentWhereUniqueInput;
};
/**
 * KiteInstrument deleteMany
 */
export type KiteInstrumentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which KiteInstruments to delete
     */
    where?: Prisma.KiteInstrumentWhereInput;
    /**
     * Limit how many KiteInstruments to delete.
     */
    limit?: number;
};
/**
 * KiteInstrument without action
 */
export type KiteInstrumentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteInstrument
     */
    select?: Prisma.KiteInstrumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KiteInstrument
     */
    omit?: Prisma.KiteInstrumentOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=KiteInstrument.d.ts.map
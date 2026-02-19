import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model AlertPreference
 *
 */
export type AlertPreferenceModel = runtime.Types.Result.DefaultSelection<Prisma.$AlertPreferencePayload>;
export type AggregateAlertPreference = {
    _count: AlertPreferenceCountAggregateOutputType | null;
    _min: AlertPreferenceMinAggregateOutputType | null;
    _max: AlertPreferenceMaxAggregateOutputType | null;
};
export type AlertPreferenceMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    channel: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
};
export type AlertPreferenceMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    channel: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
};
export type AlertPreferenceCountAggregateOutputType = {
    id: number;
    userId: number;
    channel: number;
    heatFilter: number;
    universes: number;
    isActive: number;
    createdAt: number;
    _all: number;
};
export type AlertPreferenceMinAggregateInputType = {
    id?: true;
    userId?: true;
    channel?: true;
    isActive?: true;
    createdAt?: true;
};
export type AlertPreferenceMaxAggregateInputType = {
    id?: true;
    userId?: true;
    channel?: true;
    isActive?: true;
    createdAt?: true;
};
export type AlertPreferenceCountAggregateInputType = {
    id?: true;
    userId?: true;
    channel?: true;
    heatFilter?: true;
    universes?: true;
    isActive?: true;
    createdAt?: true;
    _all?: true;
};
export type AlertPreferenceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which AlertPreference to aggregate.
     */
    where?: Prisma.AlertPreferenceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AlertPreferences to fetch.
     */
    orderBy?: Prisma.AlertPreferenceOrderByWithRelationInput | Prisma.AlertPreferenceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.AlertPreferenceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AlertPreferences from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AlertPreferences.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned AlertPreferences
    **/
    _count?: true | AlertPreferenceCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: AlertPreferenceMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: AlertPreferenceMaxAggregateInputType;
};
export type GetAlertPreferenceAggregateType<T extends AlertPreferenceAggregateArgs> = {
    [P in keyof T & keyof AggregateAlertPreference]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAlertPreference[P]> : Prisma.GetScalarType<T[P], AggregateAlertPreference[P]>;
};
export type AlertPreferenceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AlertPreferenceWhereInput;
    orderBy?: Prisma.AlertPreferenceOrderByWithAggregationInput | Prisma.AlertPreferenceOrderByWithAggregationInput[];
    by: Prisma.AlertPreferenceScalarFieldEnum[] | Prisma.AlertPreferenceScalarFieldEnum;
    having?: Prisma.AlertPreferenceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AlertPreferenceCountAggregateInputType | true;
    _min?: AlertPreferenceMinAggregateInputType;
    _max?: AlertPreferenceMaxAggregateInputType;
};
export type AlertPreferenceGroupByOutputType = {
    id: string;
    userId: string;
    channel: string;
    heatFilter: $Enums.Heat[];
    universes: string[];
    isActive: boolean;
    createdAt: Date;
    _count: AlertPreferenceCountAggregateOutputType | null;
    _min: AlertPreferenceMinAggregateOutputType | null;
    _max: AlertPreferenceMaxAggregateOutputType | null;
};
type GetAlertPreferenceGroupByPayload<T extends AlertPreferenceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AlertPreferenceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AlertPreferenceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AlertPreferenceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AlertPreferenceGroupByOutputType[P]>;
}>>;
export type AlertPreferenceWhereInput = {
    AND?: Prisma.AlertPreferenceWhereInput | Prisma.AlertPreferenceWhereInput[];
    OR?: Prisma.AlertPreferenceWhereInput[];
    NOT?: Prisma.AlertPreferenceWhereInput | Prisma.AlertPreferenceWhereInput[];
    id?: Prisma.StringFilter<"AlertPreference"> | string;
    userId?: Prisma.StringFilter<"AlertPreference"> | string;
    channel?: Prisma.StringFilter<"AlertPreference"> | string;
    heatFilter?: Prisma.EnumHeatNullableListFilter<"AlertPreference">;
    universes?: Prisma.StringNullableListFilter<"AlertPreference">;
    isActive?: Prisma.BoolFilter<"AlertPreference"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"AlertPreference"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type AlertPreferenceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    heatFilter?: Prisma.SortOrder;
    universes?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type AlertPreferenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AlertPreferenceWhereInput | Prisma.AlertPreferenceWhereInput[];
    OR?: Prisma.AlertPreferenceWhereInput[];
    NOT?: Prisma.AlertPreferenceWhereInput | Prisma.AlertPreferenceWhereInput[];
    userId?: Prisma.StringFilter<"AlertPreference"> | string;
    channel?: Prisma.StringFilter<"AlertPreference"> | string;
    heatFilter?: Prisma.EnumHeatNullableListFilter<"AlertPreference">;
    universes?: Prisma.StringNullableListFilter<"AlertPreference">;
    isActive?: Prisma.BoolFilter<"AlertPreference"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"AlertPreference"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type AlertPreferenceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    heatFilter?: Prisma.SortOrder;
    universes?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AlertPreferenceCountOrderByAggregateInput;
    _max?: Prisma.AlertPreferenceMaxOrderByAggregateInput;
    _min?: Prisma.AlertPreferenceMinOrderByAggregateInput;
};
export type AlertPreferenceScalarWhereWithAggregatesInput = {
    AND?: Prisma.AlertPreferenceScalarWhereWithAggregatesInput | Prisma.AlertPreferenceScalarWhereWithAggregatesInput[];
    OR?: Prisma.AlertPreferenceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AlertPreferenceScalarWhereWithAggregatesInput | Prisma.AlertPreferenceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"AlertPreference"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"AlertPreference"> | string;
    channel?: Prisma.StringWithAggregatesFilter<"AlertPreference"> | string;
    heatFilter?: Prisma.EnumHeatNullableListFilter<"AlertPreference">;
    universes?: Prisma.StringNullableListFilter<"AlertPreference">;
    isActive?: Prisma.BoolWithAggregatesFilter<"AlertPreference"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AlertPreference"> | Date | string;
};
export type AlertPreferenceCreateInput = {
    id?: string;
    channel?: string;
    heatFilter?: Prisma.AlertPreferenceCreateheatFilterInput | $Enums.Heat[];
    universes?: Prisma.AlertPreferenceCreateuniversesInput | string[];
    isActive?: boolean;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutAlertPreferencesInput;
};
export type AlertPreferenceUncheckedCreateInput = {
    id?: string;
    userId: string;
    channel?: string;
    heatFilter?: Prisma.AlertPreferenceCreateheatFilterInput | $Enums.Heat[];
    universes?: Prisma.AlertPreferenceCreateuniversesInput | string[];
    isActive?: boolean;
    createdAt?: Date | string;
};
export type AlertPreferenceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    heatFilter?: Prisma.AlertPreferenceUpdateheatFilterInput | $Enums.Heat[];
    universes?: Prisma.AlertPreferenceUpdateuniversesInput | string[];
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutAlertPreferencesNestedInput;
};
export type AlertPreferenceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    heatFilter?: Prisma.AlertPreferenceUpdateheatFilterInput | $Enums.Heat[];
    universes?: Prisma.AlertPreferenceUpdateuniversesInput | string[];
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AlertPreferenceCreateManyInput = {
    id?: string;
    userId: string;
    channel?: string;
    heatFilter?: Prisma.AlertPreferenceCreateheatFilterInput | $Enums.Heat[];
    universes?: Prisma.AlertPreferenceCreateuniversesInput | string[];
    isActive?: boolean;
    createdAt?: Date | string;
};
export type AlertPreferenceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    heatFilter?: Prisma.AlertPreferenceUpdateheatFilterInput | $Enums.Heat[];
    universes?: Prisma.AlertPreferenceUpdateuniversesInput | string[];
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AlertPreferenceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    heatFilter?: Prisma.AlertPreferenceUpdateheatFilterInput | $Enums.Heat[];
    universes?: Prisma.AlertPreferenceUpdateuniversesInput | string[];
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AlertPreferenceListRelationFilter = {
    every?: Prisma.AlertPreferenceWhereInput;
    some?: Prisma.AlertPreferenceWhereInput;
    none?: Prisma.AlertPreferenceWhereInput;
};
export type AlertPreferenceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EnumHeatNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.Heat[] | Prisma.ListEnumHeatFieldRefInput<$PrismaModel> | null;
    has?: $Enums.Heat | Prisma.EnumHeatFieldRefInput<$PrismaModel> | null;
    hasEvery?: $Enums.Heat[] | Prisma.ListEnumHeatFieldRefInput<$PrismaModel>;
    hasSome?: $Enums.Heat[] | Prisma.ListEnumHeatFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type AlertPreferenceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    heatFilter?: Prisma.SortOrder;
    universes?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AlertPreferenceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AlertPreferenceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AlertPreferenceCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AlertPreferenceCreateWithoutUserInput, Prisma.AlertPreferenceUncheckedCreateWithoutUserInput> | Prisma.AlertPreferenceCreateWithoutUserInput[] | Prisma.AlertPreferenceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AlertPreferenceCreateOrConnectWithoutUserInput | Prisma.AlertPreferenceCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AlertPreferenceCreateManyUserInputEnvelope;
    connect?: Prisma.AlertPreferenceWhereUniqueInput | Prisma.AlertPreferenceWhereUniqueInput[];
};
export type AlertPreferenceUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AlertPreferenceCreateWithoutUserInput, Prisma.AlertPreferenceUncheckedCreateWithoutUserInput> | Prisma.AlertPreferenceCreateWithoutUserInput[] | Prisma.AlertPreferenceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AlertPreferenceCreateOrConnectWithoutUserInput | Prisma.AlertPreferenceCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AlertPreferenceCreateManyUserInputEnvelope;
    connect?: Prisma.AlertPreferenceWhereUniqueInput | Prisma.AlertPreferenceWhereUniqueInput[];
};
export type AlertPreferenceUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AlertPreferenceCreateWithoutUserInput, Prisma.AlertPreferenceUncheckedCreateWithoutUserInput> | Prisma.AlertPreferenceCreateWithoutUserInput[] | Prisma.AlertPreferenceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AlertPreferenceCreateOrConnectWithoutUserInput | Prisma.AlertPreferenceCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AlertPreferenceUpsertWithWhereUniqueWithoutUserInput | Prisma.AlertPreferenceUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AlertPreferenceCreateManyUserInputEnvelope;
    set?: Prisma.AlertPreferenceWhereUniqueInput | Prisma.AlertPreferenceWhereUniqueInput[];
    disconnect?: Prisma.AlertPreferenceWhereUniqueInput | Prisma.AlertPreferenceWhereUniqueInput[];
    delete?: Prisma.AlertPreferenceWhereUniqueInput | Prisma.AlertPreferenceWhereUniqueInput[];
    connect?: Prisma.AlertPreferenceWhereUniqueInput | Prisma.AlertPreferenceWhereUniqueInput[];
    update?: Prisma.AlertPreferenceUpdateWithWhereUniqueWithoutUserInput | Prisma.AlertPreferenceUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AlertPreferenceUpdateManyWithWhereWithoutUserInput | Prisma.AlertPreferenceUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AlertPreferenceScalarWhereInput | Prisma.AlertPreferenceScalarWhereInput[];
};
export type AlertPreferenceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AlertPreferenceCreateWithoutUserInput, Prisma.AlertPreferenceUncheckedCreateWithoutUserInput> | Prisma.AlertPreferenceCreateWithoutUserInput[] | Prisma.AlertPreferenceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AlertPreferenceCreateOrConnectWithoutUserInput | Prisma.AlertPreferenceCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AlertPreferenceUpsertWithWhereUniqueWithoutUserInput | Prisma.AlertPreferenceUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AlertPreferenceCreateManyUserInputEnvelope;
    set?: Prisma.AlertPreferenceWhereUniqueInput | Prisma.AlertPreferenceWhereUniqueInput[];
    disconnect?: Prisma.AlertPreferenceWhereUniqueInput | Prisma.AlertPreferenceWhereUniqueInput[];
    delete?: Prisma.AlertPreferenceWhereUniqueInput | Prisma.AlertPreferenceWhereUniqueInput[];
    connect?: Prisma.AlertPreferenceWhereUniqueInput | Prisma.AlertPreferenceWhereUniqueInput[];
    update?: Prisma.AlertPreferenceUpdateWithWhereUniqueWithoutUserInput | Prisma.AlertPreferenceUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AlertPreferenceUpdateManyWithWhereWithoutUserInput | Prisma.AlertPreferenceUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AlertPreferenceScalarWhereInput | Prisma.AlertPreferenceScalarWhereInput[];
};
export type AlertPreferenceCreateheatFilterInput = {
    set: $Enums.Heat[];
};
export type AlertPreferenceCreateuniversesInput = {
    set: string[];
};
export type AlertPreferenceUpdateheatFilterInput = {
    set?: $Enums.Heat[];
    push?: $Enums.Heat | $Enums.Heat[];
};
export type AlertPreferenceUpdateuniversesInput = {
    set?: string[];
    push?: string | string[];
};
export type AlertPreferenceCreateWithoutUserInput = {
    id?: string;
    channel?: string;
    heatFilter?: Prisma.AlertPreferenceCreateheatFilterInput | $Enums.Heat[];
    universes?: Prisma.AlertPreferenceCreateuniversesInput | string[];
    isActive?: boolean;
    createdAt?: Date | string;
};
export type AlertPreferenceUncheckedCreateWithoutUserInput = {
    id?: string;
    channel?: string;
    heatFilter?: Prisma.AlertPreferenceCreateheatFilterInput | $Enums.Heat[];
    universes?: Prisma.AlertPreferenceCreateuniversesInput | string[];
    isActive?: boolean;
    createdAt?: Date | string;
};
export type AlertPreferenceCreateOrConnectWithoutUserInput = {
    where: Prisma.AlertPreferenceWhereUniqueInput;
    create: Prisma.XOR<Prisma.AlertPreferenceCreateWithoutUserInput, Prisma.AlertPreferenceUncheckedCreateWithoutUserInput>;
};
export type AlertPreferenceCreateManyUserInputEnvelope = {
    data: Prisma.AlertPreferenceCreateManyUserInput | Prisma.AlertPreferenceCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type AlertPreferenceUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.AlertPreferenceWhereUniqueInput;
    update: Prisma.XOR<Prisma.AlertPreferenceUpdateWithoutUserInput, Prisma.AlertPreferenceUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.AlertPreferenceCreateWithoutUserInput, Prisma.AlertPreferenceUncheckedCreateWithoutUserInput>;
};
export type AlertPreferenceUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.AlertPreferenceWhereUniqueInput;
    data: Prisma.XOR<Prisma.AlertPreferenceUpdateWithoutUserInput, Prisma.AlertPreferenceUncheckedUpdateWithoutUserInput>;
};
export type AlertPreferenceUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.AlertPreferenceScalarWhereInput;
    data: Prisma.XOR<Prisma.AlertPreferenceUpdateManyMutationInput, Prisma.AlertPreferenceUncheckedUpdateManyWithoutUserInput>;
};
export type AlertPreferenceScalarWhereInput = {
    AND?: Prisma.AlertPreferenceScalarWhereInput | Prisma.AlertPreferenceScalarWhereInput[];
    OR?: Prisma.AlertPreferenceScalarWhereInput[];
    NOT?: Prisma.AlertPreferenceScalarWhereInput | Prisma.AlertPreferenceScalarWhereInput[];
    id?: Prisma.StringFilter<"AlertPreference"> | string;
    userId?: Prisma.StringFilter<"AlertPreference"> | string;
    channel?: Prisma.StringFilter<"AlertPreference"> | string;
    heatFilter?: Prisma.EnumHeatNullableListFilter<"AlertPreference">;
    universes?: Prisma.StringNullableListFilter<"AlertPreference">;
    isActive?: Prisma.BoolFilter<"AlertPreference"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"AlertPreference"> | Date | string;
};
export type AlertPreferenceCreateManyUserInput = {
    id?: string;
    channel?: string;
    heatFilter?: Prisma.AlertPreferenceCreateheatFilterInput | $Enums.Heat[];
    universes?: Prisma.AlertPreferenceCreateuniversesInput | string[];
    isActive?: boolean;
    createdAt?: Date | string;
};
export type AlertPreferenceUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    heatFilter?: Prisma.AlertPreferenceUpdateheatFilterInput | $Enums.Heat[];
    universes?: Prisma.AlertPreferenceUpdateuniversesInput | string[];
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AlertPreferenceUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    heatFilter?: Prisma.AlertPreferenceUpdateheatFilterInput | $Enums.Heat[];
    universes?: Prisma.AlertPreferenceUpdateuniversesInput | string[];
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AlertPreferenceUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    heatFilter?: Prisma.AlertPreferenceUpdateheatFilterInput | $Enums.Heat[];
    universes?: Prisma.AlertPreferenceUpdateuniversesInput | string[];
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AlertPreferenceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    channel?: boolean;
    heatFilter?: boolean;
    universes?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["alertPreference"]>;
export type AlertPreferenceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    channel?: boolean;
    heatFilter?: boolean;
    universes?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["alertPreference"]>;
export type AlertPreferenceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    channel?: boolean;
    heatFilter?: boolean;
    universes?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["alertPreference"]>;
export type AlertPreferenceSelectScalar = {
    id?: boolean;
    userId?: boolean;
    channel?: boolean;
    heatFilter?: boolean;
    universes?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
};
export type AlertPreferenceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "channel" | "heatFilter" | "universes" | "isActive" | "createdAt", ExtArgs["result"]["alertPreference"]>;
export type AlertPreferenceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type AlertPreferenceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type AlertPreferenceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $AlertPreferencePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AlertPreference";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        channel: string;
        heatFilter: $Enums.Heat[];
        universes: string[];
        isActive: boolean;
        createdAt: Date;
    }, ExtArgs["result"]["alertPreference"]>;
    composites: {};
};
export type AlertPreferenceGetPayload<S extends boolean | null | undefined | AlertPreferenceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AlertPreferencePayload, S>;
export type AlertPreferenceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AlertPreferenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AlertPreferenceCountAggregateInputType | true;
};
export interface AlertPreferenceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AlertPreference'];
        meta: {
            name: 'AlertPreference';
        };
    };
    /**
     * Find zero or one AlertPreference that matches the filter.
     * @param {AlertPreferenceFindUniqueArgs} args - Arguments to find a AlertPreference
     * @example
     * // Get one AlertPreference
     * const alertPreference = await prisma.alertPreference.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlertPreferenceFindUniqueArgs>(args: Prisma.SelectSubset<T, AlertPreferenceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AlertPreferenceClient<runtime.Types.Result.GetResult<Prisma.$AlertPreferencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one AlertPreference that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AlertPreferenceFindUniqueOrThrowArgs} args - Arguments to find a AlertPreference
     * @example
     * // Get one AlertPreference
     * const alertPreference = await prisma.alertPreference.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlertPreferenceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AlertPreferenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AlertPreferenceClient<runtime.Types.Result.GetResult<Prisma.$AlertPreferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first AlertPreference that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertPreferenceFindFirstArgs} args - Arguments to find a AlertPreference
     * @example
     * // Get one AlertPreference
     * const alertPreference = await prisma.alertPreference.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlertPreferenceFindFirstArgs>(args?: Prisma.SelectSubset<T, AlertPreferenceFindFirstArgs<ExtArgs>>): Prisma.Prisma__AlertPreferenceClient<runtime.Types.Result.GetResult<Prisma.$AlertPreferencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first AlertPreference that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertPreferenceFindFirstOrThrowArgs} args - Arguments to find a AlertPreference
     * @example
     * // Get one AlertPreference
     * const alertPreference = await prisma.alertPreference.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlertPreferenceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AlertPreferenceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AlertPreferenceClient<runtime.Types.Result.GetResult<Prisma.$AlertPreferencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more AlertPreferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertPreferenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AlertPreferences
     * const alertPreferences = await prisma.alertPreference.findMany()
     *
     * // Get first 10 AlertPreferences
     * const alertPreferences = await prisma.alertPreference.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const alertPreferenceWithIdOnly = await prisma.alertPreference.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AlertPreferenceFindManyArgs>(args?: Prisma.SelectSubset<T, AlertPreferenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AlertPreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a AlertPreference.
     * @param {AlertPreferenceCreateArgs} args - Arguments to create a AlertPreference.
     * @example
     * // Create one AlertPreference
     * const AlertPreference = await prisma.alertPreference.create({
     *   data: {
     *     // ... data to create a AlertPreference
     *   }
     * })
     *
     */
    create<T extends AlertPreferenceCreateArgs>(args: Prisma.SelectSubset<T, AlertPreferenceCreateArgs<ExtArgs>>): Prisma.Prisma__AlertPreferenceClient<runtime.Types.Result.GetResult<Prisma.$AlertPreferencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many AlertPreferences.
     * @param {AlertPreferenceCreateManyArgs} args - Arguments to create many AlertPreferences.
     * @example
     * // Create many AlertPreferences
     * const alertPreference = await prisma.alertPreference.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AlertPreferenceCreateManyArgs>(args?: Prisma.SelectSubset<T, AlertPreferenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many AlertPreferences and returns the data saved in the database.
     * @param {AlertPreferenceCreateManyAndReturnArgs} args - Arguments to create many AlertPreferences.
     * @example
     * // Create many AlertPreferences
     * const alertPreference = await prisma.alertPreference.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many AlertPreferences and only return the `id`
     * const alertPreferenceWithIdOnly = await prisma.alertPreference.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AlertPreferenceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AlertPreferenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AlertPreferencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a AlertPreference.
     * @param {AlertPreferenceDeleteArgs} args - Arguments to delete one AlertPreference.
     * @example
     * // Delete one AlertPreference
     * const AlertPreference = await prisma.alertPreference.delete({
     *   where: {
     *     // ... filter to delete one AlertPreference
     *   }
     * })
     *
     */
    delete<T extends AlertPreferenceDeleteArgs>(args: Prisma.SelectSubset<T, AlertPreferenceDeleteArgs<ExtArgs>>): Prisma.Prisma__AlertPreferenceClient<runtime.Types.Result.GetResult<Prisma.$AlertPreferencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one AlertPreference.
     * @param {AlertPreferenceUpdateArgs} args - Arguments to update one AlertPreference.
     * @example
     * // Update one AlertPreference
     * const alertPreference = await prisma.alertPreference.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AlertPreferenceUpdateArgs>(args: Prisma.SelectSubset<T, AlertPreferenceUpdateArgs<ExtArgs>>): Prisma.Prisma__AlertPreferenceClient<runtime.Types.Result.GetResult<Prisma.$AlertPreferencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more AlertPreferences.
     * @param {AlertPreferenceDeleteManyArgs} args - Arguments to filter AlertPreferences to delete.
     * @example
     * // Delete a few AlertPreferences
     * const { count } = await prisma.alertPreference.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AlertPreferenceDeleteManyArgs>(args?: Prisma.SelectSubset<T, AlertPreferenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more AlertPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertPreferenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AlertPreferences
     * const alertPreference = await prisma.alertPreference.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AlertPreferenceUpdateManyArgs>(args: Prisma.SelectSubset<T, AlertPreferenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more AlertPreferences and returns the data updated in the database.
     * @param {AlertPreferenceUpdateManyAndReturnArgs} args - Arguments to update many AlertPreferences.
     * @example
     * // Update many AlertPreferences
     * const alertPreference = await prisma.alertPreference.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more AlertPreferences and only return the `id`
     * const alertPreferenceWithIdOnly = await prisma.alertPreference.updateManyAndReturn({
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
    updateManyAndReturn<T extends AlertPreferenceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AlertPreferenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AlertPreferencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one AlertPreference.
     * @param {AlertPreferenceUpsertArgs} args - Arguments to update or create a AlertPreference.
     * @example
     * // Update or create a AlertPreference
     * const alertPreference = await prisma.alertPreference.upsert({
     *   create: {
     *     // ... data to create a AlertPreference
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AlertPreference we want to update
     *   }
     * })
     */
    upsert<T extends AlertPreferenceUpsertArgs>(args: Prisma.SelectSubset<T, AlertPreferenceUpsertArgs<ExtArgs>>): Prisma.Prisma__AlertPreferenceClient<runtime.Types.Result.GetResult<Prisma.$AlertPreferencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of AlertPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertPreferenceCountArgs} args - Arguments to filter AlertPreferences to count.
     * @example
     * // Count the number of AlertPreferences
     * const count = await prisma.alertPreference.count({
     *   where: {
     *     // ... the filter for the AlertPreferences we want to count
     *   }
     * })
    **/
    count<T extends AlertPreferenceCountArgs>(args?: Prisma.Subset<T, AlertPreferenceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AlertPreferenceCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a AlertPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertPreferenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AlertPreferenceAggregateArgs>(args: Prisma.Subset<T, AlertPreferenceAggregateArgs>): Prisma.PrismaPromise<GetAlertPreferenceAggregateType<T>>;
    /**
     * Group by AlertPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertPreferenceGroupByArgs} args - Group by arguments.
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
    groupBy<T extends AlertPreferenceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AlertPreferenceGroupByArgs['orderBy'];
    } : {
        orderBy?: AlertPreferenceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AlertPreferenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlertPreferenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the AlertPreference model
     */
    readonly fields: AlertPreferenceFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for AlertPreference.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__AlertPreferenceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the AlertPreference model
 */
export interface AlertPreferenceFieldRefs {
    readonly id: Prisma.FieldRef<"AlertPreference", 'String'>;
    readonly userId: Prisma.FieldRef<"AlertPreference", 'String'>;
    readonly channel: Prisma.FieldRef<"AlertPreference", 'String'>;
    readonly heatFilter: Prisma.FieldRef<"AlertPreference", 'Heat[]'>;
    readonly universes: Prisma.FieldRef<"AlertPreference", 'String[]'>;
    readonly isActive: Prisma.FieldRef<"AlertPreference", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"AlertPreference", 'DateTime'>;
}
/**
 * AlertPreference findUnique
 */
export type AlertPreferenceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertPreference
     */
    select?: Prisma.AlertPreferenceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AlertPreference
     */
    omit?: Prisma.AlertPreferenceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AlertPreferenceInclude<ExtArgs> | null;
    /**
     * Filter, which AlertPreference to fetch.
     */
    where: Prisma.AlertPreferenceWhereUniqueInput;
};
/**
 * AlertPreference findUniqueOrThrow
 */
export type AlertPreferenceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertPreference
     */
    select?: Prisma.AlertPreferenceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AlertPreference
     */
    omit?: Prisma.AlertPreferenceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AlertPreferenceInclude<ExtArgs> | null;
    /**
     * Filter, which AlertPreference to fetch.
     */
    where: Prisma.AlertPreferenceWhereUniqueInput;
};
/**
 * AlertPreference findFirst
 */
export type AlertPreferenceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertPreference
     */
    select?: Prisma.AlertPreferenceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AlertPreference
     */
    omit?: Prisma.AlertPreferenceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AlertPreferenceInclude<ExtArgs> | null;
    /**
     * Filter, which AlertPreference to fetch.
     */
    where?: Prisma.AlertPreferenceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AlertPreferences to fetch.
     */
    orderBy?: Prisma.AlertPreferenceOrderByWithRelationInput | Prisma.AlertPreferenceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AlertPreferences.
     */
    cursor?: Prisma.AlertPreferenceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AlertPreferences from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AlertPreferences.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AlertPreferences.
     */
    distinct?: Prisma.AlertPreferenceScalarFieldEnum | Prisma.AlertPreferenceScalarFieldEnum[];
};
/**
 * AlertPreference findFirstOrThrow
 */
export type AlertPreferenceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertPreference
     */
    select?: Prisma.AlertPreferenceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AlertPreference
     */
    omit?: Prisma.AlertPreferenceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AlertPreferenceInclude<ExtArgs> | null;
    /**
     * Filter, which AlertPreference to fetch.
     */
    where?: Prisma.AlertPreferenceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AlertPreferences to fetch.
     */
    orderBy?: Prisma.AlertPreferenceOrderByWithRelationInput | Prisma.AlertPreferenceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AlertPreferences.
     */
    cursor?: Prisma.AlertPreferenceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AlertPreferences from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AlertPreferences.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AlertPreferences.
     */
    distinct?: Prisma.AlertPreferenceScalarFieldEnum | Prisma.AlertPreferenceScalarFieldEnum[];
};
/**
 * AlertPreference findMany
 */
export type AlertPreferenceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertPreference
     */
    select?: Prisma.AlertPreferenceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AlertPreference
     */
    omit?: Prisma.AlertPreferenceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AlertPreferenceInclude<ExtArgs> | null;
    /**
     * Filter, which AlertPreferences to fetch.
     */
    where?: Prisma.AlertPreferenceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AlertPreferences to fetch.
     */
    orderBy?: Prisma.AlertPreferenceOrderByWithRelationInput | Prisma.AlertPreferenceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing AlertPreferences.
     */
    cursor?: Prisma.AlertPreferenceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AlertPreferences from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AlertPreferences.
     */
    skip?: number;
    distinct?: Prisma.AlertPreferenceScalarFieldEnum | Prisma.AlertPreferenceScalarFieldEnum[];
};
/**
 * AlertPreference create
 */
export type AlertPreferenceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertPreference
     */
    select?: Prisma.AlertPreferenceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AlertPreference
     */
    omit?: Prisma.AlertPreferenceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AlertPreferenceInclude<ExtArgs> | null;
    /**
     * The data needed to create a AlertPreference.
     */
    data: Prisma.XOR<Prisma.AlertPreferenceCreateInput, Prisma.AlertPreferenceUncheckedCreateInput>;
};
/**
 * AlertPreference createMany
 */
export type AlertPreferenceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many AlertPreferences.
     */
    data: Prisma.AlertPreferenceCreateManyInput | Prisma.AlertPreferenceCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * AlertPreference createManyAndReturn
 */
export type AlertPreferenceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertPreference
     */
    select?: Prisma.AlertPreferenceSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AlertPreference
     */
    omit?: Prisma.AlertPreferenceOmit<ExtArgs> | null;
    /**
     * The data used to create many AlertPreferences.
     */
    data: Prisma.AlertPreferenceCreateManyInput | Prisma.AlertPreferenceCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AlertPreferenceIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * AlertPreference update
 */
export type AlertPreferenceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertPreference
     */
    select?: Prisma.AlertPreferenceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AlertPreference
     */
    omit?: Prisma.AlertPreferenceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AlertPreferenceInclude<ExtArgs> | null;
    /**
     * The data needed to update a AlertPreference.
     */
    data: Prisma.XOR<Prisma.AlertPreferenceUpdateInput, Prisma.AlertPreferenceUncheckedUpdateInput>;
    /**
     * Choose, which AlertPreference to update.
     */
    where: Prisma.AlertPreferenceWhereUniqueInput;
};
/**
 * AlertPreference updateMany
 */
export type AlertPreferenceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update AlertPreferences.
     */
    data: Prisma.XOR<Prisma.AlertPreferenceUpdateManyMutationInput, Prisma.AlertPreferenceUncheckedUpdateManyInput>;
    /**
     * Filter which AlertPreferences to update
     */
    where?: Prisma.AlertPreferenceWhereInput;
    /**
     * Limit how many AlertPreferences to update.
     */
    limit?: number;
};
/**
 * AlertPreference updateManyAndReturn
 */
export type AlertPreferenceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertPreference
     */
    select?: Prisma.AlertPreferenceSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AlertPreference
     */
    omit?: Prisma.AlertPreferenceOmit<ExtArgs> | null;
    /**
     * The data used to update AlertPreferences.
     */
    data: Prisma.XOR<Prisma.AlertPreferenceUpdateManyMutationInput, Prisma.AlertPreferenceUncheckedUpdateManyInput>;
    /**
     * Filter which AlertPreferences to update
     */
    where?: Prisma.AlertPreferenceWhereInput;
    /**
     * Limit how many AlertPreferences to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AlertPreferenceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * AlertPreference upsert
 */
export type AlertPreferenceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertPreference
     */
    select?: Prisma.AlertPreferenceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AlertPreference
     */
    omit?: Prisma.AlertPreferenceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AlertPreferenceInclude<ExtArgs> | null;
    /**
     * The filter to search for the AlertPreference to update in case it exists.
     */
    where: Prisma.AlertPreferenceWhereUniqueInput;
    /**
     * In case the AlertPreference found by the `where` argument doesn't exist, create a new AlertPreference with this data.
     */
    create: Prisma.XOR<Prisma.AlertPreferenceCreateInput, Prisma.AlertPreferenceUncheckedCreateInput>;
    /**
     * In case the AlertPreference was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.AlertPreferenceUpdateInput, Prisma.AlertPreferenceUncheckedUpdateInput>;
};
/**
 * AlertPreference delete
 */
export type AlertPreferenceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertPreference
     */
    select?: Prisma.AlertPreferenceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AlertPreference
     */
    omit?: Prisma.AlertPreferenceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AlertPreferenceInclude<ExtArgs> | null;
    /**
     * Filter which AlertPreference to delete.
     */
    where: Prisma.AlertPreferenceWhereUniqueInput;
};
/**
 * AlertPreference deleteMany
 */
export type AlertPreferenceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which AlertPreferences to delete
     */
    where?: Prisma.AlertPreferenceWhereInput;
    /**
     * Limit how many AlertPreferences to delete.
     */
    limit?: number;
};
/**
 * AlertPreference without action
 */
export type AlertPreferenceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertPreference
     */
    select?: Prisma.AlertPreferenceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AlertPreference
     */
    omit?: Prisma.AlertPreferenceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AlertPreferenceInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=AlertPreference.d.ts.map
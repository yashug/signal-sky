import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model AlertHistory
 *
 */
export type AlertHistoryModel = runtime.Types.Result.DefaultSelection<Prisma.$AlertHistoryPayload>;
export type AggregateAlertHistory = {
    _count: AlertHistoryCountAggregateOutputType | null;
    _min: AlertHistoryMinAggregateOutputType | null;
    _max: AlertHistoryMaxAggregateOutputType | null;
};
export type AlertHistoryMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    signalId: string | null;
    channel: string | null;
    status: string | null;
    sentAt: Date | null;
    createdAt: Date | null;
};
export type AlertHistoryMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    signalId: string | null;
    channel: string | null;
    status: string | null;
    sentAt: Date | null;
    createdAt: Date | null;
};
export type AlertHistoryCountAggregateOutputType = {
    id: number;
    userId: number;
    signalId: number;
    channel: number;
    status: number;
    sentAt: number;
    createdAt: number;
    _all: number;
};
export type AlertHistoryMinAggregateInputType = {
    id?: true;
    userId?: true;
    signalId?: true;
    channel?: true;
    status?: true;
    sentAt?: true;
    createdAt?: true;
};
export type AlertHistoryMaxAggregateInputType = {
    id?: true;
    userId?: true;
    signalId?: true;
    channel?: true;
    status?: true;
    sentAt?: true;
    createdAt?: true;
};
export type AlertHistoryCountAggregateInputType = {
    id?: true;
    userId?: true;
    signalId?: true;
    channel?: true;
    status?: true;
    sentAt?: true;
    createdAt?: true;
    _all?: true;
};
export type AlertHistoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which AlertHistory to aggregate.
     */
    where?: Prisma.AlertHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AlertHistories to fetch.
     */
    orderBy?: Prisma.AlertHistoryOrderByWithRelationInput | Prisma.AlertHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.AlertHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AlertHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AlertHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned AlertHistories
    **/
    _count?: true | AlertHistoryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: AlertHistoryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: AlertHistoryMaxAggregateInputType;
};
export type GetAlertHistoryAggregateType<T extends AlertHistoryAggregateArgs> = {
    [P in keyof T & keyof AggregateAlertHistory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAlertHistory[P]> : Prisma.GetScalarType<T[P], AggregateAlertHistory[P]>;
};
export type AlertHistoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AlertHistoryWhereInput;
    orderBy?: Prisma.AlertHistoryOrderByWithAggregationInput | Prisma.AlertHistoryOrderByWithAggregationInput[];
    by: Prisma.AlertHistoryScalarFieldEnum[] | Prisma.AlertHistoryScalarFieldEnum;
    having?: Prisma.AlertHistoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AlertHistoryCountAggregateInputType | true;
    _min?: AlertHistoryMinAggregateInputType;
    _max?: AlertHistoryMaxAggregateInputType;
};
export type AlertHistoryGroupByOutputType = {
    id: string;
    userId: string | null;
    signalId: string | null;
    channel: string;
    status: string;
    sentAt: Date | null;
    createdAt: Date;
    _count: AlertHistoryCountAggregateOutputType | null;
    _min: AlertHistoryMinAggregateOutputType | null;
    _max: AlertHistoryMaxAggregateOutputType | null;
};
type GetAlertHistoryGroupByPayload<T extends AlertHistoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AlertHistoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AlertHistoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AlertHistoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AlertHistoryGroupByOutputType[P]>;
}>>;
export type AlertHistoryWhereInput = {
    AND?: Prisma.AlertHistoryWhereInput | Prisma.AlertHistoryWhereInput[];
    OR?: Prisma.AlertHistoryWhereInput[];
    NOT?: Prisma.AlertHistoryWhereInput | Prisma.AlertHistoryWhereInput[];
    id?: Prisma.StringFilter<"AlertHistory"> | string;
    userId?: Prisma.StringNullableFilter<"AlertHistory"> | string | null;
    signalId?: Prisma.StringNullableFilter<"AlertHistory"> | string | null;
    channel?: Prisma.StringFilter<"AlertHistory"> | string;
    status?: Prisma.StringFilter<"AlertHistory"> | string;
    sentAt?: Prisma.DateTimeNullableFilter<"AlertHistory"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"AlertHistory"> | Date | string;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    signal?: Prisma.XOR<Prisma.SignalNullableScalarRelationFilter, Prisma.SignalWhereInput> | null;
};
export type AlertHistoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    signalId?: Prisma.SortOrderInput | Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    signal?: Prisma.SignalOrderByWithRelationInput;
};
export type AlertHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AlertHistoryWhereInput | Prisma.AlertHistoryWhereInput[];
    OR?: Prisma.AlertHistoryWhereInput[];
    NOT?: Prisma.AlertHistoryWhereInput | Prisma.AlertHistoryWhereInput[];
    userId?: Prisma.StringNullableFilter<"AlertHistory"> | string | null;
    signalId?: Prisma.StringNullableFilter<"AlertHistory"> | string | null;
    channel?: Prisma.StringFilter<"AlertHistory"> | string;
    status?: Prisma.StringFilter<"AlertHistory"> | string;
    sentAt?: Prisma.DateTimeNullableFilter<"AlertHistory"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"AlertHistory"> | Date | string;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    signal?: Prisma.XOR<Prisma.SignalNullableScalarRelationFilter, Prisma.SignalWhereInput> | null;
}, "id">;
export type AlertHistoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    signalId?: Prisma.SortOrderInput | Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AlertHistoryCountOrderByAggregateInput;
    _max?: Prisma.AlertHistoryMaxOrderByAggregateInput;
    _min?: Prisma.AlertHistoryMinOrderByAggregateInput;
};
export type AlertHistoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.AlertHistoryScalarWhereWithAggregatesInput | Prisma.AlertHistoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.AlertHistoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AlertHistoryScalarWhereWithAggregatesInput | Prisma.AlertHistoryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"AlertHistory"> | string;
    userId?: Prisma.StringNullableWithAggregatesFilter<"AlertHistory"> | string | null;
    signalId?: Prisma.StringNullableWithAggregatesFilter<"AlertHistory"> | string | null;
    channel?: Prisma.StringWithAggregatesFilter<"AlertHistory"> | string;
    status?: Prisma.StringWithAggregatesFilter<"AlertHistory"> | string;
    sentAt?: Prisma.DateTimeNullableWithAggregatesFilter<"AlertHistory"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AlertHistory"> | Date | string;
};
export type AlertHistoryCreateInput = {
    id?: string;
    channel: string;
    status?: string;
    sentAt?: Date | string | null;
    createdAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutAlertHistoryInput;
    signal?: Prisma.SignalCreateNestedOneWithoutAlertHistoryInput;
};
export type AlertHistoryUncheckedCreateInput = {
    id?: string;
    userId?: string | null;
    signalId?: string | null;
    channel: string;
    status?: string;
    sentAt?: Date | string | null;
    createdAt?: Date | string;
};
export type AlertHistoryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutAlertHistoryNestedInput;
    signal?: Prisma.SignalUpdateOneWithoutAlertHistoryNestedInput;
};
export type AlertHistoryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    signalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AlertHistoryCreateManyInput = {
    id?: string;
    userId?: string | null;
    signalId?: string | null;
    channel: string;
    status?: string;
    sentAt?: Date | string | null;
    createdAt?: Date | string;
};
export type AlertHistoryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AlertHistoryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    signalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AlertHistoryListRelationFilter = {
    every?: Prisma.AlertHistoryWhereInput;
    some?: Prisma.AlertHistoryWhereInput;
    none?: Prisma.AlertHistoryWhereInput;
};
export type AlertHistoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AlertHistoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    signalId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AlertHistoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    signalId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AlertHistoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    signalId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AlertHistoryCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AlertHistoryCreateWithoutUserInput, Prisma.AlertHistoryUncheckedCreateWithoutUserInput> | Prisma.AlertHistoryCreateWithoutUserInput[] | Prisma.AlertHistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AlertHistoryCreateOrConnectWithoutUserInput | Prisma.AlertHistoryCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AlertHistoryCreateManyUserInputEnvelope;
    connect?: Prisma.AlertHistoryWhereUniqueInput | Prisma.AlertHistoryWhereUniqueInput[];
};
export type AlertHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AlertHistoryCreateWithoutUserInput, Prisma.AlertHistoryUncheckedCreateWithoutUserInput> | Prisma.AlertHistoryCreateWithoutUserInput[] | Prisma.AlertHistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AlertHistoryCreateOrConnectWithoutUserInput | Prisma.AlertHistoryCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AlertHistoryCreateManyUserInputEnvelope;
    connect?: Prisma.AlertHistoryWhereUniqueInput | Prisma.AlertHistoryWhereUniqueInput[];
};
export type AlertHistoryUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AlertHistoryCreateWithoutUserInput, Prisma.AlertHistoryUncheckedCreateWithoutUserInput> | Prisma.AlertHistoryCreateWithoutUserInput[] | Prisma.AlertHistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AlertHistoryCreateOrConnectWithoutUserInput | Prisma.AlertHistoryCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AlertHistoryUpsertWithWhereUniqueWithoutUserInput | Prisma.AlertHistoryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AlertHistoryCreateManyUserInputEnvelope;
    set?: Prisma.AlertHistoryWhereUniqueInput | Prisma.AlertHistoryWhereUniqueInput[];
    disconnect?: Prisma.AlertHistoryWhereUniqueInput | Prisma.AlertHistoryWhereUniqueInput[];
    delete?: Prisma.AlertHistoryWhereUniqueInput | Prisma.AlertHistoryWhereUniqueInput[];
    connect?: Prisma.AlertHistoryWhereUniqueInput | Prisma.AlertHistoryWhereUniqueInput[];
    update?: Prisma.AlertHistoryUpdateWithWhereUniqueWithoutUserInput | Prisma.AlertHistoryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AlertHistoryUpdateManyWithWhereWithoutUserInput | Prisma.AlertHistoryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AlertHistoryScalarWhereInput | Prisma.AlertHistoryScalarWhereInput[];
};
export type AlertHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AlertHistoryCreateWithoutUserInput, Prisma.AlertHistoryUncheckedCreateWithoutUserInput> | Prisma.AlertHistoryCreateWithoutUserInput[] | Prisma.AlertHistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AlertHistoryCreateOrConnectWithoutUserInput | Prisma.AlertHistoryCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AlertHistoryUpsertWithWhereUniqueWithoutUserInput | Prisma.AlertHistoryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AlertHistoryCreateManyUserInputEnvelope;
    set?: Prisma.AlertHistoryWhereUniqueInput | Prisma.AlertHistoryWhereUniqueInput[];
    disconnect?: Prisma.AlertHistoryWhereUniqueInput | Prisma.AlertHistoryWhereUniqueInput[];
    delete?: Prisma.AlertHistoryWhereUniqueInput | Prisma.AlertHistoryWhereUniqueInput[];
    connect?: Prisma.AlertHistoryWhereUniqueInput | Prisma.AlertHistoryWhereUniqueInput[];
    update?: Prisma.AlertHistoryUpdateWithWhereUniqueWithoutUserInput | Prisma.AlertHistoryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AlertHistoryUpdateManyWithWhereWithoutUserInput | Prisma.AlertHistoryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AlertHistoryScalarWhereInput | Prisma.AlertHistoryScalarWhereInput[];
};
export type AlertHistoryCreateNestedManyWithoutSignalInput = {
    create?: Prisma.XOR<Prisma.AlertHistoryCreateWithoutSignalInput, Prisma.AlertHistoryUncheckedCreateWithoutSignalInput> | Prisma.AlertHistoryCreateWithoutSignalInput[] | Prisma.AlertHistoryUncheckedCreateWithoutSignalInput[];
    connectOrCreate?: Prisma.AlertHistoryCreateOrConnectWithoutSignalInput | Prisma.AlertHistoryCreateOrConnectWithoutSignalInput[];
    createMany?: Prisma.AlertHistoryCreateManySignalInputEnvelope;
    connect?: Prisma.AlertHistoryWhereUniqueInput | Prisma.AlertHistoryWhereUniqueInput[];
};
export type AlertHistoryUncheckedCreateNestedManyWithoutSignalInput = {
    create?: Prisma.XOR<Prisma.AlertHistoryCreateWithoutSignalInput, Prisma.AlertHistoryUncheckedCreateWithoutSignalInput> | Prisma.AlertHistoryCreateWithoutSignalInput[] | Prisma.AlertHistoryUncheckedCreateWithoutSignalInput[];
    connectOrCreate?: Prisma.AlertHistoryCreateOrConnectWithoutSignalInput | Prisma.AlertHistoryCreateOrConnectWithoutSignalInput[];
    createMany?: Prisma.AlertHistoryCreateManySignalInputEnvelope;
    connect?: Prisma.AlertHistoryWhereUniqueInput | Prisma.AlertHistoryWhereUniqueInput[];
};
export type AlertHistoryUpdateManyWithoutSignalNestedInput = {
    create?: Prisma.XOR<Prisma.AlertHistoryCreateWithoutSignalInput, Prisma.AlertHistoryUncheckedCreateWithoutSignalInput> | Prisma.AlertHistoryCreateWithoutSignalInput[] | Prisma.AlertHistoryUncheckedCreateWithoutSignalInput[];
    connectOrCreate?: Prisma.AlertHistoryCreateOrConnectWithoutSignalInput | Prisma.AlertHistoryCreateOrConnectWithoutSignalInput[];
    upsert?: Prisma.AlertHistoryUpsertWithWhereUniqueWithoutSignalInput | Prisma.AlertHistoryUpsertWithWhereUniqueWithoutSignalInput[];
    createMany?: Prisma.AlertHistoryCreateManySignalInputEnvelope;
    set?: Prisma.AlertHistoryWhereUniqueInput | Prisma.AlertHistoryWhereUniqueInput[];
    disconnect?: Prisma.AlertHistoryWhereUniqueInput | Prisma.AlertHistoryWhereUniqueInput[];
    delete?: Prisma.AlertHistoryWhereUniqueInput | Prisma.AlertHistoryWhereUniqueInput[];
    connect?: Prisma.AlertHistoryWhereUniqueInput | Prisma.AlertHistoryWhereUniqueInput[];
    update?: Prisma.AlertHistoryUpdateWithWhereUniqueWithoutSignalInput | Prisma.AlertHistoryUpdateWithWhereUniqueWithoutSignalInput[];
    updateMany?: Prisma.AlertHistoryUpdateManyWithWhereWithoutSignalInput | Prisma.AlertHistoryUpdateManyWithWhereWithoutSignalInput[];
    deleteMany?: Prisma.AlertHistoryScalarWhereInput | Prisma.AlertHistoryScalarWhereInput[];
};
export type AlertHistoryUncheckedUpdateManyWithoutSignalNestedInput = {
    create?: Prisma.XOR<Prisma.AlertHistoryCreateWithoutSignalInput, Prisma.AlertHistoryUncheckedCreateWithoutSignalInput> | Prisma.AlertHistoryCreateWithoutSignalInput[] | Prisma.AlertHistoryUncheckedCreateWithoutSignalInput[];
    connectOrCreate?: Prisma.AlertHistoryCreateOrConnectWithoutSignalInput | Prisma.AlertHistoryCreateOrConnectWithoutSignalInput[];
    upsert?: Prisma.AlertHistoryUpsertWithWhereUniqueWithoutSignalInput | Prisma.AlertHistoryUpsertWithWhereUniqueWithoutSignalInput[];
    createMany?: Prisma.AlertHistoryCreateManySignalInputEnvelope;
    set?: Prisma.AlertHistoryWhereUniqueInput | Prisma.AlertHistoryWhereUniqueInput[];
    disconnect?: Prisma.AlertHistoryWhereUniqueInput | Prisma.AlertHistoryWhereUniqueInput[];
    delete?: Prisma.AlertHistoryWhereUniqueInput | Prisma.AlertHistoryWhereUniqueInput[];
    connect?: Prisma.AlertHistoryWhereUniqueInput | Prisma.AlertHistoryWhereUniqueInput[];
    update?: Prisma.AlertHistoryUpdateWithWhereUniqueWithoutSignalInput | Prisma.AlertHistoryUpdateWithWhereUniqueWithoutSignalInput[];
    updateMany?: Prisma.AlertHistoryUpdateManyWithWhereWithoutSignalInput | Prisma.AlertHistoryUpdateManyWithWhereWithoutSignalInput[];
    deleteMany?: Prisma.AlertHistoryScalarWhereInput | Prisma.AlertHistoryScalarWhereInput[];
};
export type AlertHistoryCreateWithoutUserInput = {
    id?: string;
    channel: string;
    status?: string;
    sentAt?: Date | string | null;
    createdAt?: Date | string;
    signal?: Prisma.SignalCreateNestedOneWithoutAlertHistoryInput;
};
export type AlertHistoryUncheckedCreateWithoutUserInput = {
    id?: string;
    signalId?: string | null;
    channel: string;
    status?: string;
    sentAt?: Date | string | null;
    createdAt?: Date | string;
};
export type AlertHistoryCreateOrConnectWithoutUserInput = {
    where: Prisma.AlertHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.AlertHistoryCreateWithoutUserInput, Prisma.AlertHistoryUncheckedCreateWithoutUserInput>;
};
export type AlertHistoryCreateManyUserInputEnvelope = {
    data: Prisma.AlertHistoryCreateManyUserInput | Prisma.AlertHistoryCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type AlertHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.AlertHistoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.AlertHistoryUpdateWithoutUserInput, Prisma.AlertHistoryUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.AlertHistoryCreateWithoutUserInput, Prisma.AlertHistoryUncheckedCreateWithoutUserInput>;
};
export type AlertHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.AlertHistoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.AlertHistoryUpdateWithoutUserInput, Prisma.AlertHistoryUncheckedUpdateWithoutUserInput>;
};
export type AlertHistoryUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.AlertHistoryScalarWhereInput;
    data: Prisma.XOR<Prisma.AlertHistoryUpdateManyMutationInput, Prisma.AlertHistoryUncheckedUpdateManyWithoutUserInput>;
};
export type AlertHistoryScalarWhereInput = {
    AND?: Prisma.AlertHistoryScalarWhereInput | Prisma.AlertHistoryScalarWhereInput[];
    OR?: Prisma.AlertHistoryScalarWhereInput[];
    NOT?: Prisma.AlertHistoryScalarWhereInput | Prisma.AlertHistoryScalarWhereInput[];
    id?: Prisma.StringFilter<"AlertHistory"> | string;
    userId?: Prisma.StringNullableFilter<"AlertHistory"> | string | null;
    signalId?: Prisma.StringNullableFilter<"AlertHistory"> | string | null;
    channel?: Prisma.StringFilter<"AlertHistory"> | string;
    status?: Prisma.StringFilter<"AlertHistory"> | string;
    sentAt?: Prisma.DateTimeNullableFilter<"AlertHistory"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"AlertHistory"> | Date | string;
};
export type AlertHistoryCreateWithoutSignalInput = {
    id?: string;
    channel: string;
    status?: string;
    sentAt?: Date | string | null;
    createdAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutAlertHistoryInput;
};
export type AlertHistoryUncheckedCreateWithoutSignalInput = {
    id?: string;
    userId?: string | null;
    channel: string;
    status?: string;
    sentAt?: Date | string | null;
    createdAt?: Date | string;
};
export type AlertHistoryCreateOrConnectWithoutSignalInput = {
    where: Prisma.AlertHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.AlertHistoryCreateWithoutSignalInput, Prisma.AlertHistoryUncheckedCreateWithoutSignalInput>;
};
export type AlertHistoryCreateManySignalInputEnvelope = {
    data: Prisma.AlertHistoryCreateManySignalInput | Prisma.AlertHistoryCreateManySignalInput[];
    skipDuplicates?: boolean;
};
export type AlertHistoryUpsertWithWhereUniqueWithoutSignalInput = {
    where: Prisma.AlertHistoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.AlertHistoryUpdateWithoutSignalInput, Prisma.AlertHistoryUncheckedUpdateWithoutSignalInput>;
    create: Prisma.XOR<Prisma.AlertHistoryCreateWithoutSignalInput, Prisma.AlertHistoryUncheckedCreateWithoutSignalInput>;
};
export type AlertHistoryUpdateWithWhereUniqueWithoutSignalInput = {
    where: Prisma.AlertHistoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.AlertHistoryUpdateWithoutSignalInput, Prisma.AlertHistoryUncheckedUpdateWithoutSignalInput>;
};
export type AlertHistoryUpdateManyWithWhereWithoutSignalInput = {
    where: Prisma.AlertHistoryScalarWhereInput;
    data: Prisma.XOR<Prisma.AlertHistoryUpdateManyMutationInput, Prisma.AlertHistoryUncheckedUpdateManyWithoutSignalInput>;
};
export type AlertHistoryCreateManyUserInput = {
    id?: string;
    signalId?: string | null;
    channel: string;
    status?: string;
    sentAt?: Date | string | null;
    createdAt?: Date | string;
};
export type AlertHistoryUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    signal?: Prisma.SignalUpdateOneWithoutAlertHistoryNestedInput;
};
export type AlertHistoryUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    signalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AlertHistoryUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    signalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AlertHistoryCreateManySignalInput = {
    id?: string;
    userId?: string | null;
    channel: string;
    status?: string;
    sentAt?: Date | string | null;
    createdAt?: Date | string;
};
export type AlertHistoryUpdateWithoutSignalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutAlertHistoryNestedInput;
};
export type AlertHistoryUncheckedUpdateWithoutSignalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AlertHistoryUncheckedUpdateManyWithoutSignalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    channel?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AlertHistorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    signalId?: boolean;
    channel?: boolean;
    status?: boolean;
    sentAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.AlertHistory$userArgs<ExtArgs>;
    signal?: boolean | Prisma.AlertHistory$signalArgs<ExtArgs>;
}, ExtArgs["result"]["alertHistory"]>;
export type AlertHistorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    signalId?: boolean;
    channel?: boolean;
    status?: boolean;
    sentAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.AlertHistory$userArgs<ExtArgs>;
    signal?: boolean | Prisma.AlertHistory$signalArgs<ExtArgs>;
}, ExtArgs["result"]["alertHistory"]>;
export type AlertHistorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    signalId?: boolean;
    channel?: boolean;
    status?: boolean;
    sentAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.AlertHistory$userArgs<ExtArgs>;
    signal?: boolean | Prisma.AlertHistory$signalArgs<ExtArgs>;
}, ExtArgs["result"]["alertHistory"]>;
export type AlertHistorySelectScalar = {
    id?: boolean;
    userId?: boolean;
    signalId?: boolean;
    channel?: boolean;
    status?: boolean;
    sentAt?: boolean;
    createdAt?: boolean;
};
export type AlertHistoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "signalId" | "channel" | "status" | "sentAt" | "createdAt", ExtArgs["result"]["alertHistory"]>;
export type AlertHistoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.AlertHistory$userArgs<ExtArgs>;
    signal?: boolean | Prisma.AlertHistory$signalArgs<ExtArgs>;
};
export type AlertHistoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.AlertHistory$userArgs<ExtArgs>;
    signal?: boolean | Prisma.AlertHistory$signalArgs<ExtArgs>;
};
export type AlertHistoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.AlertHistory$userArgs<ExtArgs>;
    signal?: boolean | Prisma.AlertHistory$signalArgs<ExtArgs>;
};
export type $AlertHistoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AlertHistory";
    objects: {
        user: Prisma.$UserPayload<ExtArgs> | null;
        signal: Prisma.$SignalPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string | null;
        signalId: string | null;
        channel: string;
        status: string;
        sentAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["alertHistory"]>;
    composites: {};
};
export type AlertHistoryGetPayload<S extends boolean | null | undefined | AlertHistoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AlertHistoryPayload, S>;
export type AlertHistoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AlertHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AlertHistoryCountAggregateInputType | true;
};
export interface AlertHistoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AlertHistory'];
        meta: {
            name: 'AlertHistory';
        };
    };
    /**
     * Find zero or one AlertHistory that matches the filter.
     * @param {AlertHistoryFindUniqueArgs} args - Arguments to find a AlertHistory
     * @example
     * // Get one AlertHistory
     * const alertHistory = await prisma.alertHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlertHistoryFindUniqueArgs>(args: Prisma.SelectSubset<T, AlertHistoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AlertHistoryClient<runtime.Types.Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one AlertHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AlertHistoryFindUniqueOrThrowArgs} args - Arguments to find a AlertHistory
     * @example
     * // Get one AlertHistory
     * const alertHistory = await prisma.alertHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlertHistoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AlertHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AlertHistoryClient<runtime.Types.Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first AlertHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertHistoryFindFirstArgs} args - Arguments to find a AlertHistory
     * @example
     * // Get one AlertHistory
     * const alertHistory = await prisma.alertHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlertHistoryFindFirstArgs>(args?: Prisma.SelectSubset<T, AlertHistoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__AlertHistoryClient<runtime.Types.Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first AlertHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertHistoryFindFirstOrThrowArgs} args - Arguments to find a AlertHistory
     * @example
     * // Get one AlertHistory
     * const alertHistory = await prisma.alertHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlertHistoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AlertHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AlertHistoryClient<runtime.Types.Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more AlertHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AlertHistories
     * const alertHistories = await prisma.alertHistory.findMany()
     *
     * // Get first 10 AlertHistories
     * const alertHistories = await prisma.alertHistory.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const alertHistoryWithIdOnly = await prisma.alertHistory.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AlertHistoryFindManyArgs>(args?: Prisma.SelectSubset<T, AlertHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a AlertHistory.
     * @param {AlertHistoryCreateArgs} args - Arguments to create a AlertHistory.
     * @example
     * // Create one AlertHistory
     * const AlertHistory = await prisma.alertHistory.create({
     *   data: {
     *     // ... data to create a AlertHistory
     *   }
     * })
     *
     */
    create<T extends AlertHistoryCreateArgs>(args: Prisma.SelectSubset<T, AlertHistoryCreateArgs<ExtArgs>>): Prisma.Prisma__AlertHistoryClient<runtime.Types.Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many AlertHistories.
     * @param {AlertHistoryCreateManyArgs} args - Arguments to create many AlertHistories.
     * @example
     * // Create many AlertHistories
     * const alertHistory = await prisma.alertHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AlertHistoryCreateManyArgs>(args?: Prisma.SelectSubset<T, AlertHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many AlertHistories and returns the data saved in the database.
     * @param {AlertHistoryCreateManyAndReturnArgs} args - Arguments to create many AlertHistories.
     * @example
     * // Create many AlertHistories
     * const alertHistory = await prisma.alertHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many AlertHistories and only return the `id`
     * const alertHistoryWithIdOnly = await prisma.alertHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AlertHistoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AlertHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a AlertHistory.
     * @param {AlertHistoryDeleteArgs} args - Arguments to delete one AlertHistory.
     * @example
     * // Delete one AlertHistory
     * const AlertHistory = await prisma.alertHistory.delete({
     *   where: {
     *     // ... filter to delete one AlertHistory
     *   }
     * })
     *
     */
    delete<T extends AlertHistoryDeleteArgs>(args: Prisma.SelectSubset<T, AlertHistoryDeleteArgs<ExtArgs>>): Prisma.Prisma__AlertHistoryClient<runtime.Types.Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one AlertHistory.
     * @param {AlertHistoryUpdateArgs} args - Arguments to update one AlertHistory.
     * @example
     * // Update one AlertHistory
     * const alertHistory = await prisma.alertHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AlertHistoryUpdateArgs>(args: Prisma.SelectSubset<T, AlertHistoryUpdateArgs<ExtArgs>>): Prisma.Prisma__AlertHistoryClient<runtime.Types.Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more AlertHistories.
     * @param {AlertHistoryDeleteManyArgs} args - Arguments to filter AlertHistories to delete.
     * @example
     * // Delete a few AlertHistories
     * const { count } = await prisma.alertHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AlertHistoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, AlertHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more AlertHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AlertHistories
     * const alertHistory = await prisma.alertHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AlertHistoryUpdateManyArgs>(args: Prisma.SelectSubset<T, AlertHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more AlertHistories and returns the data updated in the database.
     * @param {AlertHistoryUpdateManyAndReturnArgs} args - Arguments to update many AlertHistories.
     * @example
     * // Update many AlertHistories
     * const alertHistory = await prisma.alertHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more AlertHistories and only return the `id`
     * const alertHistoryWithIdOnly = await prisma.alertHistory.updateManyAndReturn({
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
    updateManyAndReturn<T extends AlertHistoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AlertHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one AlertHistory.
     * @param {AlertHistoryUpsertArgs} args - Arguments to update or create a AlertHistory.
     * @example
     * // Update or create a AlertHistory
     * const alertHistory = await prisma.alertHistory.upsert({
     *   create: {
     *     // ... data to create a AlertHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AlertHistory we want to update
     *   }
     * })
     */
    upsert<T extends AlertHistoryUpsertArgs>(args: Prisma.SelectSubset<T, AlertHistoryUpsertArgs<ExtArgs>>): Prisma.Prisma__AlertHistoryClient<runtime.Types.Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of AlertHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertHistoryCountArgs} args - Arguments to filter AlertHistories to count.
     * @example
     * // Count the number of AlertHistories
     * const count = await prisma.alertHistory.count({
     *   where: {
     *     // ... the filter for the AlertHistories we want to count
     *   }
     * })
    **/
    count<T extends AlertHistoryCountArgs>(args?: Prisma.Subset<T, AlertHistoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AlertHistoryCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a AlertHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AlertHistoryAggregateArgs>(args: Prisma.Subset<T, AlertHistoryAggregateArgs>): Prisma.PrismaPromise<GetAlertHistoryAggregateType<T>>;
    /**
     * Group by AlertHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertHistoryGroupByArgs} args - Group by arguments.
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
    groupBy<T extends AlertHistoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AlertHistoryGroupByArgs['orderBy'];
    } : {
        orderBy?: AlertHistoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AlertHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlertHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the AlertHistory model
     */
    readonly fields: AlertHistoryFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for AlertHistory.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__AlertHistoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.AlertHistory$userArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AlertHistory$userArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    signal<T extends Prisma.AlertHistory$signalArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AlertHistory$signalArgs<ExtArgs>>): Prisma.Prisma__SignalClient<runtime.Types.Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the AlertHistory model
 */
export interface AlertHistoryFieldRefs {
    readonly id: Prisma.FieldRef<"AlertHistory", 'String'>;
    readonly userId: Prisma.FieldRef<"AlertHistory", 'String'>;
    readonly signalId: Prisma.FieldRef<"AlertHistory", 'String'>;
    readonly channel: Prisma.FieldRef<"AlertHistory", 'String'>;
    readonly status: Prisma.FieldRef<"AlertHistory", 'String'>;
    readonly sentAt: Prisma.FieldRef<"AlertHistory", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"AlertHistory", 'DateTime'>;
}
/**
 * AlertHistory findUnique
 */
export type AlertHistoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which AlertHistory to fetch.
     */
    where: Prisma.AlertHistoryWhereUniqueInput;
};
/**
 * AlertHistory findUniqueOrThrow
 */
export type AlertHistoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which AlertHistory to fetch.
     */
    where: Prisma.AlertHistoryWhereUniqueInput;
};
/**
 * AlertHistory findFirst
 */
export type AlertHistoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which AlertHistory to fetch.
     */
    where?: Prisma.AlertHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AlertHistories to fetch.
     */
    orderBy?: Prisma.AlertHistoryOrderByWithRelationInput | Prisma.AlertHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AlertHistories.
     */
    cursor?: Prisma.AlertHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AlertHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AlertHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AlertHistories.
     */
    distinct?: Prisma.AlertHistoryScalarFieldEnum | Prisma.AlertHistoryScalarFieldEnum[];
};
/**
 * AlertHistory findFirstOrThrow
 */
export type AlertHistoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which AlertHistory to fetch.
     */
    where?: Prisma.AlertHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AlertHistories to fetch.
     */
    orderBy?: Prisma.AlertHistoryOrderByWithRelationInput | Prisma.AlertHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AlertHistories.
     */
    cursor?: Prisma.AlertHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AlertHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AlertHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AlertHistories.
     */
    distinct?: Prisma.AlertHistoryScalarFieldEnum | Prisma.AlertHistoryScalarFieldEnum[];
};
/**
 * AlertHistory findMany
 */
export type AlertHistoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which AlertHistories to fetch.
     */
    where?: Prisma.AlertHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AlertHistories to fetch.
     */
    orderBy?: Prisma.AlertHistoryOrderByWithRelationInput | Prisma.AlertHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing AlertHistories.
     */
    cursor?: Prisma.AlertHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AlertHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AlertHistories.
     */
    skip?: number;
    distinct?: Prisma.AlertHistoryScalarFieldEnum | Prisma.AlertHistoryScalarFieldEnum[];
};
/**
 * AlertHistory create
 */
export type AlertHistoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a AlertHistory.
     */
    data: Prisma.XOR<Prisma.AlertHistoryCreateInput, Prisma.AlertHistoryUncheckedCreateInput>;
};
/**
 * AlertHistory createMany
 */
export type AlertHistoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many AlertHistories.
     */
    data: Prisma.AlertHistoryCreateManyInput | Prisma.AlertHistoryCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * AlertHistory createManyAndReturn
 */
export type AlertHistoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: Prisma.AlertHistorySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AlertHistory
     */
    omit?: Prisma.AlertHistoryOmit<ExtArgs> | null;
    /**
     * The data used to create many AlertHistories.
     */
    data: Prisma.AlertHistoryCreateManyInput | Prisma.AlertHistoryCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AlertHistoryIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * AlertHistory update
 */
export type AlertHistoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a AlertHistory.
     */
    data: Prisma.XOR<Prisma.AlertHistoryUpdateInput, Prisma.AlertHistoryUncheckedUpdateInput>;
    /**
     * Choose, which AlertHistory to update.
     */
    where: Prisma.AlertHistoryWhereUniqueInput;
};
/**
 * AlertHistory updateMany
 */
export type AlertHistoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update AlertHistories.
     */
    data: Prisma.XOR<Prisma.AlertHistoryUpdateManyMutationInput, Prisma.AlertHistoryUncheckedUpdateManyInput>;
    /**
     * Filter which AlertHistories to update
     */
    where?: Prisma.AlertHistoryWhereInput;
    /**
     * Limit how many AlertHistories to update.
     */
    limit?: number;
};
/**
 * AlertHistory updateManyAndReturn
 */
export type AlertHistoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: Prisma.AlertHistorySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AlertHistory
     */
    omit?: Prisma.AlertHistoryOmit<ExtArgs> | null;
    /**
     * The data used to update AlertHistories.
     */
    data: Prisma.XOR<Prisma.AlertHistoryUpdateManyMutationInput, Prisma.AlertHistoryUncheckedUpdateManyInput>;
    /**
     * Filter which AlertHistories to update
     */
    where?: Prisma.AlertHistoryWhereInput;
    /**
     * Limit how many AlertHistories to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AlertHistoryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * AlertHistory upsert
 */
export type AlertHistoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the AlertHistory to update in case it exists.
     */
    where: Prisma.AlertHistoryWhereUniqueInput;
    /**
     * In case the AlertHistory found by the `where` argument doesn't exist, create a new AlertHistory with this data.
     */
    create: Prisma.XOR<Prisma.AlertHistoryCreateInput, Prisma.AlertHistoryUncheckedCreateInput>;
    /**
     * In case the AlertHistory was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.AlertHistoryUpdateInput, Prisma.AlertHistoryUncheckedUpdateInput>;
};
/**
 * AlertHistory delete
 */
export type AlertHistoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which AlertHistory to delete.
     */
    where: Prisma.AlertHistoryWhereUniqueInput;
};
/**
 * AlertHistory deleteMany
 */
export type AlertHistoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which AlertHistories to delete
     */
    where?: Prisma.AlertHistoryWhereInput;
    /**
     * Limit how many AlertHistories to delete.
     */
    limit?: number;
};
/**
 * AlertHistory.user
 */
export type AlertHistory$userArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * AlertHistory.signal
 */
export type AlertHistory$signalArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * AlertHistory without action
 */
export type AlertHistoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=AlertHistory.d.ts.map
import { $api } from "@/shared/utils";
import { CreatePaymentOrderDto } from "../props/create-payment-order.dto";
import { CreatePaymentOrderResponse } from "../reponses/create-payment-order.response";

export const createPaymentOrderApi = async (dto: CreatePaymentOrderDto) => {
    const { data } = await $api.post<CreatePaymentOrderResponse>(
        "/order/create-payment-order",
        dto,
    );

    return data;
};

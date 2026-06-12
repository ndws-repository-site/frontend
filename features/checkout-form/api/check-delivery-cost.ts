import { $api } from "@/shared/utils";
import { CheckDeliveryCostApiDto } from "../props/check-delivery-cost-api.dto";
import { CheckDeliveryCostApiResponse } from "../reponses/check-delivery-cost-api.response";

export const checkDeliveryCostApi = async (dto: CheckDeliveryCostApiDto) => {
    const { data } = await $api.post<CheckDeliveryCostApiResponse>(
        "/order/check-delivery-cost",
        dto,
    );

    return data;
};

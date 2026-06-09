import { CheckPromocodeResponse } from "@/shared/types";
import { $api } from "@/shared/utils";

export const checkPromocode = async (code: string) => {
    const { data } = await $api.post<CheckPromocodeResponse>(
        "/promocode/check",
        { code },
    );

    return data;
};

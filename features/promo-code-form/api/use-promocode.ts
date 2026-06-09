import { PromocodeResponse } from "@/shared/types";
import { $apiAdmin } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const usePromocode = (id: number | string | undefined) => {
    return useQuery({
        queryKey: ["promocode", id],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<PromocodeResponse>(
                `/promocode/${id}`,
            );
            return data;
        },
        enabled: id != null && id !== "",
    });
};

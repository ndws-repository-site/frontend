import { ProductBlockResponse } from "@/shared/types/responses";
import { $apiAdmin } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useProductBlock = (id: number | string | undefined) => {
    return useQuery({
        queryKey: ["product-block", id],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<ProductBlockResponse>(
                `/product-block/${id}`,
            );
            return data;
        },
        enabled: id != null && id !== "",
    });
};

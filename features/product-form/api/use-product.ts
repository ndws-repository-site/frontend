import { ProductResponse } from "@/shared/types/responses/product.response";
import { $apiAdmin } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (id: number | string | undefined) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<ProductResponse>(
                `/product/${id}`,
            );
            return data;
        },
        enabled: id != null && id !== "",
    });
};

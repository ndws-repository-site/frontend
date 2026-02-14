import { ProductTypeResponse } from "@/shared/types";
import { $apiAdmin } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useProductType = (id: number | string | undefined) => {
    return useQuery({
        queryKey: ["product-type", id],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<ProductTypeResponse>(
                `/product-type/${id}`,
            );
            return data;
        },
        enabled: id != null && id !== "",
    });
};

import { ProductBlockResponse } from "@/shared/types";
import { $api } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useProductBlock = () => {
    return useQuery({
        queryKey: ["products-block"],
        queryFn: async () => {
            const { data } =
                await $api.get<ProductBlockResponse[]>("/product-blocks");
            return data;
        },
    });
};

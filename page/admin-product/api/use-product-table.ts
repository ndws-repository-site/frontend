import { ProductResponse } from "@/shared/types/responses/product.response";
import { $apiAdmin } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useProductTable = () => {
    return useQuery({
        queryKey: ["product-table"],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<ProductResponse[]>("/product");
            return data;
        },
    });
};

import { ProductTypeResponse } from "@/shared/types";
import { $apiAdmin } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useProductTypeForProductTable = () => {
    return useQuery({
        queryKey: ["product-type-for-product-table"],
        queryFn: async () => {
            const { data } =
                await $apiAdmin.get<ProductTypeResponse[]>("/product-type");
            return data;
        },
    });
};

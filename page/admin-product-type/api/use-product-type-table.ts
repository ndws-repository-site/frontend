import { useQuery } from "@tanstack/react-query";
import { $apiAdmin } from "@/shared/utils";
import { ProductTypeResponse } from "@/shared/types";

export const useProductTypeTable = () => {
    return useQuery({
        queryKey: ["product-type-table"],
        queryFn: async () => {
            const { data } =
                await $apiAdmin.get<ProductTypeResponse[]>("/product-type");
            return data;
        },
    });
};

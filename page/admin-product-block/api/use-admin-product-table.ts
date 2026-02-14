import { ProductBlockResponse } from "@/shared/types/responses";
import { $apiAdmin } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useAdminProductBlockTable = () => {
    return useQuery({
        queryKey: ["admin-product-block-table"],
        queryFn: async () => {
            const { data } =
                await $apiAdmin.get<ProductBlockResponse[]>("/product-block");
            return data;
        },
    });
};

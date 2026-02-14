import { FormResponse } from "@/shared/types";
import { $apiAdmin } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useFormForProductTable = () => {
    return useQuery({
        queryKey: ["form-for-product-table"],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<FormResponse[]>("/form");
            return data;
        },
    });
};

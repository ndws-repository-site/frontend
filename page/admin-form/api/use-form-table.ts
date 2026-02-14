import { useQuery } from "@tanstack/react-query";
import { $apiAdmin } from "@/shared/utils";
import { FormResponse } from "@/shared/types";

export const useFormTable = () => {
    return useQuery({
        queryKey: ["form-table"],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<FormResponse[]>("/form");
            return data;
        },
    });
};

import { useQuery } from "@tanstack/react-query";
import { $apiAdmin } from "@/shared/utils";
import { FaqResponse } from "@/shared/types";

export const useFaqTable = () => {
    return useQuery({
        queryKey: ["faq-table"],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<FaqResponse[]>("/faq");
            return data;
        },
    });
};

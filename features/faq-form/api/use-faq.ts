import { FaqResponse } from "@/shared/types";
import { $apiAdmin } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useFaq = (id: number | string | undefined) => {
    return useQuery({
        queryKey: ["faq", id],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<FaqResponse>(`/faq/${id}`);
            return data;
        },
        enabled: id != null && id !== "",
    });
};

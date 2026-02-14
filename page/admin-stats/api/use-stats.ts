import { StatsResponse } from "@/shared/types/responses";
import { $apiAdmin } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useStats = () => {
    return useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<StatsResponse>("/stats");
            return data;
        },
    });
};

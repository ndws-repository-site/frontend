import { GoalResponse } from "@/shared/types";
import { $apiAdmin } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useGoal = (id: number | string | undefined) => {
    return useQuery({
        queryKey: ["goal", id],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<GoalResponse>(`/goal/${id}`);
            return data;
        },
        enabled: id != null && id !== "",
    });
};

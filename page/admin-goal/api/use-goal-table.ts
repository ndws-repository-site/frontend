import { useQuery } from "@tanstack/react-query";
import { $apiAdmin } from "@/shared/utils";
import { GoalResponse } from "@/shared/types";

export const useGoalTable = () => {
    return useQuery({
        queryKey: ["goal-table"],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<GoalResponse[]>("/goal");
            return data;
        },
    });
};

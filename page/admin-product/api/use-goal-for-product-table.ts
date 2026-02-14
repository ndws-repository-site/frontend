import { GoalResponse } from "@/shared/types";
import { $apiAdmin } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useGoalForProductTable = () => {
    return useQuery({
        queryKey: ["goal-for-product-table"],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<GoalResponse[]>("/goal");
            return data;
        },
    });
};

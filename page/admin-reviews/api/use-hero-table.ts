import { ReviewResponse } from "@/shared/types";
import { $apiAdmin } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useReviewsTable = () => {
    return useQuery({
        queryKey: ["admin-reviews"],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<ReviewResponse[]>("/review");
            return data;
        },
    });
};

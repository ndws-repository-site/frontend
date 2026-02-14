import { ReviewResponse } from "@/shared/types";
import { $apiAdmin } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useReviewForm = (id: number | string | undefined) => {
    return useQuery({
        queryKey: ["review-form", id],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<ReviewResponse>(
                `/review/${id}`,
            );
            return data;
        },
        enabled: id != null && id !== "",
    });
};

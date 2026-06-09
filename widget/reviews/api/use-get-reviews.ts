import { ReviewResponse } from "@/shared/types";
import { $api } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useGetReviews = () => {
    return useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const { data } = await $api.get<ReviewResponse[]>("/reviews");
            return data;
        },
    });
};

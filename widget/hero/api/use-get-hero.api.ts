import { HeroResponse } from "@/shared/types";
import { $api } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useGetHero = () => {
    return useQuery({
        queryKey: ["hero"],
        queryFn: async () => {
            const { data } = await $api.get<HeroResponse>("/hero");
            return data.image;
        },
    });
};

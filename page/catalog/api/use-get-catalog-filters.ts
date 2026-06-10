import { FiltersResponse } from "@/shared/types";
import { $api } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useGetCatalogFilters = () => {
    return useQuery({
        queryKey: ["catalog-filters"],
        queryFn: async () => {
            const { data } =
                await $api.get<FiltersResponse>("/product/filters");
            return data;
        },
    });
};

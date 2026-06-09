import { useQuery } from "@tanstack/react-query";
import { $apiAdmin } from "@/shared/utils";
import { PromocodeResponse } from "@/shared/types";

export const usePromocodeTable = () => {
    return useQuery({
        queryKey: ["promocode-table"],
        queryFn: async () => {
            const { data } =
                await $apiAdmin.get<PromocodeResponse[]>("/promocode");
            return data;
        },
    });
};

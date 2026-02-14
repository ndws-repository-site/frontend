import { AdminResponse } from "@/shared/types/responses";
import { $apiAdmin } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useAdminTable = () => {
    return useQuery({
        queryKey: ["admin-table"],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<AdminResponse[]>("");
            return data;
        },
    });
};

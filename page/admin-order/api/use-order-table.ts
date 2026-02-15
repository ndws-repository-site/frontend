import { OrderResponse } from "@/shared/types/responses/order.response";
import { $apiAdmin } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useOrderTable = (id: string) => {
    return useQuery({
        queryKey: ["order-table", id],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<OrderResponse>(`/order/${id}`);
            return data;
        },
        enabled: !!id,
    });
};

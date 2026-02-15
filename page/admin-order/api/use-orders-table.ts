import { OrderResponse } from "@/shared/types/responses/order.response";
import { $apiAdmin } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useOrdersTable = () => {
    return useQuery({
        queryKey: ["order-table"],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<OrderResponse[]>("/order");
            return data;
        },
    });
};

import type { OrderResponse } from "@/shared/types/responses/order.response";

export const formatOrderAddress = (
    order: Pick<OrderResponse, "street" | "city" | "state" | "zip" | "country">,
): string => {
    const cityLine = [order.city, order.state, order.zip]
        .filter(Boolean)
        .join(", ");

    return [order.street, cityLine, order.country].filter(Boolean).join(", ");
};

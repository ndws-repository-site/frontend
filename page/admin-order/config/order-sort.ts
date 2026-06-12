import type { OrderResponse } from "@/shared/types/responses/order.response";

export type OrderSortKey = "newest" | "oldest" | "totalDesc" | "totalAsc";

export const ORDER_SORT_OPTIONS: { value: OrderSortKey; label: string }[] = [
    { value: "newest", label: "Сначала новые" },
    { value: "oldest", label: "Сначала старые" },
    { value: "totalDesc", label: "Сумма: по убыванию" },
    { value: "totalAsc", label: "Сумма: по возрастанию" },
];

export const sortOrders = (
    orders: OrderResponse[],
    sortKey: OrderSortKey,
): OrderResponse[] => {
    const sorted = [...orders];

    switch (sortKey) {
        case "oldest":
            return sorted.sort(
                (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime(),
            );
        case "totalDesc":
            return sorted.sort((a, b) => b.totalPrice - a.totalPrice);
        case "totalAsc":
            return sorted.sort((a, b) => a.totalPrice - b.totalPrice);
        case "newest":
        default:
            return sorted.sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
            );
    }
};

import type { OrderStatus } from "@/shared/types/responses/order.response";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
    created: "Создан",
    paid: "Оплачен",
    awaitingDeparture: "Ожидает отправки",
    shipped: "Отправлен",
    waitingForReceipt: "Ожидает получения",
    completed: "Завершён",
    cancelled: "Отменён",
};

export const ORDER_STATUS_BADGE_CLASS: Record<OrderStatus, string> = {
    created: "bg-gray-500/20 text-gray-300",
    paid: "bg-green-500/20 text-green-400",
    awaitingDeparture: "bg-yellow-500/20 text-yellow-400",
    shipped: "bg-blue-500/20 text-blue-400",
    waitingForReceipt: "bg-purple-500/20 text-purple-400",
    completed: "bg-emerald-500/20 text-emerald-400",
    cancelled: "bg-red-500/20 text-red-400",
};

export const ORDER_STATUS_OPTIONS = [
    { value: "all", label: "Все статусы" },
    ...(Object.entries(ORDER_STATUS_LABELS) as [OrderStatus, string][]).map(
        ([value, label]) => ({ value, label }),
    ),
];

export const getOrderStatusLabel = (status: string): string => {
    if (status in ORDER_STATUS_LABELS) {
        return ORDER_STATUS_LABELS[status as OrderStatus];
    }
    return status;
};

export const getOrderStatusBadgeClass = (status: string): string => {
    if (status in ORDER_STATUS_BADGE_CLASS) {
        return ORDER_STATUS_BADGE_CLASS[status as OrderStatus];
    }
    return "bg-gray-500/20 text-gray-300";
};

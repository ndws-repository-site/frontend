const DELIVERY_LABELS: Record<string, string> = {
    shippo: "Shippo",
};

export const formatDelivery = (delivery: string): string => {
    return DELIVERY_LABELS[delivery] ?? delivery;
};

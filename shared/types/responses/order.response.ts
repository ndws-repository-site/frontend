export type OrderStatus =
    | "created"
    | "paid"
    | "awaitingDeparture"
    | "shipped"
    | "waitingForReceipt"
    | "completed"
    | "cancelled";

export type OrderDelivery = "shippo";

export interface OrderProductItemProductResponse {
    id: string;
    name: string;
    slug: string;
    price: number;
    images: string[];
}

export interface OrderProductItemResponse {
    id: number;
    orderId: string;
    productId: string;
    quantity: number;
    product: OrderProductItemProductResponse;
}

export interface OrderResponse {
    id: string;
    delivery: OrderDelivery;
    status: OrderStatus;
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    email: string;
    comment: string | null;
    subtotal: number;
    deliveryCost: number;
    totalPrice: number;
    promocode: string | null;
    shippoShipmentId: string | null;
    shippoRateId: string | null;
    shippoTransactionId: string | null;
    trackingNumber: string | null;
    labelUrl: string | null;
    carrier: string | null;
    serviceLevel: string | null;
    emailSent: boolean;
    emailSentAt: string | null;
    orderProducts: OrderProductItemResponse[];
    createdAt: string;
    updatedAt: string;
}

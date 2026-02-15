export interface OrderProductItemProductResponse {
    id: string;
    name: string;
    slug: string;
    price: number;
    images: string[];
}

export interface OrderProductItemResponse {
    id: number;
    productId: string;
    quantity: number;
    product: OrderProductItemProductResponse;
}

export interface OrderResponse {
    id: string;
    delivery: string;
    totalPrice: number;
    address: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    orderProducts: OrderProductItemResponse[];
    createdAt: string;
    updatedAt: string;
}

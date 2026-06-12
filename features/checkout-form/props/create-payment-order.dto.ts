export interface CreatePaymentOrderProductDto {
    productId: string;
    quantity: number;
}

export interface CreatePaymentOrderDto {
    firstName: string;
    lastName: string;
    name: string;
    country: string;
    state: string;
    city: string;
    street: string;
    zip: string;
    phone: string;
    email: string;
    comment?: string;
    deliveryCost: number;
    subtotal: number;
    totalPrice: number;
    promocode: string;
    products: CreatePaymentOrderProductDto[];
}

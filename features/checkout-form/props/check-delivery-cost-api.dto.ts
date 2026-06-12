export interface CheckDeliveryCostApiDto {
    name: string;
    country: string;
    state: string;
    city: string;
    zip: string;
    street: string;
    products: {
        productId: string;
        quantity: number;
    }[];
}

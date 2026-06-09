export type ProductBlockProductResponse = {
    id: string;
    name: string;
    slug: string;
    price: number;
    stock: number;
    images: string[];
};

export type ProductBlockResponse = {
    id: number;
    icon: string;
    iconColor: string;
    title: string;
    subtitle: string;
    color: string;
    productId: string;
    product: ProductBlockProductResponse;
    createdAt: string;
    updatedAt: string;
};

import { IProduct } from "@/shared/types";

export const PRODUCT_MOCK: IProduct = {
    name: 'Creatine',
    image: '/creatine.png',
    slug: 'creatine'
};

export const PRODUCTS_MOCK: IProduct[] = Array.from({ length: 8 }, (_, i) => ({
    ...PRODUCT_MOCK
}));
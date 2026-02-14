import { IProduct } from "@/shared/types";

export const PRODUCT_MOCK: IProduct = {
    name: "Creatine",
    image: "/creatine.png",
    slug: "creatine",
    goal: "Endurance",
    form: "Capsules",
    productType: "Creatine",
};

export const PRODUCTS_MOCK: IProduct[] = Array.from({ length: 8 }, () => ({
    ...PRODUCT_MOCK,
}));

import { RecommendedProductResponse } from "./product.response";

export type ProductBlockResponse = {
    id: number;
    icon: string;
    iconColor: string;
    title: string;
    subtitle: string;
    color: string;
    product: RecommendedProductResponse;
};

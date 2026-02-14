import { FaqResponse } from "./faq.reponse";
import { FormResponse } from "./form.response";
import { GoalResponse } from "./goal.response";
import { ProductTypeResponse } from "./product-type.reponse";

export interface ProductResponse {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    forWho: string;
    howToUse: string;
    composition: string;
    productType: ProductTypeResponse;
    goal: GoalResponse;
    form: FormResponse;
    faq: FaqResponse;
    recommmendedProducts: RecommendedProductResponse[];
}

export interface RecommendedProductResponse {
    id: string;
    name: string;
    slug: string;
    price: number;
    images: string[];
}

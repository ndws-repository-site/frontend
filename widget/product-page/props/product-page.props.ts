import { FaqJson, IngredientJson, IProduct } from "@/shared/types";

export interface ProductPageProps {
    images: string[];
    name: string;
    description: string;
    id: string;
    forWho: string;
    howToUse: string;
    price: number;
    ingredients: IngredientJson[];
    faq: FaqJson[];
    recommendedProducts: IProduct[];
}

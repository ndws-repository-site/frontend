import { IngredientJson } from "@/shared/types";

export interface ProductRightCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    forWho: string;
    howToUse: string;
    ingredients: IngredientJson[];
}

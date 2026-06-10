import { IngredientJson } from "@/shared/types";

export interface ProductFormSchema {
    name: string;
    description: string;
    price: string;
    stock: string;
    forWho: string;
    howToUse: string;
    composition: IngredientJson[];
}

import { IngredientJson } from "@/shared/types";

export interface ProductFormSchema {
    name: string;
    description: string;
    price: string;
    stock: string;
    weight: string;
    length: string;
    width: string;
    height: string;
    forWho: string;
    howToUse: string;
    composition: IngredientJson[];
}

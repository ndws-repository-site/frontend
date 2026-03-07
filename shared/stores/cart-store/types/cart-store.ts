import { ICartItem } from "@/shared/types";
import { CheckQuantityResponse } from "./check-quantity-reponse";

export interface CartStore {
    items: ICartItem[];
    productPrice: number;
    deliveryPrice: number;
    totalPrice: number;
    addItem: (id: string) => void;
    removeItem: (id: string) => void;
    changeItemQuantity: (id: string, quantity: number) => void;
    getItems: (ids: string[]) => ICartItem[];
    checkQuantity: (ids: string[]) => CheckQuantityResponse;
}

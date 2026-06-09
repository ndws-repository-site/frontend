import { ICartItem } from "@/shared/types";
import { CheckQuantityResponse } from "./check-quantity-reponse";

export type CartItemSnapshot = Pick<
    ICartItem,
    "id" | "name" | "price" | "image"
>;

export interface AppliedPromocode {
    code: string;
    discount: number;
}

export interface CartStore {
    items: ICartItem[];
    productPrice: number;
    deliveryPrice: number;
    discountAmount: number;
    appliedPromocode: AppliedPromocode | null;
    totalPrice: number;
    itemsCount: number;
    addItem: (product: CartItemSnapshot) => void;
    removeItem: (id: string) => void;
    changeItemQuantity: (id: string, quantity: number) => void;
    applyPromocode: (code: string, discount: number) => void;
    clearPromocode: () => void;
    getItems: (ids: string[]) => ICartItem[];
    checkQuantity: (ids: string[]) => CheckQuantityResponse;
}

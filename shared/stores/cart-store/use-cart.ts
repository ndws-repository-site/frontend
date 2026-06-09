import { DELIVERY_PRICE } from "@/shared/config";
import { ICartItem } from "@/shared/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
    AppliedPromocode,
    CartItemSnapshot,
    CartStore,
} from "./types/cart-store";
import { CheckQuantityResponse } from "./types/check-quantity-reponse";

const calcProductPrice = (items: ICartItem[]) =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const calcItemsCount = (items: ICartItem[]) =>
    items.reduce((sum, item) => sum + item.quantity, 0);

const calcDiscountAmount = (
    productPrice: number,
    appliedPromocode: AppliedPromocode | null,
) => (appliedPromocode ? productPrice * (appliedPromocode.discount / 100) : 0);

const withTotals = (
    items: ICartItem[],
    appliedPromocode: AppliedPromocode | null = null,
) => {
    const productPrice = calcProductPrice(items);
    const deliveryPrice = items.length > 0 ? DELIVERY_PRICE : 0;
    const discountAmount = calcDiscountAmount(productPrice, appliedPromocode);

    return {
        items,
        productPrice,
        deliveryPrice,
        discountAmount,
        appliedPromocode,
        totalPrice: productPrice - discountAmount + deliveryPrice,
        itemsCount: calcItemsCount(items),
    };
};

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            ...withTotals([]),

            addItem: (product: CartItemSnapshot) => {
                const items = get().items;
                const existing = items.find((item) => item.id === product.id);

                const nextItems = existing
                    ? items.map((item) =>
                          item.id === product.id
                              ? { ...item, quantity: item.quantity + 1 }
                              : item,
                      )
                    : [...items, { ...product, quantity: 1 }];

                set(withTotals(nextItems, get().appliedPromocode));
            },

            removeItem: (id: string) => {
                set(
                    withTotals(
                        get().items.filter((item) => item.id !== id),
                        get().appliedPromocode,
                    ),
                );
            },

            changeItemQuantity: (id: string, quantity: number) => {
                if (quantity <= 0) {
                    get().removeItem(id);
                    return;
                }

                set(
                    withTotals(
                        get().items.map((item) =>
                            item.id === id ? { ...item, quantity } : item,
                        ),
                        get().appliedPromocode,
                    ),
                );
            },

            applyPromocode: (code: string, discount: number) => {
                set(
                    withTotals(get().items, {
                        code,
                        discount,
                    }),
                );
            },

            clearPromocode: () => {
                set(withTotals(get().items, null));
            },

            getItems: (ids: string[]) =>
                get().items.filter((item) => ids.includes(item.id)),

            checkQuantity: (ids: string[]): CheckQuantityResponse => {
                const items = get().getItems(ids);
                const quantity = items.reduce(
                    (sum, item) => sum + item.quantity,
                    0,
                );

                return {
                    quantity,
                    isAvailable: quantity > 0,
                    message:
                        quantity > 0
                            ? "Items are available"
                            : "No items in cart",
                };
            },
        }),
        {
            name: "ndws-cart",
            partialize: (state) => ({ items: state.items }),
            merge: (persisted, current) => {
                const items =
                    (persisted as { items?: ICartItem[] })?.items ?? [];

                return {
                    ...current,
                    ...withTotals(items, null),
                };
            },
        },
    ),
);

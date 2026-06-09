"use client";

import { useCart } from "@/shared/stores/cart-store";

export const CartButtonBadge = () => {
    const itemsCount = useCart((state) => state.itemsCount);

    if (itemsCount <= 0) {
        return null;
    }

    return (
        <span
            className="absolute -right-1 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-medium leading-none text-white"
            aria-hidden
        >
            {itemsCount}
        </span>
    );
};

"use client";

import { CartQuantityControl } from "@/entity/cart-quantity-control";
import { useToast } from "@/shared/hooks";
import { useCart } from "@/shared/stores/cart-store";
import { AddCartButtonProps } from "../props/add-cart-button.props";

export const AddCartButton = ({
    id,
    name,
    price,
    image,
}: AddCartButtonProps) => {
    const { showToast } = useToast();
    const quantity = useCart(
        (state) => state.items.find((item) => item.id === id)?.quantity ?? 0,
    );
    const addItem = useCart((state) => state.addItem);
    const changeItemQuantity = useCart((state) => state.changeItemQuantity);

    const handleAddCartClick = () => {
        addItem({ id, name, price, image });
        showToast("Added to cart");
    };

    if (quantity > 0) {
        return (
            <CartQuantityControl
                variant="dark"
                quantity={quantity}
                onDecrease={() => changeItemQuantity(id, quantity - 1)}
                onIncrease={() => changeItemQuantity(id, quantity + 1)}
            />
        );
    }

    return (
        <button
            className="flex items-center justify-center mob:px-13 px-4.5 mob:py-5 py-2.5 mob:text-[18px] text-[14px] text-white font-medium rounded-full bg-primary cursor-pointer transition-all duration-300 hover:bg-primary/80"
            onClick={handleAddCartClick}
            type="button"
        >
            Add to cart
        </button>
    );
};

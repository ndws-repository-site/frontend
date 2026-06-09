"use client";

import { CartQuantityControl } from "@/entity/cart-quantity-control";
import { useToast } from "@/shared/hooks";
import { useCart } from "@/shared/stores/cart-store";
import { cn } from "@/shared/utils";
import { ShoppingBag } from "lucide-react";
import { AddCartButtonProductCardProps } from "../props/add-cart-button-product-card.props";

export const AddCartButtonProductCard = ({
    id,
    name,
    price,
    image,
    isHover,
    className,
}: AddCartButtonProductCardProps) => {
    const { showToast } = useToast();
    const quantity = useCart(
        (state) => state.items.find((item) => item.id === id)?.quantity ?? 0,
    );
    const addItem = useCart((state) => state.addItem);
    const changeItemQuantity = useCart((state) => state.changeItemQuantity);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({ id, name, price, image });
        showToast("Added to cart");
    };

    const stopLinkNavigation = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    if (quantity > 0) {
        return (
            <div
                className={cn(
                    "flex items-center justify-center rounded-full transition duration-300 ease-in-out",
                    isHover ? "bg-[#205b26]" : "bg-[#17411B]",
                    className,
                )}
                onClick={stopLinkNavigation}
            >
                <CartQuantityControl
                    variant="compact"
                    quantity={quantity}
                    onDecrease={() => changeItemQuantity(id, quantity - 1)}
                    onIncrease={() => changeItemQuantity(id, quantity + 1)}
                    className="border-transparent"
                />
            </div>
        );
    }

    return (
        <button
            className={cn(
                "w-8 h-8 cursor-pointer flex items-center justify-center rounded-full transition duration-300 ease-in-out",
                isHover ? "bg-[#205b26]" : "bg-[#17411B]",
                className,
            )}
            onClick={handleClick}
            type="button"
        >
            <ShoppingBag size={16} className="text-white text-[20px]" />
        </button>
    );
};

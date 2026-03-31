"use client";

import { useToast } from "@/shared/hooks";
import { AddCartButtonProps } from "../props/add-cart-button.props";

export const AddCartButton = ({ id }: AddCartButtonProps) => {
    const { showToast } = useToast();
    const handleAddCartClick = () => {
        showToast("Ждите когда бэк будет. вот кста айди мокнутый: " + id);
    };

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

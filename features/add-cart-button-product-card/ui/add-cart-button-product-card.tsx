"use client";

import { useToast } from "@/shared/hooks";
import { cn } from "@/shared/utils";
import { ShoppingBag } from "lucide-react";

export const AddCartButtonProductCard = ({
    id,
    isHover,
    className,
}: {
    id: string;
    isHover: boolean;
    className?: string;
}) => {
    const { showToast } = useToast();
    const handleClick = (
        e: React.MouseEvent<HTMLButtonElement>,
        id: string,
    ) => {
        e.preventDefault();
        e.stopPropagation();
        showToast(`Ждеееееееем backend ${id}`);
    };

    return (
        <button
            className={cn(
                "w-8 h-8 cursor-pointer flex items-center justify-center rounded-full transition duration-300 ease-in-out",
                isHover ? "bg-[#205b26]" : "bg-[#17411B]",
                className,
            )}
            onClick={(e) => handleClick(e, id)}
        >
            <ShoppingBag size={16} className="text-white text-[20px]" />
        </button>
    );
};

"use client";

import Image from "next/image";
import { Check, Plus, Trash } from "lucide-react";
import { cn } from "@/shared/utils";
import type { ProductResponse } from "@/shared/types";

interface RecommendedProductCardProps {
    product: ProductResponse;
    isSelected?: boolean;
    buttonAction?: "add" | "delete";
    loading?: boolean;
    onAdminClick?: (id: string) => void;
}

export const RecommendedProductCard = ({
    product,
    isSelected = false,
    buttonAction = "add",
    loading = false,
    onAdminClick,
}: RecommendedProductCardProps) => {
    const image = product.images?.[0];

    if (loading) {
        return (
            <div className="flex gap-4 rounded-xl border border-transparent bg-background p-4">
                <div className="h-16 w-16 shrink-0 animate-pulse rounded-xl bg-white/5" />
                <div className="flex-1 min-w-0">
                    <div className="mb-2 h-5 w-3/4 animate-pulse rounded-lg bg-white/5" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-white/5" />
                </div>
            </div>
        );
    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onAdminClick?.(product.id);
    };

    return (
        <div
            className={cn(
                "flex items-center gap-4 rounded-xl border border-transparent bg-background p-4 transition-all hover:border-white/10",
            )}
        >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white/5">
                {image ? (
                    <Image
                        src={image}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-[#656565] text-xs">
                        —
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-white">
                    {product.name}
                </p>
                <p className="text-sm text-[#656565]">
                    {product.price.toLocaleString("en-US")} $
                </p>
            </div>
            <button
                type="button"
                onClick={handleClick}
                className={cn(
                    "flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full transition-all hover:scale-105",
                    buttonAction === "add" &&
                        !isSelected &&
                        "bg-white text-black hover:bg-gray-200",
                    buttonAction === "add" &&
                        isSelected &&
                        "bg-[#22C55E] text-white",
                    buttonAction === "delete" &&
                        "bg-[#DD2C00] text-white hover:bg-[#BF2600]",
                )}
            >
                {buttonAction === "delete" ? (
                    <Trash size={18} />
                ) : isSelected ? (
                    <Check size={20} />
                ) : (
                    <Plus size={20} />
                )}
            </button>
        </div>
    );
};

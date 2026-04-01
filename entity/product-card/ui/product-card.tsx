"use client";

import { cn } from "@/shared/utils";
import { ProductCardProps } from "../types/product-card.props";
import Image from "next/image";
import Link from "next/link";
import { AddCartButtonProductCard } from "@/features/add-cart-button-product-card";
import { useState } from "react";

export const ProductCard = ({
    id,
    name,
    image,
    slug,
    price,
    loading = false,
    className,
}: ProductCardProps) => {
    const [hover, setHover] = useState(false);

    if (loading) {
        return (
            <div
                className={cn(
                    "bg-white px-3.5 pt-3.5 rounded-[25px] min-h-[420px]",
                    className,
                )}
            >
                <div className="flex items-center justify-between mb-6.5">
                    <div className="h-[60px] w-48 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="h-12 w-28 bg-gray-200 rounded-full animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <Link
            href={`/product/${slug}`}
            className={cn(
                "block bg-white px-3 py-4 mob:px-5 mob:py-5 rounded-[25px] transition-colors group overflow-hidden",
                className,
            )}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="w-full min-h-50 mob:min-h-[264px] relative flex justify-center mb-6">
                <Image
                    src={image}
                    alt={name}
                    width={1000}
                    height={1000}
                    quality={100}
                    className="h-auto w-[70%] group-hover:scale-105 transition duration-300 ease-in-out"
                />

                <AddCartButtonProductCard
                    id={id}
                    isHover={hover}
                    className="absolute top-0 right-0"
                />
            </div>

            <div className="flex items-center justify-between gap-1">
                <p className="text-[18px] mob:text-[24px] leading-none">
                    {name}
                </p>

                <p className="text-[18px] mob:text-[24px]">{price}$</p>
            </div>
        </Link>
    );
};

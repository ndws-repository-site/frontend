"use client";

import { cn } from "@/shared/utils";
import { ProductCardProps } from "../types/product-card.props";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SeeMoreButton from "./see-more-button";

export const ProductCard = ({
    name,
    image,
    slug,
    loading = false,
    className,
}: ProductCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
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
                "block bg-white px-3.5 pt-3.5 rounded-[25px] transition-colors group overflow-hidden",
                className,
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center justify-between mb-6.5">
                <p className="text-black uppercase lg:text-[60px] mob:text-[30px] text-[28px] leading-none min-w-0">
                    {name}
                </p>

                <SeeMoreButton
                    className="min-h-[32px] mob:min-h-[36px] lg:min-h-[48px] shrink-0"
                    forcedHover={isHovered}
                />
            </div>

            <div className="relative w-full flex items-center justify-center">
                <div className="w-[50%] translate-2.5 group-hover:translate-y-0 transition-all duration-300">
                    <Image
                        src={image}
                        alt={name}
                        width={400}
                        height={400}
                        quality={100}
                        className="object-contain object-center w-full h-auto"
                    />
                </div>
            </div>
        </Link>
    );
};

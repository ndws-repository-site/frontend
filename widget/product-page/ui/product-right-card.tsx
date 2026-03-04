"use client";

import { AddCartButton } from "@/features/add-cart-button";
import { ProductRightCardProps } from "../props";
import { TabBlock } from "./tab-block";

export const ProductRightCard = ({
    id,
    name,
    price,
    description,
    forWho,
    howToUse,
    ingredients,
}: ProductRightCardProps) => {
    return (
        <div className="w-full lg:rounded-[30px] rounded-[14px] bg-[#1A1A1A] lg:px-9 lg:py-9 px-3.5 py-4.5">
            <p className="uppercase text-white mob:text-[32px] text-[14px] leading-[110%] mob:mb-9 mb-3 font-light">
                {name}
            </p>

            <div className="flex items-center justify-between mob:mb-7.5 mb-4">
                <p className="text-white mob:text-[72px] text-[34px] leading-none uppercase">
                    {price}$
                </p>

                <AddCartButton id={id} />
            </div>

            <p className="text-white/80 mob:text-[22px] text-[14px] leading-[110%] tracking-[0%] mob:mb-7.5 mb-4">
                {description}
            </p>

            <TabBlock
                forWho={forWho}
                howToUse={howToUse}
                ingredients={ingredients}
            />
        </div>
    );
};

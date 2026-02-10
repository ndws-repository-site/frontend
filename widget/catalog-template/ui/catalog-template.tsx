"use client";

import { RoundedBlock } from "@/shared/ui";
import { CatalogTemplateProps } from "../types/catalog-template.props";
import { Plus } from "lucide-react";
import { ProductCard } from "@/entity/product-card";
import { PRODUCT_MOCK } from "@/shared/config";
import { motion } from "framer-motion";
import { letterVariants } from "../config";

export const CatalogTemplate = ({
    title,
    subtitle,
    description,
    products,
    loading = false
}: CatalogTemplateProps) => {
    const titleLetters = title.split("");

    return (
        <RoundedBlock className="bg-black px-5 pb-5">
            <h1 className="text-white text-[120px] leading-none text-center uppercase pt-18.5 pb-5 overflow-hidden">
                {titleLetters.map((letter, i) => (
                    <motion.span
                        key={i}
                        className="inline-block"
                        variants={letterVariants}
                        initial="hidden"
                        animate="visible"
                        custom={i}
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                ))}
            </h1>

            <div className="flex items-end justify-between mb-5">
                <p className="text-white text-[20px] leading-none">
                    {products.length} product{products.length > 1 ? 's' : ''}
                </p>

                <div className="text-white/60 text-[20px] leading-[110%] text-center max-w-[461px]">
                    <motion.p
                        className="mb-3"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: titleLetters.length * 0.04 + 0.2, duration: 0.5, ease: "easeOut" }}
                    >
                        {subtitle}
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: titleLetters.length * 0.04 + 0.5, duration: 0.5, ease: "easeOut" }}
                    >
                        {description}
                    </motion.p>
                </div>

                <button className="text-white uppercase text-[20px] leading-none flex items-center gap-1 cursor-pointer">
                    filter
                    <Plus />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
                {loading ? (
                    Array.from({ length: 8 }).map((_, index) => (
                        <ProductCard 
                            key={index}
                            {...PRODUCT_MOCK}
                            loading={true}
                        />
                    ))
                ) : (
                    products.map((product, index) => (
                        <ProductCard key={index} {...product} />
                    ))
                )}
            </div>
        </RoundedBlock>
    )
}
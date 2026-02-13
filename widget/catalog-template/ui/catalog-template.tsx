"use client";

//UI
import { RoundedBlock } from "@/shared/ui";
import { ProductCard } from "@/entity/product-card";
import { Filter } from "./filters";

//Config
import { PRODUCT_MOCK } from "@/shared/config";
import { letterVariants } from "../config";

//Types
import type { CatalogTemplateProps } from "../types/catalog-template.props";
import type { IProduct } from "@/shared/types";

//Libraries/Frameworks
import { motion, animate } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export const CatalogTemplate = ({
    title,
    subtitle,
    description,
    products,
    loading = false
}: CatalogTemplateProps) => {
    //=====STATES=====
    //Products
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products);
    const [displayCount, setDisplayCount] = useState(0);
    //Filter
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [selectedForm, setSelectedForm] = useState<string[]>([]);
    const [selectedProductType, setSelectedProductType] = useState<string[]>([]);

    //=====CONSTANTS=====
    const titleLetters = title.split("");
    //Products
    const currentProducts = filteredProducts;
    const productsCount = loading ? products.length : currentProducts.length;
    const prevCountRef = useRef(0);
    const isInitialMount = useRef(true);

    //=====FUNCTIONS=====
    const applyFilters = (
        goals: string[],
        form: string[],
        productType: string[]
    ) => {
        const filtered = products.filter(product => {
            const goalMatch = goals.length === 0 || goals.includes(product.goal);
            const formMatch = form.length === 0 || form.includes(product.form);
            const productTypeMatch = productType.length === 0 || productType.includes(product.productType);
            return goalMatch && formMatch && productTypeMatch;
        });

        setSelectedGoals(goals);
        setSelectedForm(form);
        setSelectedProductType(productType);
        setFilteredProducts(filtered);
    }

    //=====Effects=====
    useEffect(() => {
        const from = isInitialMount.current ? 0 : prevCountRef.current;
        isInitialMount.current = false;

        const controls = animate(from, productsCount, {
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
            onUpdate: (latest) => {
                const rounded = Math.round(latest);
                prevCountRef.current = rounded;
                setDisplayCount(rounded);
            }
        });

        return () => controls.stop();
    }, [productsCount]);

    return (
        <RoundedBlock className="bg-black mob:px-5 px-2.5 pb-5">
            <h1 className="text-white lg:text-[120px] mob:text-[80px] text-[36px] leading-none text-center uppercase pt-18.5 pb-5 overflow-hidden">
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

            {/* Subheadings — на mob отдельно от строки products/filter */}
            <div className="text-white/60 lg:text-[20px] mob:text-[16px] text-[14px] leading-[110%] text-center max-w-[461px] mx-auto mb-5 block lg:hidden">
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

            <div className="grid grid-cols-2 lg:grid-cols-3 items-end mb-5">
                <motion.p
                    className="text-white lg:text-[20px] mob:text-[16px] text-[14px] leading-none tabular-nums justify-self-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                >
                    {displayCount} products
                </motion.p>

                {/* Subheadings — на lg в центре строки */}
                <div className="text-white/60 lg:text-[20px] leading-[110%] text-center max-w-[461px] justify-self-center hidden lg:block">
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

                <div className="justify-self-end">
                    <Filter 
                        selectedGoals={selectedGoals}
                        selectedForm={selectedForm}
                        selectedProductType={selectedProductType}
                        onSave={applyFilters}
                        onReset={() => {
                            setSelectedGoals([]);
                            setSelectedForm([]);
                            setSelectedProductType([]);
                            setFilteredProducts(products);
                        }}
                    />
                </div>
            </div>

            {loading ? (
                <div className="grid mob:grid-cols-2 grid-cols-1 gap-2.5">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <ProductCard 
                            key={index}
                            {...PRODUCT_MOCK}
                            loading={true}
                        />
                    ))}
                </div>
            ) : (
                <>
                    {currentProducts.length === 0 ? (
                        <div className="text-white text-2xl text-center w-full py-20">
                            No products found
                        </div>
                    ) : (
                        <div className="grid mob:grid-cols-2 grid-cols-1 gap-2.5">
                            {currentProducts.map((product, index) => (
                                <ProductCard key={index} {...product} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </RoundedBlock>
    )
}
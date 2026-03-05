"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/ui";
import { Blocks, LogotypeIcon, MenuBlock } from "@/shared/icons";
import { MENU_ITEMS, PRODUCT_ITEMS_MOCK, DROPDOWN_ANIMATION } from "../config";

import Link from "next/link";
import { MenuItem } from "./menu-item";
import { MenuItemType } from "../types";

const TABS_ANIMATION_DURATION_MS = 300;

export const Header = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const isAnimatingRef = useRef(false);
    const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 500px)");
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        return () => {
            if (animationTimeoutRef.current)
                clearTimeout(animationTimeoutRef.current);
        };
    }, []);

    const handleMenuProductsClick = (type: MenuItemType) => {
        if (isAnimatingRef.current) return;

        isAnimatingRef.current = true;
        if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
        }
        animationTimeoutRef.current = setTimeout(() => {
            isAnimatingRef.current = false;
            animationTimeoutRef.current = null;
        }, TABS_ANIMATION_DURATION_MS);

        if (type === "menu") {
            setIsMenuOpen(!isMenuOpen);
            setIsProductsOpen(false);
            return;
        }

        setIsMenuOpen(false);
        setIsProductsOpen(!isProductsOpen);
    };

    const buttonSize = isMobile ? "small" : "medium";

    const collapsedFlex = 0.001;
    const productsFlex = isProductsOpen ? 1 : isMenuOpen ? collapsedFlex : 0.5;
    const menuFlex = isMenuOpen ? 1 : isProductsOpen ? collapsedFlex : 0.5;

    return (
        <header className="fixed top-0 left-0 w-full px-5 pt-5 flex items-center justify-between gap-3 z-50">
            <Link
                href="/"
                className="bg-white rounded-full py-3 px-7 cursor-pointer block max-[500px]:py-1.5 max-[500px]:px-3 shrink-0"
            >
                <LogotypeIcon className="max-[500px]:w-[77.25px] max-[500px]:h-[19.5px]" />
            </Link>

            <div className="bg-white flex items-center gap-1 rounded-full p-0.5 relative min-w-0">
                <motion.div
                    className="min-w-0 overflow-hidden flex"
                    animate={{
                        flexGrow: productsFlex,
                        opacity: productsFlex <= collapsedFlex ? 0 : 1,
                        marginRight: menuFlex <= collapsedFlex ? -4 : 0,
                        minWidth: isMobile && !isMenuOpen ? "7rem" : "0px",
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ flexBasis: 0, flexShrink: 1 }}
                >
                    <Button
                        icon={<Blocks />}
                        iconPosition="left"
                        variant="primary"
                        size={buttonSize}
                        compact={isMobile}
                        onClick={() => handleMenuProductsClick("products")}
                        className="w-full min-w-0 rounded-full"
                    >
                        Products
                    </Button>
                </motion.div>

                <motion.div
                    className="min-w-0 overflow-hidden flex"
                    animate={{
                        flexGrow: menuFlex,
                        opacity: menuFlex <= collapsedFlex ? 0 : 1,
                        marginLeft: productsFlex <= collapsedFlex ? -4 : 0,
                        minWidth:
                            isMobile && !isProductsOpen ? "4.5rem" : "0px",
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ flexBasis: 0, flexShrink: 1 }}
                >
                    <Button
                        icon={<MenuBlock />}
                        iconPosition="left"
                        variant="outline"
                        size={buttonSize}
                        compact={isMobile}
                        onClick={() => handleMenuProductsClick("menu")}
                        className="w-full min-w-0 rounded-full"
                    >
                        Menu
                    </Button>
                </motion.div>

                <div className="absolute top-12 right-0 left-0 overflow-hidden">
                    <AnimatePresence mode="wait">
                        {isMenuOpen && (
                            <motion.div
                                key="menu-dropdown"
                                className="grid grid-cols-1 gap-1"
                                initial={DROPDOWN_ANIMATION.initial}
                                animate={DROPDOWN_ANIMATION.animate}
                                exit={DROPDOWN_ANIMATION.exit}
                                transition={DROPDOWN_ANIMATION.transition}
                            >
                                {MENU_ITEMS.map((item, index) => (
                                    <MenuItem
                                        key={item.href}
                                        {...item}
                                        number={`${index + 1}`}
                                        type="menu"
                                        onClick={() => setIsMenuOpen(false)}
                                    />
                                ))}
                                <MenuItem
                                    title="Order"
                                    number="4"
                                    type="menu"
                                    cart="12"
                                    onClick={() => setIsMenuOpen(false)}
                                />
                            </motion.div>
                        )}
                        {isProductsOpen && (
                            <motion.div
                                key="products-dropdown"
                                className="grid grid-cols-1 gap-1"
                                initial={DROPDOWN_ANIMATION.initial}
                                animate={DROPDOWN_ANIMATION.animate}
                                exit={DROPDOWN_ANIMATION.exit}
                                transition={DROPDOWN_ANIMATION.transition}
                            >
                                {PRODUCT_ITEMS_MOCK.map((item, index) => (
                                    <MenuItem
                                        key={item.href}
                                        {...item}
                                        number={`${index + 1}`}
                                        type="products"
                                        onClick={() => setIsProductsOpen(false)}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/ui";
import { CartBag, LogotypeIcon, MenuBlock } from "@/shared/icons";
import { MENU_ITEMS, DROPDOWN_ANIMATION } from "../config";

import Link from "next/link";
import { MenuItem } from "./menu-item";
import { MenuItemType } from "../types";
import { useModal } from "@/shared/hooks";
import { Cart } from "@/widget/cart";
import { Checkout } from "@/widget/checkout";

const TABS_ANIMATION_DURATION_MS = 300;

export const Header = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const isAnimatingRef = useRef(false);
    const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );

    const { Modal: CartModal, open } = useModal({
        mode: "half",
        children: ({ close }) => (
            <Cart
                onClose={close}
                onOrderNow={() => {
                    close();
                    openCheckoutModal();
                }}
            />
        ),
        className: "mob:py-5 mob:px-5 py-3.5 px-3.5",
    });
    const { Modal: CheckoutModal, open: openCheckoutModal } = useModal({
        mode: "full",
        children: ({ close }) => <Checkout onClose={close} />,
        className: "mob:py-5 mob:px-5 py-3.5 px-3.5",
    });

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
    const cartFlex = isMenuOpen ? collapsedFlex : 0.5;
    const menuFlex = isMenuOpen ? 1 : 0.5;

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
                        flexGrow: cartFlex,
                        opacity: cartFlex <= collapsedFlex ? 0 : 1,
                        marginRight: menuFlex <= collapsedFlex ? -4 : 0,
                        minWidth: isMobile && !isMenuOpen ? "7rem" : "0px",
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ flexBasis: 0, flexShrink: 1 }}
                >
                    <Button
                        icon={
                            <span className="relative flex h-full w-full items-center justify-center">
                                <CartBag className="shrink-0 [&_path]:!fill-none [&_path]:stroke-black" />
                                <span
                                    className="absolute -right-1 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-medium leading-none text-white"
                                    aria-hidden
                                >
                                    4
                                </span>
                            </span>
                        }
                        iconPosition="left"
                        size={buttonSize}
                        compact={isMobile}
                        onClick={() => open()}
                        variant="primary"
                        className="w-full min-w-0 rounded-full"
                    >
                        Cart
                    </Button>
                </motion.div>

                <motion.div
                    className="min-w-0 overflow-hidden flex"
                    animate={{
                        flexGrow: menuFlex,
                        opacity: menuFlex <= collapsedFlex ? 0 : 1,
                        marginLeft: cartFlex <= collapsedFlex ? -4 : 0,
                        minWidth: isMobile && !isMenuOpen ? "4.5rem" : "0px",
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
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <CartModal />
            <CheckoutModal />
        </header>
    );
};

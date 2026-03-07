"use client";

import { CART_ITEMS_MOCK } from "@/shared/config";
import { CheckoutProps } from "../props/checkout.props";
import { X } from "lucide-react";
import { CartItem } from "@/entity/cart-item";
import { useScrollBottomGradient } from "../lib/use-scroll-bottom-gradient";
import { CheckoutForm } from "@/features/checkout-form";

export const Checkout = ({ onClose }: CheckoutProps) => {
    const { scrollRef, showBottomGradient, onScroll } =
        useScrollBottomGradient();

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <p className="text-black text-[40px] leading-none">
                    Your order
                </p>

                <button className="cursor-pointer" onClick={onClose}>
                    <X className="w-6.5 h-6.5" />
                </button>
            </div>

            <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-6">
                <div className="hidden lg:block relative">
                    <div
                        ref={scrollRef}
                        className="custom-scrollbar pr-3 max-h-[calc(100vh-150px)] overflow-y-auto grid grid-cols-1"
                        onScroll={onScroll}
                    >
                        {CART_ITEMS_MOCK.map((item, index) => (
                            <CartItem
                                key={index}
                                {...item}
                                className="py-4 border-b border-black/22"
                            />
                        ))}
                    </div>

                    <div
                        aria-hidden
                        className="pointer-events-none absolute bottom-0 left-0 right-3 h-[80px] transition-opacity duration-300 ease-out"
                        style={{
                            opacity: showBottomGradient ? 1 : 0,
                            background:
                                "linear-gradient(to top, #ffffff 0%, transparent 100%)",
                        }}
                    />
                </div>

                <CheckoutForm productTotal={40} />
            </div>
        </div>
    );
};

"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ALEXANDRIA_FONT } from "@/shared/config";
import { cn } from "@/shared/utils";

const CheckIcon = () => (
    <svg
        width="28"
        height="21"
        viewBox="0 0 11 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
    >
        <path
            d="M3.6796 6.10547L9.57634 0.208734C9.71549 0.0695781 9.87784 0 10.0634 0C10.2489 0 10.4113 0.0695781 10.5504 0.208734C10.6896 0.34789 10.7592 0.513254 10.7592 0.704825C10.7592 0.896396 10.6896 1.06153 10.5504 1.20022L4.16665 7.60139C4.02749 7.74055 3.86515 7.81013 3.6796 7.81013C3.49406 7.81013 3.33171 7.74055 3.19256 7.60139L0.200706 4.60954C0.0615498 4.47039 -0.00524511 4.30525 0.000321129 4.11415C0.00588737 3.92304 0.0784802 3.75767 0.2181 3.61805C0.35772 3.47844 0.523084 3.40886 0.714191 3.40932C0.905299 3.40978 1.07043 3.47936 1.20959 3.61805L3.6796 6.10547Z"
            fill="white"
        />
    </svg>
);

function OrderSuccessModalContent() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const orderSuccess = searchParams.get("order_success") === "true";
    const shouldShowFromUrl = pathname === "/" && orderSuccess;
    const [closedWhileVisible, setClosedWhileVisible] = useState(false);
    const [prevShouldShowFromUrl, setPrevShouldShowFromUrl] =
        useState(shouldShowFromUrl);

    if (shouldShowFromUrl !== prevShouldShowFromUrl) {
        setPrevShouldShowFromUrl(shouldShowFromUrl);
        if (shouldShowFromUrl) {
            setClosedWhileVisible(false);
        }
    }

    const isOpen = shouldShowFromUrl && !closedWhileVisible;

    useEffect(() => {
        if (!isOpen) return;

        const scrollY = window.scrollY;
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";

        return () => {
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            window.scrollTo(0, scrollY);
        };
    }, [isOpen]);

    const close = useCallback(() => {
        setClosedWhileVisible(true);

        const params = new URLSearchParams(searchParams.toString());
        params.delete("order_success");
        const query = params.toString();

        router.replace(query ? `${pathname}?${query}` : pathname);
    }, [pathname, router, searchParams]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") close();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, close]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/70"
                        onClick={close}
                        aria-hidden
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                        }}
                        className={cn(
                            "relative w-full max-w-[420px] rounded-[30px] bg-primary px-8 py-10 text-center shadow-2xl",
                            ALEXANDRIA_FONT.className,
                        )}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="order-success-title"
                    >
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#00A52F]">
                            <CheckIcon />
                        </div>

                        <h2
                            id="order-success-title"
                            className="mb-3 text-[32px] font-medium leading-tight text-white"
                        >
                            Thanks!
                        </h2>

                        <p className="mb-8 text-[18px] leading-snug text-white/90">
                            Your order has been successfully completed
                        </p>

                        <button
                            type="button"
                            onClick={close}
                            className="w-full rounded-full bg-white px-6 py-4 text-[16px] font-medium text-primary transition-colors hover:bg-white/90 cursor-pointer"
                        >
                            Continue shopping
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export const OrderSuccessModal = () => (
    <Suspense fallback={null}>
        <OrderSuccessModalContent />
    </Suspense>
);

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "../store/use-toast";
import { useEffect } from "react";

export const Toast = () => {
    const { active, title, hideToast } = useToast();

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (active) {
            timer = setTimeout(() => {
                hideToast();
            }, 5000);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [active, hideToast]);

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="px-6 py-2.5 bg-[#1A1A1A] border border-white/10 flex items-center gap-3 lg:min-w-[500px] w-[96%] lg:w-auto fixed bottom-4 left-0 right-0 mx-auto lg:left-auto lg:right-4 lg:mx-0 rounded-full z-50 shadow-xl"
                >
                    <div className="w-6 h-6 shrink-0 bg-[#00A52F] rounded-full flex items-center justify-center">
                        <svg
                            width="11"
                            height="8"
                            viewBox="0 0 11 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M3.6796 6.10547L9.57634 0.208734C9.71549 0.0695781 9.87784 0 10.0634 0C10.2489 0 10.4113 0.0695781 10.5504 0.208734C10.6896 0.34789 10.7592 0.513254 10.7592 0.704825C10.7592 0.896396 10.6896 1.06153 10.5504 1.20022L4.16665 7.60139C4.02749 7.74055 3.86515 7.81013 3.6796 7.81013C3.49406 7.81013 3.33171 7.74055 3.19256 7.60139L0.200706 4.60954C0.0615498 4.47039 -0.00524511 4.30525 0.000321129 4.11415C0.00588737 3.92304 0.0784802 3.75767 0.2181 3.61805C0.35772 3.47844 0.523084 3.40886 0.714191 3.40932C0.905299 3.40978 1.07043 3.47936 1.20959 3.61805L3.6796 6.10547Z"
                                fill="white"
                            />
                        </svg>
                    </div>

                    <p className="text-white text-[20px]">{title}</p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

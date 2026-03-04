"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FaqItemProps } from "../props";

export const FaqItem = ({ question, answer }: FaqItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="p-6.5 bg-white/10 border border-white/20 rounded-[30px] cursor-pointer transition-colors hover:bg-white/15"
            onClick={() => setIsOpen((prev) => !prev)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsOpen((prev) => !prev);
                }
            }}
            aria-expanded={isOpen}
        >
            <div className="flex items-center justify-between gap-3">
                <p className="text-white text-[20px] leading-none">
                    {question}
                </p>

                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="shrink-0"
                >
                    <ChevronDown className="w-6 h-6 text-white" />
                </motion.span>
            </div>

            <motion.div
                initial={false}
                animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                className="overflow-hidden"
            >
                <p className="text-white/60 text-[18px] leading-[110%] tracking-none pt-3.5">
                    {answer}
                </p>
            </motion.div>
        </div>
    );
};

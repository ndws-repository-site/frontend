"use client";

import { motion } from "framer-motion";
import { getTabSlideVariants } from "../config";

type TabContentSlideProps = {
    direction: number;
    children: React.ReactNode;
    className?: string;
};

export const TabContentSlide = ({
    direction,
    children,
    className,
}: TabContentSlideProps) => {
    const variants = getTabSlideVariants(direction);

    return (
        <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={className}
        >
            {children}
        </motion.div>
    );
};

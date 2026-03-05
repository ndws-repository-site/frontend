"use client";

import { motion } from "framer-motion";
import { getTabSlideVariants } from "../config";

type TabContentSlideProps = {
    direction: number;
    children: React.ReactNode;
    className?: string;
};

/** GPU-слой для iOS: отдельный слой композитинга, меньше лагов */
const iosFriendlyStyle: React.CSSProperties = {
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
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
            style={iosFriendlyStyle}
        >
            {children}
        </motion.div>
    );
};

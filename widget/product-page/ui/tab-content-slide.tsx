"use client";

import { motion } from "framer-motion";
import { TAB_FADE_VARIANTS } from "../config/tab-slide-animation";

type TabContentSlideProps = {
    children: React.ReactNode;
    className?: string;
};

/** GPU-слой для iOS: отдельный слой композитинга, меньше лагов при анимации */
const iosFriendlyStyle: React.CSSProperties = {
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
};

export const TabContentSlide = ({
    children,
    className,
}: TabContentSlideProps) => (
    <motion.div
        variants={TAB_FADE_VARIANTS}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
        style={iosFriendlyStyle}
    >
        {children}
    </motion.div>
);

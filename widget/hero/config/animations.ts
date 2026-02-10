import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
};

export const stagger: Variants = {
    animate: {
        transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
};

/** Параметры анимации для одной фоновой баночки */
export type BackgroundJarMotion = {
    y: number[];
    x?: number[];
    rotate: number[];
    duration: number;
    delay: number;
};

/** Параметры анимации появления фоновых баночек */
export const backgroundJarEntrance = {
    initial: { opacity: 0, scale: 0.75 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    /** Задержка между появлением каждой баночки (сек) */
    staggerDelay: 0.09,
};

/** Наборы анимаций для фоновых баночек (плавное парение + лёгкое вращение) */
export const backgroundJarMotions: BackgroundJarMotion[] = [
    { y: [0, -18, 0], x: [0, 6, 0], rotate: [0, 5, -3, 0], duration: 4.2, delay: 0 },
    { y: [0, 12, -8, 0], rotate: [0, -6, 4, 0], duration: 5.0, delay: 0.3 },
    { y: [0, -14, 0], x: [0, -5, 0], rotate: [0, -4, 6, 0], duration: 4.6, delay: 0.6 },
    { y: [0, 10, 0], rotate: [0, 3, -5, 0], duration: 5.2, delay: 0.2 },
    { y: [0, -16, 8, 0], rotate: [0, 7, -2, 0], duration: 4.8, delay: 0.5 },
    { y: [0, 8, -12, 0], x: [0, 4, 0], rotate: [0, -5, 5, 0], duration: 5.4, delay: 0.4 },
];
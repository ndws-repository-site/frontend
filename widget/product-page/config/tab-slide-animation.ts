/** Параметры перехода для fade-in. easeOut — меньше нагрузка на iOS */
export const TAB_FADE_TRANSITION = {
    duration: 0.2,
    ease: "easeOut" as const,
} as const;

/** Варианты fade-in: появление и исчезновение по opacity. z: 0 — GPU-слой на iOS */
export const TAB_FADE_VARIANTS = {
    initial: { opacity: 0, z: 0 },
    animate: { opacity: 1, z: 0, transition: TAB_FADE_TRANSITION },
    exit: { opacity: 0, z: 0, transition: TAB_FADE_TRANSITION },
} as const;

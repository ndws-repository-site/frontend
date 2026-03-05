/** Параметры перехода для свайп-анимации контента табов (easeOut — меньше нагрузка на iOS) */
export const TAB_SLIDE_TRANSITION = {
    duration: 0.25,
    ease: "easeOut" as const,
} as const;

export type TabSlideDirection = 1 | -1;

/** Варианты анимации: вход/выход по горизонтали (слева-направо как свайпер). z: 0 — GPU-слой на iOS */
export const getTabSlideVariants = (direction: number) => ({
    initial: {
        x: direction > 0 ? "100%" : "-100%",
        z: 0,
    },
    animate: {
        x: 0,
        z: 0,
        transition: TAB_SLIDE_TRANSITION,
    },
    exit: {
        x: direction > 0 ? "-100%" : "100%",
        z: 0,
        transition: TAB_SLIDE_TRANSITION,
    },
});

/** Параметры перехода для свайп-анимации контента табов */
export const TAB_SLIDE_TRANSITION = {
    duration: 0.3,
    ease: [0.32, 0.72, 0, 1] as const,
} as const;

export type TabSlideDirection = 1 | -1;

/** Варианты анимации: вход/выход по горизонтали (слева-направо как свайпер) */
export const getTabSlideVariants = (direction: number) => ({
    initial: {
        x: direction > 0 ? "100%" : "-100%",
    },
    animate: {
        x: 0,
        transition: TAB_SLIDE_TRANSITION,
    },
    exit: {
        x: direction > 0 ? "-100%" : "100%",
        transition: TAB_SLIDE_TRANSITION,
    },
});

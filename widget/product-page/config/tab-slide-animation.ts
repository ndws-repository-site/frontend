/** Параметры перехода: старый контент уходит влево, новый всегда приходит справа. easeOut — меньше нагрузка на iOS */
export const TAB_SLIDE_TRANSITION = {
    duration: 0.25,
    ease: "easeOut" as const,
} as const;

/** Фиксированные варианты: выход влево, вход справа. z: 0 — GPU-слой на iOS */
export const TAB_SLIDE_VARIANTS = {
    initial: { x: "100%", z: 0 },
    animate: { x: 0, z: 0, transition: TAB_SLIDE_TRANSITION },
    exit: { x: "-100%", z: 0, transition: TAB_SLIDE_TRANSITION },
} as const;

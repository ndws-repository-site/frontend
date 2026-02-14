import type { Variants } from "framer-motion";

/** Появление строк заголовка: снизу вверх с проявлением */
export const headlineLine: Variants = {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
};

/** Задержка между появлением строк (сек) */
export const HEADLINE_STEP_DELAY = 0.5;

/** Появление кнопки (вместе с последней строкой) */
export const ctaButton: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

/** Параметры idle-анимации для одной фоновой картинки */
export type StartTodayIdleMotion = {
    y: number[];
    x?: number[];
    /** Смещение поворота в градусах (добавляется к базовому rotate из конфига) */
    rotate: number[];
    duration: number;
    delay: number;
};

/** Наборы idle-анимаций для фоновых банок (лёгкое парение + покачивание) */
export const startTodayIdleMotions: StartTodayIdleMotion[] = [
    {
        y: [0, -12, 0],
        x: [0, 4, 0],
        rotate: [0, 4, -2, 0],
        duration: 4.5,
        delay: 0,
    },
    { y: [0, 10, -6, 0], rotate: [0, -5, 3, 0], duration: 5.2, delay: 0.4 },
    {
        y: [0, -14, 0],
        x: [0, -4, 0],
        rotate: [0, -3, 5, 0],
        duration: 4.8,
        delay: 0.2,
    },
    { y: [0, 8, 0], rotate: [0, 2, -4, 0], duration: 5.0, delay: 0.6 },
    { y: [0, -10, 6, 0], rotate: [0, 6, -2, 0], duration: 4.6, delay: 0.3 },
    {
        y: [0, 6, -10, 0],
        x: [0, 3, 0],
        rotate: [0, -4, 4, 0],
        duration: 5.4,
        delay: 0.5,
    },
    {
        y: [0, -8, 0],
        x: [0, -3, 0],
        rotate: [0, 3, -3, 0],
        duration: 4.4,
        delay: 0.1,
    },
    { y: [0, 12, -8, 0], rotate: [0, -2, 5, 0], duration: 5.1, delay: 0.7 },
];

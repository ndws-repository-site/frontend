/** Длительность появления marquee (сек) */
export const SLIDE_IN_DURATION = 0.9;
/** Длительность появления изображения (сек) */
export const IMAGE_SLIDE_IN_DURATION = 0.8;
/** Задержка старта анимации изображения (сек) */
export const IMAGE_SLIDE_IN_DELAY = 0.2;

/** Кривая появления: плавное замедление в конце, без отскока */
export const EASE_APPEAR = [0.22, 1, 0.36, 1] as const;
/** Начальный scale marquee (лёгкий zoom-in) */
export const SLIDE_IN_SCALE = 0.96;
/** Начальный scale изображения */
export const IMAGE_SLIDE_IN_SCALE = 0.92;

/** Idle-анимация изображения (лёгкое парение) */
export const IMAGE_IDLE_ANIMATION = {
    animate: { y: [0, -10, 0] },
    transition: {
        duration: 2.8,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay: 1, // после завершения появления
    },
};

/** Скорость прокрутки marquee */
export const MARQUEE_SPEED = 40;
/** Размер шрифта фонового текста */
export const MARQUEE_FONT_SIZE = "clamp(4rem, 12vw, 10rem)";

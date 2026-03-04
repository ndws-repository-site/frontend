/** Idle-анимация изображения (лёгкое парение вверх-вниз) */
export const IMAGE_IDLE_ANIMATION = {
    animate: { y: [0, -10, 0] },
    transition: {
        duration: 2.8,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay: 1,
    },
};

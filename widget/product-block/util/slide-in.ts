import {
    SLIDE_IN_DURATION,
    IMAGE_SLIDE_IN_DURATION,
    IMAGE_SLIDE_IN_DELAY,
    EASE_APPEAR,
    SLIDE_IN_SCALE,
    IMAGE_SLIDE_IN_SCALE,
} from "../config";

export function getSlideIn(left: boolean) {
    const fromX = left ? "100%" : "-100%";
    return {
        initial: {
            opacity: 0,
            x: fromX,
            scale: SLIDE_IN_SCALE,
        },
        animate: {
            opacity: 1,
            x: 0,
            scale: 1,
        },
        transition: { duration: SLIDE_IN_DURATION, ease: EASE_APPEAR },
    };
}

export function getImageSlideIn(left: boolean) {
    const fromX = left ? "100%" : "-100%";
    return {
        initial: {
            opacity: 0,
            x: fromX,
            scale: IMAGE_SLIDE_IN_SCALE,
        },
        animate: {
            opacity: 1,
            x: 0,
            scale: 1,
        },
        transition: {
            duration: IMAGE_SLIDE_IN_DURATION,
            ease: EASE_APPEAR,
            delay: IMAGE_SLIDE_IN_DELAY,
        },
    };
}

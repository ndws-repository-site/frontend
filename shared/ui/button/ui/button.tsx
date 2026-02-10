"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/shared/utils";
import { buttonVariantStyles } from "../config/button.config";
import type { ButtonProps } from "../types/button.props";
import { ALEXANDRIA_FONT } from "@/shared/config";

// Ширина круга (86% от высоты кнопки): small 36px→31, medium 40px→34.4, large 48px→41.3
const CIRCLE_WIDTH_BY_SIZE = {
    small: 31,
    medium: 34.4,
    large: 41.3,
} as const;

export const Button = ({
    children,
    icon,
    iconPosition = "left",
    size = "medium",
    variant = "secondary",
    className,
    ...rest
}: ButtonProps) => {
    const isIconLeft = iconPosition === "left";
    const styles = buttonVariantStyles[variant];
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [circleRightLeftPx, setCircleRightLeftPx] = useState<number | null>(
        null
    );

    const containerClasses = cn(
        "group relative inline-flex w-fit items-center justify-center min-h-[40px] rounded-full overflow-hidden select-none isolate",
        "cursor-pointer",
        "disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none",
        styles.container,
        size === "small" && "min-h-[36px]",
        size === "large" && "min-h-[48px]",
        ALEXANDRIA_FONT.className,
        className
    );

    // 3px от краёв = как по Y (h-[86%] → 7% сверху/снизу). Анимация доезжает до края.
    const circlePadding = 3;
    const circleWidthPx = CIRCLE_WIDTH_BY_SIZE[size ?? "medium"];
    const circleWidthRem = `${circleWidthPx / 16}rem`;
    const circleLeftEndCalc = `calc(100% - ${circlePadding}px - ${circleWidthRem})`;
    const circleLeftEnd =
        !isIconLeft && circleRightLeftPx != null
            ? `${circleRightLeftPx}px`
            : circleLeftEndCalc;
    const circleLeftStart = `${circlePadding}px`;
    const circleInitial = isIconLeft
        ? { left: circleLeftStart, rotate: 0 }
        : { left: circleLeftEnd, rotate: 0 };
    const circleHover = isIconLeft
        ? { left: circleLeftEndCalc, rotate: 360 }
        : { left: circleLeftStart, rotate: -360 };

    useLayoutEffect(() => {
        if (isIconLeft) return;
        const el = buttonRef.current;
        if (!el) return;
        const width = el.offsetWidth;
        setCircleRightLeftPx(width - circlePadding - circleWidthPx);
    }, [isIconLeft, circlePadding, circleWidthPx]);

    // Иконка компенсирует вращение круга, чтобы не крутилась
    const iconRotation = isIconLeft ? -360 : 360;

    return (
        <motion.button
            ref={buttonRef}
            className={containerClasses}
            initial="initial"
            animate="initial"
            whileHover="hover"
            variants={{ initial: {}, hover: {} }}
            {...(rest as HTMLMotionProps<"button">)}
        >
            <div className="invisible flex items-center pl-5 pr-14 whitespace-nowrap font-medium text-[16px]">
                {children}
            </div>

            <motion.div
                className="absolute left-5 z-10 flex items-center pointer-events-none"
                variants={{
                    initial: {
                        opacity: isIconLeft ? 0 : 1,
                        x: isIconLeft ? -10 : 0,
                    },
                    hover: {
                        opacity: isIconLeft ? 1 : 0,
                        x: isIconLeft ? 0 : -10,
                    },
                }}
                transition={{ duration: 0.3 }}
            >
                <span className="text-inherit font-medium text-[16px] whitespace-nowrap">
                    {children}
                </span>
            </motion.div>

            <motion.div
                className="absolute right-5 z-10 flex items-center justify-end pointer-events-none"
                variants={{
                    initial: {
                        opacity: isIconLeft ? 1 : 0,
                        x: isIconLeft ? 0 : 10,
                    },
                    hover: {
                        opacity: isIconLeft ? 0 : 1,
                        x: isIconLeft ? 10 : 0,
                    },
                }}
                transition={{ duration: 0.3 }}
            >
                <span className="text-inherit font-medium text-[16px] whitespace-nowrap">
                    {children}
                </span>
            </motion.div>

            <motion.div
                className={cn(
                    "absolute top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full aspect-square h-[86%]",
                    isIconLeft && "left-[3px]",
                    styles.circle
                )}
                style={
                    isIconLeft
                        ? undefined
                        : { left: circleLeftEnd }
                }
                initial={circleInitial}
                variants={{
                    initial: circleInitial,
                    hover: circleHover,
                }}
                transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 20,
                    mass: 1,
                }}
            >
                <motion.div
                    className="flex items-center justify-center w-full h-full [&_svg]:shrink-0 [&_svg]:block"
                    style={{
                        transformOrigin: "50% 50%",
                        backfaceVisibility: "hidden" as const,
                    }}
                    variants={{
                        initial: { rotate: 0 },
                        hover: { rotate: iconRotation },
                    }}
                    transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                    }}
                >
                    {icon}
                </motion.div>
            </motion.div>
        </motion.button>
    );
};

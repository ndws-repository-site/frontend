"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/shared/utils";
import { ALEXANDRIA_FONT } from "@/shared/config";
import { Blocks } from "@/shared/icons";

const EDGE_LEFT = 8;
const EDGE_RIGHT_DESKTOP = 12;
const CIRCLE_SIZE = 32;
const TEXT_OFFSET = EDGE_LEFT + CIRCLE_SIZE + 12;

const SeeMoreButton = ({
    href,
    className,
}: {
    href: string;
    className?: string;
}) => {
    const wrapRef = useRef<HTMLSpanElement>(null);
    const [hoverX, setHoverX] = useState(0);

    useLayoutEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const w = el.offsetWidth;
        setHoverX(-(w - EDGE_RIGHT_DESKTOP - CIRCLE_SIZE - EDGE_LEFT));
    }, []);

    return (
        <Link href={href} className={cn("block shrink-0", className)}>
            <motion.span
                ref={wrapRef}
                className={cn(
                    "group relative flex min-h-[32px] mob:min-h-[36px] lg:min-h-[48px] min-w-[140px] items-center rounded-full bg-primary overflow-hidden pl-2 pr-3",
                    ALEXANDRIA_FONT.className,
                )}
                initial="initial"
                whileHover="hover"
            >
                <motion.span
                    className="absolute inset-y-0 left-2 flex items-center text-[14px] font-medium text-white"
                    style={{ right: TEXT_OFFSET }}
                    variants={{
                        initial: { opacity: 1 },
                        hover: { opacity: 0 },
                    }}
                    transition={{ duration: 0.45 }}
                >
                    <span className="whitespace-nowrap pl-3">See more</span>
                </motion.span>
                <motion.span
                    className="absolute inset-y-0 right-2 flex items-center text-[14px] font-medium text-white"
                    style={{ left: TEXT_OFFSET }}
                    variants={{
                        initial: { opacity: 0 },
                        hover: { opacity: 1 },
                    }}
                    transition={{ duration: 0.65 }}
                >
                    <span className="whitespace-nowrap">See more</span>
                </motion.span>
                {/* Круг привязан к правому краю (right), движение влево через translateX. На мобиле меньше круг и отступ справа — иконка не касается краёв и не уезжает влево. */}
                <motion.span
                    className="absolute top-1/2 z-10 flex h-[28px] w-[28px] mob:h-[32px] mob:w-[32px] -translate-y-1/2 items-center justify-center rounded-full bg-white right-0.5 mob:right-0.5 lg:right-3 [&_svg_*]:fill-black"
                    variants={{
                        initial: { x: 0, rotate: 0 },
                        hover: { x: hoverX, rotate: -360 },
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 80,
                        damping: 18,
                        mass: 1.2,
                    }}
                >
                    <motion.span
                        className="flex h-full w-full items-center justify-center [&_svg]:block [&_svg]:shrink-0"
                        style={{ transformOrigin: "50% 50%" }}
                        variants={{
                            initial: { rotate: 0 },
                            hover: { rotate: 360 },
                        }}
                        transition={{ duration: 0.55, ease: "easeInOut" }}
                    >
                        <Blocks />
                    </motion.span>
                </motion.span>
            </motion.span>
        </Link>
    );
};

export default SeeMoreButton;

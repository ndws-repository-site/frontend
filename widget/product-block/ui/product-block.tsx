"use client";

import { useRef, useSyncExternalStore } from "react";
import { cn } from "@/shared/utils";
import {
    WHITE_BASIC_CLASS,
    IMAGE_IDLE_ANIMATION,
    MARQUEE_SPEED,
    MARQUEE_FONT_SIZE,
} from "../config";
import { ProductBlockProps } from "../types/prodcut-block.props";
import { formatPage, getSlideIn, getImageSlideIn } from "../util";
import { ALEXANDRIA_FONT } from "@/shared/config";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { ButtonMenu } from "@/shared/icons";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { motion, useInView } from "framer-motion";

export const ProductBlock = ({
    tag,
    title,
    subtitle,
    page,
    maxPage,
    product,
    productImage,
    left,
    color,
    icon: Icon,
    link
}: ProductBlockProps) => {
    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0.6, once: true });
    const showMarquee = useSyncExternalStore(
        (cb) => {
            const mq = window.matchMedia("(min-width: 501px)");
            mq.addEventListener("change", cb);
            return () => mq.removeEventListener("change", cb);
        },
        () => window.matchMedia("(min-width: 501px)").matches,
        () => false
    );

    const backgroundLabel = product.toUpperCase();
    const slideIn = getSlideIn(left);
    const imageSlideIn = getImageSlideIn(left);

    return (
        <section
            ref={ref}
            className="rounded-[30px] overflow-hidden p-2.5 pb mx-2.5 mob:min-h-[810px] min-h-[700px] flex flex-col justify-between relative"
            style={{
                backgroundColor: color,
            }}
        >
            {showMarquee && (
                <motion.div
                    className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center"
                    initial={slideIn.initial}
                    animate={inView ? slideIn.animate : slideIn.initial}
                    transition={slideIn.transition}
                >
                    <Marquee
                    speed={MARQUEE_SPEED}
                    direction={left ? "left" : "right"}
                    gradient={false}
                    className="flex items-center text-white select-none"
                    style={{ fontSize: MARQUEE_FONT_SIZE }}
                >
                    {[1, 2, 3, 4, 5].map((i) => (
                        <span key={i} className="flex items-center gap-4 shrink-0 mx-2">
                            <span className="tracking-tight">{backgroundLabel}</span>
                            <span className="shrink-0 w-[0.4em] h-[0.4em] [&>svg]:w-full [&>svg]:h-full">
                                <Icon />
                            </span>
                        </span>
                    ))}
                    </Marquee>
                </motion.div>
            )}

            <div className="relative z-10">
                <div className={cn("flex items-center justify-between mb-5", ALEXANDRIA_FONT.className)}>
                    <p className={WHITE_BASIC_CLASS}>
                        {tag}
                    </p>

                    <div className={cn(WHITE_BASIC_CLASS, "flex items-center gap-1")}>
                        <p className="text-black">
                            {formatPage(page)}
                        </p>
                        <div className="h-px w-7 bg-black" />
                        <p className="text-black/60">
                            {formatPage(maxPage)}
                        </p>
                    </div>
                </div>

                <div>
                    <p className="lg:text-[30px] mob:text-[24px] text-[16px] lg:font-normal font-light leading-none text-white">
                        {title}
                    </p>
                    <p className="mob:hidden block text-white text-[46px] uppercase">
                        {product}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <p className={cn(ALEXANDRIA_FONT.className, "mob:text-[24px] text-[16px] leading-none text-white pl-3")}>
                    {subtitle}
                </p>

                <Link href={link}>
                    <Button icon={<ButtonMenu />} variant="secondary" size="large" iconPosition="right">
                        See more
                    </Button>
                </Link>
            </div>

            <motion.div
                className="absolute bottom-1/2 translate-y-1/2 w-full"
                initial={imageSlideIn.initial}
                animate={inView ? imageSlideIn.animate : imageSlideIn.initial}
                transition={imageSlideIn.transition}
            >
                <motion.div
                    className="relative"
                    animate={{ y: [...IMAGE_IDLE_ANIMATION.animate.y] }}
                    transition={IMAGE_IDLE_ANIMATION.transition}
                >
                    <Image 
                        sizes="800px"
                        src={productImage}
                        alt={product}
                        width={800}
                        height={800}
                        quality={100}
                        unoptimized={false}
                        priority
                        className="absolute top-1/2 left-1/2 -translate-1/2 select-none"
                    />
                </motion.div>
            </motion.div>
        </section>
    )
}
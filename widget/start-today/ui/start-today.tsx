"use client";

import { Button, RoundedBlock } from "@/shared/ui";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { StartTodayButtonIcon } from "../icon/start-today-button-icon";
import {
    headlineLine,
    ctaButton,
    HEADLINE_STEP_DELAY,
    startTodayIdleMotions,
} from "../config/animations";
import { BACKGROUND_IMAGE_OPACITY, START_TODAY_BACKGROUND_IMAGES } from "../config/background-images";

export const StartToday = () => {
    return (
        <RoundedBlock className="bg-primary p-2.5 relative min-h-[614px] flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none rounded-[30px] overflow-hidden">
                {START_TODAY_BACKGROUND_IMAGES.map((pos, i) => {
                    const motionConfig = startTodayIdleMotions[i % startTodayIdleMotions.length];
                    return (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{
                                left: pos.left,
                                top: pos.top,
                                width: pos.width,
                                opacity: BACKGROUND_IMAGE_OPACITY,
                            }}
                            animate={{
                                y: motionConfig.y,
                                x: motionConfig.x ?? [0, 0, 0],
                                rotate: motionConfig.rotate.map((r) => pos.rotate + r),
                            }}
                            transition={{
                                y: {
                                    duration: motionConfig.duration,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: motionConfig.delay,
                                },
                                x: {
                                    duration: motionConfig.duration,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: motionConfig.delay,
                                },
                                rotate: {
                                    duration: motionConfig.duration,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: motionConfig.delay,
                                },
                            }}
                        >
                            <Image
                                src="/product-block/creatine.png"
                                alt=""
                                width={480}
                                height={524}
                                quality={100}
                                sizes="400px"
                                className="w-full h-auto"
                                aria-hidden
                            />
                        </motion.div>
                    );
                })}
            </div>

            <motion.div
                className="flex flex-col items-center relative z-10"
                initial="initial"
                whileInView="animate"
                viewport={{ amount: 0.7, once: true }}
                variants={{ initial: {}, animate: {} }}
            >
                <motion.h2
                    className="text-white text-[66px] leading-[110%] uppercase text-center mb-7"
                    variants={{ initial: {}, animate: {} }}
                >
                    <motion.span
                        className="block"
                        variants={headlineLine}
                        transition={{
                            duration: 0.55,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0,
                        }}
                    >
                        start today -
                    </motion.span>
                    <span className="block">
                        <motion.span
                            className="inline"
                            variants={headlineLine}
                            transition={{
                                duration: 0.55,
                                ease: [0.22, 1, 0.36, 1],
                                delay: HEADLINE_STEP_DELAY,
                            }}
                        >
                            not tomorrow{" "}
                        </motion.span>
                        <motion.span
                            className="inline"
                            variants={headlineLine}
                            transition={{
                                duration: 0.55,
                                ease: [0.22, 1, 0.36, 1],
                                delay: HEADLINE_STEP_DELAY * 2,
                            }}
                        >
                            not monday
                        </motion.span>
                    </span>
                    <motion.span
                        className="block"
                        variants={headlineLine}
                        transition={{
                            duration: 0.55,
                            ease: [0.22, 1, 0.36, 1],
                            delay: HEADLINE_STEP_DELAY * 3,
                        }}
                    >
                        no day without sport
                    </motion.span>
                </motion.h2>

                <motion.div
                    variants={ctaButton}
                    transition={{
                        duration: 0.5,
                        delay: HEADLINE_STEP_DELAY * 3,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <Link href="/catalog">
                        <Button variant="white" size="large" iconPosition="right" icon={<StartTodayButtonIcon />}>
                            Go to catalog
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>
        </RoundedBlock>
    )
}
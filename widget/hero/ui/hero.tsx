"use client";

import { useRef } from "react";
import { RoundedBlock } from "@/shared/ui";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, stagger, backgroundJarMotions, backgroundJarEntrance } from "../config/animations";
import { BACKGROUND_JARS } from "../config/background-jars";

export const Hero = () => {
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const creatineY = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const creatineOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

    return (
        <RoundedBlock ref={heroRef} className="relative min-h-screen z-0 overflow-hidden">
            <Image
                src="/hero/background.png"
                alt="No Day Without Sport"
                width={1380}
                height={710}
                className="absolute top-0 left-0 -z-20 w-full h-full object-cover rounded-[30px]"
                quality={100}
                priority
                sizes="100vw"
                unoptimized={false}
            />

            <div className="absolute top-0 left-0 w-full h-full bg-black/90 -z-10 rounded-[30px]" />

            <div className="absolute inset-0 pointer-events-none rounded-[30px] overflow-hidden">
                {BACKGROUND_JARS.map((pos, i) => {
                    const motionConfig = backgroundJarMotions[i % backgroundJarMotions.length];
                    return (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{
                                left: pos.left,
                                top: pos.top,
                                width: pos.width,
                                filter: `blur(${pos.blur})`,
                            }}
                            initial={{
                                opacity: backgroundJarEntrance.initial.opacity,
                                scale: backgroundJarEntrance.initial.scale,
                                rotate: pos.rotate,
                            }}
                            animate={{
                                opacity: pos.opacity,
                                scale: backgroundJarEntrance.animate.scale,
                                y: motionConfig.y,
                                x: motionConfig.x ?? [0, 0, 0],
                                rotate: motionConfig.rotate.map((r) => pos.rotate + r),
                            }}
                            transition={{
                                opacity: {
                                    ...backgroundJarEntrance.transition,
                                    delay: i * backgroundJarEntrance.staggerDelay,
                                },
                                scale: {
                                    ...backgroundJarEntrance.transition,
                                    delay: i * backgroundJarEntrance.staggerDelay,
                                },
                                y: {
                                    duration: motionConfig.duration,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: motionConfig.delay + 0.5 + i * backgroundJarEntrance.staggerDelay,
                                },
                                x: {
                                    duration: motionConfig.duration,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: motionConfig.delay + 0.5 + i * backgroundJarEntrance.staggerDelay,
                                },
                                rotate: {
                                    duration: motionConfig.duration,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: motionConfig.delay + 0.5 + i * backgroundJarEntrance.staggerDelay,
                                },
                            }}
                        >
                            <Image
                                src="/hero/creatine.png"
                                alt=""
                                width={120}
                                height={131}
                                className="w-full h-auto"
                                aria-hidden
                            />
                        </motion.div>
                    );
                })}
            </div>

            <motion.div
                className="text-center pt-[30vh]"
                variants={stagger}
                initial="initial"
                animate="animate"
            >
                <motion.h1
                    variants={fadeUp}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-white text-[120px] uppercase leading-none"
                >
                    No Day
                    <br /> Without Sport
                </motion.h1>
            </motion.div>

            <motion.div
                className="absolute z-10 -bottom-[5vh] left-1/2 -translate-x-1/2 w-[48vh] h-auto pointer-events-none"
                style={{ y: creatineY, opacity: creatineOpacity }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full"
                >
                    <motion.div
                        animate={{
                            y: [0, -12, 0],
                        }}
                        transition={{
                            duration: 3.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="w-full"
                    >
                        <Image
                            src="/hero/creatine.png"
                            alt="Creatine"
                            width={516}
                            height={564}
                            quality={100}
                            unoptimized={false}
                            priority
                            sizes="516px"
                            className="w-full h-auto"
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </RoundedBlock>
    );
};
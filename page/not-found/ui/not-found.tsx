"use client";

import { RoundedBlock } from "@/shared/ui";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Logo } from "../icon/logo";

export const NotFoundPage = () => {
    const router = useRouter();
    const reducedMotion = useReducedMotion();

    return (
        <RoundedBlock className="bg-black min-h-screen relative flex items-center justify-center">
            <motion.div
                className="absolute top-0 left-0 z-10"
                initial={{ opacity: 0, y: -12 }}
                animate={
                    reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
                }
                transition={{
                    duration: reducedMotion ? 0 : 0.6,
                    ease: "easeOut",
                }}
            >
                <motion.div
                    animate={reducedMotion ? undefined : { y: [0, 10, 0] }}
                    transition={
                        reducedMotion
                            ? undefined
                            : {
                                  duration: 6,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                              }
                    }
                >
                    <Image
                        src="/not-found/first.png"
                        alt="first"
                        width={1496}
                        height={1496}
                        className="w-auto h-auto"
                    />
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute bottom-0 right-0 z-10"
                initial={{ opacity: 0, y: 12 }}
                animate={
                    reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
                }
                transition={{
                    duration: reducedMotion ? 0 : 0.6,
                    ease: "easeOut",
                    delay: 0.05,
                }}
            >
                <motion.div
                    animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
                    transition={
                        reducedMotion
                            ? undefined
                            : {
                                  duration: 6.5,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                              }
                    }
                >
                    <Image
                        src="/not-found/second.png"
                        alt="second"
                        width={1496}
                        height={1496}
                        className="w-auto h-auto"
                    />
                </motion.div>
            </motion.div>

            <motion.div
                className="flex flex-col items-center gap-12.5 relative z-20"
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={
                    reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
                }
                transition={{
                    duration: reducedMotion ? 0 : 0.7,
                    ease: "easeOut",
                }}
            >
                <div className="flex w-full items-center justify-center gap-10 max-lg:gap-4">
                    <motion.p
                        className="text-[150px] lg:text-[320px] text-white"
                        initial={
                            reducedMotion ? undefined : { opacity: 0, y: 10 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: reducedMotion ? 0 : 0.55,
                            ease: "easeOut",
                        }}
                    >
                        4
                    </motion.p>

                    <div className="shrink-0 max-lg:flex-1 max-lg:shrink">
                        <Logo className="max-lg:w-full max-lg:h-auto" />
                    </div>

                    <motion.p
                        className="text-[150px] lg:text-[320px] text-white "
                        initial={
                            reducedMotion ? undefined : { opacity: 0, y: 10 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: reducedMotion ? 0 : 0.55,
                            ease: "easeOut",
                            delay: 0.1,
                        }}
                    >
                        4
                    </motion.p>
                </div>

                <div className="w-full flex items-center justify-center px-3">
                    <motion.p
                        className="max-w-[424px] text-[20px] font-light text-white text-center"
                        initial={reducedMotion ? undefined : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: reducedMotion ? 0 : 0.45,
                            ease: "easeOut",
                            delay: 0.12,
                        }}
                    >
                        The requested page does not exist or has been deleted.
                        Please check the entered address or navigate to the main
                        page
                    </motion.p>
                </div>

                <motion.button
                    onClick={() => router.back()}
                    className="py-5 px-12 bg-[#17411B] hover:bg-[#205b26] rounded-full text-[20px] text-white cursor-pointer transition duration-300 ease-in-out"
                    whileHover={reducedMotion ? undefined : { scale: 1.03 }}
                    whileTap={reducedMotion ? undefined : { scale: 0.99 }}
                >
                    Go back
                </motion.button>
            </motion.div>
        </RoundedBlock>
    );
};

'use client';

import { RoundedBlock, Tag, Text } from "@/shared/ui";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "../config/animations";

export const BrandPhilosophy = () => {
    return (
        <RoundedBlock className="p-2.5 relative flex flex-col justify-between min-h-[1000px]">
            <Tag className="w-fit">Brand Philosophy</Tag>

            <div className="text-center leading-none">
                <div className="flex justify-center">
                    <motion.h2
                        className="text-white text-[46px] max-w-[1078px] mb-9"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.7 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        NDWS is a brand for those who do not look for excuses. For those who understand that results are not achieved in a single day, but through hundreds of correct decisions in a row.
                    </motion.h2>
                </div>

                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <Text size="medium" variant="white" className="mb-4.5 font-light">
                        Sport is not a mood. It is a habit. It is discipline.<br/> It is a choice you make every day.
                    </Text>
                </motion.div>

                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                >
                    <Text size="medium" variant="white" className="font-light">
                        No day without sport —<br/> it&apos;s not a slogan. It&apos;s a way of life.
                    </Text>
                </motion.div>
            </div>

            <div />
            
            {/* Фон */}
            <Image 
                src={"/brand-philosophy/background.png"}
                alt="Brand Philosophy"
                width={1000}
                height={1000}
                className="absolute top-0 left-0 -z-20 w-full h-full object-cover rounded-[30px] grayscale-100"
                quality={100}
                unoptimized={false}
                priority
                sizes="1000px"
            />

            <div className="absolute top-0 left-0 w-full h-full bg-black/90 -z-10 rounded-[30px]" />
        </RoundedBlock>
    )
}
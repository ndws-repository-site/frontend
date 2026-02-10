'use client'

import { Tag } from "@/shared/ui";
import { WHY_WE_CARD_DATA } from "../config/why-we-card-data";
import { WhyWeCard } from "./why-we-card";
import { motion } from "framer-motion";
import { cardVariants } from "../config/card-variants";

export const WhyWe = () => {
    return (
        <div className="mb-20">
            <Tag variant="gray" className="w-fit mb-5">
                Why we are trusted
            </Tag>

            <div className="flex justify-center mb-10">
                <h3 className="text-black leading-[110%] text-[38px]">
                    We don&apos;t promise miracles. <br/> We make a product that works.
                </h3>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
                {WHY_WE_CARD_DATA.map((card, index) => (
                    <motion.div
                        key={index}
                        custom={index}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={cardVariants}
                    >
                        <WhyWeCard 
                            number={`0${index + 1}`}
                            {...card}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
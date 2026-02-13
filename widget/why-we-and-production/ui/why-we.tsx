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

            <div className="flex justify-center lg:mb-10 mob:mb-9.5 mb-6">
                <h3 className="text-black leading-[110%] lg:text-[38px] mob:text-[24px] text-[22px] lg:text-left text-center">
                    We don&apos;t promise miracles. <br/> We make a product that works.
                </h3>
            </div>

            <div className="grid mob:grid-cols-3 grid-cols-1 gap-2.5">
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
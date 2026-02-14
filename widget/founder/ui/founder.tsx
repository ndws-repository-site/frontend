"use client";

import { ALEXANDRIA_FONT } from "@/shared/config";
import { RoundedBlock, Tag } from "@/shared/ui";
import { cn } from "@/shared/utils";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { photoEntrance } from "../config/animations";
import { useEffect, useRef, useState } from "react";
import {
    CHAR_DELAY_MS,
    FULL_SUBTITLE,
    FOUNDER_TITLE,
    PAUSE_AFTER_PART_MS,
    QUOTE_CHAR_DELAY_MS,
    QUOTE_TEXT,
    SUBTITLE_PART_END_INDEXES,
} from "../config/typing";
import { sleep } from "../utils/sleep";
import {
    FirstBackgroundIcon,
    SecondBackgroundIcon,
} from "../icons/background-icon";

export const Founder = () => {
    const blockRef = useRef<HTMLElement>(null);
    const inView = useInView(blockRef, { amount: 0.5, once: true });
    const [titleLength, setTitleLength] = useState(0);
    const [subtitleLength, setSubtitleLength] = useState(0);
    const [quoteLength, setQuoteLength] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let cancelled = false;

        const run = async () => {
            for (let i = 0; i <= FOUNDER_TITLE.length; i++) {
                if (cancelled) return;
                setTitleLength(i);
                await sleep(CHAR_DELAY_MS);
            }

            let startIndex = 0;
            for (const endIndex of SUBTITLE_PART_END_INDEXES) {
                for (let i = startIndex; i <= endIndex; i++) {
                    if (cancelled) return;
                    setSubtitleLength(i);
                    await sleep(CHAR_DELAY_MS);
                }
                if (cancelled) return;
                await sleep(PAUSE_AFTER_PART_MS);
                startIndex = endIndex;
            }

            // Печатаем цитату (быстрее)
            for (let i = 0; i <= QUOTE_TEXT.length; i++) {
                if (cancelled) return;
                setQuoteLength(i);
                await sleep(QUOTE_CHAR_DELAY_MS);
            }
        };

        run();
        return () => {
            cancelled = true;
        };
    }, [inView]);

    const displayedSubtitle = FULL_SUBTITLE.slice(0, subtitleLength);

    return (
        <RoundedBlock
            ref={blockRef}
            className="bg-black p-2.5 min-h-[614px] relative"
        >
            <Tag variant="gray" className="w-fit mb-7.5 max-lg:mb-6">
                Founder
            </Tag>

            <div className="relative flex flex-col items-center gap-6 max-lg:pb-10 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-4">
                <div className="w-full max-lg:text-center lg:block">
                    <h3 className="text-white lg:text-[66px] mob:text-[40px] text-[24px] leading-[110%] uppercase mb-4">
                        {FOUNDER_TITLE.slice(0, titleLength)}
                    </h3>

                    <p
                        className={cn(
                            ALEXANDRIA_FONT.className,
                            "text-white mob:text-[20px] text-[14px] leading-[120%] font-light min-h-[1.2em] max-lg:text-[16px]",
                        )}
                    >
                        {displayedSubtitle}
                    </p>
                </div>

                <motion.div
                    className="max-w-[321px] max-h-[369px] w-full overflow-hidden rounded-[20px] justify-self-center max-lg:border max-lg:border-white/30"
                    variants={photoEntrance}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    <Image
                        src="/founder/edil.jpg"
                        alt="Edil Kasenov"
                        width={321}
                        height={369}
                        className="w-full h-full object-cover max-lg:grayscale"
                        quality={100}
                        unoptimized={false}
                        priority
                        sizes="321px"
                    />
                </motion.div>

                <div className="hidden lg:block" />
            </div>

            <p className="max-lg:block max-lg:text-center max-lg:uppercase text-[16px] max-lg:text-white max-lg:px-4 max-lg:leading-[140%] max-lg:mt-4 lg:absolute lg:right-5 lg:bottom-[70px] lg:uppercase lg:text-[30px] lg:text-white lg:w-[692px]">
                {QUOTE_TEXT.slice(0, quoteLength)}
            </p>

            <div className="absolute bottom-0 left-0">
                <FirstBackgroundIcon />
            </div>

            <div className="absolute top-0 right-7.5">
                <SecondBackgroundIcon />
            </div>
        </RoundedBlock>
    );
};

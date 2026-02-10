"use client"

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CONTACT_LINKS, DOCUMENTS_LINKS, NAVIGATION_LINKS } from "../config/link";
import { Social } from "../types/social";
import { ColumnLink } from "./column-link";
import { ColumnTitle } from "./column-title";
import { SocialLink } from "./social-link";
import { LETTERS } from "../config/letters";
import { drawLetterTransition } from "../config/draw-letter-transition";

export const Footer = () => {
    const footerRef = useRef<HTMLElement>(null)
    const ndwsInView = useInView(footerRef, { amount: 0.7, once: true })

    return (
        <footer
            ref={footerRef}
            className="m-2.5 px-2.5 pt-[37px] pb-0 bg-black rounded-[30px] overflow-hidden"
        >
            {/* Верхний блок: 4 колонки в ряд */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-8">
                {/* 1. Social media — заголовок и иконки в ряд */}
                <div>
                    <ColumnTitle title="Social media" className="mb-5" />
                    <div className="flex items-center gap-2.5">
                        <SocialLink type={Social.INSTAGRAM} />
                        <SocialLink type={Social.TIKTOK} />
                        <SocialLink type={Social.YOUTUBE} />
                    </div>
                </div>

                <ColumnLink title="Navigation" links={NAVIGATION_LINKS} />
                <ColumnLink title="Contact" links={CONTACT_LINKS} />
                <ColumnLink title="Documents" links={DOCUMENTS_LINKS} />
            </div>

            {/* Нижний блок: NDWS — буквы «прорисовываются» при появлении */}
            <div
                className="rounded-b-[28px] w-full overflow-hidden flex justify-center items-start @container"
                style={{ height: "23cqi" }}
            >
                <h2
                    className="text-white font-normal leading-none tracking-tight whitespace-nowrap text-center w-full flex justify-center"
                    style={{ fontSize: "34cqi" }}
                >
                    {LETTERS.map((letter, i) => (
                        <motion.span
                            key={letter}
                            className="inline-block overflow-hidden"
                            initial={{ clipPath: "inset(0 100% 0 0)" }}
                            animate={
                                ndwsInView
                                    ? { clipPath: "inset(0 0 0 0)" }
                                    : { clipPath: "inset(0 100% 0 0)" }
                            }
                            transition={drawLetterTransition(i)}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </h2>
            </div>
        </footer>
    )
}
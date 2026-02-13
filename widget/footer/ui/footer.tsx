"use client"

import Link from "next/link";
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
            {/* Верхний блок: mob — 2 колонки (2x2), tablet — 3 колонки, lg — 4 колонки */}
            <div className="grid grid-cols-2 mob:grid-cols-3 lg:grid-cols-4 gap-8 mob:gap-8 lg:gap-10 pb-8">
                {/* 1. Social media */}
                <div>
                    <ColumnTitle title="Social media" className="mb-5" />
                    <div className="flex items-center gap-2.5">
                        <SocialLink type={Social.INSTAGRAM} />
                        <SocialLink type={Social.TIKTOK} />
                        <SocialLink type={Social.YOUTUBE} />
                    </div>
                </div>

                {/* 2. Navigation */}
                <div>
                    <ColumnLink title="Navigation" links={NAVIGATION_LINKS} />
                </div>

                {/* 3. Contact */}
                <div>
                    <ColumnLink title="Contact" links={CONTACT_LINKS} />
                </div>

                {/* 4. Documents — tablet: под Navigation и Contact, span 2 колонки */}
                <div className="mob:col-start-2 mob:col-span-2 mob:row-start-2 lg:col-start-auto lg:col-span-1 lg:row-start-auto">
                    <ColumnTitle title="Documents" className="mb-5" />
                    <div className="grid grid-cols-1 mob:grid-cols-2 lg:grid-cols-1 gap-2.5 max-w-[208px] mob:max-w-none lg:max-w-[208px]">
                        {DOCUMENTS_LINKS.map(link => (
                            <Link key={link.href} href={link.href} className="uppercase text-[14px] mob:text-[20px] text-white leading-[110%] cursor-pointer transition hover:text-primary">
                                {link.text}
                            </Link>
                        ))}
                    </div>
                </div>
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
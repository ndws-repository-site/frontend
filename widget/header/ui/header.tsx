"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/ui"
import { Blocks, LogotypeIcon, MenuBlock } from "@/shared/icons"
import Link from "next/link"

export const Header = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 500px)");
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    const buttonSize = isMobile ? "small" : "medium";

    return (
        <header className="fixed top-0 left-0 w-full px-5 pt-5 flex items-center justify-between z-50">
            <Link href="/" className="bg-white rounded-full py-3 px-7 cursor-pointer block max-[500px]:py-1.5 max-[500px]:px-3 shrink-0">
                <LogotypeIcon className="max-[500px]:w-[77.25px] max-[500px]:h-[19.5px]" />
            </Link>

            <div className="bg-white flex items-center gap-1 rounded-full p-0.5">
                <Link href='/catalog'>
                    <Button icon={<Blocks />} iconPosition="left" variant="primary" size={buttonSize} compact={isMobile}>
                        Products
                    </Button>
                </Link>

                <Button icon={<MenuBlock />} iconPosition="left" variant="outline" size={buttonSize} compact={isMobile}>
                    Menu
                </Button>
            </div>
        </header>
    )
}
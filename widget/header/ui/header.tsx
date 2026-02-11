"use client";

import { Button } from "@/shared/ui"
import { Blocks, LogotypeIcon, MenuBlock } from "@/shared/icons"
import Link from "next/link"

export const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full px-5 pt-5 flex items-center justify-between z-50">
            <Link href="/" className="bg-white rounded-full py-3 px-7 cursor-pointer block">
                <LogotypeIcon />
            </Link>

            <div className="bg-white flex items-center gap-1 rounded-full p-0.5">
                <Link href='/catalog'>
                    <Button icon={<Blocks />} iconPosition="left" variant="primary">
                        Products
                    </Button>
                </Link>

                <Button icon={<MenuBlock />} iconPosition="left" variant="outline">
                    Menu
                </Button>
            </div>
        </header>
    )
}
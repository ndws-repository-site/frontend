import type { Metadata } from "next";
import "@/shared/styles/globals.css";

import { Header } from "@/widget/header";
import { Footer } from "@/widget/footer";

import { JOST_FONT } from "@/shared/config";

export const metadata: Metadata = {
    title: "NDWS",
    description: "NDWS",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${JOST_FONT.className} antialiased bg-white flex flex-col min-h-screen justify-between mt-2.5 overflow-x-hidden`}
            >
                <Header />
                <main className="flex-1 overflow-visible">{children}</main>
                <Footer />
            </body>
        </html>
    );
}

import type { Metadata } from "next";
import "@/shared/styles/globals.css";

import { Header } from "@/widget/header";
import { Footer } from "@/widget/footer";

import {
    JOST_FONT,
    KEY_WORDS,
    SEO_DESCRIPTION,
    SEO_TITLE,
} from "@/shared/config";

export const metadata: Metadata = {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    keywords: KEY_WORDS,
    icons: {
        icon: [
            {
                url: "/seo-icons/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
            },
            {
                url: "/seo-icons/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
            {
                url: "/seo-icons/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                url: "/seo-icons/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
        apple: "/seo-icons/apple-touch-icon.png",
    },
    openGraph: {
        title: SEO_TITLE,
        description: SEO_DESCRIPTION,
        images: ["/seo-icons/android-chrome-192x192.png"],
    },
    twitter: {
        title: SEO_TITLE,
        description: SEO_DESCRIPTION,
        images: ["/seo-icons/android-chrome-192x192.png"],
    },
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

import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "@/shared/styles/admin.css";
import { QueryProvider } from "@/shared/providers";
import { ConfirmProvider } from "@/shared/lib/confirm-dialog";
import { AdminLeftPanel } from "@/widget/admin-left-panel";

const onest = Onest({
    subsets: ["latin", "cyrillic"],
    variable: "--font-onest",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        template: "%s | NDWS Admin",
        default: "Dashboard | NDWS Admin",
    },
    description: "NDWS Administration Panel",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body
                className={`${onest.variable} bg-background min-h-screen antialiased py-8 px-5 flex gap-8`}
            >
                <QueryProvider>
                    <ConfirmProvider>
                        <aside className="sticky top-8 h-fit shrink-0">
                            <AdminLeftPanel />
                        </aside>

                        <main className="flex-1 w-full min-w-0">
                            {children}
                        </main>
                    </ConfirmProvider>
                </QueryProvider>
            </body>
        </html>
    );
}

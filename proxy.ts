import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOGIN_ROUTE = "/admin/auth";

const STATIC_FILE_EXT = /\.(png|jpg|jpeg|gif|svg|ico|webp|woff2?|css|js)(\?.*)?$/i;

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("accessToken")?.value;

    // Пропускаем статические файлы (изображения, шрифты и т.д.) без проверки авторизации
    if (STATIC_FILE_EXT.test(pathname)) {
        return NextResponse.next();
    }

    const normalizedPath = pathname.endsWith("/")
        ? pathname.slice(0, -1)
        : pathname;

    const isLoginPage = normalizedPath === LOGIN_ROUTE;
    const isAdminSection = normalizedPath.startsWith("/admin");

    // === СЦЕНАРИЙ 1: Пользователь с токеном на странице входа ===
    if (isLoginPage && token) {
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    // === СЦЕНАРИЙ 2: Защита админки ===
    if (isAdminSection && !isLoginPage) {
        if (!token) {
            return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
        }

        try {
            const apiOrigin =
                process.env.NEXT_PUBLIC_SITE_API_ORIGIN ||
                "http://localhost:4000";
            const cleanHost = apiOrigin.replace(/\/$/, "");
            const url = `${cleanHost}/api/admin/me`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            });

            if (!response.ok) {
                throw new Error("Auth failed");
            }

            return NextResponse.next();
        } catch {
            const response = NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
            response.cookies.delete("accessToken");
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin", "/admin/:path*"],
};

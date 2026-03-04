"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Navigation as NavigationItem } from "./navigation";
import { NavigationSkeleton } from "./navigation-sekeleton";
import { ProfileCard } from "./profile-card";
import { useAdminProfile } from "../api/use-admin-profile";
import { NAV_DATA } from "../config/nav-data";
import { LogOut } from "lucide-react";
import { logout } from "../api/logout";
import { AdminCard } from "@/shared/admin";

/**
 * Боковая панель админки: логотип, профиль, навигация (из NAV_DATA), кнопка выхода.
 * Навигация фильтруется по роли пользователя.
 */
export const AdminLeftPanel = () => {
    const { data: profile, isLoading } = useAdminProfile();
    const pathname = usePathname();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showBottomGradient, setShowBottomGradient] = useState(true);

    const checkScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        const { scrollTop, clientHeight, scrollHeight } = el;
        const hasOverflow = scrollHeight > clientHeight;
        const isAtBottom =
            !hasOverflow || scrollTop + clientHeight >= scrollHeight - 2;
        setShowBottomGradient(hasOverflow && !isAtBottom);
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const id = requestAnimationFrame(() => checkScroll());
        el.addEventListener("scroll", checkScroll);
        const ro = new ResizeObserver(checkScroll);
        ro.observe(el);
        return () => {
            cancelAnimationFrame(id);
            el.removeEventListener("scroll", checkScroll);
            ro.disconnect();
        };
    }, [checkScroll, isLoading]);

    const handleLogout = async () => {
        await logout();
    };

    return (
        <AdminCard className="p-5 w-[290px] min-h-[750px] flex flex-col">
            <Image
                src="/logo.svg"
                alt="Логотип"
                width={115}
                height={37}
                className="mb-[57px]"
            />

            <ProfileCard
                loading={isLoading}
                name={profile?.name || "Загрузка..."}
                type={"admin"}
                className="mb-9.5"
            />

            <div className="relative w-full max-h-[calc(7*2.75rem+6*0.75rem)] min-h-0 shrink-0">
                <div
                    ref={scrollRef}
                    className="left-panel-scrollbar flex flex-col gap-3 w-full h-full max-h-[calc(7*2.75rem+6*0.75rem)] overflow-y-auto min-h-0"
                >
                    {isLoading
                        ? Array.from({ length: 4 }).map((_, index) => (
                              <NavigationSkeleton key={index} />
                          ))
                        : NAV_DATA.map((item) => {
                              const isActive =
                                  pathname === item.href ||
                                  pathname.startsWith(item.href + "/") ||
                                  item.additionalHrefs?.some((path) =>
                                      pathname.startsWith(path),
                                  );

                              return (
                                  <NavigationItem
                                      key={item.name + item.href}
                                      icon={item.icon}
                                      name={item.name}
                                      href={item.href}
                                      active={!!isActive}
                                  />
                              );
                          })}
                </div>
                <div
                    className="pointer-events-none absolute -bottom-3 right-5 h-26 transition-opacity duration-300 w-[250px]"
                    style={{
                        opacity: showBottomGradient ? 1 : 0,
                        background:
                            "linear-gradient(to top, #212121 0%, transparent 100%)",
                        filter: "blur(4px)",
                    }}
                    aria-hidden
                />
            </div>

            <button
                onClick={handleLogout}
                className="mt-auto cursor-pointer group flex items-center gap-1.5 pt-5"
            >
                <LogOut
                    size={18}
                    className="text-white transition group-hover:text-red-500/80"
                />

                <p className="text-white transition group-hover:text-red-500/80 text-[14px] leading-[112%]">
                    Выйти
                </p>
            </button>
        </AdminCard>
    );
};

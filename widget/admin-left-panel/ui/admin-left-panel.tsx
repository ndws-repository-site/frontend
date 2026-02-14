"use client";

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

            <div className="scrollbar-hide flex flex-col gap-3 w-full max-h-[calc(7*2.75rem+6*0.75rem)] overflow-y-auto min-h-0">
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
                                  active={!!isActive} // Передаем результат новой проверки
                              />
                          );
                      })}
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

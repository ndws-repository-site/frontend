"use client";

import { cn } from "@/shared/utils";
import type { TabsType } from "../types";
import { PILL_LEFT_CLASS } from "../config/tab-list";

interface TabPillProps {
    currentTab: TabsType;
}

export const TabPill = ({ currentTab }: TabPillProps) => (
    <div
        className={cn(
            "absolute top-1 bottom-1 w-[calc((100%-8px)/3)] rounded-full bg-[#1A1A1A]",
            "transition-[left] duration-300 ease-out z-0",
            PILL_LEFT_CLASS[currentTab],
        )}
        aria-hidden
    />
);

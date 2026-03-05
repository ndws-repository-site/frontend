"use client";

import { cn } from "@/shared/utils";
import type { TabsType } from "../types";
import { PILL_BASE_CLASS, PILL_TRANSLATE_CLASS } from "../config/tab-list";

interface TabPillProps {
    currentTab: TabsType;
}

export const TabPill = ({ currentTab }: TabPillProps) => (
    <div
        className={cn(
            "absolute top-1 bottom-1 rounded-full bg-[#1A1A1A] z-0",
            "transition-transform duration-300 ease-out",
            "backface-hidden",
            PILL_BASE_CLASS,
            PILL_TRANSLATE_CLASS[currentTab],
        )}
        aria-hidden
    />
);

"use client";

import { cn } from "@/shared/utils";
import { TAB_CLASS } from "../config";

interface TabTriggerProps {
    label: string;
    isActive?: boolean;
    onClick: () => void;
}

export const TabTrigger = ({ label, isActive, onClick }: TabTriggerProps) => (
    <button
        type="button"
        className={cn(
            TAB_CLASS.basic,
            isActive && "text-white",
            "relative z-10",
        )}
        onClick={onClick}
    >
        {label}
    </button>
);

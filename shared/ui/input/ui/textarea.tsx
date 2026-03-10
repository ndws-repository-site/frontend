"use client";

import { forwardRef } from "react";
import { cn } from "@/shared/utils";
import { ALEXANDRIA_FONT } from "@/shared/config";
import type { TextareaProps } from "../types/textarea.props";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                className={cn(
                    "w-full outline-none transition-colors duration-200",
                    "bg-[#f0f0f0] rounded-[20px] border-0",
                    "px-5.5 py-3 text-[#1a1a1a] placeholder:text-black/40",
                    "text-[18px] font-light resize-none",
                    "focus:bg-[#e8e8e8] focus:ring-0",
                    ALEXANDRIA_FONT.className,
                    className,
                )}
                {...props}
            />
        );
    },
);

Textarea.displayName = "Textarea";

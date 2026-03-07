"use client";

import { forwardRef } from "react";
import { cn } from "@/shared/utils";
import { ALEXANDRIA_FONT } from "@/shared/config";
import type { InputProps } from "../types/input.props";

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={cn(
                    "w-full outline-none transition-colors duration-200",
                    "bg-[#f0f0f0] rounded-full border-0",
                    "px-5.5 py-3 text-[#1a1a1a] placeholder:text-black/40",
                    "text-[18px] font-light",
                    "focus:bg-[#e8e8e8] focus:ring-0",
                    "[&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#f0f0f0]",
                    "[&:-webkit-autofill]:[-webkit-text-fill-color:#1a1a1a]",
                    ALEXANDRIA_FONT.className,
                    className,
                )}
                {...props}
            />
        );
    },
);

Input.displayName = "Input";

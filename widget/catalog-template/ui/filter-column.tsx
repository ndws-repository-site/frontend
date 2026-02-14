"use client";

import { useState } from "react";
import { Checkbox } from "@/shared/ui";
import { FilterColumnProps } from "../types/filter-column.props";
import { cn } from "@/shared/utils";

export const FilterColumn = ({
    title,
    filters,
    onChange,
    checked,
    className,
    variant = "default",
}: FilterColumnProps) => {
    const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);
    const isMobile = variant === "mobile";

    return (
        <div
            className={cn(
                "p-5 rounded-[20px] min-w-0",
                isMobile
                    ? "bg-white border border-black/7 [box-shadow:0px_2px_4px_0px_rgba(0,0,0,0.06)]"
                    : "bg-[#F9F8F8] [box-shadow:0px_2px_4px_0px_rgba(0,0,0,0.08),0px_0px_6px_0px_rgba(0,0,0,0.02)]",
                className,
            )}
        >
            <p
                className={cn(
                    "uppercase leading-[110%] font-medium mb-4",
                    isMobile
                        ? "text-black text-[18px]"
                        : "text-black text-[26px]",
                )}
            >
                {title}
            </p>

            <div className="grid grid-cols-1 gap-1.5">
                {filters.map((filter) => (
                    <div
                        key={filter}
                        className={cn(
                            "p-0.5 rounded-full min-w-[194px] w-full",
                            isMobile
                                ? "bg-white border-black/7"
                                : "bg-white border-black/7",
                        )}
                        onMouseEnter={() => setHoveredFilter(filter)}
                        onMouseLeave={() => setHoveredFilter(null)}
                    >
                        <Checkbox
                            title={filter}
                            checked={checked.includes(filter)}
                            onChange={onChange}
                            hover={hoveredFilter === filter}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

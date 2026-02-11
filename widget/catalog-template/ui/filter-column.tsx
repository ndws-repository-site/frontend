"use client";

import { useState } from "react";
import { Checkbox } from "@/shared/ui";
import { FilterColumnProps } from "../types/filter-column.props";

export const FilterColumn = ({ 
    title, 
    filters,
    onChange,
    checked
}: FilterColumnProps) => {
    const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);

    return (
        <div
            className="bg-[#F9F8F8] [box-shadow:0px_2px_4px_0px_rgba(0,0,0,0.08),0px_0px_6px_0px_rgba(0,0,0,0.02)] p-5 rounded-[20px]"
        >
            <p className="text-black uppercase text-[26px] leading-[110%] font-medium mb-4">
                {title}
            </p>

            <div className="grid grid-cols-1 gap-1.5">
                {filters.map((filter) => (
                    <div
                        key={filter}
                        className="p-0.5 bg-white border-black/7 rounded-full min-w-[194px]"
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
}
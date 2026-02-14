"use client";

import { cn } from "@/shared/utils";
import type { AdminTableRowProps } from "../types/admin-table-row.props";

/**
 * Базовая строка таблицы админки.
 * Обеспечивает единый стиль: карточка, hover, скругление.
 * Используйте тот же gridClassName, что и в AdminTable.
 */
export const AdminTableRow = ({
    gridClassName,
    children,
    className,
}: AdminTableRowProps) => {
    return (
        <div
            className={cn(
                gridClassName,
                "bg-card hover:bg-[#2b2b2b] transition-colors rounded-xl px-5 py-4 text-white",
                className,
            )}
        >
            {children}
        </div>
    );
};

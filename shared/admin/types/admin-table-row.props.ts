import type { ReactNode } from "react";

export interface AdminTableRowProps {
    /** CSS класс для grid-сетки (должен совпадать с columns в AdminTable) */
    gridClassName: string;
    /** Содержимое ячеек строки */
    children: ReactNode;
    /** Дополнительные классы */
    className?: string;
}

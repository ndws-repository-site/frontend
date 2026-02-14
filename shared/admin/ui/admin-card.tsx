import { cn } from "@/shared/utils";
import { AdminCardProps } from "../types/admin-card.props";

/**
 * Карточка-контейнер админки (тёмный фон, скругление, тень).
 * Используется для блоков контента и левой панели.
 */
export const AdminCard = ({ children, className = "" }: AdminCardProps) => {
    return (
        <div className={cn("bg-card shadow-card rounded-[20px]", className)}>
            {children}
        </div>
    );
};

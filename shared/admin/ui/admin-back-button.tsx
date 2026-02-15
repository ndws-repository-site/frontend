import { cn } from "@/shared/utils";
import type { AdminButtonProps } from "../types/admin-button.props";
import { LeftArrow } from "../icons/left-arrow";

/**
 * Кнопка «Вернуться назад» с иконкой стрелки. Для навигации с дочерних страниц.
 */
export const AdminBackButton = ({
    className,
    type = "button",
    ...props
}: Omit<AdminButtonProps, "children">) => {
    return (
        <button
            type={type}
            className={cn(
                "flex items-center gap-3.5 cursor-pointer",
                className,
            )}
            {...props}
        >
            <LeftArrow />

            <p className="text-white">Вернуться назад</p>
        </button>
    );
};

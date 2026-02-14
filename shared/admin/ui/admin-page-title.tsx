import { cn } from "@/shared/utils";
import { AdminPageTitleProps } from "../types/admin-page-title.props";

/**
 * Заголовок страницы админки (крупный белый текст с отступом снизу).
 */
export const AdminPageTitle = ({
    title,
    className = "",
}: AdminPageTitleProps) => {
    return (
        <p
            className={cn(
                "text-[26px] text-white leading-[112%] mb-8",
                className,
            )}
        >
            {title}
        </p>
    );
};

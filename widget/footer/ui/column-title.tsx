import { cn } from "@/shared/utils"
import { ColumnTitleProps } from "../types/column-title.props"
import { ALEXANDRIA_FONT } from "@/shared/config"

export const ColumnTitle = ({title, className=""}: ColumnTitleProps) => {
    return (
        <p className={cn('text-white/70 leading-[120%] font-light text-[14px] mob:text-base', ALEXANDRIA_FONT.className, className)}>
            {title}
        </p>
    )
}
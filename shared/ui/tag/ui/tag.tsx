import { cn } from "@/shared/utils";
import { TagProps } from "../types/tag.props";
import { ALEXANDRIA_FONT } from "@/shared/config";

export const Tag = ({ 
    children, 
    className, 
    variant = 'white' 
}: TagProps) => {
    return (
        <p className={cn(
            "rounded-full px-6 py-3.5 text-black text-[14px]", 
            variant === 'white' ? 'bg-white' : 'bg-[#F0F0F0]',
            ALEXANDRIA_FONT.className,
            className
        )}>
            {children}
        </p>
    )
}
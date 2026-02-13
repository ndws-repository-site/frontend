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
            "rounded-full mob:px-6 px-5 mob:py-3.5 py-2.5 text-[14px]", 
            (variant === 'white' || !variant) && 'bg-white text-black',
            variant === 'gray' && 'bg-[#F0F0F0] text-black',
            variant === 'dark' && 'bg-black text-white',
            ALEXANDRIA_FONT.className,
            className
        )}>
            {children}
        </p>
    )
}
import { cn } from "@/shared/utils";
import { IngredientItemProps } from "../props";
import { ALEXANDRIA_FONT } from "@/shared/config";

export const IngredientItem = ({
    title,
    description,
    showBottomBorder,
}: IngredientItemProps) => {
    return (
        <div
            className={cn(
                `flex items-center justify-between border-t mob:last:border-t last:border-t-0 border-[#262626] mob:py-3.5 py-2.5`,
                showBottomBorder ? "border-b" : "",
                ALEXANDRIA_FONT.className,
            )}
        >
            <p className="text-white text-[14px] font-light leading-none">
                {title}
            </p>

            <p className="text-white/70 text-[14px] font-extralight leading-none">
                {description}
            </p>
        </div>
    );
};

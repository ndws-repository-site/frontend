import { cn } from "@/shared/utils";
import { ClassicButtonProps } from "../types/classic-button.props";
import { ALEXANDRIA_FONT } from "@/shared/config";

export const ClassicButton = ({
    children,
    variant = "primary",
    size = "small",
    className,
    ...props
}: ClassicButtonProps) => {
    return (
        <button
            className={cn(
                ALEXANDRIA_FONT.className,
                size === "small" ? "px-8 py-3.5" : "px-13 py-5.5 text-[18px]",
                variant === "primary"
                    ? "bg-primary border-primary text-white hover:bg-white hover:text-black/50 hover:border-black/50"
                    : "bg-white border-black/50 text-black/50 hover:bg-primary hover:text-white hover:border-primary",
                "rounded-full transition-all ease duration-300 cursor-pointer border leading-none",
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
};

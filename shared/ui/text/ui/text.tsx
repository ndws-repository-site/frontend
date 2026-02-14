import { cn } from "@/shared/utils";
import { TextProps } from "../props/text.props";
import { ALEXANDRIA_FONT } from "@/shared/config";

export const Text = ({
    children,
    className,
    variant = "black",
    size = "small",
}: TextProps) => {
    return (
        <p
            className={cn(
                ALEXANDRIA_FONT.className,
                variant === "white" ? "text-white" : "text-[#636363]",
                size === "small"
                    ? "text-[16px]"
                    : size === "medium"
                      ? "text-[20px]"
                      : "text-lg",
                className,
            )}
        >
            {children}
        </p>
    );
};

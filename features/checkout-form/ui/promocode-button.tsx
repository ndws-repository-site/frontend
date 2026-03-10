import { cn } from "@/shared/utils";
import { PromocodeButtonProps } from "../props/promocode-button.props";

export const PromocodeButton = ({
    state,
    onClick,
    className,
    ...props
}: PromocodeButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-7 py-3 rounded-full bg-[#636363] text-white cursor-pointer transition-all ease duration-300 hover:bg-black",
                "leading-[120%]",
                className,
            )}
            {...props}
        >
            {state}
        </button>
    );
};

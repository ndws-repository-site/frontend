import { Minus, Plus } from "lucide-react";
import { cn } from "@/shared/utils";
import { CartQuantityControlProps } from "../props/cart-quantity-control.props";

const variantStyles = {
    light: {
        container:
            "gap-1 border-black/22 mob:py-1 py-0.5 mob:px-2 px-1 text-black",
        button: "flex items-center justify-center mob:min-w-10 mob:min-h-10 min-w-8 min-h-8 rounded-full",
        icon: "w-2.5 h-2.5",
        text: "mob:text-[18px] text-[14px] leading-[120%] min-w-[1.5ch] text-center",
    },
    dark: {
        container:
            "gap-1 mob:gap-2 border-white/22 mob:py-2 py-1 mob:px-4 px-2 text-white font-medium",
        button: "flex items-center justify-center mob:min-w-12 mob:min-h-12 min-w-10 min-h-10 rounded-full",
        icon: "mob:w-3 mob:h-3 w-2.5 h-2.5",
        text: "mob:text-[18px] text-[14px] leading-none min-w-[1.5ch] text-center",
    },
    compact: {
        container: "gap-0.5 border-white/30 py-0.5 px-1 text-white",
        button: "flex items-center justify-center min-w-7 min-h-7 rounded-full",
        icon: "w-2 h-2",
        text: "text-[12px] leading-none min-w-[1ch] text-center",
    },
} as const;

export const CartQuantityControl = ({
    quantity,
    onDecrease,
    onIncrease,
    variant = "light",
    className,
}: CartQuantityControlProps) => {
    const styles = variantStyles[variant];

    return (
        <div
            className={cn(
                "flex items-center rounded-full border",
                styles.container,
                className,
            )}
        >
            <button
                type="button"
                onClick={onDecrease}
                className={cn("cursor-pointer shrink-0", styles.button)}
                aria-label="Decrease quantity"
            >
                <Minus className={styles.icon} />
            </button>

            <p className={cn(styles.text, "shrink-0 select-none")}>
                {quantity}
            </p>

            <button
                type="button"
                onClick={onIncrease}
                className={cn("cursor-pointer shrink-0", styles.button)}
                aria-label="Increase quantity"
            >
                <Plus className={styles.icon} />
            </button>
        </div>
    );
};

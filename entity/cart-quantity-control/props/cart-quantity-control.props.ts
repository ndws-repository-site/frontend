export type CartQuantityControlVariant = "light" | "dark" | "compact";

export interface CartQuantityControlProps {
    quantity: number;
    onDecrease: () => void;
    onIncrease: () => void;
    variant?: CartQuantityControlVariant;
    className?: string;
}

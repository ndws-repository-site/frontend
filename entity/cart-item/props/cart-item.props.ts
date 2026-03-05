export interface CartItemProps {
    id: string;
    image: string;
    name: string;
    price: number;
    quantity: number;
    onChangeQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
    className?: string;
}

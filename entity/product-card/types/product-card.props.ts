import { IProduct } from "@/shared/types";

export interface ProductCardProps extends IProduct {
    loading?: boolean;
    className?: string;
}

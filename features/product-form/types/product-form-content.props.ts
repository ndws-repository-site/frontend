import type { ProductResponse } from "@/shared/types/responses/product.response";

export type ProductFormContentProps = {
    product: ProductResponse | undefined;
    isEdit: boolean;
    id: string | undefined;
};

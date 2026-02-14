import { $apiAdmin } from "@/shared/utils";

export interface UpdateProductBlockPayload {
    title: string;
    subtitle: string;
    color: string;
    icon: string;
    iconColor: string;
    productId: string;
}

export const updateProductBlock = (
    id: number,
    payload: UpdateProductBlockPayload,
) => $apiAdmin.put(`/product-block/${id}`, payload);

import { $apiAdmin } from "@/shared/utils";

export interface CreateProductBlockPayload {
    title: string;
    subtitle: string;
    color: string;
    icon: string;
    iconColor: string;
    productId: string;
}

export const createProductBlock = (payload: CreateProductBlockPayload) =>
    $apiAdmin.post("/product-block", payload);

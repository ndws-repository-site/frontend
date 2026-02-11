import type { IProduct } from "@/shared/types";

export interface CatalogTemplateProps {
    title: string;
    subtitle: string;
    description: string;
    loading?: boolean;
    // forms: string[];
    // goals: string[];
    // productType: string;
    products: IProduct[];
}
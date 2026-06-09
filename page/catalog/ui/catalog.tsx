"use client";

import { CatalogTemplate } from "@/widget/catalog-template";
import { useGetCatalog } from "../api/use-get-catalog";

export const Catalog = () => {
    const { data: products = [] } = useGetCatalog();

    if (products.length === 0) return null;
    if (!products) return null;

    return (
        <CatalogTemplate
            title="Catalog"
            subtitle="Products for daily progress"
            description="We focus on the basics — the things that make growth possible. Choose a product that suits your goals and take the next step toward achieving results."
            products={products}
        />
    );
};

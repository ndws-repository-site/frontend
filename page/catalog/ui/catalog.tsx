"use client";

import { CatalogTemplate } from "@/widget/catalog-template";
import { useGetCatalog } from "../api/use-get-catalog";
import { useGetCatalogFilters } from "../api/use-get-catalog-filters";

export const Catalog = () => {
    const { data: products = [], isLoading: isProductsLoading } =
        useGetCatalog();
    const { data: filters } = useGetCatalogFilters();

    if (!isProductsLoading && products.length === 0) return null;

    return (
        <CatalogTemplate
            title="Catalog"
            subtitle="Products for daily progress"
            description="We focus on the basics — the things that make growth possible. Choose a product that suits your goals and take the next step toward achieving results."
            products={products}
            loading={isProductsLoading}
            goals={filters?.goals.map((goal) => goal.name) ?? []}
            forms={filters?.forms.map((form) => form.name) ?? []}
            productTypes={
                filters?.productTypes.map((productType) => productType.name) ??
                []
            }
        />
    );
};

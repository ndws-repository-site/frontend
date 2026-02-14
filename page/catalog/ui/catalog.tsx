import { PRODUCTS_MOCK } from "@/shared/config";
import { CatalogTemplate } from "@/widget/catalog-template";

export const Catalog = () => {
    return (
        <CatalogTemplate
            title="Catalog"
            subtitle="Products for daily progress"
            description="We focus on the basics — the things that make growth possible. Choose a product that suits your goals and take the next step toward achieving results."
            products={PRODUCTS_MOCK}
        />
    );
};

import { PRODUCT_PAGE_MOCK } from "@/shared/config";
import { ProductPage } from "@/widget/product-page";

export default function ProductCardPage() {
    return <ProductPage {...PRODUCT_PAGE_MOCK} />;
}

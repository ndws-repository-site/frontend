import { ProductBlockForm } from "@/features/product-block-form";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function AdminProductsBlockEditPage({
    params,
}: PageProps) {
    const { id } = await params;
    return <ProductBlockForm type="edit" id={id} />;
}

import { ProductTypeForm } from "@/features/product-type-form";

export default async function AdminProductTypeEditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <ProductTypeForm type="edit" id={id} />;
}

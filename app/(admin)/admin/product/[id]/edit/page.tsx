import { ProductForm } from "@/features/product-form";

export default async function AdminProductEditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <ProductForm type="edit" id={id} />;
}

import { Product } from "@/page/product";

export default async function ProductCardPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return <Product slug={slug} />;
}

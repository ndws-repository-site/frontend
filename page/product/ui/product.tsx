"use client";

import { ProductPage } from "@/widget/product-page";
import { notFound } from "next/navigation";
import { useGetProduct } from "../api/use-get-product";

interface ProductProps {
    slug: string;
}

export const Product = ({ slug }: ProductProps) => {
    const { data: product, isLoading, isError } = useGetProduct(slug);

    if (isLoading) return null;

    if (isError || !product) {
        notFound();
    }

    return <ProductPage {...product} />;
};

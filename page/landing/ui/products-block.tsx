"use client";

import { useProductBlock } from "../api/use-product-block";
import { ProductBlock, resolveProductBlockIcon } from "@/widget/product-block";

export const ProductsBlock = () => {
    const { data: blocks = [] } = useProductBlock();

    if (blocks.length === 0) return null;

    const maxPage = blocks.length;

    return (
        <>
            {blocks.map((block, index) => (
                <ProductBlock
                    key={block.id}
                    tag="Products"
                    title={block.title}
                    subtitle={block.subtitle}
                    page={index + 1}
                    maxPage={maxPage}
                    product={block.product.name}
                    productImage={block.product.images[0]}
                    left={index % 2 === 1}
                    color={block.color}
                    icon={resolveProductBlockIcon(block.icon)}
                    link={`/product/${block.product.slug}`}
                />
            ))}
        </>
    );
};

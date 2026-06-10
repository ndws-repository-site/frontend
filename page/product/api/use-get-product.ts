import { ProductResponse } from "@/shared/types";
import { $api } from "@/shared/utils";
import { parseComposition } from "@/shared/utils/composition";
import { ProductPageProps } from "@/widget/product-page";
import { useQuery } from "@tanstack/react-query";

const mapProductToPageProps = (product: ProductResponse): ProductPageProps => ({
    id: product.id,
    images: product.images,
    name: product.name,
    description: product.description,
    price: product.price,
    forWho: product.forWho,
    howToUse: product.howToUse,
    ingredients: parseComposition(product.composition ?? []).filter(
        (item) => item.title.trim() && item.description.trim(),
    ),
    faq: product.faq?.faq ?? [],
    recommendedProducts: (product.recommendedProducts ?? []).map((item) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        image: item.images[0] ?? "",
        price: item.price,
        goal: "",
        form: "",
        productType: "",
    })),
});

export const useGetProduct = (slug: string | undefined) => {
    return useQuery({
        queryKey: ["product", slug],
        queryFn: async () => {
            const { data } = await $api.get<ProductResponse>(
                `/product/${slug}`,
            );
            return mapProductToPageProps(data);
        },
        enabled: slug != null && slug !== "",
    });
};

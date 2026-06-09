import { IngredientJson, ProductResponse } from "@/shared/types";
import { $api } from "@/shared/utils";
import { ProductPageProps } from "@/widget/product-page";
import { useQuery } from "@tanstack/react-query";

const parseIngredients = (composition: string): IngredientJson[] => {
    if (!composition) return [];

    try {
        const parsed = JSON.parse(composition) as unknown;
        if (Array.isArray(parsed)) return parsed as IngredientJson[];
    } catch {
        // composition is plain text
    }

    return [{ title: "Composition", description: composition }];
};

const mapProductToPageProps = (product: ProductResponse): ProductPageProps => ({
    id: product.id,
    images: product.images,
    name: product.name,
    description: product.description,
    price: product.price,
    forWho: product.forWho,
    howToUse: product.howToUse,
    ingredients: parseIngredients(product.composition),
    faq: product.faq?.faq ?? [],
    recommendedProducts: (product.recommmendedProducts ?? []).map((item) => ({
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

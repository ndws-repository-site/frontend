import { ProductResponse } from "@/shared/types";
import { $api } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useGetCatalog = () => {
    return useQuery({
        queryKey: ["catalog"],
        queryFn: async () => {
            const { data } = await $api.get<ProductResponse[]>("/product");
            return data.map((product) => ({
                id: product.id,
                name: product.name,
                slug: product.slug,
                image: product.images[0],
                price: product.price,
                goal: product.goal.name,
                form: product.form.name,
                productType: product.productType.name,
            }));
        },
    });
};

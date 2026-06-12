import type { ProductResponse } from "@/shared/types/responses/product.response";
import { parseComposition } from "@/shared/utils/composition";
import type { ProductFormSchema } from "../types/product-form-schema";

const emptyFormValues: ProductFormSchema = {
    name: "",
    description: "",
    price: "",
    stock: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    forWho: "",
    howToUse: "",
    composition: parseComposition(""),
};

export const getDefaultFormValues = (
    product: ProductResponse | undefined,
): ProductFormSchema =>
    product
        ? {
              name: product.name,
              description: product.description ?? "",
              price: product.price.toString(),
              stock: product.stock.toString(),
              weight: product.weight.toString(),
              length: product.length.toString(),
              width: product.width.toString(),
              height: product.height.toString(),
              forWho: product.forWho ?? "",
              howToUse: product.howToUse ?? "",
              composition: parseComposition(product.composition),
          }
        : emptyFormValues;

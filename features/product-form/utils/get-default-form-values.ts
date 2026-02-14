import type { ProductResponse } from "@/shared/types/responses/product.response";
import type { ProductFormSchema } from "../types/product-form-schema";

export const getDefaultFormValues = (
    product: ProductResponse | undefined,
): ProductFormSchema =>
    product
        ? {
              name: product.name,
              description: product.description ?? "",
              price: product.price.toString(),
              stock: product.stock.toString(),
              forWho: product.forWho ?? "",
              howToUse: product.howToUse ?? "",
              composition: product.composition ?? "",
          }
        : {
              name: "",
              description: "",
              price: "",
              stock: "",
              forWho: "",
              howToUse: "",
              composition: "",
          };

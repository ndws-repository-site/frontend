import { useEffect, useState } from "react";
import { Control, useWatch, UseFormGetValues } from "react-hook-form";
import { ICartItem } from "@/shared/types";
import { getErrorMessage } from "@/shared/utils";
import { checkDeliveryCostApi } from "../api/check-delivery-cost";
import { CheckoutFormType } from "../types/checkout-form.type";

const DELIVERY_FIELDS = [
    "firstName",
    "lastName",
    "state",
    "city",
    "zip",
    "address",
] as const;

const DELIVERY_DEBOUNCE_MS = 400;

export type DeliveryCostStatus = "pending" | "loading" | "ready";

const isDeliveryFormComplete = (
    values: Partial<Pick<CheckoutFormType, (typeof DELIVERY_FIELDS)[number]>>,
) => DELIVERY_FIELDS.every((field) => (values[field]?.trim() ?? "").length > 0);

type UseDeliveryCostParams = {
    control: Control<CheckoutFormType>;
    getValues: UseFormGetValues<CheckoutFormType>;
    products: ICartItem[];
};

export const useDeliveryCost = ({
    control,
    getValues,
    products,
}: UseDeliveryCostParams) => {
    const [deliveryCost, setDeliveryCost] = useState<number | null>(null);
    const [status, setStatus] = useState<DeliveryCostStatus>("pending");
    const [error, setError] = useState<string | null>(null);

    const watchedFields = useWatch({
        control,
        name: [...DELIVERY_FIELDS],
    });

    const [firstName, lastName, state, city, zip, address] = watchedFields;

    const isComplete = isDeliveryFormComplete({
        firstName,
        lastName,
        state,
        city,
        zip,
        address,
    });

    useEffect(() => {
        if (!isComplete) {
            return;
        }

        let isCancelled = false;

        const timer = setTimeout(async () => {
            const { firstName, lastName, state, city, zip, address } =
                getValues();

            if (
                !isDeliveryFormComplete({
                    firstName,
                    lastName,
                    state,
                    city,
                    zip,
                    address,
                })
            ) {
                return;
            }

            setStatus("loading");
            setError(null);

            try {
                const response = await checkDeliveryCostApi({
                    name: `${firstName} ${lastName}`,
                    country: "US",
                    state,
                    city,
                    zip,
                    street: address,
                    products: products.map((product) => ({
                        productId: product.id,
                        quantity: product.quantity,
                    })),
                });

                if (isCancelled) {
                    return;
                }

                setDeliveryCost(response.cost);
                setStatus("ready");
            } catch (requestError) {
                if (isCancelled) {
                    return;
                }

                setDeliveryCost(null);
                setStatus("pending");
                setError(
                    getErrorMessage(requestError) ??
                        "Failed to calculate delivery cost",
                );
            }
        }, DELIVERY_DEBOUNCE_MS);

        return () => {
            isCancelled = true;
            clearTimeout(timer);
        };
    }, [getValues, isComplete, products, watchedFields]);

    const effectiveStatus = isComplete ? status : "pending";
    const effectiveDeliveryCost = isComplete ? deliveryCost : null;
    const effectiveError = isComplete ? error : null;

    const deliveryDisplayValue =
        effectiveStatus === "loading"
            ? "Loading..."
            : effectiveStatus === "ready" && effectiveDeliveryCost !== null
              ? `${effectiveDeliveryCost}$`
              : "Calculated after filling in your details";

    return {
        deliveryCost: effectiveDeliveryCost,
        status: effectiveStatus,
        error: effectiveError,
        deliveryDisplayValue,
        isOrderEnabled:
            effectiveStatus === "ready" && effectiveDeliveryCost !== null,
    };
};

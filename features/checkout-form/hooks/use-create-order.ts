import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { ICartItem } from "@/shared/types";
import { useCart } from "@/shared/stores/cart-store";
import { AppliedPromocode } from "@/shared/stores/cart-store/types/cart-store";
import { getErrorMessage } from "@/shared/utils";
import { createPaymentOrderApi } from "../api/create-payment-order";
import { CheckoutFormType } from "../types/checkout-form.type";

type SubmitOrderParams = {
    formValues: CheckoutFormType;
    products: ICartItem[];
    productTotal: number;
    discountAmount: number;
    deliveryCost: number;
    appliedPromocode: AppliedPromocode | null;
    onClose: () => void;
};

const isFormComplete = (values: CheckoutFormType) => {
    const requiredFields: (keyof CheckoutFormType)[] = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "state",
        "city",
        "zip",
        "address",
    ];

    return requiredFields.every(
        (field) => (values[field]?.trim() ?? "").length > 0,
    );
};

export const useCreateOrder = () => {
    const router = useRouter();
    const clearCart = useCart((state) => state.clearCart);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const submitOrder = useCallback(
        async ({
            formValues,
            products,
            productTotal,
            discountAmount,
            deliveryCost,
            appliedPromocode,
            onClose,
        }: SubmitOrderParams) => {
            if (!isFormComplete(formValues)) {
                setSubmitError("Please fill in all required fields");
                return;
            }

            setIsSubmitting(true);
            setSubmitError(null);

            try {
                const subtotal = productTotal - discountAmount;
                const totalPrice = subtotal + deliveryCost;

                const response = await createPaymentOrderApi({
                    firstName: formValues.firstName.trim(),
                    lastName: formValues.lastName.trim(),
                    name: `${formValues.firstName.trim()} ${formValues.lastName.trim()}`,
                    country: "US",
                    state: formValues.state.trim(),
                    city: formValues.city.trim(),
                    street: formValues.address.trim(),
                    zip: formValues.zip.trim(),
                    phone: formValues.phone.trim(),
                    email: formValues.email.trim(),
                    comment: formValues.comment?.trim() || "",
                    deliveryCost,
                    subtotal,
                    totalPrice,
                    promocode: appliedPromocode?.code ?? "",
                    products: products.map((product) => ({
                        productId: product.id,
                        quantity: product.quantity,
                    })),
                });

                if (!response.ok) {
                    setSubmitError("Failed to create order. Please try again.");
                    return;
                }

                clearCart();
                onClose();
                router.push("/?order_success=true");
            } catch (error) {
                setSubmitError(
                    getErrorMessage(error) ??
                        "Failed to create order. Please try again.",
                );
            } finally {
                setIsSubmitting(false);
            }
        },
        [clearCart, router],
    );

    return {
        isSubmitting,
        submitError,
        submitOrder,
    };
};

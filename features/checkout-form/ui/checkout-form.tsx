"use client";

import { FormGroup } from "@/widget/form-group";
import { CheckoutFormProps } from "../props/checkout-form.props";
import { Button, Input, Textarea } from "@/shared/ui";
import { ButtonMenu } from "@/shared/icons";
import { PromocodeField } from "./promocode-field";
import { CheckoutSummary } from "./checkout-summary";
import { useForm } from "react-hook-form";
import { CheckoutFormType } from "../types/checkout-form.type";
import { useCart } from "@/shared/stores/cart-store";
import { useDeliveryCost } from "../hooks/use-delivery-cost";
import { useCreateOrder } from "../hooks/use-create-order";

export const CheckoutForm = ({
    productTotal,
    discountAmount,
    onClose,
}: CheckoutFormProps) => {
    const { register, getValues, control, handleSubmit } =
        useForm<CheckoutFormType>();

    const products = useCart((state) => state.items);
    const appliedPromocode = useCart((state) => state.appliedPromocode);

    const {
        deliveryCost,
        status,
        error,
        deliveryDisplayValue,
        isOrderEnabled,
    } = useDeliveryCost({
        control,
        getValues,
        products,
    });

    const { isSubmitting, submitError, submitOrder } = useCreateOrder();

    const displayTotal =
        status === "ready" && deliveryCost !== null
            ? productTotal - discountAmount + deliveryCost
            : productTotal - discountAmount;

    const onSubmit = handleSubmit((formValues) => {
        if (deliveryCost === null) {
            return;
        }

        void submitOrder({
            formValues,
            products,
            productTotal,
            discountAmount,
            deliveryCost,
            appliedPromocode,
            onClose,
        });
    });

    const isButtonDisabled = !isOrderEnabled || isSubmitting;
    const buttonLabel = isSubmitting
        ? "Loading..."
        : status === "loading"
          ? "Loading..."
          : "Order now";

    return (
        <div className="flex flex-col h-full min-h-0">
            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1">
                <form
                    id="checkout-form"
                    className="flex flex-col gap-6"
                    onSubmit={onSubmit}
                >
                    <FormGroup title="Contact">
                        <Input
                            placeholder="First name"
                            {...register("firstName")}
                        />

                        <Input
                            placeholder="Last name"
                            {...register("lastName")}
                        />

                        <Input
                            placeholder="Email"
                            type="email"
                            {...register("email")}
                        />

                        <Input
                            placeholder="Phone"
                            type="tel"
                            {...register("phone")}
                        />
                    </FormGroup>

                    <FormGroup title="Address">
                        <Input
                            placeholder="Country"
                            value="United States"
                            disabled
                        />

                        <Input placeholder="State" {...register("state")} />

                        <Input placeholder="City" {...register("city")} />

                        <Input placeholder="ZIP" {...register("zip")} />

                        <Input
                            placeholder="Address"
                            className="col-span-2"
                            {...register("address")}
                        />
                    </FormGroup>

                    <FormGroup title="Comment">
                        <Textarea
                            placeholder="Enter your comment"
                            className="col-span-2"
                            rows={3}
                            {...register("comment")}
                        />
                    </FormGroup>

                    <PromocodeField />
                </form>
            </div>

            <div className="shrink-0 pt-4">
                <CheckoutSummary
                    productTotal={productTotal}
                    deliveryDisplayValue={deliveryDisplayValue}
                    discountAmount={discountAmount}
                    totalPrice={displayTotal}
                />
                {(error || submitError) && (
                    <p className="text-red-500 text-sm mb-3">
                        {submitError ?? error}
                    </p>
                )}
                <Button
                    type="submit"
                    form="checkout-form"
                    icon={<ButtonMenu />}
                    iconPosition="right"
                    size="large"
                    variant="primary"
                    className="w-full"
                    disabled={isButtonDisabled}
                >
                    {buttonLabel}
                </Button>
            </div>
        </div>
    );
};

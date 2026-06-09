"use client";

import { FormGroup } from "@/widget/form-group";
import { CheckoutFormProps } from "../props/checkout-form.props";
import { Button, Input, Textarea } from "@/shared/ui";
import { PromocodeButton } from "./promocode-button";
import { ButtonMenu } from "@/shared/icons";
import { cn, getErrorMessage } from "@/shared/utils";
import { ALEXANDRIA_FONT } from "@/shared/config";
import { useState } from "react";
import { useCart } from "@/shared/stores/cart-store";
import { checkPromocode } from "../api/check-promocode";

export const CheckoutForm = ({
    productTotal,
    deliveryPrice,
    discountAmount,
    totalPrice,
}: CheckoutFormProps) => {
    const appliedPromocode = useCart((state) => state.appliedPromocode);
    const applyPromocode = useCart((state) => state.applyPromocode);
    const clearPromocode = useCart((state) => state.clearPromocode);

    const [promoCode, setPromoCode] = useState("");
    const [promoCodeError, setPromoCodeError] = useState<string | null>(null);
    const [isChecking, setIsChecking] = useState(false);

    const isApplied = appliedPromocode !== null;
    const inputValue = isApplied ? appliedPromocode.code : promoCode;

    const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPromoCode(e.target.value);
        if (promoCodeError) {
            setPromoCodeError(null);
        }
    };

    const handleApply = async () => {
        const code = promoCode.trim();

        if (!code) {
            setPromoCodeError("Enter a promo code");
            return;
        }

        setIsChecking(true);
        setPromoCodeError(null);

        try {
            const { discount } = await checkPromocode(code);
            applyPromocode(code, discount);
            setPromoCode("");
        } catch (error) {
            setPromoCodeError(getErrorMessage(error) ?? "Invalid promo code");
        } finally {
            setIsChecking(false);
        }
    };

    const handlePromocodeAction = () => {
        if (isApplied) {
            clearPromocode();
            setPromoCode("");
            setPromoCodeError(null);
            return;
        }

        void handleApply();
    };

    return (
        <div className="flex flex-col h-full min-h-0">
            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1">
                <form className="flex flex-col gap-6">
                    <FormGroup title="Contact">
                        <Input placeholder="First name" />

                        <Input placeholder="Last name" />

                        <Input placeholder="Email" />

                        <Input placeholder="Phone" />
                    </FormGroup>

                    <FormGroup title="Address">
                        <Input
                            placeholder="Country"
                            value="United States"
                            disabled
                        />

                        <Input placeholder="City" />

                        <Input placeholder="Postal code" />

                        <Input placeholder="Address" />
                    </FormGroup>

                    <FormGroup title="Comment">
                        <Textarea
                            placeholder="Enter your comment"
                            className="col-span-2"
                            rows={3}
                        />
                    </FormGroup>

                    <FormGroup title="Promo Code">
                        <div className="col-span-2 flex flex-col gap-1">
                            <div className="relative">
                                <Input
                                    placeholder="Enter your promo code"
                                    value={inputValue}
                                    onChange={handlePromoCodeChange}
                                    disabled={isApplied || isChecking}
                                />
                                <PromocodeButton
                                    state={isApplied ? "Cancel" : "Apply"}
                                    onClick={handlePromocodeAction}
                                    disabled={isChecking}
                                    className="absolute right-1 top-1/2 -translate-y-1/2"
                                />
                            </div>
                            {promoCodeError && (
                                <p className="text-red-500 text-sm px-2">
                                    {promoCodeError}
                                </p>
                            )}
                        </div>
                    </FormGroup>
                </form>
            </div>

            <div className="shrink-0 pt-4">
                <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between">
                        <p className="text-black/60 mob:text-[18px] text-[14px] leading-[120%]">
                            Product total
                        </p>

                        <p
                            className={cn(
                                ALEXANDRIA_FONT.className,
                                "text-black mob:text-[18px] text-[14px] leading-[120%]",
                            )}
                        >
                            {productTotal}$
                        </p>
                    </div>

                    {discountAmount > 0 && (
                        <div className="flex items-center justify-between">
                            <p className="text-black/60 mob:text-[18px] text-[14px] leading-[120%]">
                                Discount
                            </p>

                            <p
                                className={cn(
                                    ALEXANDRIA_FONT.className,
                                    "text-black mob:text-[18px] text-[14px] leading-[120%]",
                                )}
                            >
                                -{discountAmount}$
                            </p>
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <p className="text-black/60 mob:text-[18px] text-[14px] leading-[120%]">
                            Delivery total
                        </p>

                        <p
                            className={cn(
                                ALEXANDRIA_FONT.className,
                                "text-black mob:text-[18px] text-[14px] leading-[120%]",
                            )}
                        >
                            {deliveryPrice}$
                        </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-black/22 pt-3 mb-5">
                        <p className="text-black/60 mob:text-[18px] text-[14px] leading-[120%]">
                            Total
                        </p>

                        <p
                            className={cn(
                                ALEXANDRIA_FONT.className,
                                "text-black mob:text-[18px] text-[14px] leading-[120%]",
                            )}
                        >
                            {totalPrice}$
                        </p>
                    </div>
                </div>
                <Button
                    icon={<ButtonMenu />}
                    iconPosition="right"
                    size="large"
                    variant="primary"
                    className="w-full"
                >
                    Order now
                </Button>
            </div>
        </div>
    );
};

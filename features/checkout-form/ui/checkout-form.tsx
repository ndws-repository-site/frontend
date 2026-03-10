import { FormGroup } from "@/widget/form-group";
import { CheckoutFormProps } from "../props/checkout-form.props";
import { Button, Input, Textarea } from "@/shared/ui";
import { PromocodeButton } from "./promocode-button";
import { ButtonMenu } from "@/shared/icons";
import { cn } from "@/shared/utils";
import { ALEXANDRIA_FONT } from "@/shared/config";

export const CheckoutForm = ({
    productTotal: _productTotal,
}: CheckoutFormProps) => {
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
                        <div className="relative col-span-2">
                            <Input placeholder="Enter your promo code" />
                            <PromocodeButton
                                state="Apply"
                                className="absolute right-1 top-1/2 -translate-y-1/2"
                            />
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
                            40$
                        </p>
                    </div>

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
                            20$
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
                            60$
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

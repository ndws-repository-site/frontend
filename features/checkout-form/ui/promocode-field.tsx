import { FormGroup } from "@/widget/form-group";
import { Input } from "@/shared/ui";
import { PromocodeButton } from "./promocode-button";
import { useCheckoutPromocode } from "../hooks/use-checkout-promocode";

export const PromocodeField = () => {
    const {
        inputValue,
        isApplied,
        isChecking,
        promoCodeError,
        buttonState,
        onInputChange,
        onAction,
    } = useCheckoutPromocode();

    return (
        <FormGroup title="Promo Code">
            <div className="col-span-2 flex flex-col gap-1">
                <div className="relative">
                    <Input
                        placeholder="Enter your promo code"
                        value={inputValue}
                        onChange={onInputChange}
                        disabled={isApplied || isChecking}
                    />
                    <PromocodeButton
                        state={buttonState}
                        onClick={onAction}
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
    );
};

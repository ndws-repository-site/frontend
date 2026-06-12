import { useState } from "react";
import { useCart } from "@/shared/stores/cart-store";
import { getErrorMessage } from "@/shared/utils";
import { checkPromocode } from "../api/check-promocode";

export const useCheckoutPromocode = () => {
    const appliedPromocode = useCart((state) => state.appliedPromocode);
    const applyPromocode = useCart((state) => state.applyPromocode);
    const clearPromocode = useCart((state) => state.clearPromocode);

    const [promoCode, setPromoCode] = useState("");
    const [promoCodeError, setPromoCodeError] = useState<string | null>(null);
    const [isChecking, setIsChecking] = useState(false);

    const isApplied = appliedPromocode !== null;
    const inputValue = isApplied ? appliedPromocode.code : promoCode;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleAction = () => {
        if (isApplied) {
            clearPromocode();
            setPromoCode("");
            setPromoCodeError(null);
            return;
        }

        void handleApply();
    };

    return {
        inputValue,
        isApplied,
        isChecking,
        promoCodeError,
        buttonState: isApplied ? ("Cancel" as const) : ("Apply" as const),
        onInputChange: handleInputChange,
        onAction: handleAction,
    };
};

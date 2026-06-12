import { cn } from "@/shared/utils";
import { ALEXANDRIA_FONT } from "@/shared/config";
import { CheckoutSummaryProps } from "../props/checkout-summary.props";

type CheckoutSummaryRowProps = {
    label: string;
    value: string;
    className?: string;
};

const CheckoutSummaryRow = ({
    label,
    value,
    className,
}: CheckoutSummaryRowProps) => (
    <div className={cn("flex items-center justify-between", className)}>
        <p className="text-black/60 mob:text-[18px] text-[14px] leading-[120%]">
            {label}
        </p>
        <p
            className={cn(
                ALEXANDRIA_FONT.className,
                "text-black mob:text-[18px] text-[14px] leading-[120%]",
            )}
        >
            {value}
        </p>
    </div>
);

export const CheckoutSummary = ({
    productTotal,
    deliveryDisplayValue,
    discountAmount,
    totalPrice,
}: CheckoutSummaryProps) => (
    <div className="grid grid-cols-1 gap-3">
        <CheckoutSummaryRow label="Product total" value={`${productTotal}$`} />

        {discountAmount > 0 && (
            <CheckoutSummaryRow
                label="Discount"
                value={`-${discountAmount}$`}
            />
        )}

        <CheckoutSummaryRow
            label="Delivery total"
            value={deliveryDisplayValue}
        />

        <CheckoutSummaryRow
            label="Total"
            value={`${totalPrice}$`}
            className="border-t border-black/22 pt-3 mb-5"
        />
    </div>
);

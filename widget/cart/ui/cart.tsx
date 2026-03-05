import { X } from "lucide-react";
import { CartProps } from "../props/cart.props";
import { ALEXANDRIA_FONT, CART_ITEMS_MOCK } from "@/shared/config";
import { CartItem } from "@/entity/cart-item";
import { cn } from "@/shared/utils";
import { Button } from "@/shared/ui";
import { ButtonMenu } from "@/shared/icons";

export const Cart = ({ onClose }: CartProps) => {
    return (
        <div className="flex flex-col h-full min-h-0">
            <div className="flex items-center justify-between mb-7 shrink-0">
                <p className="mob:text-[70px] text-[34px] leading-none text-black">
                    BAG (4)
                </p>

                <button className="cursor-pointer" onClick={onClose}>
                    <X className="w-6.5 h-6.5" />
                </button>
            </div>

            <div className="grid grid-cols-1 gap-0 pb-8 overflow-y-auto min-h-0 flex-1 pr-2 custom-scrollbar">
                {CART_ITEMS_MOCK.map((item, index) => (
                    <CartItem
                        key={index}
                        className="py-4 border-t border-black/22 last:border-b"
                        {...item}
                    />
                ))}
            </div>

            <div className="shrink-0 mt-2.5">
                <div className="flex items-center justify-between mb-5">
                    <p className="text-black/60 mob:text-[18px] text-[14px] leading-[120%]">
                        Estimated total
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

                <Button
                    icon={<ButtonMenu />}
                    className="w-full"
                    iconPosition="right"
                    size="large"
                    variant="primary"
                >
                    Order now
                </Button>
            </div>
        </div>
    );
};

import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItemProps } from "../props/cart-item.props";
import Image from "next/image";
import { cn } from "@/shared/utils";

export const CartItem = ({
    id,
    image,
    name,
    price,
    quantity,
    onChangeQuantity,
    onRemove,
    className,
}: CartItemProps) => {
    return (
        <div className={cn("flex items-start justify-between", className)}>
            <div className="flex items-start gap-5.5">
                <Image
                    src={image}
                    alt={name}
                    width={137}
                    height={137}
                    quality={100}
                    priority
                    unoptimized={false}
                    className="h-full mob:max-h-[170px] max-h-[106px] w-auto object-contain object-center"
                />

                <div className="flex flex-col gap-4">
                    <p className="uppercase text-black mob:text-[30px] text-[22px] leading-none">
                        {name}
                    </p>

                    <div className="flex items-center mob:gap-6 gap-2.5">
                        <p className="text-black/60 mob:text-[18px] text-[14px] leading-[120%]">
                            Quantity
                        </p>

                        <div className="flex items-center gap-3 rounded-full border border-black/22 mob:py-2 py-0.5 mob:px-3 px-2">
                            <button
                                onClick={() =>
                                    onChangeQuantity(id, quantity - 1)
                                }
                                className="cursor-pointer"
                            >
                                <Minus className="w-2.5 h-2.5" />
                            </button>

                            <p className="mob:text-[18px] text-[14px] leading-[120%]">
                                {quantity}
                            </p>

                            <button
                                onClick={() =>
                                    onChangeQuantity(id, quantity + 1)
                                }
                                className="cursor-pointer"
                            >
                                <Plus className="w-2.5 h-2.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-end justify-between h-full">
                <p className="text-black mob:text-[30px] text-[22px] leading-none uppercase">
                    {price}$
                </p>

                <button
                    type="button"
                    onClick={() => onRemove(id)}
                    className="flex items-center gap-1 group cursor-pointer"
                >
                    <p className="mob:text-[18px] text-[14px] text-[#717171] leading-[120%] transition duration-300 ease-in-out group-hover:text-red-500">
                        Delete
                    </p>

                    <Trash2 className="w-4.5 h-4.5 text-[#717171] transition duration-300 ease-in-out group-hover:text-red-500" />
                </button>
            </div>
        </div>
    );
};

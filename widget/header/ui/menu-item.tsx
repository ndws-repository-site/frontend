import { cn } from "@/shared/utils";
import { MenuItemProps } from "../props";
import Link from "next/link";

export const MenuItem = ({
    number,
    title,
    cart,
    href,
    onClick,
    type,
}: MenuItemProps) => {
    const Component = href ? Link : ("button" as const);
    return (
        <Component
            href={href ?? ""}
            onClick={onClick}
            className={cn(
                "border-2 border-white rounded-full p-0.5 flex items-center justify-between gap-1 cursor-pointer",
                type === "menu" ? "bg-black" : "bg-primary",
            )}
        >
            <div className="flex items-center gap-1">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white">
                    {number}
                </div>

                <p className="text-white text-[14px] leading-none">{title}</p>
            </div>

            {cart && (
                <p className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] text-white mr-2.5">
                    {cart}
                </p>
            )}
        </Component>
    );
};

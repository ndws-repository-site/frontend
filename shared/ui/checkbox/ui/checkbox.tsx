import { cn } from "@/shared/utils";
import { CheckboxProps } from "../types/checkbox.props";
import { ALEXANDRIA_FONT } from "@/shared/config";

export const Checkbox = ({
    title,
    checked,
    onChange,
    hover = false
}: CheckboxProps) => {
    return (
        <button onClick={() => onChange(title)} className="flex items-center gap-2.5 cursor-pointer group">
            <div
                className={cn(
                    "w-5.5 h-5.5 border border-black/50 rounded-full flex items-center justify-center transition-all ease duration-300",
                    checked && "border-primary",
                    hover ? "border-primary" : "group-hover:border-primary"
                )}
            >
                <div
                    className={cn(
                        "w-4 h-4 bg-primary rounded-full transition-all ease duration-300 opacity-0",
                        checked && "opacity-100"
                    )}
                />
            </div>

            <p className={
                    cn(
                        ALEXANDRIA_FONT.className,
                        "text-black/50 text-[14px] leading-none font-medium transition-all ease duration-300", 
                        checked && "text-black",
                        hover ? "text-black" : "group-hover:text-black"
                    )
                }
            >
                {title}
            </p>
        </button>
    )
}
import { cn } from "@/shared/utils";
import { WhyWeCardProps } from "../types/why-we-card.props";
import { ALEXANDRIA_FONT } from "@/shared/config";

export const WhyWeCard = ({
    number,
    title,
    icon: Icon
}: WhyWeCardProps) => {
    return (
        <div className="bg-primary rounded-[20px] p-5 relative overflow-hidden min-h-[320px] flex flex-col">
            <div className="flex flex-col justify-between flex-1">
                <p
                    className={cn(
                        ALEXANDRIA_FONT.className,
                        "text-white text-[40px] leading-[120%] relative z-10"
                    )}
                >
                    {number}
                </p>

                <p
                    className={cn(
                        ALEXANDRIA_FONT.className,
                        "text-white text-[20px] leading-[120%] max-w-[332px] font-light relative z-10"
                    )}
                >
                    {title}
                </p>
            </div>

            <div className="absolute right-0 top-0 bottom-0 flex items-center justify-end">
                <div className="h-full [&>svg]:h-full [&>svg]:w-auto [&>svg]:block">
                    <Icon />
                </div>
            </div>
        </div>
    )
}
import { cn } from "@/shared/utils"
import { ReviewProps } from "../types/review.props"
import Image from "next/image"
import { ALEXANDRIA_FONT } from "@/shared/config"
import { TriangleReview } from "../icons/triangle-review"
import { QuotationMarks } from "../icons/quotation-marks"

export const Review = ({
    avatar,
    name,
    sport,
    review,
    className=""
}: ReviewProps) => {
    return (
        <div className={cn('', className)}>
            <div className="flex items-start gap-4.5 pl-[10px]">
                <Image 
                    src={avatar}
                    alt={name}
                    width={42}
                    height={42}
                    sizes="100px"
                    quality={100}
                    className="rounded-full w-10.5 h-10.5 object-cover object-top"
                />

                <div className={cn("flex flex-col justify-between text-[#636363] leading-[120%]", ALEXANDRIA_FONT.className)}>
                    <p className="text-[20px]">
                        {name}
                    </p>

                    <p className="font-light">
                        {sport}
                    </p>
                </div>

            </div>
            <div className="mt-1.5 relative">
                <TriangleReview />

                <div className="absolute top-[40px] left-4.5">
                    <QuotationMarks />
                    <p className={cn(ALEXANDRIA_FONT.className, "mt-3 max-w-[318px] text-black/70 font-light text-[16px] leading-[120%]")}>
                        {review}
                    </p>
                </div>
            </div>
        </div>
    )
}
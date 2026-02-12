import { cn } from "@/shared/utils";
import { ProductCardProps } from "../types/product-card.props";
import Link from "next/link";
import { Button } from "@/shared/ui";
import { Blocks } from "@/shared/icons";
import Image from "next/image";

export const ProductCard = ({
    name,
    image,
    slug,
    loading = false,
    className
}: ProductCardProps) => {
    if (loading) {
        return (
            <div className={cn("bg-white px-3.5 pt-3.5 rounded-[25px] min-h-[420px]", className)}>
                <div className="flex items-center justify-between mb-6.5">
                    <div className="h-[60px] w-48 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="h-12 w-28 bg-gray-200 rounded-full animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <div className={cn("bg-white px-3.5 pt-3.5 rounded-[25px]", className)}>
            <div className="flex items-center justify-between mb-6.5">
                <p className="text-black uppercase text-[60px] leading-none">
                    {name}
                </p>

                <Link href={`/product/${slug}`}>
                    <Button icon={<Blocks />} iconPosition="right" variant="primary" size="large">
                        See more
                    </Button>
                </Link>
            </div>

            <div className="relative w-full flex items-center justify-center">
                <div className="w-[50%]">
                    <Image
                        src={image}
                        alt={name}
                        width={400}
                        height={400}
                        quality={100}
                        className="object-contain object-center w-full h-auto"
                    />
                </div>
            </div>
        </div>
    );
}
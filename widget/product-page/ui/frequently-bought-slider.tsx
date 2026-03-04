"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "@/entity/product-card";
import type { IProduct } from "@/shared/types";
import "swiper/css";

interface FrequentlyBoughtSliderProps {
    products: IProduct[];
}

export const FrequentlyBoughtSlider = ({
    products,
}: FrequentlyBoughtSliderProps) => {
    if (!products.length) return null;

    return (
        <Swiper
            spaceBetween={10}
            slidesPerView={1.05}
            breakpoints={{
                768: {
                    slidesPerView: 2,
                    spaceBetween: 8,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
            }}
            className="w-full"
        >
            {products.map((product, index) => (
                <SwiperSlide key={index}>
                    <ProductCard {...product} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

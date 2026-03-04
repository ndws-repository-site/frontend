"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { ProductSliderProps } from "../props";
import { ARROW_CLASS, ARROW_ICON_CLASS, IMAGE_IDLE_ANIMATION } from "../config";

export const ProductSlider = ({ images }: ProductSliderProps) => {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    return (
        <div className="w-full relative">
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] blur-[200px] rounded-full"
                style={{
                    background:
                        "linear-gradient(135deg, #36653F 0%, #6DCB7D 100%)",
                }}
            />

            <Swiper
                modules={[Navigation]}
                navigation={true}
                onSwiper={(swiper: SwiperType) => {
                    requestAnimationFrame(() => {
                        if (prevRef.current && nextRef.current) {
                            (
                                swiper.params.navigation as {
                                    prevEl?: HTMLElement;
                                    nextEl?: HTMLElement;
                                }
                            ).prevEl = prevRef.current;
                            (
                                swiper.params.navigation as {
                                    prevEl?: HTMLElement;
                                    nextEl?: HTMLElement;
                                }
                            ).nextEl = nextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }
                    });
                }}
                spaceBetween={0}
                slidesPerView={1}
                className="w-full"
                loop={images.length > 1}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex items-center justify-center min-h-[300px] md:min-h-[400px]">
                            <motion.div
                                className="w-full flex justify-center"
                                animate={{
                                    y: [...IMAGE_IDLE_ANIMATION.animate.y],
                                }}
                                transition={IMAGE_IDLE_ANIMATION.transition}
                            >
                                <Image
                                    src={image}
                                    alt={`Product image ${index + 1}`}
                                    width={592}
                                    height={619}
                                    quality={100}
                                    draggable={false}
                                    className="w-full h-auto max-h-[619px] object-contain"
                                />
                            </motion.div>
                        </div>
                    </SwiperSlide>
                ))}

                <button
                    ref={prevRef}
                    type="button"
                    className={ARROW_CLASS.left}
                    aria-label="Previous slide"
                >
                    <ChevronLeft className={ARROW_ICON_CLASS} strokeWidth={2} />
                </button>
                <button
                    ref={nextRef}
                    type="button"
                    className={ARROW_CLASS.right}
                    aria-label="Next slide"
                >
                    <ChevronRight
                        className={ARROW_ICON_CLASS}
                        strokeWidth={2}
                    />
                </button>
            </Swiper>
        </div>
    );
};

'use client'

import { REVIEW_DATA } from "../config/review"
import { Review } from "./review"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCreative } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-creative"
import { SLIDE_COUNT } from "../config/slider.config"

export const Reviews = () => {
    return (
        <section className="pt-22.5 pb-32 w-full overflow-hidden">
            <h2 className="text-center text-black text-[60px] leading-[110%] uppercase mb-12">
                We are chosen by those who<br/> train regularly
            </h2>

            <Swiper
                modules={[EffectCreative]}
                effect="creative"
                grabCursor
                centeredSlides
                slidesPerView="auto"
                initialSlide={2}
                creativeEffect={{
                    limitProgress: 3,
                    perspective: true,
                    prev: {
                        shadow: false,
                        translate: ["-120%", 55, -100],
                        rotate: [0, 0, -12], 
                        origin: "center center",
                    },
                    next: {
                        shadow: false,
                        translate: ["120%", 55, -100],
                        rotate: [0, 0, 12],
                        origin: "center center",
                    },
                }}
                className="overflow-visible!"
            >
                {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
                    <SwiperSlide key={index} style={{ width: 380 }} className="h-auto">
                        <div className="select-none transition-transform duration-300">
                            <Review {...REVIEW_DATA} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
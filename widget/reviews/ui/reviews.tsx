"use client";

import { useEffect, useState } from "react";
import { Review } from "./review";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import { cn } from "@/shared/utils";
import { BOUNDED_FONT } from "@/shared/config";
import { useGetReviews } from "../api";

export const Reviews = () => {
    const { data: reviews = [] } = useGetReviews();
    const [isStraightSwiper, setIsStraightSwiper] = useState(true);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 500px)");
        const update = () => setIsStraightSwiper(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    if (reviews.length === 0) return null;
    if (!reviews) return null;

    return (
        <section
            id="reviews"
            className="scroll-mt-28 lg:pt-22.5 pt-13 lg:pb-32 mob:pb-20 pb-5 w-full overflow-hidden"
        >
            <h2
                className={cn(
                    BOUNDED_FONT.className,
                    "text-center text-black lg:text-[60px] mob:text-[40px] text-[24px] leading-[110%] uppercase mb-12",
                )}
            >
                We are chosen by those who
                <br /> train regularly
            </h2>

            <Swiper
                key={isStraightSwiper ? "slide" : "creative"}
                modules={isStraightSwiper ? [] : [EffectCreative]}
                effect={isStraightSwiper ? "slide" : "creative"}
                grabCursor
                centeredSlides
                slidesPerView="auto"
                initialSlide={2}
                creativeEffect={
                    isStraightSwiper
                        ? undefined
                        : {
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
                          }
                }
                className="overflow-visible!"
            >
                {reviews.map((review) => (
                    <SwiperSlide
                        key={review.id}
                        style={{ width: 380 }}
                        className="h-auto"
                    >
                        <div className="select-none transition-transform duration-300">
                            <Review
                                avatar={review.avatar}
                                name={review.name}
                                sport={review.whoIs}
                                review={review.review}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

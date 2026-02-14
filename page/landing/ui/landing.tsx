import { BrandPhilosophy } from "@/widget/brand-philosophy";
import { Founder } from "@/widget/founder";
import { Hero } from "@/widget/hero";
import { PRODUCTS, ProductBlock } from "@/widget/product-block";
import { Reviews } from "@/widget/reviews";
import { WhyWeAndProduction } from "@/widget/why-we-and-production";
import { StartToday } from "@/widget/start-today";

export const Landing = () => {
    return (
        <main className="flex flex-col gap-3">
            <Hero />
            {PRODUCTS.map((props) => (
                <ProductBlock key={props.product} {...props} />
            ))}
            <div className="relative">
                <div className="sticky top-0 z-0">
                    <BrandPhilosophy />
                </div>
                <div className="relative -bottom-0.5 z-10">
                    <WhyWeAndProduction />
                </div>
            </div>
            <Founder />
            <Reviews />
            <StartToday />
        </main>
    );
};

import { BrandPhilosophy } from "@/widget/brand-philosophy";
import { Founder } from "@/widget/founder";
import { Hero } from "@/widget/hero";
import { Reviews } from "@/widget/reviews";
import { WhyWeAndProduction } from "@/widget/why-we-and-production";
import { StartToday } from "@/widget/start-today";
import { ProductsBlock } from "./products-block";

export const Landing = () => {
    return (
        <main className="flex flex-col gap-3">
            <Hero />
            <ProductsBlock />
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

import { RoundedBlock } from "@/shared/ui";
import { ProductPageProps } from "../props";
import { ProductSlider } from "./product-slider";
import { ProductRightCard } from "./product-right-card";
import { FrequentlyBoughtSlider } from "./frequently-bought-slider";
import { Faq } from "./faq";

export const ProductPage = ({
    images,
    name,
    description,
    price,
    id,
    forWho,
    howToUse,
    ingredients,
    faq,
    recommendedProducts,
}: ProductPageProps) => {
    return (
        <section>
            <RoundedBlock className="bg-black min-h-screen pt-[123px] mb-2.5">
                <div className="flex lg:flex-row flex-col lg:gap-25 gap-10 lg:px-10 px-2.5 mob:mb-27.5 mb-23">
                    <div className="w-full lg:w-1/2">
                        <ProductSlider images={images} />
                    </div>

                    <div className="w-full lg:w-1/2">
                        <ProductRightCard
                            id={id}
                            name={name}
                            price={price}
                            description={description}
                            forWho={forWho}
                            howToUse={howToUse}
                            ingredients={ingredients}
                        />
                    </div>
                </div>

                <div className="px-2.5 pb-3 overflow-hidden">
                    <h1 className="text-white uppercase lg:text-[40px] mob:text-[24px] text-[20px] lg:mb-10 mob:mb-8 mb-5.5 leading-none">
                        Frequently Bought Together
                    </h1>

                    <FrequentlyBoughtSlider products={recommendedProducts} />
                </div>
            </RoundedBlock>

            <Faq title={`FAQ - ${name}`} faq={faq} />
        </section>
    );
};

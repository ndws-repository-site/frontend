import { RoundedBlock } from "@/shared/ui";
import { FaqProps } from "../props";
import { FaqItem } from "./faq-item";

export const Faq = ({ title, faq }: FaqProps) => {
    const mid = Math.ceil(faq.length / 2);
    const leftColumn = faq.slice(0, mid);
    const rightColumn = faq.slice(mid);

    return (
        <RoundedBlock className="bg-black mob:py-8 py-5.5 px-4.5">
            <h1 className="text-white uppercase lg:text-[40px] mob:text-[24px] text-[20px] lg:mb-10 mob:mb-8 mb-5.5 leading-none">
                {title}
            </h1>

            <div className="grid mob:grid-cols-2 grid-cols-1 gap-2.5">
                <div className="flex flex-col gap-2.5">
                    {leftColumn.map((item, index) => (
                        <FaqItem key={index} {...item} />
                    ))}
                </div>
                <div className="flex flex-col gap-2.5">
                    {rightColumn.map((item, index) => (
                        <FaqItem key={index + mid} {...item} />
                    ))}
                </div>
            </div>
        </RoundedBlock>
    );
};

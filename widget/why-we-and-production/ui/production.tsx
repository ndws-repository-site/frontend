import { Tag, Text } from "@/shared/ui";
import { TEXT_PRODUCTION_CLASSES } from "../config/text-production-classes";

export const Production = () => {
    return (
        <div className="mob:mb-13.5 mb-8">
            <Tag variant="gray" className="w-fit mb-6.5">
                Production and quality
            </Tag>

            <h3 className="text-black leading-[110%] lg:text-[60px] mob:text-[40px] text-[24px] lg:mb-10 mob:mb-6 mb-5.5 uppercase">
                Every NDWS product undergoes<br/> strict quality control.
            </h3>

            <div className="grid lg:grid-cols-3 mob:grid-cols-2 grid-cols-1 lg:gap-12 mob:gap-5.5 gap-3">
                <div className="hidden lg:block" />

                <Text size="medium" className={TEXT_PRODUCTION_CLASSES}>
                    Every NDWS product undergoes strict quality control. Our goal is to ensure that you feel confident about what you consume every day.
                </Text>

                <Text size="medium" className={TEXT_PRODUCTION_CLASSES}>
                    We work only with trusted manufacturing facilities in Florida and use raw materials that meet international standards.
                </Text>
            </div>
        </div>
    )
}
import { Tag, Text } from "@/shared/ui";

export const Production = () => {
    return (
        <div className="mb-13.5">
            <Tag variant="gray" className="w-fit mb-6.5">
                Production and quality
            </Tag>

            <h3 className="text-black leading-[110%] text-[60px] mb-10 uppercase">
                Every NDWS product undergoes<br/> strict quality control.
            </h3>

            <div className="grid grid-cols-3 gap-12">
                <div />

                <Text size="medium" className="text-[#636363]! font-light">
                    Every NDWS product undergoes strict quality control. Our goal is to ensure that you feel confident about what you consume every day.
                </Text>

                <Text size="medium" className="text-[#636363]! font-light">
                    We work only with trusted manufacturing facilities in Florida and use raw materials that meet international standards.
                </Text>
            </div>
        </div>
    )
}
import { RoundedBlock } from "@/shared/ui";
import { cn } from "@/shared/utils";

import { WhyWe } from "./why-we";
import { Production } from "./production";
import { WhyWeAndProductionProps } from "../types/why-we-and-production.props";

export const WhyWeAndProduction = ({
    className=""
}: WhyWeAndProductionProps) => {
    return (
        <RoundedBlock className={cn("p-2.5 bg-white", className)}>
            <WhyWe />
            <Production />
        </RoundedBlock>
    )
}
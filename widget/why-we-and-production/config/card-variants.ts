import { CardVariants } from "../types/card-variants";
import { Transition } from "framer-motion";

export const cardVariants: CardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: "easeOut" as Transition["ease"],
        },
    }),
};

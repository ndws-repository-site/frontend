import type { TargetAndTransition } from "framer-motion";

export type CardVariants = {
    hidden: TargetAndTransition,
    visible: (i: number) => TargetAndTransition
}   
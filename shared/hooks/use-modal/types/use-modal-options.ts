import { ModelMode } from "@/widget/modal";
import { ReactNode } from "react";

export interface UseModalControls {
    close: () => void;
    open: () => void;
    toggle: () => void;
}

export type UseModalChildren =
    | ReactNode
    | ((controls: UseModalControls) => ReactNode);

export interface UseModalOptions {
    mode: ModelMode;
    className?: string;
    children: UseModalChildren;
}

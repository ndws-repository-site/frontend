import { ModelMode } from "../types";

export interface ModalProps {
    active: boolean;
    children: React.ReactNode;
    mode: ModelMode;
    className?: string;
    onClose?: () => void;
}

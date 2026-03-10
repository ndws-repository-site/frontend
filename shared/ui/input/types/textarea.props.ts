import type { TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Дополнительные классы для корневого textarea */
    className?: string;
}

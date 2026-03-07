import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    /** Дополнительные классы для корневого input */
    className?: string;
}

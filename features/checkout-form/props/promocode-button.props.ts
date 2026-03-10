import { ButtonHTMLAttributes } from "react";

export interface PromocodeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    state: "Apply" | "Cancel";
}

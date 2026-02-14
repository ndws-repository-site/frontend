import React from "react";
import { MenuBlockProps } from "../types/menu-block.props";

export const MenuBlock: React.FC<MenuBlockProps> = (props) => (
    <svg
        width="18"
        height="12"
        viewBox="0 0 18 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect width="18" height="2.25" rx="1.125" fill="#222222" />
        <rect y="4.5" width="18" height="2.25" rx="1.125" fill="#222222" />
        <rect y="9" width="18" height="2.25" rx="1.125" fill="#222222" />
    </svg>
);

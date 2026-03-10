import * as React from "react";

export const CartBag: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M2.96262 11.881C2.3639 9.08695 2.06454 7.68994 2.815 6.76163C3.56546 5.83333 4.99418 5.83333 7.85163 5.83333H12.1484C15.0059 5.83333 16.4346 5.83333 17.1851 6.76163C17.9355 7.68994 17.6362 9.08695 17.0374 11.881L16.6803 13.5476C16.2745 15.4414 16.0716 16.3883 15.384 16.9442C14.6965 17.5 13.7281 17.5 11.7913 17.5H8.20877C6.27199 17.5 5.3036 17.5 4.61604 16.9442C3.92848 16.3883 3.72557 15.4414 3.31976 13.5476L2.96262 11.881Z"
            stroke="black"
            strokeWidth="1.5"
        />
        <path
            d="M2.5 9.16667H17.5"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M8.33331 11.6667H11.6666"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M15 7.5L12.5 2.5"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M5 7.5L7.5 2.5"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

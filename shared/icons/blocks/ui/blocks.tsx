import React from "react";
import { BlocksProps } from "../types/blocks.props";

export const Blocks: React.FC<BlocksProps> = (props) => (
    <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect x="0.00012207" width="5.68513" height="5.68513" rx="1.42128" fill="black" />
        <rect x="8.52747" width="5.68513" height="5.68513" rx="1.42128" fill="black" />
        <rect x="8.52747" y="8.52771" width="5.68513" height="5.68513" rx="1.42128" fill="black" />
        <rect y="8.52771" width="5.68513" height="5.68513" rx="1.42128" fill="black" />
    </svg>
);
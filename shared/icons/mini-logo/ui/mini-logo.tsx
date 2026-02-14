import { MiniLogoProps } from "../types/mini-logo.props";

export const MiniLogo = (props: MiniLogoProps) => (
    <svg
        width={23}
        height={25}
        viewBox="0 0 23 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect
            x="0.40625"
            width="9.60591"
            height="9.60591"
            rx="2.40148"
            fill="white"
        />
        <rect
            x="0.40625"
            y="14.4087"
            width="9.60591"
            height="9.60591"
            rx="2.40148"
            fill="white"
        />
        <rect
            x="13"
            y="7"
            width="9.60591"
            height="9.60591"
            rx="2.40148"
            fill="white"
        />
    </svg>
);

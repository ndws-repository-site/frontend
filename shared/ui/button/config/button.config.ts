export const BUTTON_ICON_PADDING = "4px";

export const buttonVariantStyles = {
    primary: {
        container: "bg-primary text-white",
        circle: "bg-white [&_svg_*]:fill-black",
    },
    outline: {
        container: "bg-black border border-white text-white",
        circle: "bg-white [&_svg_*]:fill-black",
    },
    secondary: {
        container: "bg-white text-black",
        circle: "bg-primary [&_svg_*]:fill-white",
    },
    white: {
        container: "bg-white text-black",
        circle: "bg-black [&_svg_*]:fill-white",
    },
} as const;

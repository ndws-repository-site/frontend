const ARROW_BASE_CLASS =
    "absolute top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:opacity-80 transition-opacity cursor-pointer";
export const ARROW_CLASS: Record<"left" | "right", string> = {
    left: `${ARROW_BASE_CLASS} left-0`,
    right: `${ARROW_BASE_CLASS} right-0`,
};
export const ARROW_ICON_CLASS = "w-8 h-8 md:w-10 md:h-10";

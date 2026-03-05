import type { TabsType } from "../types";

export const TAB_ITEMS: { id: TabsType; label: string }[] = [
    { id: "forWho", label: "For whom" },
    { id: "howToUse", label: "How to use" },
    { id: "ingredients", label: "Ingredients" },
];

export const TAB_ORDER: TabsType[] = TAB_ITEMS.map((item) => item.id);

/** Фиксированная позиция пилюли; сдвиг только через transform для GPU на iOS */
export const PILL_BASE_CLASS = "left-[4px] w-[calc((100%-8px)/3)]";

/** Смещение пилюли через translateX — анимация без reflow, плавно на iPhone */
export const PILL_TRANSLATE_CLASS: Record<TabsType, string> = {
    forWho: "translate-x-0",
    howToUse: "translate-x-[100%]",
    ingredients: "translate-x-[200%]",
};

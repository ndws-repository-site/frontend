import type { TabsType } from "../types";

export const TAB_ITEMS: { id: TabsType; label: string }[] = [
    { id: "forWho", label: "For whom" },
    { id: "howToUse", label: "How to use" },
    { id: "ingredients", label: "Ingredients" },
];

export const TAB_ORDER: TabsType[] = TAB_ITEMS.map((item) => item.id);

/** Только left в calc — одна анимируемая величина, плавная интерполяция */
export const PILL_LEFT_CLASS: Record<TabsType, string> = {
    forWho: "left-[4px]",
    howToUse: "left-[calc(4px+(100%-8px)/3)]",
    ingredients: "left-[calc(4px+2*(100%-8px)/3)]",
};

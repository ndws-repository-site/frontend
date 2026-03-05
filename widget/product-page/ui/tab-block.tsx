"use client";

import { AnimatePresence } from "framer-motion";
import type { TabBlockProps } from "../props";
import { TabPill } from "./tab-pill";
import { TabTrigger } from "./tab-trigger";
import { TabContentSlide } from "./tab-content-slide";
import { TAB_UNDER_TEXT_CLASS, TAB_ITEMS } from "../config";
import { useTabSwitch } from "../lib/use-tab-switch";
import { IngredientItem } from "./ingredient-item";

export const TabBlock = ({ forWho, howToUse, ingredients }: TabBlockProps) => {
    const { currentTab, goToTab, direction } = useTabSwitch();

    return (
        <div>
            <div className="relative p-1 grid grid-cols-3 bg-black rounded-full mb-5">
                <TabPill currentTab={currentTab} />
                {TAB_ITEMS.map(({ id, label }) => (
                    <TabTrigger
                        key={id}
                        label={label}
                        isActive={currentTab === id}
                        onClick={() => goToTab(id)}
                    />
                ))}
            </div>

            <div className="relative min-h-[140px] overflow-x-hidden overflow-y-visible">
                <AnimatePresence mode="wait" initial={false}>
                    {currentTab === "forWho" && (
                        <TabContentSlide
                            key="forWho"
                            direction={direction}
                            className="w-full"
                        >
                            <p className={TAB_UNDER_TEXT_CLASS}>{forWho}</p>
                        </TabContentSlide>
                    )}
                    {currentTab === "howToUse" && (
                        <TabContentSlide
                            key="howToUse"
                            direction={direction}
                            className="w-full"
                        >
                            <p className={TAB_UNDER_TEXT_CLASS}>{howToUse}</p>
                        </TabContentSlide>
                    )}
                    {currentTab === "ingredients" && (
                        <TabContentSlide
                            key="ingredients"
                            direction={direction}
                            className="w-full"
                        >
                            <div className="grid mob:grid-cols-2 grid-cols-1 gap-x-3.5">
                                {ingredients.map((ingredient, index) => (
                                    <IngredientItem
                                        key={index}
                                        title={ingredient.title}
                                        description={ingredient.description}
                                        showBottomBorder={
                                            index >= ingredients.length - 2
                                        }
                                    />
                                ))}
                            </div>
                        </TabContentSlide>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

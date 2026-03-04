"use client";

import { useState, useCallback } from "react";
import type { TabsType } from "../types";
import { TAB_ORDER } from "../config";

export const useTabSwitch = (initialTab: TabsType = "forWho") => {
    const [currentTab, setCurrentTab] = useState<TabsType>(initialTab);
    const [direction, setDirection] = useState(0);

    const goToTab = useCallback(
        (nextTab: TabsType) => {
            const fromIdx = TAB_ORDER.indexOf(currentTab);
            const toIdx = TAB_ORDER.indexOf(nextTab);
            setDirection(toIdx > fromIdx ? 1 : -1);
            setCurrentTab(nextTab);
        },
        [currentTab],
    );

    return { currentTab, goToTab, direction };
};

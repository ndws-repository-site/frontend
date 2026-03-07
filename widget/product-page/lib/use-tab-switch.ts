"use client";

import { useState, useCallback } from "react";
import type { TabsType } from "../types";

export const useTabSwitch = (initialTab: TabsType = "forWho") => {
    const [currentTab, setCurrentTab] = useState<TabsType>(initialTab);

    const goToTab = useCallback((nextTab: TabsType) => {
        setCurrentTab(nextTab);
    }, []);

    return { currentTab, goToTab };
};

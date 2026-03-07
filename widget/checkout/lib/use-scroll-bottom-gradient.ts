"use client";

import { useRef, useState, useCallback, useEffect } from "react";

const SCROLL_THRESHOLD = 4;

export const useScrollBottomGradient = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showBottomGradient, setShowBottomGradient] = useState(false);

    const updateGradient = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;

        const { scrollTop, scrollHeight, clientHeight } = el;
        const hasOverflow = scrollHeight > clientHeight;
        const isAtBottom =
            scrollHeight - scrollTop - clientHeight < SCROLL_THRESHOLD;

        setShowBottomGradient(hasOverflow && !isAtBottom);
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        queueMicrotask(updateGradient);
        const observer = new ResizeObserver(updateGradient);
        observer.observe(el);

        return () => observer.disconnect();
    }, [updateGradient]);

    return { scrollRef, showBottomGradient, onScroll: updateGradient };
};

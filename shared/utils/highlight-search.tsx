import type { ReactNode } from "react";

/**
 * Разбивает текст на части по совпадению с highlight и возвращает React-элементы
 * с подсветкой (совпадающие части — белые, остальные — серые).
 * Используется в строках админ-таблиц для подсветки результатов поиска.
 */
export function highlightSearchText(
    text: string,
    highlight: string,
): ReactNode {
    if (!highlight.trim()) {
        return <span className="text-white">{text}</span>;
    }
    const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escaped})`, "gi"));
    return (
        <span>
            {parts.map((part, i) => {
                const isMatch = part.toLowerCase() === highlight.toLowerCase();
                return (
                    <span
                        key={i}
                        className={isMatch ? "text-white" : "text-gray-500"}
                    >
                        {part}
                    </span>
                );
            })}
        </span>
    );
}

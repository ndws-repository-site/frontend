/** Полное имя для заголовка (печатается первым) */
export const FOUNDER_TITLE = "EDIL KASENOV";

/** Части подзаголовка: слово с точкой печатается целиком, потом пауза */
export const SUBTITLE_PARTS = ["Athlete.", " Entrepreneur.", " Man of discipline."] as const;

/** Готовая строка подзаголовка */
export const FULL_SUBTITLE = SUBTITLE_PARTS.join("");

/** Задержка между символами при печати (мс) */
export const CHAR_DELAY_MS = 60;

/** Пауза после каждой части подзаголовка (мс) */
export const PAUSE_AFTER_PART_MS = 100;

/** Текст цитаты (absolute), печатается после подзаголовка */
export const QUOTE_TEXT =
    '"I created this brand because I live for sports. And I know how difficult it is to find a product you can trust. NDWS is what I use myself, and I am ready to recommend it to those who train seriously."';

/** Задержка между символами при печати цитаты (мс) — быстрее основного текста */
export const QUOTE_CHAR_DELAY_MS = 20;

/** Индексы концов частей подзаголовка (кумулятивно) для пауз */
export const SUBTITLE_PART_END_INDEXES: number[] = (() => {
    let acc = 0;
    return SUBTITLE_PARTS.map((part) => {
        acc += part.length;
        return acc;
    });
})();

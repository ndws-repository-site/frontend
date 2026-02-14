import type { ReactNode } from "react";

export interface AdminTableColumn {
    /** Заголовок колонки */
    header: string;
    /** Выравнивание (по умолчанию left) */
    align?: "left" | "right";
}

export interface AdminTableProps {
    /** Заголовки колонок */
    columns: AdminTableColumn[];
    /** CSS класс для grid-сетки (должен совпадать с row-компонентами) */
    gridClassName: string;
    /** Состояние загрузки — показывается скелетон */
    isLoading: boolean;
    /** Количество элементов (для отображения пустого состояния) */
    itemsCount: number;
    /** Дочерние элементы — строки таблицы */
    children: ReactNode;
    /** Термин поиска — влияет на сообщение пустого состояния */
    searchTerm?: string;
    /** Сообщение когда список пуст (без поиска) */
    emptyMessage?: string;
    /** Сообщение когда поиск не дал результатов */
    emptySearchMessage?: string;
    /** Минимальная ширина таблицы (для горизонтального скролла) */
    minWidth?: string;
    /** Количество скелетон-строк при загрузке */
    skeletonCount?: number;
}

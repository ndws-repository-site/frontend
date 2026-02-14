export interface AdminPaginationProps {
    /** Текущая страница (1-based) */
    currentPage: number;
    /** Общее количество страниц */
    totalPages: number;
    /** Обработчик смены страницы */
    onPageChange: (page: number) => void;
    /** Дополнительные классы */
    className?: string;
}

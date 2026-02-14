export interface AdminMultiFileUploadProps {
    className?: string;
    /** Текст-плейсхолдер для кнопки добавления */
    placeholder?: string;
    /** Типы файлов (по умолчанию "image/*") */
    accept?: string;
    /** Вариант дизайна */
    variant?: "standard" | "alternative";
    /** Текст ошибки */
    error?: string;
    /** Текущий список файлов/URL (File — новые, string — существующие URL) */
    value?: (File | string)[];
    /** Колбек при изменении списка */
    onChange?: (files: (File | string)[]) => void;
    name?: string;
    disabled?: boolean;
    /** Максимальное количество изображений (0 = без ограничений) */
    maxFiles?: number;
}

import { cn } from "@/shared/utils";

/**
 * Группа полей формы: заголовок (title) и дочерние элементы.
 */
export const AdminFormGroup = ({
    title,
    children,
    className = "",
}: {
    title: string;
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn(className)}>
            <p className="text-white leading-[112%] mb-4">{title}</p>

            {children}
        </div>
    );
};

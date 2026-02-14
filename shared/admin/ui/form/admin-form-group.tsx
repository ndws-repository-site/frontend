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
        <div>
            <p className="text-white leading-[112%] mb-4">{title}</p>

            <div className={cn(className)}>{children}</div>
        </div>
    );
};

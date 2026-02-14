import { Loader2 } from "lucide-react";

interface AdminLoadingProps {
    title?: string;
}

export const AdminLoading = ({
    title = "Загрузка данных...",
}: AdminLoadingProps) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full gap-4 text-white">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-white/70">{title}</p>
        </div>
    );
};

"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useCallback,
    useEffect,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { isAxiosError } from "axios";

export interface ConfirmOptions {
    title: ReactNode;
    description?: ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void | Promise<void>;
}

interface ConfirmContextType {
    confirm: (options: ConfirmOptions) => void;
    close: () => void;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

/**
 * Хук для вызова модального подтверждения (например, перед удалением).
 * Использование: const { confirm } = useConfirm(); confirm({ title: 'Удалить?', onConfirm: async () => { ... } });
 */
export const useConfirm = () => {
    const context = useContext(ConfirmContext);
    if (!context) {
        throw new Error("useConfirm must be used within a ConfirmProvider");
    }
    return context;
};

/**
 * Провайдер модального окна подтверждения. Оборачивает дерево, в котором используется useConfirm.
 */
export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<ConfirmOptions>({
        title: "",
        onConfirm: () => {},
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const confirm = useCallback((opts: ConfirmOptions) => {
        setOptions(opts);
        setError(null);
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
        setIsLoading(false);
        setError(null);
    }, []);

    const handleConfirm = async () => {
        setIsLoading(true);
        setError(null);

        try {
            await options.onConfirm();
            close();
        } catch (e: unknown) {
            console.error(e);
            setIsLoading(false);

            let errorMessage = "Произошла неизвестная ошибка";

            if (isAxiosError(e) && e.response?.data) {
                const msg = e.response.data.message;
                errorMessage = Array.isArray(msg)
                    ? msg.join(", ")
                    : String(msg);
            } else if (e instanceof Error) {
                errorMessage = e.message;
            } else if (typeof e === "string") {
                errorMessage = e;
            }

            setError(errorMessage);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isOpen && event.key === "Escape") {
                close();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, close]);

    return (
        <ConfirmContext.Provider value={{ confirm, close }}>
            {children}

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={close}
                            className="absolute inset-0 bg-black/60 cursor-pointer"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative bg-white w-full max-w-[440px] rounded-3xl p-8 text-center shadow-2xl overflow-hidden cursor-default"
                        >
                            <div className="mb-8 flex flex-col gap-2">
                                <h3 className="text-[22px] leading-tight font-bold text-[#1A1B1E]">
                                    {options.title}
                                </h3>
                                {options.description && (
                                    <div className="text-[#656565] text-lg font-medium">
                                        {options.description}
                                    </div>
                                )}
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="mb-6 bg-red-50 text-red-500 px-4 py-3 rounded-xl text-sm font-medium border border-red-100"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={handleConfirm}
                                    disabled={isLoading}
                                    className="
                                        h-[52px] rounded-full border-[1.5px] border-[#1A1B1E]
                                        text-[#1A1B1E] font-bold text-base
                                        transition-all duration-200
                                        hover:bg-gray-100 active:scale-95
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                        cursor-pointer
                                    "
                                >
                                    {isLoading
                                        ? "..."
                                        : (options.confirmText ?? "Удалить")}
                                </button>
                                <button
                                    onClick={close}
                                    disabled={isLoading}
                                    className="
                                        h-[52px] rounded-full bg-[#1A1B1E]
                                        text-white font-bold text-base
                                        transition-all duration-200
                                        hover:bg-[#333333] active:scale-95
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                        cursor-pointer
                                    "
                                >
                                    {options.cancelText ?? "Отменить"}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </ConfirmContext.Provider>
    );
};

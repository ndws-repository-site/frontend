import { useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/utils";
import { ModalProps } from "../props";
import { overlayTransition, contentTransition } from "../config";

export const Modal = ({ children, mode, className, onClose }: ModalProps) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose?.();
        };
        if (onClose) {
            window.addEventListener("keydown", handleEscape);
            return () => window.removeEventListener("keydown", handleEscape);
        }
    }, [onClose]);

    return (
        <motion.div
            className="fixed inset-0 z-1000 top-0 left-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={overlayTransition}
        >
            <div
                className="absolute inset-0 bg-black/70"
                onClick={onClose}
                aria-hidden
            />

            <motion.div
                className={cn(
                    "absolute top-2.5 right-2.5 bottom-2.5 left-2.5 z-1001 bg-white rounded-[20px] flex flex-col",
                    mode === "half" && "left-2.5 lg:left-auto lg:w-1/2",
                    className,
                )}
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={contentTransition}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
                    {children}
                </div>
            </motion.div>
        </motion.div>
    );
};

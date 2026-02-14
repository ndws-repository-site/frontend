"use client";

import Image from "next/image";
import { useRef, useState, useEffect, ChangeEvent, DragEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash, ImageIcon } from "lucide-react";
import { cn } from "@/shared/utils";
import { AdminMultiFileUploadProps } from "../../types/admin-multi-file-upload.props";

/**
 * Загрузка множественных изображений. Поддержка drag-and-drop, превью, удаление.
 */
export const AdminMultiFileUpload = ({
    className,
    placeholder = "Добавить изображение",
    accept = "image/*",
    variant = "standard",
    error,
    value = [],
    onChange,
    name,
    disabled,
    maxFiles = 0,
}: AdminMultiFileUploadProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [internalFiles, setInternalFiles] = useState<(File | string)[]>([]);

    const files = value.length > 0 ? value : internalFiles;
    const canAddMore = maxFiles === 0 || files.length < maxFiles;
    const [urlCache, setUrlCache] = useState<Map<File, string>>(new Map());
    const urlCacheRef = useRef<Map<File, string>>(new Map());

    useEffect(() => {
        const fileItems = files.filter((f): f is File => f instanceof File);
        const currentFiles = new Set(fileItems);
        const cache = urlCacheRef.current;

        cache.forEach((url, file) => {
            if (!currentFiles.has(file)) {
                URL.revokeObjectURL(url);
                cache.delete(file);
            }
        });

        fileItems.forEach((file) => {
            if (!cache.has(file)) {
                cache.set(file, URL.createObjectURL(file));
            }
        });

        setUrlCache(new Map(cache));

        return () => {
            cache.forEach((url) => URL.revokeObjectURL(url));
            cache.clear();
        };
    }, [files]);

    const handleClick = () => {
        if (!disabled && canAddMore) inputRef.current?.click();
    };

    const addFiles = (newFiles: File[]) => {
        const filtered = newFiles.filter((f) =>
            accept === "image/*" ? f.type.startsWith("image/") : true,
        );
        if (filtered.length === 0) return;

        const result = [...files];
        for (const f of filtered) {
            if (maxFiles > 0 && result.length >= maxFiles) break;
            result.push(f);
        }
        onChange?.(result);
        setInternalFiles(result);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selected = Array.from(e.target.files || []);
        if (selected.length) {
            addFiles(selected);
            e.target.value = "";
        }
    };

    const handleRemove = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        const next = files.filter((_, i) => i !== index);
        onChange?.(next);
        setInternalFiles(next);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!disabled && canAddMore) setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (disabled || !canAddMore) return;
        const dropped = Array.from(e.dataTransfer.files || []);
        addFiles(dropped);
    };

    const getPreviewUrl = (item: File | string): string | null => {
        if (item instanceof File) return urlCache.get(item) ?? null;
        return item;
    };

    const getLabel = (item: File | string): string => {
        if (item instanceof File) return item.name;
        try {
            const url = new URL(item);
            const last = url.pathname.split("/").filter(Boolean).pop();
            return last || item;
        } catch {
            const parts = String(item).split("/").filter(Boolean);
            return parts.pop() || String(item);
        }
    };

    return (
        <div className={cn("w-full flex flex-col", className)}>
            <div className="flex flex-wrap gap-3">
                {files.map((item, index) => {
                    const previewUrl = getPreviewUrl(item);
                    const label = getLabel(item);
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={cn(
                                "relative group shrink-0 w-20 h-20 rounded-xl overflow-hidden",
                                variant === "standard" &&
                                    "bg-[#2F2F2F] border border-transparent",
                                variant === "alternative" &&
                                    "bg-[#1E1E1E] border border-transparent",
                            )}
                        >
                            {previewUrl ? (
                                <Image
                                    src={previewUrl}
                                    alt={label}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-[#2F2F2F]">
                                    <ImageIcon
                                        className="text-[#656565]"
                                        size={28}
                                    />
                                </div>
                            )}
                            {!disabled && (
                                <button
                                    type="button"
                                    onClick={(e) => handleRemove(e, index)}
                                    className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash className="text-red-400" size={24} />
                                </button>
                            )}
                        </motion.div>
                    );
                })}

                <AnimatePresence mode="popLayout">
                    {canAddMore && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={handleClick}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={cn(
                                "group w-20 h-20 shrink-0 flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all duration-300 outline-none",
                                variant === "standard" && [
                                    "bg-background border",
                                    isDragging
                                        ? "border-white/40 bg-[#2F2F2F]"
                                        : "border-transparent",
                                    "hover:border-white/10 hover:bg-[#2F2F2F]",
                                ],
                                variant === "alternative" && [
                                    "bg-[#1E1E1E] border",
                                    isDragging
                                        ? "border-white/20 bg-[#252525]"
                                        : "border-transparent",
                                    "hover:bg-[#252525]",
                                ],
                                error &&
                                    "border-red-500/40 bg-red-900/10 hover:bg-red-900/20",
                                disabled &&
                                    "opacity-50 cursor-not-allowed pointer-events-none",
                            )}
                        >
                            <input
                                ref={inputRef}
                                type="file"
                                accept={accept}
                                multiple
                                className="hidden"
                                onChange={handleFileChange}
                                name={name}
                                disabled={disabled}
                            />
                            <Plus
                                className={cn(
                                    "text-[#656565] mb-1",
                                    !disabled && "group-hover:text-white",
                                )}
                                size={28}
                            />
                            <span className="text-[10px] text-[#656565] leading-tight text-center px-1">
                                {placeholder}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, y: -5 }}
                        animate={{ height: "auto", opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -5 }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                            mass: 1,
                        }}
                        className="overflow-hidden"
                    >
                        <p className="pt-1.5 text-xs text-red-400 font-medium ml-1">
                            {error}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

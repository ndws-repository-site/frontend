"use client";

import { cn } from "@/shared/utils";
import type { AdminTableProps } from "../types/admin-table.props";

/**
 * Универсальный шаблон таблицы для админки.
 * Используется как контейнер: передаёте columns, gridClassName, children (строки).
 * При isLoading показывает скелетон, при пустом списке — emptyMessage/emptySearchMessage.
 */
export const AdminTable = ({
    columns,
    gridClassName,
    isLoading,
    itemsCount,
    children,
    searchTerm = "",
    emptyMessage = "Список пуст",
    emptySearchMessage = "Ничего не найдено",
    minWidth = "700px",
    skeletonCount = 5,
}: AdminTableProps) => {
    const isEmpty = !isLoading && itemsCount === 0;
    const emptyText = searchTerm ? emptySearchMessage : emptyMessage;

    return (
        <div className="w-full overflow-x-auto pb-4">
            <div style={{ minWidth }}>
                {/* Заголовки */}
                <div
                    className={cn(
                        gridClassName,
                        "px-5 mb-4 text-sm text-gray-500 font-[14px]",
                    )}
                >
                    {columns.map((col) => (
                        <div
                            key={col.header}
                            className={
                                col.align === "right" ? "text-right pr-2" : ""
                            }
                        >
                            {col.header}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-2">
                    {isLoading
                        ? [...Array(skeletonCount)].map((_, index) => (
                              <div
                                  key={index}
                                  className={cn(
                                      gridClassName,
                                      "bg-card rounded-xl px-5 py-4 animate-pulse",
                                  )}
                              >
                                  {columns.map((col) => (
                                      <div
                                          key={col.header}
                                          className={cn(
                                              "h-4 bg-white/5 rounded",
                                              col.align === "right" &&
                                                  "w-8 ml-auto",
                                          )}
                                      />
                                  ))}
                              </div>
                          ))
                        : children}
                </div>

                {isEmpty && (
                    <div className="text-center text-gray-500 py-10">
                        {emptyText}
                    </div>
                )}
            </div>
        </div>
    );
};

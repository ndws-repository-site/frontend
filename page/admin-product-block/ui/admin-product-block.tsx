"use client";

import { Edit, Search, Trash } from "lucide-react";
import {
    AdminButton,
    AdminInput,
    AdminLoading,
    AdminPageTitle,
    AdminTable,
    AdminTableRow,
} from "@/shared/admin";
import { highlightSearchText, $apiAdmin } from "@/shared/utils";
import { useConfirm } from "@/shared/lib/confirm-dialog";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAdminProductBlockTable } from "../api/use-admin-product-table";
import { GRID_CLASS } from "../config/constants";
import type { ProductBlockResponse } from "@/shared/types/responses";

export const AdminProductBlock = () => {
    const { confirm } = useConfirm();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const { data: blocks = [], isLoading: loadingBlocks } =
        useAdminProductBlockTable();

    const handleDelete = (block: ProductBlockResponse) => {
        confirm({
            title: "Удалить блок продуктов?",
            description: `Блок «${block.title}» будет удалён безвозвратно.`,
            confirmText: "Удалить",
            onConfirm: async () => {
                await $apiAdmin.delete(`/product-block/${block.id}`);
                await queryClient.invalidateQueries({
                    queryKey: ["admin-product-block-table"],
                });
                await queryClient.invalidateQueries({
                    queryKey: ["product-block", block.id],
                });
            },
        });
    };

    const filteredBlocks = useMemo(() => {
        if (!search.trim()) return blocks;
        const q = search.toLowerCase().trim();
        return blocks.filter(
            (b) =>
                b.title.toLowerCase().includes(q) ||
                b.subtitle.toLowerCase().includes(q) ||
                b.product?.name?.toLowerCase().includes(q),
        );
    }, [blocks, search]);

    if (loadingBlocks) {
        return <AdminLoading title="Загрузка блоков продуктов..." />;
    }

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <AdminPageTitle
                    title="Редактировать блок продуктов"
                    className="mb-0!"
                />

                <Link href="/admin/products-block/create">
                    <AdminButton variant="primary">
                        Добавить блок продуктов
                    </AdminButton>
                </Link>
            </div>

            <div className="mb-6">
                <AdminInput
                    placeholder="Поиск по названию, подзаголовку или товару..."
                    variant="alternative"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    icon={<Search className="size-5" />}
                />
            </div>

            <AdminTable
                columns={[
                    { header: "Заголовок" },
                    { header: "Подзаголовок" },
                    { header: "Товар" },
                    { header: "Действия", align: "right" },
                ]}
                gridClassName={GRID_CLASS}
                isLoading={loadingBlocks}
                itemsCount={filteredBlocks.length}
                searchTerm={search}
                emptyMessage="Блоков продуктов пока нет"
                emptySearchMessage="По вашему запросу ничего не найдено"
            >
                {filteredBlocks.map((block) => (
                    <AdminTableRow key={block.id} gridClassName={GRID_CLASS}>
                        <div className="truncate">
                            {highlightSearchText(block.title, search)}
                        </div>
                        <div className="truncate text-gray-400">
                            {highlightSearchText(block.subtitle, search)}
                        </div>
                        <div className="truncate">
                            {block.product
                                ? highlightSearchText(
                                      block.product.name,
                                      search,
                                  )
                                : "—"}
                        </div>
                        <div className="flex justify-end gap-2">
                            <Link
                                href={`/admin/products-block/${block.id}/edit`}
                                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
                                title="Изменить"
                            >
                                <Edit size={16} />
                            </Link>
                            <button
                                type="button"
                                onClick={() => handleDelete(block)}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all hover:bg-red-500/20 hover:text-red-500"
                                title="Удалить"
                            >
                                <Trash size={16} />
                            </button>
                        </div>
                    </AdminTableRow>
                ))}
            </AdminTable>
        </div>
    );
};

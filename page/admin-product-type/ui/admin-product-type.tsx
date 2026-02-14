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
import { useProductTypeTable } from "../api/use-product-type-table";
import { GRID_CLASS } from "../config/constants";

export const AdminProductType = () => {
    const { confirm } = useConfirm();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const { data: productTypes = [], isLoading: loadingProductTypes } =
        useProductTypeTable();

    const handleDelete = (productType: { id: number; name: string }) => {
        confirm({
            title: "Удалить тип товара?",
            description: `Тип товара «${productType.name}» будет удалён безвозвратно.`,
            confirmText: "Удалить",
            onConfirm: async () => {
                await $apiAdmin.delete(`/product-type/${productType.id}`);
                await queryClient.invalidateQueries({
                    queryKey: ["product-type-table"],
                });
            },
        });
    };

    const filteredProductTypes = useMemo(() => {
        if (!search.trim()) return productTypes;
        const q = search.toLowerCase().trim();
        return productTypes.filter((pt) => pt.name.toLowerCase().includes(q));
    }, [productTypes, search]);

    if (loadingProductTypes) {
        return <AdminLoading title="Загрузка типов товаров..." />;
    }

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <AdminPageTitle title="Типы товаров" className="mb-0!" />

                <Link href="/admin/product-type/create">
                    <AdminButton variant="primary">
                        Добавить тип товара
                    </AdminButton>
                </Link>
            </div>

            <div className="mb-6">
                <AdminInput
                    placeholder="Поиск по названию..."
                    variant="alternative"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    icon={<Search className="size-5" />}
                />
            </div>

            <AdminTable
                columns={[
                    { header: "Название" },
                    { header: "Действия", align: "right" },
                ]}
                gridClassName={GRID_CLASS}
                isLoading={loadingProductTypes}
                itemsCount={filteredProductTypes.length}
                searchTerm={search}
                emptyMessage="Типов товаров пока нет"
                emptySearchMessage="По вашему запросу ничего не найдено"
            >
                {filteredProductTypes.map((productType) => (
                    <AdminTableRow
                        key={productType.id}
                        gridClassName={GRID_CLASS}
                    >
                        <div className="truncate">
                            {highlightSearchText(productType.name, search)}
                        </div>
                        <div className="flex justify-end gap-2">
                            <Link
                                href={`/admin/product-type/${productType.id}/edit`}
                                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
                                title="Изменить"
                            >
                                <Edit size={16} />
                            </Link>
                            <button
                                type="button"
                                onClick={() => handleDelete(productType)}
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

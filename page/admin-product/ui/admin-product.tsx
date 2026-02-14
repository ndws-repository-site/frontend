"use client";

import { Edit, Search, Trash } from "lucide-react";
import {
    AdminButton,
    AdminInput,
    AdminLoading,
    AdminPageTitle,
    AdminSelect,
    AdminTable,
    AdminTableRow,
} from "@/shared/admin";
import { deleteImage, highlightSearchText, $apiAdmin } from "@/shared/utils";
import { useConfirm } from "@/shared/lib/confirm-dialog";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useProductTable } from "../api/use-product-table";
import { useGoalForProductTable } from "../api/use-goal-for-product-table";
import { useFormForProductTable } from "../api/use-form-for-product-table";
import { useProductTypeForProductTable } from "../api/use-product-type-for-product-table";
import { GRID_CLASS } from "../config/constants";
import type { ProductResponse } from "@/shared/types/responses/product.response";

export const AdminProduct = () => {
    const { confirm } = useConfirm();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [sortGoal, setSortGoal] = useState<number | null>(null);
    const [sortForm, setSortForm] = useState<number | null>(null);
    const [sortProductType, setSortProductType] = useState<number | null>(null);

    const { data: products = [], isLoading: loadingProducts } =
        useProductTable();
    const { data: goals = [], isLoading: loadingGoals } =
        useGoalForProductTable();
    const { data: forms = [], isLoading: loadingForms } =
        useFormForProductTable();
    const { data: productTypes = [], isLoading: loadingProductTypes } =
        useProductTypeForProductTable();

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (search.trim()) {
            const q = search.toLowerCase().trim();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    (p.description && p.description.toLowerCase().includes(q)),
            );
        }

        if (sortGoal != null) {
            result = result.filter((p) => p.goal?.id === sortGoal);
        }
        if (sortForm != null) {
            result = result.filter((p) => p.form?.id === sortForm);
        }
        if (sortProductType != null) {
            result = result.filter(
                (p) => p.productType?.id === sortProductType,
            );
        }

        return result;
    }, [products, search, sortGoal, sortForm, sortProductType]);

    const handleDelete = (product: ProductResponse) => {
        confirm({
            title: "Удалить товар?",
            description: `Товар «${product.name}» будет удалён безвозвратно.`,
            confirmText: "Удалить",
            onConfirm: async () => {
                if (product.images?.length) {
                    for (const url of product.images) {
                        await deleteImage(url);
                    }
                }
                await $apiAdmin.delete(`/product/${product.id}`);
                await queryClient.invalidateQueries({
                    queryKey: ["product-table"],
                });
                await queryClient.invalidateQueries({
                    queryKey: ["admin-product-block-table"],
                });
                await queryClient.invalidateQueries({
                    queryKey: ["product", product.id],
                });
            },
        });
    };

    if (loadingProducts) {
        return <AdminLoading title="Загрузка товаров..." />;
    }

    const goalOptions = [
        { value: "all", label: "Все цели" },
        ...goals.map((g) => ({ value: g.id, label: g.name })),
    ];
    const formOptions = [
        { value: "all", label: "Все формы" },
        ...forms.map((f) => ({ value: f.id, label: f.name })),
    ];
    const productTypeOptions = [
        { value: "all", label: "Все типы" },
        ...productTypes.map((pt) => ({ value: pt.id, label: pt.name })),
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <AdminPageTitle title="Товары" className="mb-0!" />

                <Link href="/admin/product/create">
                    <AdminButton>Добавить товар</AdminButton>
                </Link>
            </div>

            <div className="grid grid-cols-4 gap-2 items-center mb-6">
                <AdminInput
                    placeholder="Поиск по названию или описанию..."
                    variant="alternative"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    icon={<Search className="size-5" />}
                />
                <AdminSelect
                    value={sortGoal ?? "all"}
                    onChange={(v) =>
                        setSortGoal(v === "all" ? null : (v as number))
                    }
                    options={goalOptions}
                    placeholder="Цель"
                    variant="alternative"
                    isLoading={loadingGoals}
                />
                <AdminSelect
                    value={sortForm ?? "all"}
                    onChange={(v) =>
                        setSortForm(v === "all" ? null : (v as number))
                    }
                    options={formOptions}
                    placeholder="Форма"
                    variant="alternative"
                    isLoading={loadingForms}
                />
                <AdminSelect
                    value={sortProductType ?? "all"}
                    onChange={(v) =>
                        setSortProductType(v === "all" ? null : (v as number))
                    }
                    options={productTypeOptions}
                    placeholder="Тип товара"
                    variant="alternative"
                    isLoading={loadingProductTypes}
                />
            </div>

            <AdminTable
                columns={[
                    { header: "Название" },
                    { header: "Цена", align: "right" },
                    { header: "Описание" },
                    { header: "Остаток", align: "right" },
                    { header: "Действия", align: "right" },
                ]}
                gridClassName={GRID_CLASS}
                isLoading={loadingProducts}
                itemsCount={filteredProducts.length}
                searchTerm={search}
                emptyMessage="Товаров пока нет"
                emptySearchMessage="По вашему запросу ничего не найдено"
                minWidth="900px"
            >
                {filteredProducts.map((product: ProductResponse) => (
                    <AdminTableRow key={product.id} gridClassName={GRID_CLASS}>
                        <div className="truncate">
                            {highlightSearchText(product.name, search)}
                        </div>
                        <div className="text-right">
                            {product.price.toLocaleString("en-US")} $
                        </div>
                        <div className="line-clamp-2 text-sm text-gray-400 truncate">
                            {highlightSearchText(
                                product.description || "—",
                                search,
                            )}
                        </div>
                        <div className="text-right">{product.stock}</div>
                        <div className="flex justify-end gap-2">
                            <Link
                                href={`/admin/product/${product.id}/edit`}
                                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
                                title="Изменить"
                            >
                                <Edit size={16} />
                            </Link>
                            <button
                                type="button"
                                onClick={() => handleDelete(product)}
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

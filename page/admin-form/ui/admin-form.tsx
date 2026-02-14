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
import { useFormTable } from "../api/use-form-table";
import { GRID_CLASS } from "../config/constants";

export const AdminForm = () => {
    const { confirm } = useConfirm();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const { data: forms = [], isLoading: loadingForms } = useFormTable();

    const handleDelete = (form: { id: number; name: string }) => {
        confirm({
            title: "Удалить форму?",
            description: `Форма «${form.name}» будет удалена безвозвратно.`,
            confirmText: "Удалить",
            onConfirm: async () => {
                await $apiAdmin.delete(`/form/${form.id}`);
                await queryClient.invalidateQueries({
                    queryKey: ["form-table"],
                });
                await queryClient.invalidateQueries({
                    queryKey: ["form-for-product-table"],
                });
                await queryClient.invalidateQueries({
                    queryKey: ["form", form.id],
                });
            },
        });
    };

    const filteredForms = useMemo(() => {
        if (!search.trim()) return forms;
        const q = search.toLowerCase().trim();
        return forms.filter((f) => f.name.toLowerCase().includes(q));
    }, [forms, search]);

    if (loadingForms) {
        return <AdminLoading title="Загрузка форм..." />;
    }

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <AdminPageTitle title="Формы" className="mb-0!" />

                <Link href="/admin/form/create">
                    <AdminButton variant="primary">Добавить форму</AdminButton>
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
                isLoading={loadingForms}
                itemsCount={filteredForms.length}
                searchTerm={search}
                emptyMessage="Форм пока нет"
                emptySearchMessage="По вашему запросу ничего не найдено"
            >
                {filteredForms.map((form) => (
                    <AdminTableRow key={form.id} gridClassName={GRID_CLASS}>
                        <div className="truncate">
                            {highlightSearchText(form.name, search)}
                        </div>
                        <div className="flex justify-end gap-2">
                            <Link
                                href={`/admin/form/${form.id}/edit`}
                                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
                                title="Изменить"
                            >
                                <Edit size={16} />
                            </Link>
                            <button
                                type="button"
                                onClick={() => handleDelete(form)}
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

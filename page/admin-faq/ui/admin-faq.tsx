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
import { useFaqTable } from "../api/use-faq-table";
import { GRID_CLASS } from "../config/constants";

export const AdminFaq = () => {
    const { confirm } = useConfirm();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const { data: faqs = [], isLoading: loadingFaqs } = useFaqTable();

    const handleDelete = (faq: { id: number; name: string }) => {
        confirm({
            title: "Удалить FAQ?",
            description: `FAQ «${faq.name}» будет удалён безвозвратно.`,
            confirmText: "Удалить",
            onConfirm: async () => {
                await $apiAdmin.delete(`/faq/${faq.id}`);
                await queryClient.invalidateQueries({
                    queryKey: ["faq-table"],
                });
                await queryClient.invalidateQueries({
                    queryKey: ["faq", faq.id],
                });
            },
        });
    };

    const filteredFaqs = useMemo(() => {
        if (!search.trim()) return faqs;
        const q = search.toLowerCase().trim();
        return faqs.filter((f) => f.name.toLowerCase().includes(q));
    }, [faqs, search]);

    if (loadingFaqs) {
        return <AdminLoading title="Загрузка FAQ..." />;
    }

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <AdminPageTitle title="FAQ" className="mb-0!" />

                <Link href="/admin/faq/create">
                    <AdminButton variant="primary">Добавить FAQ</AdminButton>
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
                isLoading={loadingFaqs}
                itemsCount={filteredFaqs.length}
                searchTerm={search}
                emptyMessage="FAQ пока нет"
                emptySearchMessage="По вашему запросу ничего не найдено"
            >
                {filteredFaqs.map((faq) => (
                    <AdminTableRow key={faq.id} gridClassName={GRID_CLASS}>
                        <div className="truncate">
                            {highlightSearchText(faq.name, search)}
                        </div>
                        <div className="flex justify-end gap-2">
                            <Link
                                href={`/admin/faq/${faq.id}/edit`}
                                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
                                title="Изменить"
                            >
                                <Edit size={16} />
                            </Link>
                            <button
                                type="button"
                                onClick={() => handleDelete(faq)}
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

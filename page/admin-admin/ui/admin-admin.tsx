"use client";

import { Search, Trash } from "lucide-react";
import {
    AdminButton,
    AdminInput,
    AdminLoading,
    AdminPageTitle,
    AdminTable,
    AdminTableRow,
} from "@/shared/admin";
import { highlightSearchText } from "@/shared/utils";
import { useConfirm } from "@/shared/lib/confirm-dialog";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAdminTable } from "../api/use-admin-table";
import { deleteAdmin } from "../api/delete-admin";
import { GRID_CLASS } from "../config/constants";

export const AdminAdmin = () => {
    const { confirm } = useConfirm();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const { data: admins = [], isLoading: loadingAdmins } = useAdminTable();

    const handleDelete = (admin: { id: number; name: string }) => {
        confirm({
            title: "Удалить участника?",
            description: `Вы действительно хотите удалить ${admin.name}?`,
            confirmText: "Удалить",
            onConfirm: async () => {
                await deleteAdmin(admin.id);
                await queryClient.invalidateQueries({
                    queryKey: ["admin-table"],
                });
            },
        });
    };

    const filteredAdmins = useMemo(() => {
        if (!search.trim()) return admins;
        const q = search.toLowerCase().trim();
        return admins.filter(
            (a) =>
                a.name.toLowerCase().includes(q) ||
                a.email.toLowerCase().includes(q),
        );
    }, [admins, search]);

    if (loadingAdmins) {
        return <AdminLoading title="Загрузка администраторов..." />;
    }

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <AdminPageTitle title="Администраторы" className="mb-0!" />

                <Link href="/admin/admin/create">
                    <AdminButton variant="primary">
                        Добавить участника
                    </AdminButton>
                </Link>
            </div>

            <div className="mb-6">
                <AdminInput
                    placeholder="Поиск по имени или email..."
                    variant="alternative"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    icon={<Search className="size-5" />}
                />
            </div>

            <AdminTable
                columns={[
                    { header: "№" },
                    { header: "Имя" },
                    { header: "Email" },
                    { header: "Действия", align: "right" },
                ]}
                gridClassName={GRID_CLASS}
                isLoading={loadingAdmins}
                itemsCount={filteredAdmins.length}
                searchTerm={search}
                emptyMessage="Список участников пуст"
                emptySearchMessage="По вашему запросу ничего не найдено"
            >
                {filteredAdmins.map((admin) => (
                    <AdminTableRow key={admin.id} gridClassName={GRID_CLASS}>
                        <div className="text-gray-400 text-[14px]">
                            №{admin.id}
                        </div>
                        <div className="truncate">
                            {highlightSearchText(admin.name, search)}
                        </div>
                        <div className="truncate">
                            {highlightSearchText(admin.email, search)}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => handleDelete(admin)}
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

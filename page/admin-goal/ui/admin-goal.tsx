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
import { useGoalTable } from "../api/use-goal-table";
import { GRID_CLASS } from "../config/constants";

export const AdminGoal = () => {
    const { confirm } = useConfirm();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const { data: goals = [], isLoading: loadingGoals } = useGoalTable();

    const handleDelete = (goal: { id: number; name: string }) => {
        confirm({
            title: "Удалить цель?",
            description: `Цель «${goal.name}» будет удалена безвозвратно.`,
            confirmText: "Удалить",
            onConfirm: async () => {
                await $apiAdmin.delete(`/goal/${goal.id}`);
                await queryClient.invalidateQueries({
                    queryKey: ["goal-table"],
                });
                await queryClient.invalidateQueries({
                    queryKey: ["goal-for-product-table"],
                });
                await queryClient.invalidateQueries({
                    queryKey: ["goal", goal.id],
                });
            },
        });
    };

    const filteredGoals = useMemo(() => {
        if (!search.trim()) return goals;
        const q = search.toLowerCase().trim();
        return goals.filter((g) => g.name.toLowerCase().includes(q));
    }, [goals, search]);

    if (loadingGoals) {
        return <AdminLoading title="Загрузка целей..." />;
    }

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <AdminPageTitle title="Цели" className="mb-0!" />

                <Link href="/admin/goal/create">
                    <AdminButton variant="primary">Добавить цель</AdminButton>
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
                isLoading={loadingGoals}
                itemsCount={filteredGoals.length}
                searchTerm={search}
                emptyMessage="Целей пока нет"
                emptySearchMessage="По вашему запросу ничего не найдено"
            >
                {filteredGoals.map((goal) => (
                    <AdminTableRow key={goal.id} gridClassName={GRID_CLASS}>
                        <div className="truncate">
                            {highlightSearchText(goal.name, search)}
                        </div>
                        <div className="flex justify-end gap-2">
                            <Link
                                href={`/admin/goal/${goal.id}/edit`}
                                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
                                title="Изменить"
                            >
                                <Edit size={16} />
                            </Link>
                            <button
                                type="button"
                                onClick={() => handleDelete(goal)}
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

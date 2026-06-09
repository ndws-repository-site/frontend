"use client";

import { Edit, Search, Trash } from "lucide-react";
import {
    AdminButton,
    AdminCheckbox,
    AdminInput,
    AdminLoading,
    AdminPageTitle,
    AdminTable,
    AdminTableRow,
} from "@/shared/admin";
import {
    highlightSearchText,
    $apiAdmin,
    getErrorMessage,
} from "@/shared/utils";
import { useConfirm } from "@/shared/lib/confirm-dialog";
import { formatDate } from "@/shared/lib/format-date";
import { PromocodeResponse } from "@/shared/types";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { buildPromocodePayload } from "@/features/promo-code-form/lib/build-promocode-payload";
import { usePromocodeTable } from "../api/use-promocode-table";
import { GRID_CLASS } from "../config/constants";

export const AdminPromoCode = () => {
    const { confirm } = useConfirm();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [togglingId, setTogglingId] = useState<number | null>(null);
    const { data: promocodes = [], isLoading: loadingPromocodes } =
        usePromocodeTable();

    const handleDelete = (promo: PromocodeResponse) => {
        confirm({
            title: "Удалить промокод?",
            description: `Промокод «${promo.code}» будет удалён безвозвратно.`,
            confirmText: "Удалить",
            onConfirm: async () => {
                await $apiAdmin.delete(`/promocode/${promo.id}`);
                await queryClient.invalidateQueries({
                    queryKey: ["promocode-table"],
                });
                await queryClient.invalidateQueries({
                    queryKey: ["promocode", promo.id],
                });
            },
        });
    };

    const handleToggleActive = async (promo: PromocodeResponse) => {
        setTogglingId(promo.id);
        try {
            await $apiAdmin.put(
                `/promocode/${promo.id}`,
                buildPromocodePayload({
                    code: promo.code,
                    discount: promo.discount,
                    maxUses: promo.maxUses,
                    isActive: !promo.isActive,
                    expiresAt: promo.expiresAt,
                }),
            );
            await queryClient.invalidateQueries({
                queryKey: ["promocode-table"],
            });
        } catch (e) {
            confirm({
                title: "Ошибка",
                description:
                    getErrorMessage(e) ??
                    "Не удалось изменить статус промокода",
                confirmText: "Ок",
                onConfirm: () => {},
            });
        } finally {
            setTogglingId(null);
        }
    };

    const filteredPromocodes = useMemo(() => {
        if (!search.trim()) return promocodes;
        const q = search.toLowerCase().trim();
        return promocodes.filter((p) => p.code.toLowerCase().includes(q));
    }, [promocodes, search]);

    if (loadingPromocodes) {
        return <AdminLoading title="Загрузка промокодов..." />;
    }

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <AdminPageTitle title="Промокоды" className="mb-0!" />

                <Link href="/admin/promo-code/create">
                    <AdminButton variant="primary">
                        Добавить промокод
                    </AdminButton>
                </Link>
            </div>

            <div className="mb-6">
                <AdminInput
                    placeholder="Поиск по коду..."
                    variant="alternative"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    icon={<Search className="size-5" />}
                />
            </div>

            <AdminTable
                columns={[
                    { header: "Код" },
                    { header: "Скидка" },
                    { header: "Лимит" },
                    { header: "Применено" },
                    { header: "Истекает" },
                    { header: "Активен" },
                    { header: "Действия", align: "right" },
                ]}
                gridClassName={GRID_CLASS}
                isLoading={loadingPromocodes}
                itemsCount={filteredPromocodes.length}
                searchTerm={search}
                emptyMessage="Промокодов пока нет"
                emptySearchMessage="По вашему запросу ничего не найдено"
            >
                {filteredPromocodes.map((promo) => (
                    <AdminTableRow key={promo.id} gridClassName={GRID_CLASS}>
                        <div className="truncate font-medium">
                            {highlightSearchText(promo.code, search)}
                        </div>
                        <div>{promo.discount}%</div>
                        <div>{promo.maxUses}</div>
                        <div>
                            {promo.uses} / {promo.maxUses}
                        </div>
                        <div className="truncate text-sm text-gray-400">
                            {promo.expiresAt
                                ? formatDate(promo.expiresAt)
                                : "Бессрочно"}
                        </div>
                        <div>
                            <AdminCheckbox
                                checked={promo.isActive}
                                onChange={() => handleToggleActive(promo)}
                                disabled={togglingId === promo.id}
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Link
                                href={`/admin/promo-code/${promo.id}/edit`}
                                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
                                title="Изменить"
                            >
                                <Edit size={16} />
                            </Link>
                            <button
                                type="button"
                                onClick={() => handleDelete(promo)}
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

"use client";

import { Eye, Search, Trash } from "lucide-react";
import Link from "next/link";
import {
    AdminInput,
    AdminLoading,
    AdminPageTitle,
    AdminTable,
    AdminTableRow,
} from "@/shared/admin";
import { $apiAdmin, highlightSearchText } from "@/shared/utils";
import { useConfirm } from "@/shared/lib/confirm-dialog";
import { formatDate } from "@/shared/lib/format-date";
import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useOrdersTable } from "../api/use-orders-table";
import { GRID_CLASS } from "../config/constants";
import type { OrderResponse } from "@/shared/types/responses/order.response";

export const AdminOrder = () => {
    const { confirm } = useConfirm();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");

    const { data: orders = [], isLoading } = useOrdersTable();

    const filteredOrders = useMemo(() => {
        if (!search.trim()) return orders;
        const q = search.toLowerCase().trim();
        return orders.filter(
            (o) =>
                o.firstName.toLowerCase().includes(q) ||
                o.lastName.toLowerCase().includes(q) ||
                o.email.toLowerCase().includes(q) ||
                o.phone.includes(q) ||
                o.address.toLowerCase().includes(q),
        );
    }, [orders, search]);

    const handleDelete = (order: OrderResponse) => {
        confirm({
            title: "Удалить заказ?",
            description: `Заказ #${order.id.slice(0, 8)} от ${order.firstName} ${order.lastName} будет удалён безвозвратно.`,
            confirmText: "Удалить",
            onConfirm: async () => {
                await $apiAdmin.delete(`/order/${order.id}`);
                await queryClient.invalidateQueries({
                    queryKey: ["order-table"],
                });
            },
        });
    };

    if (isLoading) {
        return <AdminLoading title="Загрузка заказов..." />;
    }

    return (
        <div>
            <AdminPageTitle title="Заказы" />

            <div className="mb-6">
                <AdminInput
                    placeholder="Поиск по имени, email, телефону, адресу..."
                    variant="alternative"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    icon={<Search className="size-5" />}
                />
            </div>

            <AdminTable
                columns={[
                    { header: "Дата" },
                    { header: "Клиент" },
                    { header: "Сумма", align: "right" },
                    { header: "Доставка" },
                    { header: "Действия", align: "right" },
                ]}
                gridClassName={GRID_CLASS}
                isLoading={isLoading}
                itemsCount={filteredOrders.length}
                searchTerm={search}
                emptyMessage="Заказов пока нет"
                emptySearchMessage="По вашему запросу ничего не найдено"
                minWidth="900px"
            >
                {filteredOrders.map((order) => {
                    const clientName = `${order.firstName} ${order.lastName}`;
                    return (
                        <AdminTableRow
                            key={order.id}
                            gridClassName={GRID_CLASS}
                        >
                            <div className="text-sm text-gray-400">
                                {formatDate(order.createdAt)}
                            </div>
                            <div className="truncate">
                                {highlightSearchText(clientName, search)}
                            </div>
                            <div className="text-right font-medium">
                                {order.totalPrice.toLocaleString("en-US")} $
                            </div>
                            <div className="truncate text-sm text-gray-400">
                                {order.delivery}
                            </div>
                            <div className="flex justify-end gap-2">
                                <Link
                                    href={`/admin/order/${order.id}`}
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
                                    title="Подробнее"
                                >
                                    <Eye size={16} />
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(order)}
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all hover:bg-red-500/20 hover:text-red-500"
                                    title="Удалить"
                                >
                                    <Trash size={16} />
                                </button>
                            </div>
                        </AdminTableRow>
                    );
                })}
            </AdminTable>
        </div>
    );
};

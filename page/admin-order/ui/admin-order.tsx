"use client";

import { Eye, Search, Trash } from "lucide-react";
import Link from "next/link";
import {
    AdminInput,
    AdminLoading,
    AdminPageTitle,
    AdminSelect,
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
import {
    getOrderStatusBadgeClass,
    getOrderStatusLabel,
    ORDER_STATUS_OPTIONS,
} from "../config/order-status";
import {
    ORDER_SORT_OPTIONS,
    sortOrders,
    type OrderSortKey,
} from "../config/order-sort";
import { formatDelivery } from "../lib/format-delivery";
import { formatOrderAddress } from "../lib/format-order-address";
import type {
    OrderResponse,
    OrderStatus,
} from "@/shared/types/responses/order.response";

export const AdminOrder = () => {
    const { confirm } = useConfirm();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<OrderStatus | null>(null);
    const [sortKey, setSortKey] = useState<OrderSortKey>("newest");

    const { data: orders = [], isLoading } = useOrdersTable();

    const filteredOrders = useMemo(() => {
        let result = [...orders];

        if (statusFilter) {
            result = result.filter((o) => o.status === statusFilter);
        }

        if (search.trim()) {
            const q = search.toLowerCase().trim();
            result = result.filter((o) => {
                const address = formatOrderAddress(o).toLowerCase();
                return (
                    o.firstName.toLowerCase().includes(q) ||
                    o.lastName.toLowerCase().includes(q) ||
                    o.email.toLowerCase().includes(q) ||
                    o.phone.includes(q) ||
                    address.includes(q) ||
                    o.street.toLowerCase().includes(q) ||
                    o.city.toLowerCase().includes(q) ||
                    o.country.toLowerCase().includes(q) ||
                    o.id.toLowerCase().includes(q) ||
                    (o.trackingNumber?.toLowerCase().includes(q) ?? false)
                );
            });
        }

        return sortOrders(result, sortKey);
    }, [orders, search, statusFilter, sortKey]);

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

            <div className="grid grid-cols-3 gap-2 items-center mb-6">
                <AdminInput
                    placeholder="Поиск по имени, email, телефону, адресу..."
                    variant="alternative"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    icon={<Search className="size-5" />}
                />
                <AdminSelect
                    value={statusFilter ?? "all"}
                    onChange={(v) =>
                        setStatusFilter(v === "all" ? null : (v as OrderStatus))
                    }
                    options={ORDER_STATUS_OPTIONS}
                    placeholder="Статус"
                    variant="alternative"
                />
                <AdminSelect
                    value={sortKey}
                    onChange={(v) => setSortKey(v as OrderSortKey)}
                    options={ORDER_SORT_OPTIONS}
                    placeholder="Сортировка"
                    variant="alternative"
                />
            </div>

            <AdminTable
                columns={[
                    { header: "Дата" },
                    { header: "Клиент" },
                    { header: "Статус" },
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
                minWidth="1000px"
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
                            <div className="min-w-0">
                                <span
                                    className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${getOrderStatusBadgeClass(order.status)}`}
                                >
                                    {getOrderStatusLabel(order.status)}
                                </span>
                            </div>
                            <div className="text-right font-medium">
                                {order.totalPrice.toLocaleString("en-US")} $
                            </div>
                            <div className="truncate text-sm text-gray-400">
                                {formatDelivery(order.delivery)}
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

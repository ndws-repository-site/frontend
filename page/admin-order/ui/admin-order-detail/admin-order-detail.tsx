"use client";

import Link from "next/link";
import { Trash } from "lucide-react";
import {
    AdminBackButton,
    AdminCard,
    AdminLoading,
    AdminPageTitle,
} from "@/shared/admin";
import { $apiAdmin } from "@/shared/utils";
import { useConfirm } from "@/shared/lib/confirm-dialog";
import { formatDate } from "@/shared/lib/format-date";
import { useQueryClient } from "@tanstack/react-query";
import { useOrderTable } from "../../api/use-order-table";
import type {
    OrderResponse,
    OrderProductItemResponse,
} from "@/shared/types/responses/order.response";

interface AdminOrderDetailProps {
    id: string;
}

export const AdminOrderDetail = ({ id }: AdminOrderDetailProps) => {
    const { confirm } = useConfirm();
    const queryClient = useQueryClient();
    const { data: order, isLoading } = useOrderTable(id);

    const handleDelete = (orderData: OrderResponse) => {
        confirm({
            title: "Удалить заказ?",
            description: `Заказ #${orderData.id.slice(0, 8)} от ${orderData.firstName} ${orderData.lastName} будет удалён безвозвратно.`,
            confirmText: "Удалить",
            onConfirm: async () => {
                await $apiAdmin.delete(`/order/${orderData.id}`);
                await queryClient.invalidateQueries({
                    queryKey: ["order-table"],
                });
                window.location.href = "/admin/order";
            },
        });
    };

    if (isLoading || !order) {
        return <AdminLoading title="Загрузка заказа..." />;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <Link href="/admin/order">
                    <AdminBackButton />
                </Link>
                <button
                    type="button"
                    onClick={() => handleDelete(order)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors"
                >
                    <Trash size={18} />
                    Удалить заказ
                </button>
            </div>

            <AdminPageTitle
                title={`Заказ #${order.id.slice(0, 8)}`}
                className="mb-6"
            />

            <div className="space-y-6">
                <AdminCard className="p-6">
                    <h3 className="text-lg font-medium text-white mb-4">
                        Информация о заказе
                    </h3>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <dt className="text-gray-500 mb-1">Дата</dt>
                            <dd className="text-white">
                                {formatDate(order.createdAt)}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-gray-500 mb-1">Клиент</dt>
                            <dd className="text-white">
                                {order.firstName} {order.lastName}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-gray-500 mb-1">Телефон</dt>
                            <dd className="text-white">{order.phone}</dd>
                        </div>
                        <div>
                            <dt className="text-gray-500 mb-1">Email</dt>
                            <dd className="text-white">{order.email}</dd>
                        </div>
                        <div className="md:col-span-2">
                            <dt className="text-gray-500 mb-1">
                                Адрес доставки
                            </dt>
                            <dd className="text-white">{order.address}</dd>
                        </div>
                        <div>
                            <dt className="text-gray-500 mb-1">
                                Способ доставки
                            </dt>
                            <dd className="text-white">{order.delivery}</dd>
                        </div>
                        <div>
                            <dt className="text-gray-500 mb-1">Итого</dt>
                            <dd className="text-white font-medium">
                                {order.totalPrice.toLocaleString("en-US")} $
                            </dd>
                        </div>
                    </dl>
                </AdminCard>

                <AdminCard className="p-6">
                    <h3 className="text-lg font-medium text-white mb-4">
                        Товары
                    </h3>
                    <div className="space-y-3">
                        {order.orderProducts.map(
                            (item: OrderProductItemResponse) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center py-3 px-4 bg-white/5 rounded-xl"
                                >
                                    <div>
                                        <span className="text-white font-medium">
                                            {item.product.name}
                                        </span>
                                        <span className="text-gray-400 ml-2">
                                            × {item.quantity}
                                        </span>
                                    </div>
                                    <span className="text-white">
                                        {item.product.price.toLocaleString(
                                            "en-US",
                                        )}{" "}
                                        $ × {item.quantity} ={" "}
                                        {(
                                            item.product.price * item.quantity
                                        ).toLocaleString("en-US")}{" "}
                                        $
                                    </span>
                                </div>
                            ),
                        )}
                    </div>
                </AdminCard>
            </div>
        </div>
    );
};

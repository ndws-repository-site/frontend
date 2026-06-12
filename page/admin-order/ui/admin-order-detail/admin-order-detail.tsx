"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash } from "lucide-react";
import type { ReactNode } from "react";
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
import {
    getOrderStatusBadgeClass,
    getOrderStatusLabel,
} from "../../config/order-status";
import { formatDelivery } from "../../lib/format-delivery";
import { formatOrderAddress } from "../../lib/format-order-address";
import type {
    OrderResponse,
    OrderProductItemResponse,
} from "@/shared/types/responses/order.response";

interface AdminOrderDetailProps {
    id: string;
}

const formatPrice = (value: number) => `${value.toLocaleString("en-US")} $`;

const DetailField = ({
    label,
    children,
    className,
}: {
    label: string;
    children: ReactNode;
    className?: string;
}) => (
    <div className={className}>
        <dt className="text-gray-500 mb-1">{label}</dt>
        <dd className="text-white">{children}</dd>
    </div>
);

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

    const hasShippingInfo =
        order.trackingNumber ||
        order.carrier ||
        order.serviceLevel ||
        order.labelUrl ||
        order.shippoShipmentId ||
        order.shippoRateId ||
        order.shippoTransactionId;

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
                        Заказ
                    </h3>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <DetailField label="Статус">
                            <span
                                className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getOrderStatusBadgeClass(order.status)}`}
                            >
                                {getOrderStatusLabel(order.status)}
                            </span>
                        </DetailField>
                        <DetailField label="Дата создания">
                            {formatDate(order.createdAt)}
                        </DetailField>
                        <DetailField label="Дата обновления">
                            {formatDate(order.updatedAt)}
                        </DetailField>
                        <DetailField label="Клиент">
                            {order.firstName} {order.lastName}
                        </DetailField>
                        <DetailField label="Телефон">{order.phone}</DetailField>
                        <DetailField label="Email">{order.email}</DetailField>
                        {order.comment && (
                            <DetailField
                                label="Комментарий"
                                className="md:col-span-2"
                            >
                                {order.comment}
                            </DetailField>
                        )}
                    </dl>
                </AdminCard>

                <AdminCard className="p-6">
                    <h3 className="text-lg font-medium text-white mb-4">
                        Адрес доставки
                    </h3>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <DetailField label="Адрес" className="md:col-span-2">
                            {formatOrderAddress(order)}
                        </DetailField>
                        <DetailField label="Способ доставки">
                            {formatDelivery(order.delivery)}
                        </DetailField>
                    </dl>
                </AdminCard>

                <AdminCard className="p-6">
                    <h3 className="text-lg font-medium text-white mb-4">
                        Сумма
                    </h3>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <DetailField label="Товары">
                            {formatPrice(order.subtotal)}
                        </DetailField>
                        <DetailField label="Доставка">
                            {formatPrice(order.deliveryCost)}
                        </DetailField>
                        <DetailField label="Промокод">
                            {order.promocode ?? "—"}
                        </DetailField>
                        <DetailField label="Итого">
                            <span className="font-medium">
                                {formatPrice(order.totalPrice)}
                            </span>
                        </DetailField>
                    </dl>
                </AdminCard>

                {hasShippingInfo && (
                    <AdminCard className="p-6">
                        <h3 className="text-lg font-medium text-white mb-4">
                            Доставка / Shippo
                        </h3>
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            {order.carrier && (
                                <DetailField label="Перевозчик">
                                    {order.carrier}
                                </DetailField>
                            )}
                            {order.serviceLevel && (
                                <DetailField label="Уровень сервиса">
                                    {order.serviceLevel}
                                </DetailField>
                            )}
                            {order.trackingNumber && (
                                <DetailField label="Трек-номер">
                                    {order.trackingNumber}
                                </DetailField>
                            )}
                            {order.labelUrl && (
                                <DetailField label="Этикетка">
                                    <a
                                        href={order.labelUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline"
                                    >
                                        Открыть этикетку
                                    </a>
                                </DetailField>
                            )}
                            {order.shippoShipmentId && (
                                <DetailField
                                    label="Shippo Shipment ID"
                                    className="md:col-span-2"
                                >
                                    <span className="text-gray-400 text-xs break-all">
                                        {order.shippoShipmentId}
                                    </span>
                                </DetailField>
                            )}
                            {order.shippoRateId && (
                                <DetailField
                                    label="Shippo Rate ID"
                                    className="md:col-span-2"
                                >
                                    <span className="text-gray-400 text-xs break-all">
                                        {order.shippoRateId}
                                    </span>
                                </DetailField>
                            )}
                            {order.shippoTransactionId && (
                                <DetailField
                                    label="Shippo Transaction ID"
                                    className="md:col-span-2"
                                >
                                    <span className="text-gray-400 text-xs break-all">
                                        {order.shippoTransactionId}
                                    </span>
                                </DetailField>
                            )}
                        </dl>
                    </AdminCard>
                )}

                <AdminCard className="p-6">
                    <h3 className="text-lg font-medium text-white mb-4">
                        Уведомление
                    </h3>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <DetailField label="Письмо покупателю">
                            {order.emailSent ? "Отправлено" : "Не отправлено"}
                        </DetailField>
                        {order.emailSentAt && (
                            <DetailField label="Дата отправки">
                                {formatDate(order.emailSentAt)}
                            </DetailField>
                        )}
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
                                    className="flex justify-between items-center gap-4 py-3 px-4 bg-white/5 rounded-xl"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        {item.product.images[0] && (
                                            <div className="relative size-12 shrink-0 rounded-lg overflow-hidden bg-white/10">
                                                <Image
                                                    src={item.product.images[0]}
                                                    alt={item.product.name}
                                                    fill
                                                    unoptimized
                                                    className="object-cover"
                                                    sizes="48px"
                                                />
                                            </div>
                                        )}
                                        <div className="min-w-0">
                                            <Link
                                                href={`/admin/product/${item.productId}/edit`}
                                                className="text-white font-medium hover:underline"
                                            >
                                                {item.product.name}
                                            </Link>
                                            <span className="text-gray-400 ml-2">
                                                × {item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-white shrink-0">
                                        {formatPrice(item.product.price)} ×{" "}
                                        {item.quantity} ={" "}
                                        {formatPrice(
                                            item.product.price * item.quantity,
                                        )}
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

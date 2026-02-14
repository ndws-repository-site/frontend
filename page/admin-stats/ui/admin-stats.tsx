"use client";

import { AdminCard, AdminLoading, AdminPageTitle } from "@/shared/admin";
import { useStats } from "../api/use-stats";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { BarChart, Bar } from "recharts";
import {
    TrendingUp,
    Package,
    Users,
    ShoppingCart,
    AlertTriangle,
} from "lucide-react";

const CHART_COLORS = {
    area: "#ffffff",
    bar: "#ffffff",
    grid: "rgba(255, 255, 255, 0.08)",
};

const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
    });
};

const formatMoney = (value: number) =>
    new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);

export const AdminStats = () => {
    const { data: stats, isLoading } = useStats();

    if (isLoading) {
        return <AdminLoading title="Загрузка статистики..." />;
    }

    if (!stats) {
        return (
            <div className="text-white/70">Не удалось загрузить статистику</div>
        );
    }

    const chartData = stats.ordersByDay.map(({ date, count }) => ({
        date: formatDate(date),
        count,
        fullDate: date,
    }));

    return (
        <div className="space-y-8">
            <AdminPageTitle title="Статистика" />

            {/* Карточки основных метрик */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <AdminCard className="p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                            <ShoppingCart className="size-5 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Заказов</p>
                            <p className="text-xl font-medium text-white">
                                {stats.totalOrders}
                            </p>
                        </div>
                    </div>
                </AdminCard>

                <AdminCard className="p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                            <TrendingUp className="size-5 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Прибыль</p>
                            <p className="text-xl font-medium text-white">
                                {formatMoney(stats.totalProfit)}
                            </p>
                        </div>
                    </div>
                </AdminCard>

                <AdminCard className="p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                            <Users className="size-5 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Клиентов</p>
                            <p className="text-xl font-medium text-white">
                                {stats.uniqueCustomers}
                            </p>
                        </div>
                    </div>
                </AdminCard>

                <AdminCard className="p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                            <Package className="size-5 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Средний чек</p>
                            <p className="text-xl font-medium text-white">
                                {formatMoney(stats.averageOrderValue)}
                            </p>
                        </div>
                    </div>
                </AdminCard>
            </div>

            {/* График заказов по дням */}
            <AdminCard className="p-6">
                <h3 className="text-lg font-medium text-white mb-6">
                    Заказы по дням
                </h3>
                <div className="h-[320px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient
                                    id="areaGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor={CHART_COLORS.area}
                                        stopOpacity={0.3}
                                    />
                                    <stop
                                        offset="100%"
                                        stopColor={CHART_COLORS.area}
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke={CHART_COLORS.grid}
                            />
                            <XAxis
                                dataKey="date"
                                stroke="#737373"
                                fontSize={12}
                                tickLine={false}
                            />
                            <YAxis
                                stroke="#737373"
                                fontSize={12}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#212121",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "12px",
                                    color: "#fff",
                                }}
                                labelStyle={{ color: "#a3a3a3" }}
                                formatter={(value: number) => [
                                    value,
                                    "Заказов",
                                ]}
                                labelFormatter={(_, payload) => {
                                    const p = Array.isArray(payload)
                                        ? payload[0]
                                        : payload;
                                    return p?.payload?.fullDate
                                        ? formatDate(p.payload.fullDate)
                                        : "";
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="count"
                                stroke={CHART_COLORS.area}
                                strokeWidth={2}
                                fill="url(#areaGradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </AdminCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Выручка по периодам */}
                <AdminCard className="p-6">
                    <h3 className="text-lg font-medium text-white mb-6">
                        Выручка по периодам
                    </h3>
                    <div className="h-[240px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={[
                                    {
                                        name: "7 дней",
                                        value: stats.revenueByPeriod.last7Days,
                                    },
                                    {
                                        name: "30 дней",
                                        value: stats.revenueByPeriod.last30Days,
                                    },
                                    {
                                        name: "90 дней",
                                        value: stats.revenueByPeriod.last90Days,
                                    },
                                ]}
                                margin={{
                                    top: 0,
                                    right: 0,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke={CHART_COLORS.grid}
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="name"
                                    stroke="#737373"
                                    fontSize={12}
                                    tickLine={false}
                                />
                                <YAxis
                                    stroke="#737373"
                                    fontSize={12}
                                    tickLine={false}
                                    tickFormatter={(v) =>
                                        v >= 1000 ? `${v / 1000}к` : v
                                    }
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#212121",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: "12px",
                                        color: "#fff",
                                    }}
                                    formatter={(value: number) => [
                                        formatMoney(value),
                                        "Выручка",
                                    ]}
                                />
                                <Bar
                                    dataKey="value"
                                    fill={CHART_COLORS.bar}
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </AdminCard>

                {/* Топ-3 товара */}
                <AdminCard className="p-6">
                    <h3 className="text-lg font-medium text-white mb-6">
                        Топ-3 популярных товара
                    </h3>
                    {stats.top3PopularProducts.length === 0 ? (
                        <p className="text-gray-400 text-sm">
                            Нет данных о заказах
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {stats.top3PopularProducts.map((item, index) => (
                                <div
                                    key={item.product.id}
                                    className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm font-medium text-white">
                                            {index + 1}
                                        </span>
                                        <span className="text-white">
                                            {item.product.name}
                                        </span>
                                    </div>
                                    <span className="text-gray-400 text-sm">
                                        {item.totalOrders} заказов
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </AdminCard>
            </div>

            {/* Товары с низким остатком */}
            {stats.lowStockProducts.length > 0 && (
                <AdminCard className="p-6">
                    <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                        <AlertTriangle className="size-5 text-amber-500" />
                        Товары с низким остатком
                    </h3>
                    <div className="space-y-3">
                        {stats.lowStockProducts.map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center justify-between py-2 px-4 rounded-xl bg-white/5"
                            >
                                <span className="text-white truncate">
                                    {product.name}
                                </span>
                                <span className="text-amber-500 font-medium shrink-0 ml-4">
                                    {product.stock} шт.
                                </span>
                            </div>
                        ))}
                    </div>
                </AdminCard>
            )}
        </div>
    );
};

export interface StatsResponse {
    totalOrders: number;
    totalProfit: number;
    averageOrderValue: number;
    revenueByPeriod: {
        last7Days: number;
        last30Days: number;
        last90Days: number;
    };
    top3PopularProducts: {
        product: {
            id: string;
            name: string;
        };
        totalOrders: number;
    }[];
    ordersByDay: {
        date: string;
        count: number;
    }[];
    lowStockProducts: {
        id: string;
        name: string;
        slug: string;
        stock: number;
    }[];
    uniqueCustomers: number;
}

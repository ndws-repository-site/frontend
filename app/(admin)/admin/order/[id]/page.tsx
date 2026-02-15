import { AdminOrderDetail } from "@/page/admin-order";

export default async function AdminOrderDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <AdminOrderDetail id={id} />;
}

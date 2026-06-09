import { PromoCodeForm } from "@/features/promo-code-form";

export default async function AdminPromoCodeEditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <PromoCodeForm type="edit" id={id} />;
}

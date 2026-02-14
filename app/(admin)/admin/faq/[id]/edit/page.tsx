import { FaqForm } from "@/features/faq-form";

export default async function AdminFaqEditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <FaqForm type="edit" id={id} />;
}

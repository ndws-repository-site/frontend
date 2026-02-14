import { FormForm } from "@/features/form-form";

export default async function AdminFormEditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <FormForm type="edit" id={id} />;
}

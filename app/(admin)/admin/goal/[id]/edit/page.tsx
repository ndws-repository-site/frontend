import { GoalForm } from "@/features/goal-form";

export default async function AdminGoalEditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <GoalForm type="edit" id={id} />;
}

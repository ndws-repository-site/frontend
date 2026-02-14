import { ReviewForm } from "@/features/review-form";

export default async function AdminReviewsEditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <ReviewForm type="edit" id={id} />;
}

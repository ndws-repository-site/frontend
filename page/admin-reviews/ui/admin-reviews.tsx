"use client";

import Image from "next/image";
import { Edit, Search, Trash } from "lucide-react";
import {
    AdminButton,
    AdminInput,
    AdminLoading,
    AdminPageTitle,
    AdminTable,
    AdminTableRow,
} from "@/shared/admin";
import { deleteImage, highlightSearchText, $apiAdmin } from "@/shared/utils";
import { useConfirm } from "@/shared/lib/confirm-dialog";
import { useReviewsTable } from "../api/use-hero-table";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { GRID_CLASS } from "../config/constants";

export const AdminReviews = () => {
    const { confirm } = useConfirm();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const { data: reviews = [], isLoading: loadingReviews } = useReviewsTable();

    const handleDelete = (review: {
        id: number;
        name: string;
        avatar?: string;
    }) => {
        confirm({
            title: "Удалить отзыв?",
            description: `Отзыв от «${review.name}» будет удалён безвозвратно.`,
            confirmText: "Удалить",
            onConfirm: async () => {
                if (review.avatar) {
                    await deleteImage(review.avatar);
                }
                await $apiAdmin.delete(`/review/${review.id}`);
                await queryClient.invalidateQueries({
                    queryKey: ["admin-reviews"],
                });
            },
        });
    };

    const filteredReviews = useMemo(() => {
        if (!search.trim()) return reviews;
        const q = search.toLowerCase().trim();
        return reviews.filter(
            (r) =>
                r.name.toLowerCase().includes(q) ||
                r.whoIs.toLowerCase().includes(q) ||
                r.review.toLowerCase().includes(q),
        );
    }, [reviews, search]);

    if (loadingReviews) {
        return <AdminLoading title="Загрузка отзывов..." />;
    }

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <AdminPageTitle title="Отзывы" className="mb-0!" />

                <Link href="/admin/reviews/create">
                    <AdminButton variant="primary">Добавить отзыв</AdminButton>
                </Link>
            </div>

            <div className="mb-6">
                <AdminInput
                    placeholder="Поиск по имени, роли, отзыву..."
                    variant="alternative"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    icon={<Search className="size-5" />}
                />
            </div>

            <AdminTable
                columns={[
                    { header: "Аватар" },
                    { header: "Имя" },
                    { header: "Спорт" },
                    { header: "Отзыв" },
                    { header: "Действия", align: "right" },
                ]}
                gridClassName={GRID_CLASS}
                isLoading={loadingReviews}
                itemsCount={filteredReviews.length}
                searchTerm={search}
                emptyMessage="Отзывов пока нет"
                emptySearchMessage="По вашему запросу ничего не найдено"
            >
                {filteredReviews.map((review) => (
                    <AdminTableRow key={review.id} gridClassName={GRID_CLASS}>
                        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/10">
                            {review.avatar ? (
                                <Image
                                    src={review.avatar}
                                    alt={review.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : null}
                        </div>
                        <div className="truncate">
                            {highlightSearchText(review.name, search)}
                        </div>
                        <div className="truncate text-gray-400">
                            {highlightSearchText(review.whoIs, search)}
                        </div>
                        <div className="line-clamp-2 text-sm text-gray-400">
                            {highlightSearchText(review.review, search)}
                        </div>
                        <div className="flex justify-end gap-2">
                            <Link
                                href={`/admin/reviews/${review.id}/edit`}
                                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                                title="Изменить"
                            >
                                <Edit size={16} />
                            </Link>
                            <button
                                type="button"
                                onClick={() => handleDelete(review)}
                                className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                                title="Удалить"
                            >
                                <Trash size={16} />
                            </button>
                        </div>
                    </AdminTableRow>
                ))}
            </AdminTable>
        </div>
    );
};

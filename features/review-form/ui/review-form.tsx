"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
    AdminButton,
    AdminFileUpload,
    AdminFormCard,
    AdminFormError,
    AdminFormGroup,
    AdminFormProps,
    AdminInput,
    AdminLoading,
    AdminPageTitle,
    AdminTextarea,
} from "@/shared/admin";
import { deleteImage, uploadImage, $apiAdmin } from "@/shared/utils";
import { useQueryClient } from "@tanstack/react-query";
import { ReviewFormSchema } from "../types/review-form-schema";
import {
    REVIEW_AVATAR_UPLOAD_PATH,
    REVIEW_MAX_LENGTH,
} from "../config/constants";
import { useReviewForm } from "../api/use-review-form";

export const ReviewForm = ({ type, id }: AdminFormProps) => {
    const isEdit = type === "edit" && id != null;

    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: review, isLoading: reviewLoading } = useReviewForm(id);
    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ReviewFormSchema>({
        defaultValues: {
            name: "",
            whoIs: "",
            avatar: "",
            review: "",
        },
    });

    const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [avatarError, setAvatarError] = useState<string | undefined>();

    const avatarUrl = useWatch({ control, name: "avatar", defaultValue: "" });
    const reviewValue =
        (useWatch({ control, name: "review", defaultValue: "" }) as string) ??
        "";
    const avatarDisplayValue = newAvatarFile ?? (avatarUrl || null);

    useEffect(() => {
        if (review) {
            reset({
                name: review.name,
                whoIs: review.whoIs,
                avatar: review.avatar,
                review: review.review,
            });
        }
    }, [review, reset]);

    const handleAvatarChange = (file: File | null) => {
        setNewAvatarFile(file);
        setAvatarError(undefined);
        if (file === null) setValue("avatar", "");
    };

    const onSubmit: SubmitHandler<ReviewFormSchema> = async (data) => {
        setSubmitError(null);
        setAvatarError(undefined);

        const file = newAvatarFile instanceof File ? newAvatarFile : null;
        const existingAvatar =
            typeof avatarUrl === "string" && avatarUrl.trim()
                ? avatarUrl
                : null;

        if (!file && !existingAvatar) {
            setAvatarError("Загрузите аватарку");
            return;
        }

        let finalAvatarUrl = existingAvatar;

        try {
            if (file) {
                if (isEdit && review?.avatar) {
                    await deleteImage(review.avatar);
                }
                const uploadResult = await uploadImage(
                    file,
                    REVIEW_AVATAR_UPLOAD_PATH,
                );
                if (!uploadResult.success || !uploadResult.url) {
                    setAvatarError(uploadResult.error ?? "Ошибка загрузки");
                    return;
                }
                finalAvatarUrl = uploadResult.url;
            }

            const payload = {
                name: data.name,
                whoIs: data.whoIs,
                avatar: finalAvatarUrl,
                review: data.review,
            };

            if (isEdit) {
                await $apiAdmin.put(`/review/${id}`, payload);
            } else {
                await $apiAdmin.post("/review", payload);
            }

            queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
            router.push("/admin/reviews");
        } catch {
            setSubmitError("Ошибка сохранения");
        }
    };

    if (isEdit && reviewLoading) {
        return <AdminLoading title="Загрузка отзыва..." />;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <AdminPageTitle
                    title={isEdit ? "Редактировать отзыв" : "Добавить отзыв"}
                    className="mb-0!"
                />

                <div className="flex items-center gap-2">
                    <AdminButton
                        variant="secondary"
                        className="min-w-[150px] rounded-full"
                        type="button"
                        onClick={() => router.push("/admin/reviews")}
                    >
                        Отмена
                    </AdminButton>
                    <AdminButton
                        variant="primary"
                        className="min-w-[150px] rounded-full"
                        type="submit"
                        form="review-form"
                        disabled={isSubmitting}
                    >
                        Сохранить
                    </AdminButton>
                </div>
            </div>

            <form
                id="review-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit)(e);
                }}
            >
                {submitError && <AdminFormError error={submitError} />}
                <AdminFormCard title="Данные отзыва">
                    <AdminFormGroup
                        title="Данные человека"
                        className="grid grid-cols-3 gap-4 mb-4"
                    >
                        <AdminInput
                            placeholder="Имя"
                            error={errors.name?.message}
                            disabled={isSubmitting}
                            {...register("name", {
                                required: "Введите имя",
                            })}
                        />

                        <AdminInput
                            placeholder="Вид спорта"
                            error={errors.whoIs?.message}
                            disabled={isSubmitting}
                            {...register("whoIs", {
                                required: "Введите вид спорта",
                            })}
                        />

                        <AdminFileUpload
                            name="avatar"
                            placeholder="Загрузить аватарку"
                            value={avatarDisplayValue}
                            onChange={handleAvatarChange}
                            disabled={isSubmitting}
                            error={avatarError}
                        />
                    </AdminFormGroup>

                    <div className="relative">
                        <AdminTextarea
                            placeholder="Отзыв"
                            className="pb-8"
                            rows={7}
                            maxLength={REVIEW_MAX_LENGTH}
                            error={errors.review?.message}
                            disabled={isSubmitting}
                            {...register("review", {
                                required: "Введите отзыв",
                                maxLength: {
                                    value: REVIEW_MAX_LENGTH,
                                    message: `Максимум ${REVIEW_MAX_LENGTH} символов`,
                                },
                            })}
                        />
                        <p className="absolute bottom-4 right-4 text-xs text-[#656565]">
                            {reviewValue.length}/{REVIEW_MAX_LENGTH}
                        </p>
                    </div>
                </AdminFormCard>
            </form>
        </div>
    );
};

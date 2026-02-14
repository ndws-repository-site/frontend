"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
    AdminButton,
    AdminFormCard,
    AdminFormError,
    AdminFormProps,
    AdminInput,
    AdminLoading,
    AdminPageTitle,
} from "@/shared/admin";
import { $apiAdmin, getErrorMessage } from "@/shared/utils";
import { useQueryClient } from "@tanstack/react-query";
import { GoalFormSchema } from "../types/goal-form-schema";
import { useGoal } from "../api/use-goal";

export const GoalForm = ({ type, id }: AdminFormProps) => {
    const isEdit = type === "edit" && id != null;
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: goal, isLoading: goalLoading } = useGoal(id);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<GoalFormSchema>({
        defaultValues: { name: "" },
    });

    useEffect(() => {
        if (goal) {
            reset({ name: goal.name });
        }
    }, [goal, reset]);

    const [submitError, setSubmitError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<GoalFormSchema> = async (data) => {
        setSubmitError(null);
        try {
            if (isEdit) {
                await $apiAdmin.put(`/goal/${id}`, data);
            } else {
                await $apiAdmin.post("/goal", data);
            }
            queryClient.invalidateQueries({ queryKey: ["goal-table"] });
            queryClient.invalidateQueries({
                queryKey: ["goal-for-product-table"],
            });
            if (isEdit && id) {
                queryClient.invalidateQueries({ queryKey: ["goal", id] });
            }
            router.push("/admin/goal");
        } catch (e) {
            setSubmitError(getErrorMessage(e) ?? "Ошибка сохранения");
        }
    };

    if (isEdit && goalLoading) {
        return <AdminLoading title="Загрузка цели..." />;
    }

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <AdminPageTitle
                    title={isEdit ? "Редактировать цель" : "Добавить цель"}
                    className="mb-0!"
                />

                <div className="flex items-center gap-2">
                    <AdminButton
                        variant="secondary"
                        className="min-w-[150px] rounded-full"
                        type="button"
                        onClick={() => router.push("/admin/goal")}
                    >
                        Отмена
                    </AdminButton>
                    <AdminButton
                        variant="primary"
                        className="min-w-[150px] rounded-full"
                        type="submit"
                        form="goal-form"
                        disabled={isSubmitting}
                    >
                        Сохранить
                    </AdminButton>
                </div>
            </div>
            <form
                id="goal-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit)(e);
                }}
            >
                {submitError && <AdminFormError error={submitError} />}
                <AdminFormCard title="Данные цели">
                    <AdminInput
                        placeholder="Название цели"
                        error={errors.name?.message}
                        disabled={isSubmitting}
                        {...register("name", {
                            required: "Введите название цели",
                        })}
                    />
                </AdminFormCard>
            </form>
        </div>
    );
};

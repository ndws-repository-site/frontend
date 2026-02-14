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
import { FormFormSchema } from "../types/form-form-schema";
import { useFormItem } from "../api/use-form";

export const FormForm = ({ type, id }: AdminFormProps) => {
    const isEdit = type === "edit" && id != null;
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: formData, isLoading: formLoading } = useFormItem(id);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormFormSchema>({
        defaultValues: { name: "" },
    });

    useEffect(() => {
        if (formData) {
            reset({ name: formData.name });
        }
    }, [formData, reset]);

    const [submitError, setSubmitError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<FormFormSchema> = async (data) => {
        setSubmitError(null);
        try {
            if (isEdit) {
                await $apiAdmin.put(`/form/${id}`, data);
            } else {
                await $apiAdmin.post("/form", data);
            }
            queryClient.invalidateQueries({ queryKey: ["form-table"] });
            router.push("/admin/form");
        } catch (e) {
            setSubmitError(getErrorMessage(e) ?? "Ошибка сохранения");
        }
    };

    if (isEdit && formLoading) {
        return <AdminLoading title="Загрузка формы..." />;
    }

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <AdminPageTitle
                    title={isEdit ? "Редактировать форму" : "Добавить форму"}
                    className="mb-0!"
                />

                <div className="flex items-center gap-2">
                    <AdminButton
                        variant="secondary"
                        className="min-w-[150px] rounded-full"
                        type="button"
                        onClick={() => router.push("/admin/form")}
                    >
                        Отмена
                    </AdminButton>
                    <AdminButton
                        variant="primary"
                        className="min-w-[150px] rounded-full"
                        type="submit"
                        form="form-form"
                        disabled={isSubmitting}
                    >
                        Сохранить
                    </AdminButton>
                </div>
            </div>
            <form
                id="form-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit)(e);
                }}
            >
                {submitError && <AdminFormError error={submitError} />}
                <AdminFormCard title="Данные формы">
                    <AdminInput
                        placeholder="Название формы"
                        error={errors.name?.message}
                        disabled={isSubmitting}
                        {...register("name", {
                            required: "Введите название формы",
                        })}
                    />
                </AdminFormCard>
            </form>
        </div>
    );
};

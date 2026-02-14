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
import { ProductTypeFormSchema } from "../types/product-type-form-schema";
import { useProductType } from "../api/use-product-type";

export const ProductTypeForm = ({ type, id }: AdminFormProps) => {
    const isEdit = type === "edit" && id != null;
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: productType, isLoading: productTypeLoading } =
        useProductType(id);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ProductTypeFormSchema>({
        defaultValues: { name: "" },
    });

    useEffect(() => {
        if (productType) {
            reset({ name: productType.name });
        }
    }, [productType, reset]);

    const [submitError, setSubmitError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<ProductTypeFormSchema> = async (data) => {
        setSubmitError(null);
        try {
            if (isEdit) {
                await $apiAdmin.put(`/product-type/${id}`, data);
            } else {
                await $apiAdmin.post("/product-type", data);
            }
            queryClient.invalidateQueries({
                queryKey: ["product-type-table"],
            });
            queryClient.invalidateQueries({
                queryKey: ["product-type-for-product-table"],
            });
            if (isEdit && id) {
                queryClient.invalidateQueries({
                    queryKey: ["product-type", id],
                });
            }
            router.push("/admin/product-type");
        } catch (e) {
            setSubmitError(getErrorMessage(e) ?? "Ошибка сохранения");
        }
    };

    if (isEdit && productTypeLoading) {
        return <AdminLoading title="Загрузка типа товара..." />;
    }

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <AdminPageTitle
                    title={
                        isEdit
                            ? "Редактировать тип товара"
                            : "Добавить тип товара"
                    }
                    className="mb-0!"
                />

                <div className="flex items-center gap-2">
                    <AdminButton
                        variant="secondary"
                        className="min-w-[150px] rounded-full"
                        type="button"
                        onClick={() => router.push("/admin/product-type")}
                    >
                        Отмена
                    </AdminButton>
                    <AdminButton
                        variant="primary"
                        className="min-w-[150px] rounded-full"
                        type="submit"
                        form="product-type-form"
                        disabled={isSubmitting}
                    >
                        Сохранить
                    </AdminButton>
                </div>
            </div>
            <form
                id="product-type-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit)(e);
                }}
            >
                {submitError && <AdminFormError error={submitError} />}
                <AdminFormCard title="Данные типа товара">
                    <AdminInput
                        placeholder="Название типа товара"
                        error={errors.name?.message}
                        disabled={isSubmitting}
                        {...register("name", {
                            required: "Введите название типа товара",
                        })}
                    />
                </AdminFormCard>
            </form>
        </div>
    );
};

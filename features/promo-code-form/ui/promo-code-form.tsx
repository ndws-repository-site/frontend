"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
    AdminButton,
    AdminCheckbox,
    AdminFormCard,
    AdminFormError,
    AdminFormGroup,
    AdminFormProps,
    AdminInput,
    AdminLoading,
    AdminPageTitle,
} from "@/shared/admin";
import { $apiAdmin, getErrorMessage } from "@/shared/utils";
import { useQueryClient } from "@tanstack/react-query";
import { PromoCodeFormSchema } from "../types/promo-code-form-schema";
import { usePromocode } from "../api/use-promocode";
import { buildPromocodePayload } from "../lib/build-promocode-payload";

const toDatetimeLocal = (iso: string | null) => {
    if (!iso) return "";
    return new Date(iso).toISOString().slice(0, 16);
};

const toIsoOrNull = (value: string) => {
    if (!value.trim()) return null;
    return new Date(value).toISOString();
};

export const PromoCodeForm = ({ type, id }: AdminFormProps) => {
    const isEdit = type === "edit" && id != null;
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: promocodeData, isLoading: promocodeLoading } =
        usePromocode(id);

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PromoCodeFormSchema>({
        defaultValues: {
            code: "",
            discount: 10,
            maxUses: 1,
            isActive: true,
            expiresAt: "",
        },
    });

    useEffect(() => {
        if (promocodeData) {
            reset({
                code: promocodeData.code,
                discount: promocodeData.discount,
                maxUses: promocodeData.maxUses,
                isActive: promocodeData.isActive,
                expiresAt: toDatetimeLocal(promocodeData.expiresAt),
            });
        }
    }, [promocodeData, reset]);

    const [submitError, setSubmitError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<PromoCodeFormSchema> = async (data) => {
        setSubmitError(null);
        try {
            const payload = buildPromocodePayload({
                code: data.code.trim(),
                discount: Number(data.discount),
                maxUses: Number(data.maxUses),
                isActive: data.isActive,
                expiresAt: toIsoOrNull(data.expiresAt),
            });
            if (isEdit) {
                await $apiAdmin.put(`/promocode/${id}`, payload);
            } else {
                await $apiAdmin.post("/promocode", payload);
            }
            queryClient.invalidateQueries({ queryKey: ["promocode-table"] });
            if (isEdit && id) {
                queryClient.invalidateQueries({ queryKey: ["promocode", id] });
            }
            router.push("/admin/promo-code");
        } catch (e) {
            setSubmitError(getErrorMessage(e) ?? "Ошибка сохранения");
        }
    };

    if (isEdit && promocodeLoading) {
        return <AdminLoading title="Загрузка промокода..." />;
    }

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <AdminPageTitle
                    title={
                        isEdit ? "Редактировать промокод" : "Добавить промокод"
                    }
                    className="mb-0!"
                />

                <div className="flex items-center gap-2">
                    <AdminButton
                        variant="secondary"
                        className="min-w-[150px] rounded-full"
                        type="button"
                        onClick={() => router.push("/admin/promo-code")}
                    >
                        Отмена
                    </AdminButton>
                    <AdminButton
                        variant="primary"
                        className="min-w-[150px] rounded-full"
                        type="submit"
                        form="promo-code-form"
                        disabled={isSubmitting}
                    >
                        Сохранить
                    </AdminButton>
                </div>
            </div>

            <form
                id="promo-code-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit)(e);
                }}
            >
                {submitError && <AdminFormError error={submitError} />}
                <AdminFormCard title="Данные промокода">
                    <AdminFormGroup title="Код" className="mb-6">
                        <AdminInput
                            placeholder="SUMMER2026"
                            error={errors.code?.message}
                            disabled={isSubmitting}
                            {...register("code", {
                                required: "Введите код промокода",
                            })}
                        />
                    </AdminFormGroup>

                    <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <AdminFormGroup title="Скидка, %">
                            <AdminInput
                                type="number"
                                placeholder="10"
                                min={1}
                                max={100}
                                error={errors.discount?.message}
                                disabled={isSubmitting}
                                {...register("discount", {
                                    required: "Введите скидку",
                                    min: {
                                        value: 1,
                                        message: "Минимум 1%",
                                    },
                                    max: {
                                        value: 100,
                                        message: "Максимум 100%",
                                    },
                                    valueAsNumber: true,
                                })}
                            />
                        </AdminFormGroup>

                        <AdminFormGroup title="Макс. применений">
                            <AdminInput
                                type="number"
                                placeholder="1"
                                min={1}
                                error={errors.maxUses?.message}
                                disabled={isSubmitting}
                                {...register("maxUses", {
                                    required: "Введите лимит применений",
                                    min: {
                                        value: 1,
                                        message: "Минимум 1",
                                    },
                                    valueAsNumber: true,
                                })}
                            />
                        </AdminFormGroup>
                    </div>

                    <AdminFormGroup title="Дата истечения" className="mb-6">
                        <AdminInput
                            type="datetime-local"
                            disabled={isSubmitting}
                            {...register("expiresAt")}
                        />
                        <p className="mt-2 text-sm text-gray-500">
                            Оставьте пустым для бессрочного промокода
                        </p>
                    </AdminFormGroup>

                    <AdminFormGroup title="Статус">
                        <Controller
                            name="isActive"
                            control={control}
                            render={({ field }) => (
                                <AdminCheckbox
                                    checked={field.value}
                                    onChange={field.onChange}
                                    label="Активен"
                                    disabled={isSubmitting}
                                />
                            )}
                        />
                    </AdminFormGroup>
                </AdminFormCard>
            </form>
        </div>
    );
};

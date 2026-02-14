"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import {
    AdminButton,
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
import { FaqFormSchema } from "../types/faq-form-schema";
import { useFaq } from "../api/use-faq";

export const FaqForm = ({ type, id }: AdminFormProps) => {
    const isEdit = type === "edit" && id != null;
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: faqData, isLoading: faqLoading } = useFaq(id);

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FaqFormSchema>({
        defaultValues: {
            name: "",
            faq: [{ question: "", answer: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "faq",
    });

    useEffect(() => {
        if (faqData) {
            reset({
                name: faqData.name,
                faq:
                    faqData.faq?.length > 0
                        ? faqData.faq
                        : [{ question: "", answer: "" }],
            });
        }
    }, [faqData, reset]);

    const [submitError, setSubmitError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<FaqFormSchema> = async (data) => {
        setSubmitError(null);
        const validFaq = data.faq.filter(
            (item) => item.question.trim() !== "" && item.answer.trim() !== "",
        );
        if (validFaq.length === 0) {
            setSubmitError("Добавьте хотя бы один вопрос и ответ");
            return;
        }
        try {
            const payload = {
                name: data.name,
                faq: validFaq,
            };
            if (isEdit) {
                await $apiAdmin.put(`/faq/${id}`, payload);
            } else {
                await $apiAdmin.post("/faq", payload);
            }
            queryClient.invalidateQueries({ queryKey: ["faq-table"] });
            router.push("/admin/faq");
        } catch (e) {
            setSubmitError(getErrorMessage(e) ?? "Ошибка сохранения");
        }
    };

    if (isEdit && faqLoading) {
        return <AdminLoading title="Загрузка FAQ..." />;
    }

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <AdminPageTitle
                    title={isEdit ? "Редактировать FAQ" : "Добавить FAQ"}
                    className="mb-0!"
                />

                <div className="flex items-center gap-2">
                    <AdminButton
                        variant="secondary"
                        className="min-w-[150px] rounded-full"
                        type="button"
                        onClick={() => router.push("/admin/faq")}
                    >
                        Отмена
                    </AdminButton>
                    <AdminButton
                        variant="primary"
                        className="min-w-[150px] rounded-full"
                        type="submit"
                        form="faq-form"
                        disabled={isSubmitting}
                    >
                        Сохранить
                    </AdminButton>
                </div>
            </div>

            <form
                id="faq-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit)(e);
                }}
            >
                {submitError && <AdminFormError error={submitError} />}
                <AdminFormCard title="Данные FAQ">
                    <AdminFormGroup title="Название FAQ" className="mb-6">
                        <AdminInput
                            placeholder="Название FAQ"
                            error={errors.name?.message}
                            disabled={isSubmitting}
                            {...register("name", {
                                required: "Введите название FAQ",
                            })}
                        />
                    </AdminFormGroup>

                    <AdminFormGroup title="Вопросы и ответы" className="mb-4">
                        <div className="flex flex-col gap-4">
                            {fields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="flex gap-2 items-start"
                                >
                                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <AdminInput
                                            placeholder="Вопрос"
                                            disabled={isSubmitting}
                                            {...register(
                                                `faq.${index}.question`,
                                            )}
                                        />
                                        <AdminInput
                                            placeholder="Ответ"
                                            disabled={isSubmitting}
                                            {...register(`faq.${index}.answer`)}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        disabled={
                                            fields.length <= 1 || isSubmitting
                                        }
                                        className="mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all hover:bg-red-500/20 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:text-gray-400"
                                        title="Удалить"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                            <AdminButton
                                type="button"
                                variant="secondary"
                                className="w-fit rounded-full"
                                onClick={() =>
                                    append({ question: "", answer: "" })
                                }
                                disabled={isSubmitting}
                            >
                                <Plus size={18} className="mr-2" />
                                Добавить вопрос-ответ
                            </AdminButton>
                        </div>
                    </AdminFormGroup>
                </AdminFormCard>
            </form>
        </div>
    );
};

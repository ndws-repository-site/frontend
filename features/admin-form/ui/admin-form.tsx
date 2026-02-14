"use client";

import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import {
    AdminButton,
    AdminFormCard,
    AdminInput,
    AdminPageTitle,
} from "@/shared/admin";
import { createAdmin } from "../api/create-admin";
import { useQueryClient } from "@tanstack/react-query";

interface CreateAdminInputs {
    name: string;
    email: string;
    password: string;
}

export const AdminForm = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<CreateAdminInputs>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const onSubmit: SubmitHandler<CreateAdminInputs> = async (data) => {
        try {
            setIsLoading(true);

            await createAdmin({
                name: data.name,
                email: data.email,
                password: data.password,
            });

            queryClient.invalidateQueries({ queryKey: ["admin-table"] });
            router.push("/admin/admin");
        } catch (error) {
            console.error(error);
            if (isAxiosError(error) && error.response) {
                const errorMessage =
                    error.response.data.message || "Ошибка при создании";
                setError("root", { type: "server", message: errorMessage });
            } else {
                setError("root", {
                    type: "server",
                    message: "Произошла неизвестная ошибка",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8 flex items-center justify-between">
                <AdminPageTitle title="Добавить участника" className="mb-0!" />

                <div className="flex items-center gap-4">
                    {errors.root && (
                        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400">
                            {errors.root.message}
                        </div>
                    )}

                    <div className="flex gap-2">
                        <AdminButton
                            variant="secondary"
                            className="min-w-[150px] rounded-full"
                            type="button"
                            onClick={() => router.back()}
                            disabled={isLoading}
                        >
                            Отмена
                        </AdminButton>
                        <AdminButton
                            className="min-w-[150px] rounded-full"
                            type="submit"
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            Добавить
                        </AdminButton>
                    </div>
                </div>
            </div>

            <AdminFormCard>
                <div className="grid grid-cols-2 gap-2">
                    <Controller
                        control={control}
                        name="name"
                        rules={{ required: "Введите имя" }}
                        render={({ field }) => (
                            <AdminInput
                                {...field}
                                placeholder="Имя участника"
                                error={errors.name?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: "Введите почту",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Некорректный email",
                            },
                        }}
                        render={({ field }) => (
                            <AdminInput
                                {...field}
                                placeholder="Электронная почта"
                                error={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: "Введите пароль",
                            minLength: {
                                value: 6,
                                message: "Минимум 6 символов",
                            },
                        }}
                        render={({ field }) => (
                            <AdminInput
                                {...field}
                                placeholder="Пароль"
                                type="password"
                                error={errors.password?.message}
                            />
                        )}
                    />
                </div>
            </AdminFormCard>
        </form>
    );
};

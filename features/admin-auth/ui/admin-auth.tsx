"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { LoginFormData } from "../types/login-form-data";
import { sendAuth } from "../api/send-auth";
import { AdminCard, AdminInput, AdminButton } from "@/shared/admin";

export const AdminAuth = () => {
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>();

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        setServerError(null);

        try {
            const response = await sendAuth(data);

            if (!response?.access_token) {
                throw new Error("Токен не получен от сервера");
            }

            const cookieResponse = await fetch("/api/auth/set-cookie", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: response.access_token }),
                credentials: "include",
            });

            const cookieResult = await cookieResponse.json();

            if (!cookieResponse.ok || !cookieResult?.success) {
                throw new Error(
                    cookieResult?.error || "Ошибка сохранения сессии",
                );
            }

            router.push("/admin");
        } catch (error) {
            let errorMessage = "Произошла неизвестная ошибка";

            if (error instanceof AxiosError) {
                const backendMessage = error.response?.data?.message;

                if (Array.isArray(backendMessage)) {
                    errorMessage = backendMessage[0];
                } else if (typeof backendMessage === "string") {
                    errorMessage = backendMessage;
                } else {
                    errorMessage = "Ошибка сервера. Попробуйте позже.";
                }
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            setServerError(errorMessage);
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <AdminCard className="p-7.5 min-w-[500px]">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(onSubmit)(e);
                    }}
                >
                    <p className="text-white text-center text-[20px] mb-7">
                        Войти в систему
                    </p>

                    {serverError && (
                        <div className="mb-4 p-3 bg-red-900/20 border border-red-500/20 rounded-xl text-red-200 text-sm text-center">
                            {serverError}
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-3 mb-5">
                        <AdminInput
                            placeholder="Email"
                            error={errors.email?.message}
                            disabled={isSubmitting}
                            {...register("email", {
                                required: "Введите Email",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Некорректный формат Email",
                                },
                            })}
                        />

                        <AdminInput
                            type="password"
                            placeholder="Пароль"
                            error={errors.password?.message}
                            disabled={isSubmitting}
                            {...register("password", {
                                required: "Введите пароль",
                            })}
                        />
                    </div>

                    <AdminButton
                        type="submit"
                        className="w-full text-center"
                        loading={isSubmitting}
                    >
                        Войти
                    </AdminButton>
                </form>
            </AdminCard>
        </div>
    );
};

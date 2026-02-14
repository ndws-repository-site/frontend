"use client";

import { AdminButton, AdminFileUpload, AdminFormCard, AdminLoading, AdminPageTitle } from "@/shared/admin"
import { useEffect, useState } from "react";
import { useHero } from "../api/use-hero";
import { AdminFormError } from "@/shared/admin/ui/form/admin-form-error";
import { useRouter } from "next/navigation";
import { deleteImage, uploadImage, $apiAdmin } from "@/shared/utils";
import { useQueryClient } from "@tanstack/react-query";

export const HeroBlock = () => {
    const { data: hero, isLoading: heroLoading } = useHero();
    const router = useRouter();
    const queryClient = useQueryClient();

    //States
    const [image, setImage] = useState<File | string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageError, setImageError] = useState<string | undefined>();

    useEffect(() => {
        if (hero) {
            setImage(hero);
        }
    }, [hero]);

    if (heroLoading) {
        return <AdminLoading />;
    }

    const handleImageChange = (file: File | null) => {
        setImage(file);
    };

    const handleSave = async () => {
        setError(null);
        setImageError(undefined);
        setIsLoading(true);

        const file = image instanceof File ? image : null;
        if (!file) {
            setImageError("Изображение не выбрано");
            setIsLoading(false);
            return;
        }

        try {
            if (hero && typeof hero === "string") {
                await deleteImage(hero);
            }

            const uploadResult = await uploadImage(file, ["hero"]);
            if (!uploadResult.success || !uploadResult.url) {
                setError(uploadResult.error ?? "Ошибка загрузки");
                return;
            }
            setImage(uploadResult.url);
            await $apiAdmin.put("/hero", { image: uploadResult.url });
            queryClient.invalidateQueries({ queryKey: ["hero-block"] });
        } catch (err) {
            setError("Ошибка сохранения");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <AdminPageTitle title="Редактировать хиро блок" className="mb-0!" />

                <div className="flex items-center gap-2">
                    <AdminButton
                        variant="secondary"
                        className="min-w-[150px] rounded-full"
                        type="button"
                        disabled={isLoading}
                        onClick={() => router.back()}
                    >
                        Отмена
                    </AdminButton>

                    <AdminButton
                        className="min-w-[150px] rounded-full"
                        type="submit"
                        disabled={isLoading}
                        onClick={handleSave}
                    >
                        Сохранить
                    </AdminButton>
                </div>
            </div>

            <form>
                {error && <AdminFormError error={error} />}
                <AdminFormCard title="Изображение">
                    <AdminFileUpload
                        name="image" 
                        placeholder="Загрузить изображение"
                        accept="image/png, image/svg+xml"
                        variant="standard"
                        error={imageError}
                        value={image}
                        onChange={handleImageChange}
                    />
                </AdminFormCard>
            </form>
        </div>
    )
}
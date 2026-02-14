"use client";

import { useState, useMemo, useEffect } from "react";
import {
    AdminButton,
    AdminColorPicker,
    AdminFormCard,
    AdminFormError,
    AdminFormProps,
    AdminInput,
    AdminLoading,
    AdminPageTitle,
    AdminSelect,
} from "@/shared/admin";
import { useRouter } from "next/navigation";
import { useProductTable } from "@/page/admin-product";
import { getErrorMessage } from "@/shared/utils";
import { useQueryClient } from "@tanstack/react-query";
import { getNeutralIconList } from "../config/icon-list";
import { useProductBlock } from "../api/use-product-block";
import { createProductBlock } from "../api/create-product-block";
import { updateProductBlock } from "../api/update-product-block";

export const ProductBlockForm = ({ type, id }: AdminFormProps) => {
    const isEdit = type === "edit" && id != null;
    const router = useRouter();
    const queryClient = useQueryClient();
    const iconOptions = getNeutralIconList();

    const { data: block, isLoading: blockLoading } = useProductBlock(id);
    const { data: products = [], isLoading: productsLoading } =
        useProductTable();
    const productOptions = useMemo(
        () =>
            products.map((p) => ({
                value: p.id,
                label: p.name,
                keywords:
                    `${p.name} ${p.slug} ${p.description ?? ""}`.toLowerCase(),
            })),
        [products],
    );

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("");
    const [icon, setIcon] = useState<string | null>(null);
    const [iconColor, setIconColor] = useState("");
    const [productId, setProductId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    useEffect(() => {
        if (block) {
            setTitle(block.title);
            setSubtitle(block.subtitle);
            setBackgroundColor(block.color);
            setIcon(block.icon);
            setIconColor(block.iconColor);
            setProductId(block.product?.id ?? null);
        }
    }, [block]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);

        if (!icon) {
            setSubmitError("Выберите иконку");
            return;
        }
        if (!productId) {
            setSubmitError("Выберите товар");
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                title,
                subtitle,
                color: backgroundColor,
                icon,
                iconColor,
                productId,
            };

            if (isEdit) {
                await updateProductBlock(Number(id), payload);
            } else {
                await createProductBlock(payload);
            }

            queryClient.invalidateQueries({
                queryKey: ["admin-product-block-table"],
            });
            if (isEdit) {
                queryClient.invalidateQueries({
                    queryKey: ["product-block", id],
                });
            }
            router.push("/admin/products-block");
        } catch (e) {
            setSubmitError(getErrorMessage(e) ?? "Ошибка сохранения");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isEdit && blockLoading) {
        return <AdminLoading title="Загрузка блока продуктов..." />;
    }

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <AdminPageTitle
                    title={
                        isEdit
                            ? "Редактировать блок продуктов"
                            : "Добавить блок продуктов"
                    }
                    className="mb-0!"
                />

                <div className="flex items-center gap-2">
                    <AdminButton
                        variant="secondary"
                        className="min-w-[150px] rounded-full"
                        type="button"
                        onClick={() => router.push("/admin/products-block")}
                    >
                        Отмена
                    </AdminButton>
                    <AdminButton
                        variant="primary"
                        className="min-w-[150px] rounded-full"
                        type="submit"
                        form="product-block-form"
                        disabled={isSubmitting}
                    >
                        Сохранить
                    </AdminButton>
                </div>
            </div>

            <form id="product-block-form" onSubmit={handleSubmit}>
                {submitError && <AdminFormError error={submitError} />}
                <AdminFormCard title="Данные блока продуктов">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        <AdminInput
                            placeholder="Заголовок"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={isSubmitting}
                        />

                        <AdminInput
                            placeholder="Подзаголовок"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            disabled={isSubmitting}
                        />

                        <AdminColorPicker
                            placeholder="Цвет фона"
                            value={backgroundColor}
                            onChange={setBackgroundColor}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <AdminSelect
                            placeholder="Выберите иконку..."
                            value={icon}
                            onChange={(val) =>
                                setIcon(val != null ? String(val) : null)
                            }
                            options={iconOptions}
                            isSearchable
                        />
                        <AdminColorPicker
                            placeholder="Цвет иконки"
                            value={iconColor}
                            onChange={setIconColor}
                        />
                    </div>

                    <div className="mb-4">
                        <AdminSelect
                            placeholder="Выберите товар..."
                            value={productId}
                            onChange={(val) =>
                                setProductId(val != null ? String(val) : null)
                            }
                            options={productOptions}
                            isSearchable
                            isLoading={productsLoading}
                        />
                    </div>
                </AdminFormCard>
            </form>
        </div>
    );
};

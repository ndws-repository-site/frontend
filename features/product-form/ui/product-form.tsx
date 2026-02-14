"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
    AdminButton,
    AdminFormCard,
    AdminFormError,
    AdminFormGroup,
    AdminFormProps,
    AdminInput,
    AdminInlineButton,
    AdminLoading,
    AdminMultiFileUpload,
    AdminPageTitle,
    AdminSelect,
} from "@/shared/admin";
import {
    deleteImage,
    uploadImage,
    $apiAdmin,
    getErrorMessage,
} from "@/shared/utils";
import { useQueryClient } from "@tanstack/react-query";
import {
    useFormForProductTable,
    useGoalForProductTable,
    useProductTable,
    useProductTypeForProductTable,
} from "@/page/admin-product";
import { useFaqTable } from "@/page/admin-faq";
import { AddProductPage } from "./add-product-page";
import { RecommendedProductCard } from "./recommended-product-card";
import { useProduct } from "../api/use-product";
import {
    PRODUCT_IMAGES_UPLOAD_PATH,
    MAX_PRODUCT_IMAGES,
} from "../config/constants";
import { ProductFormSchema } from "../types/product-form-schema";
import type { ProductFormContentProps } from "../types/product-form-content.props";
import { getDefaultFormValues } from "../utils/get-default-form-values";
import { handlePriceKeyDown, handleStockKeyDown } from "../utils/price";

const ProductFormContent = ({
    product,
    isEdit,
    id,
}: ProductFormContentProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [images, setImages] = useState<(File | string)[]>(
        () => product?.images ?? [],
    );
    const [recommendedProductIds, setRecommendedProductIds] = useState<
        string[]
    >(() => product?.recommmendedProducts?.map((p) => p.id) ?? []);
    const [addProductPage, setAddProductPage] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [imagesError, setImagesError] = useState<string | undefined>();

    const { data: productTypes = [], isLoading: loadingProductTypes } =
        useProductTypeForProductTable();
    const { data: forms = [], isLoading: loadingForms } =
        useFormForProductTable();
    const { data: goals = [], isLoading: loadingGoals } =
        useGoalForProductTable();
    const { data: faqs = [], isLoading: loadingFaqs } = useFaqTable();
    const { data: products = [] } = useProductTable();

    const [productTypeId, setProductTypeId] = useState<number | null>(
        () => product?.productType?.id ?? null,
    );
    const [formId, setFormId] = useState<number | null>(
        () => product?.form?.id ?? null,
    );
    const [goalId, setGoalId] = useState<number | null>(
        () => product?.goal?.id ?? null,
    );
    const [faqId, setFaqId] = useState<number | null>(
        () => product?.faq?.id ?? null,
    );

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProductFormSchema>({
        defaultValues: getDefaultFormValues(product),
    });

    const addRecommendedProduct = (productId: string) => {
        if (!recommendedProductIds.includes(productId)) {
            setRecommendedProductIds((prev) => [...prev, productId]);
        }
    };

    const removeRecommendedProduct = (productId: string) => {
        setRecommendedProductIds((prev) =>
            prev.filter((id) => id !== productId),
        );
    };

    const recommendedProducts = products.filter((p) =>
        recommendedProductIds.includes(p.id),
    );

    const onSubmit: SubmitHandler<ProductFormSchema> = async (data) => {
        setSubmitError(null);
        setImagesError(undefined);

        if (!images.length) {
            setImagesError("Добавьте хотя бы одно изображение");
            return;
        }

        try {
            const imageUrls: string[] = [];
            const newFiles = images.filter((f): f is File => f instanceof File);
            const existingUrls = images.filter(
                (f): f is string => typeof f === "string",
            );

            for (const file of newFiles) {
                const result = await uploadImage(
                    file,
                    PRODUCT_IMAGES_UPLOAD_PATH,
                );
                if (!result.success || !result.url) {
                    setImagesError(
                        result.error ?? "Ошибка загрузки изображения",
                    );
                    return;
                }
                imageUrls.push(result.url);
            }

            const allImages = [...existingUrls, ...imageUrls];

            if (isEdit && product?.images?.length) {
                const urlsToRemove = product.images.filter(
                    (url) => !allImages.includes(url),
                );
                for (const url of urlsToRemove) {
                    await deleteImage(url);
                }
            }

            const payload = {
                name: data.name,
                description: data.description,
                price: parseFloat(data.price) || 0,
                stock: parseInt(data.stock, 10) || 0,
                images: allImages,
                forWho: data.forWho,
                howToUse: data.howToUse,
                composition: data.composition,
                productTypeId,
                formId,
                goalId,
                faqId,
                recommendedProductIds,
            };

            if (isEdit) {
                await $apiAdmin.put(`/product/${id}`, payload);
            } else {
                await $apiAdmin.post("/product", payload);
            }

            queryClient.invalidateQueries({ queryKey: ["product-table"] });
            queryClient.invalidateQueries({
                queryKey: ["admin-product-block-table"],
            });
            if (isEdit && id) {
                queryClient.invalidateQueries({ queryKey: ["product", id] });
            }
            router.push("/admin/product");
        } catch (e) {
            setSubmitError(getErrorMessage(e) ?? "Ошибка сохранения");
        }
    };

    if (addProductPage) {
        return (
            <AddProductPage
                onBack={() => setAddProductPage(false)}
                products={products}
                selectedProductIds={recommendedProductIds}
                currentProductId={id != null ? String(id) : undefined}
                onAdd={addRecommendedProduct}
                onRemove={removeRecommendedProduct}
            />
        );
    }

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <AdminPageTitle
                    title={isEdit ? "Редактировать товар" : "Добавить товар"}
                    className="mb-0!"
                />

                <div className="flex items-center gap-2">
                    <AdminButton
                        variant="secondary"
                        className="min-w-[150px] rounded-full"
                        type="button"
                        onClick={() => router.push("/admin/product")}
                    >
                        Отмена
                    </AdminButton>

                    <AdminButton
                        variant="primary"
                        className="min-w-[150px] rounded-full"
                        type="submit"
                        form="product-form"
                        disabled={isSubmitting}
                    >
                        Сохранить
                    </AdminButton>
                </div>
            </div>

            <form
                id="product-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit)(e);
                }}
            >
                {submitError && <AdminFormError error={submitError} />}

                <AdminFormCard title="Основные данные" className="mb-4">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        <AdminInput
                            placeholder="Название товара"
                            error={errors.name?.message}
                            disabled={isSubmitting}
                            {...register("name", {
                                required: "Введите название товара",
                            })}
                        />

                        <AdminInput
                            placeholder="Описание товара"
                            error={errors.description?.message}
                            disabled={isSubmitting}
                            {...register("description")}
                        />

                        <AdminInput
                            placeholder="Цена товара (в долларах)"
                            error={errors.price?.message}
                            disabled={isSubmitting}
                            onKeyDown={handlePriceKeyDown}
                            {...register("price", {
                                required: "Введите цену",
                                validate: (v) =>
                                    !v ||
                                    !isNaN(parseFloat(v)) ||
                                    "Только цифры",
                            })}
                        />
                    </div>

                    <AdminFormGroup
                        title="Изображения"
                        className="col-span-full"
                    >
                        <AdminMultiFileUpload
                            placeholder="Добавить изображение"
                            value={images}
                            onChange={setImages}
                            maxFiles={MAX_PRODUCT_IMAGES}
                            error={imagesError}
                            disabled={isSubmitting}
                        />
                    </AdminFormGroup>
                </AdminFormCard>

                <AdminFormCard
                    title="Дополнительная информация"
                    className="mb-4"
                >
                    <div className="grid grid-cols-3 gap-2">
                        <AdminInput
                            placeholder="Для кого предназначен товар"
                            disabled={isSubmitting}
                            {...register("forWho")}
                        />

                        <AdminInput
                            placeholder="Как использовать товар"
                            disabled={isSubmitting}
                            {...register("howToUse")}
                        />

                        <AdminInput
                            placeholder="Состав товара"
                            disabled={isSubmitting}
                            {...register("composition")}
                        />
                    </div>
                </AdminFormCard>

                <AdminFormCard title="Настройки товара" className="mb-4">
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        <AdminSelect
                            value={productTypeId}
                            onChange={(v) =>
                                setProductTypeId(
                                    v === null ? null : (v as number),
                                )
                            }
                            options={productTypes.map((pt) => ({
                                value: pt.id,
                                label: pt.name,
                            }))}
                            placeholder="Тип товара"
                            isLoading={loadingProductTypes}
                        />
                        <AdminSelect
                            value={formId}
                            onChange={(v) =>
                                setFormId(v === null ? null : (v as number))
                            }
                            options={forms.map((f) => ({
                                value: f.id,
                                label: f.name,
                            }))}
                            placeholder="Форма"
                            isLoading={loadingForms}
                        />
                        <AdminSelect
                            value={goalId}
                            onChange={(v) =>
                                setGoalId(v === null ? null : (v as number))
                            }
                            options={goals.map((g) => ({
                                value: g.id,
                                label: g.name,
                            }))}
                            placeholder="Цель"
                            isLoading={loadingGoals}
                        />
                        <AdminSelect
                            value={faqId}
                            onChange={(v) =>
                                setFaqId(v === null ? null : (v as number))
                            }
                            options={faqs.map((faq) => ({
                                value: faq.id,
                                label: faq.name,
                            }))}
                            placeholder="FAQ"
                            isLoading={loadingFaqs}
                        />
                    </div>

                    <AdminInput
                        placeholder="Остаток товара"
                        error={errors.stock?.message}
                        disabled={isSubmitting}
                        onKeyDown={handleStockKeyDown}
                        {...register("stock", {
                            required: "Введите остаток",
                            validate: (v) =>
                                !v || /^\d+$/.test(v) || "Только цифры",
                        })}
                    />
                </AdminFormCard>

                <AdminFormCard title="Рекомендуемые товары" className="mb-4">
                    <div className="pb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {recommendedProducts.map((product) => (
                            <RecommendedProductCard
                                key={product.id}
                                product={product}
                                buttonAction="delete"
                                onAdminClick={removeRecommendedProduct}
                            />
                        ))}
                        {(!recommendedProductIds ||
                            recommendedProductIds.length === 0) && (
                            <p className="col-span-full text-sm text-white/30">
                                Рекомендуемые товары ещё не выбраны
                            </p>
                        )}
                    </div>
                    <AdminInlineButton
                        type="button"
                        onClick={() => setAddProductPage(true)}
                    >
                        Добавить товар
                    </AdminInlineButton>
                </AdminFormCard>
            </form>
        </div>
    );
};

export const ProductForm = ({ type, id }: AdminFormProps) => {
    const isEdit = type === "edit" && id != null;
    const { data: product, isLoading: productLoading } = useProduct(id);

    if (isEdit && productLoading) {
        return <AdminLoading title="Загрузка товара..." />;
    }

    return (
        <ProductFormContent
            key={product?.id ?? "create"}
            product={product}
            isEdit={isEdit}
            id={id != null ? String(id) : undefined}
        />
    );
};

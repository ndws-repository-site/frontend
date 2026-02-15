"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { AdminBackButton, AdminInput, AdminPageTitle } from "@/shared/admin";
import { useProductTable } from "@/page/admin-product";
import { RecommendedProductCard } from "./recommended-product-card";
import type { ProductResponse } from "@/shared/types";

interface AddProductPageProps {
    onBack: () => void;
    products: ProductResponse[];
    selectedProductIds: string[];
    currentProductId?: string;
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
}

export const AddProductPage = ({
    onBack,
    products,
    selectedProductIds,
    currentProductId,
    onAdd,
    onRemove,
}: AddProductPageProps) => {
    const [searchTerm, setSearchTerm] = useState("");

    const { isLoading: productsLoading } = useProductTable();

    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            if (p.id === currentProductId) return false;
            if (!searchTerm.trim()) return true;
            const q = searchTerm.toLowerCase().trim();
            return (
                p.name.toLowerCase().includes(q) ||
                (p.description && p.description.toLowerCase().includes(q))
            );
        });
    }, [products, searchTerm, currentProductId]);

    const handleToggle = (productId: string) => {
        if (selectedProductIds.includes(productId)) {
            onRemove(productId);
        } else {
            onAdd(productId);
        }
    };

    return (
        <div>
            <AdminPageTitle title="Выбор рекомендуемых товаров" />
            <AdminBackButton onClick={onBack} className="mb-6" />

            <div className="mb-6">
                <AdminInput
                    placeholder="Поиск по названию или описанию"
                    icon={<Search size={16} className="text-white" />}
                    variant="alternative"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {productsLoading ? (
                    Array.from({ length: 6 }).map((_, idx) => (
                        <RecommendedProductCard
                            key={idx}
                            product={{} as ProductResponse}
                            loading
                        />
                    ))
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <RecommendedProductCard
                            key={product.id}
                            product={product}
                            isSelected={selectedProductIds.includes(product.id)}
                            buttonAction="add"
                            onAdminClick={handleToggle}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-10 text-center text-[#656565]">
                        Товары не найдены
                    </div>
                )}
            </div>
        </div>
    );
};

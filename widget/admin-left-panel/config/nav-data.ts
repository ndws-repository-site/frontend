import {
    Home,
    Boxes,
    Eye,
    Target,
    FileText,
    Tags,
    HelpCircle,
    Package,
    CreditCard,
    User,
} from "lucide-react";
import { Navigation } from "../types/navigation";

/**
 * Данные навигации боковой панели админки.
 * Заполните пунктами меню: icon (из lucide-react), name, href, roles?, additionalHrefs?
 */
export const NAV_DATA: Navigation[] = [
    {
        icon: Home,
        name: "Хиро блок",
        href: "/admin/hero-block",
    },
    {
        icon: Boxes,
        name: "Блок товаров",
        href: "/admin/products-block",
        additionalHrefs: [
            "/admin/products-block/edit",
            "/admin/products-block/create",
        ],
    },
    {
        icon: Eye,
        name: "Отзывы",
        href: "/admin/reviews",
        additionalHrefs: ["/admin/reviews/edit", "/admin/reviews/create"],
    },
    {
        icon: Target,
        name: "Цели",
        href: "/admin/goal",
        additionalHrefs: ["/admin/goal/create", "/admin/goal/"],
    },
    {
        icon: FileText,
        name: "Формы",
        href: "/admin/form",
        additionalHrefs: ["/admin/form/create", "/admin/form/"],
    },
    {
        icon: Tags,
        name: "Типы товаров",
        href: "/admin/product-type",
        additionalHrefs: ["/admin/product-type/create", "/admin/product-type/"],
    },
    {
        icon: HelpCircle,
        name: "FAQ",
        href: "/admin/faq",
        additionalHrefs: ["/admin/faq/create", "/admin/faq/"],
    },
    {
        icon: Package,
        name: "Товары",
        href: "/admin/product",
        additionalHrefs: ["/admin/product/create", "/admin/product/"],
    },
    {
        icon: CreditCard,
        name: "Заказы",
        href: "/admin/order",
    },
    {
        icon: User,
        name: "Администраторы",
        href: "/admin/admin",
        additionalHrefs: ["/admin/admin/create"],
    },
];

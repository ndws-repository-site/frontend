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
    },
    {
        icon: Eye,
        name: "Отзывы",
        href: "/admin/reviews",
    },
    {
        icon: Target,
        name: "Цели",
        href: "/admin/goal",
    },
    {
        icon: FileText,
        name: "Формы",
        href: "/admin/form",
    },
    {
        icon: Tags,
        name: "Типы товаров",
        href: "/admin/product-type",
    },
    {
        icon: HelpCircle,
        name: "FAQ",
        href: "/admin/faq",
    },
    {
        icon: Package,
        name: "Товары",
        href: "/admin/product",
    },
    {
        icon: CreditCard,
        name: "Заказы",
        href: "/admin/order",
    },
    {
        icon: User,
        name: "Админисраторы",
        href: "/admin/admin",
    },
];

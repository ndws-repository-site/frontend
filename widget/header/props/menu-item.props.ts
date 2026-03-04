import { MenuItemType } from "../types";

export interface MenuItemProps {
    number: string;
    title: string;
    cart?: string;
    href?: string;
    onClick?: () => void;
    type: MenuItemType;
}

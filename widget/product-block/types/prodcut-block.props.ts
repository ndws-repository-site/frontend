export interface ProductBlockProps {
    tag: string;
    title: string | React.ReactNode;
    subtitle: string;

    page: number;
    maxPage: number;

    product: string;
    productImage: string;

    left: boolean;
    color: string;
    icon: React.ElementType;
    link: string;
}
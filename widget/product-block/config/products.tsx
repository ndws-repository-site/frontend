import { ProductBlockProps } from "../types/prodcut-block.props";
import { FiguresIcon } from "../icons/figures";
import { StarInBoxIcon } from "../icons/star-in-box";

const productTitle = (
    <>
        We start with the basics.
        <br />
        With what really works.
    </>
);

export const PRODUCTS: ProductBlockProps[] = [
    {
        tag: "Products",
        title: productTitle,
        subtitle: "Protein - growth and recovery",
        page: 1,
        maxPage: 2,
        product: "protein",
        productImage: "/product-block/protein.png",
        left: false,
        color: "#FF7C55",
        icon: FiguresIcon,
        link: "/products",
    },
    {
        tag: "Products",
        title: productTitle,
        subtitle: "Creatine - strength and endurance",
        page: 2,
        maxPage: 2,
        product: "creatine",
        productImage: "/product-block/creatine.png",
        left: true,
        color: "#000000",
        icon: StarInBoxIcon,
        link: "/products",
    },
];

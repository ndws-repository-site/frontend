import { IProduct } from "@/shared/types";
import { ProductPageProps } from "@/widget/product-page";

export const PRODUCT_MOCK: IProduct = {
    name: "Creatine",
    image: "/creatine.png",
    slug: "creatine",
    goal: "Endurance",
    form: "Capsules",
    productType: "Creatine",
};

export const PRODUCTS_MOCK: IProduct[] = Array.from({ length: 8 }, () => ({
    ...PRODUCT_MOCK,
}));

export const PRODUCT_PAGE_MOCK: ProductPageProps = {
    id: "2f0a3c30-3ade-4dfe-a835-c6f1d842e4ff",
    images: [
        "/product-creatine.png",
        "/product-creatine.png",
        "/product-creatine.png",
        "/product-creatine.png",
    ],
    name: "NDWS CREATINE",
    description:
        "For strength, mass, and steady progress Pure ingredients. Maximum effectiveness",
    price: 25,
    forWho: `Protein is a concentrate of natural proteins that contains essential amino acids. It is used for active muscle growth, tissue repair, and meeting the body's protein requirements. \n\nProtein is a concentrate of natural proteins that contains essential amino acids. It is used for active muscle growth, tissue repair, and meeting the body's protein requirements.`,
    howToUse:
        "Protein is a concentrate of natural proteins that contains essential amino acids. It is used for active muscle growth, tissue repair, and meeting the body's protein requirements.",
    ingredients: [
        {
            title: "Protein",
            description: "3,4g",
        },
        {
            title: "Protein",
            description: "3,4g",
        },
        {
            title: "Protein",
            description: "3,4g",
        },
        {
            title: "Protein",
            description: "3,4g",
        },
        {
            title: "Protein",
            description: "3,4g",
        },
        {
            title: "Protein",
            description: "3,4g",
        },
        {
            title: "Protein",
            description: "3,4g",
        },
        {
            title: "Protein",
            description: "3,4g",
        },
        {
            title: "Protein",
            description: "3,4g",
        },
        {
            title: "Protein",
            description: "3,4g",
        },
    ],
    recommendedProducts: [PRODUCT_MOCK, PRODUCT_MOCK, PRODUCT_MOCK],
    faq: [
        {
            question: "Why do I need protein if I eat normally?",
            answer: "Protein helps to support muscle growth, tissue repair, and overall body function even if your regular diet seems balanced. It ensures you meet your daily amino acid needs, especially with increased activity or specific goals.",
        },
        {
            question: "Is protein a chemical or a steroid?",
            answer: "Protein is a nutrient made up of amino acids and is essential for building and repairing tissues. It is not a steroid.",
        },
        {
            question: "Can you drink protein every day?",
            answer: "Yes, you can consume protein daily as part of a balanced diet to help meet your nutritional needs and support recovery.",
        },
        {
            question: "Can girls take protein?",
            answer: "Absolutely! Protein is an essential nutrient for everyone, regardless of gender, and supports overall health.",
        },
        {
            question: "Will it be effective without training?",
            answer: "Protein supports muscle health and other body functions, but its most noticeable benefits for muscle growth are seen when combined with regular exercise.",
        },
        {
            question: "Can beginners drink protein?",
            answer: "Beginners can use protein supplements to support their fitness goals and ensure adequate protein intake.",
        },
        {
            question: "Is protein harmful to the kidneys or liver?",
            answer: "For healthy individuals, normal protein intake is safe and does not harm the kidneys or liver. People with preexisting conditions should consult a doctor.",
        },
        {
            question:
                "When is it better to drink protein: before or after training?",
            answer: "Consuming protein after training can help with muscle repair and recovery, but having enough protein throughout the day is most important.",
        },
        {
            question: "Does protein help you lose weight?",
            answer: "Protein can aid in weight loss by promoting satiety, preserving muscle mass during dieting, and supporting metabolism.",
        },
        {
            question: "Can protein replace meals?",
            answer: "Protein supplements can complement your diet but are not a substitute for balanced meals that provide a range of nutrients.",
        },
    ],
};

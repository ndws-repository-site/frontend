import type { Metadata } from "next";
import { KEY_WORDS } from "./keywords";

const SEO_TITLE = "NDWS - Sports Nutrition";
const SEO_DESCRIPTION =
    "Premium sports nutrition made with clean, effective ingredients. Support muscle growth, strength, bone health, and daily performance. Shop online in the USA.";

export const SEO: Metadata = {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    keywords: KEY_WORDS,
    openGraph: {
        title: SEO_TITLE,
        description: SEO_DESCRIPTION,
    },
    twitter: {
        title: SEO_TITLE,
        description: SEO_DESCRIPTION,
    },
};

import type { Metadata } from "next";
import { KEY_WORDS } from "./keywords";

const SITE_TITLE = "NDWS - Sports Nutrition";
const SITE_DESCRIPTION =
    "Premium sports nutrition made with clean, effective ingredients. Support muscle growth, strength, bone health, and daily performance. Shop online in the USA.";

export const SEO: Metadata = {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    keywords: KEY_WORDS,
    openGraph: {
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
    },
    twitter: {
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
    },
};

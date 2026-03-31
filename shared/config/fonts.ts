import { Alexandria, Jost } from "next/font/google";
import localFont from "next/font/local";

export const JOST_FONT = Jost({
    subsets: ["latin"],
});

export const ALEXANDRIA_FONT = Alexandria({
    subsets: ["latin"],
});

export const BOUNDED_FONT = localFont({
    src: [
        {
            path: "../../public/fonts/Bounded-ExtraLight.ttf",
            weight: "200",
            style: "normal",
        },
        {
            path: "../../public/fonts/Bounded-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/Bounded-Black.ttf",
            weight: "900",
            style: "normal",
        },
        {
            path: "../../public/fonts/Bounded-Variable.ttf",
            weight: "100 900",
            style: "normal",
        },
    ],
    display: "swap",
});

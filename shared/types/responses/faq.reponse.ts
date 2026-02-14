import { FaqJson } from "../client";

export interface FaqResponse {
    id: number;
    name: string;
    faq: FaqJson[];
}

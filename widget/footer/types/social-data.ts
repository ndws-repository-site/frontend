import { Social } from "./social";

export interface SocialData {
    type: Social;
    link: string;
    icon: React.ElementType;
    colorIcon: string;
}

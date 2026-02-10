import { InstagramIcon, TiktokIcon, YoutubeIcon } from "../icons/social-icon";
import { Social } from "../types/social";
import { SocialData } from "../types/social-data";

export const SOCIAL_DATA: Record<Social, SocialData> = {
    [Social.INSTAGRAM]: {
        type: Social.INSTAGRAM,
        link: 'https://www.instagram.com/ndws.official/',
        icon: InstagramIcon,
        colorIcon: '#C13584',
    },
    [Social.TIKTOK]: {
        type: Social.TIKTOK,
        link: 'https://www.tiktok.com/@ndws.official',
        icon: TiktokIcon,
        colorIcon: '#000000',
    },
    [Social.YOUTUBE]: {
        type: Social.YOUTUBE,
        link: 'https://www.youtube.com/@ndws.official',
        icon: YoutubeIcon,
        colorIcon: '#FF0000',
    },
};
import Link from "next/link";
import { SocialLinkProps } from "../types/social-link.props";
import { SOCIAL_DATA } from "../config/social-data";

export const SocialLink = ({ type }: SocialLinkProps) => {
    const { link, icon: Icon, colorIcon } = SOCIAL_DATA[type];
    return (
        <Link
            href={link}
            className="group w-[69px] h-[69px] bg-white/20 rounded-full flex items-center justify-center cursor-pointer transition-colors"
            style={{ ["--icon-hover-color" as string]: colorIcon }}
        >
            <span className="text-white group-hover:text-(--icon-hover-color) transition-colors w-full h-full flex items-center justify-center [&_svg]:w-full [&_svg]:h-full [&_svg]:max-w-[28px] [&_svg]:max-h-[26px]">
                <Icon />
            </span>
        </Link>
    );
};
import Link from "next/link";
import { SocialLinkProps } from "../types/social-link.props";
import { SOCIAL_DATA } from "../config/social-data";

export const SocialLink = ({ type }: SocialLinkProps) => {
    const { link, icon: Icon, colorIcon } = SOCIAL_DATA[type];
    return (
        <Link
            href={link}
            className="group w-[33px] h-[33px] mob:w-[50px] mob:h-[50px] lg:w-[69px] lg:h-[69px] bg-white/20 rounded-full flex items-center justify-center cursor-pointer transition-colors shrink-0"
            style={{ ["--icon-hover-color" as string]: colorIcon }}
        >
            <span className="text-white group-hover:text-(--icon-hover-color) transition-colors w-full h-full flex items-center justify-center [&_svg]:w-full [&_svg]:h-full [&_svg]:max-w-[12px] [&_svg]:max-h-[11px] mob:[&_svg]:max-w-[20px] mob:[&_svg]:max-h-[18px] lg:[&_svg]:max-w-[28px] lg:[&_svg]:max-h-[26px]">
                <Icon />
            </span>
        </Link>
    );
};

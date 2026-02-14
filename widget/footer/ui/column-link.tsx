import Link from "next/link";
import { ColumnLinkProps } from "../types/column-link.props";
import { ColumnTitle } from "./column-title";
import { cn } from "@/shared/utils";

export const ColumnLink = ({ title, links }: ColumnLinkProps) => {
    return (
        <nav>
            <ColumnTitle title={title} className="mb-5" />

            <div className="grid grid-cols-1 gap-2.5 max-w-[208px]">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "uppercase text-[14px] mob:text-[20px] text-white leading-[110%] cursor-pointer transition hover:text-primary",
                            link.underline && "underline underline-offset-2",
                        )}
                    >
                        {link.text}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

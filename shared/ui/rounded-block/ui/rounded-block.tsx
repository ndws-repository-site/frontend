import { forwardRef } from "react";
import { cn } from "@/shared/utils";
import { RoundedBlockProps } from "../types/rounded-block.props";

export const RoundedBlock = forwardRef<HTMLElement, RoundedBlockProps>(
    ({ children, className, style, ...props }, ref) => {
        return (
            <section
                ref={ref}
                className={cn("rounded-[30px]", className)}
                style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    ...style,
                }}
                {...props}
            >
                {children}
            </section>
        );
    },
);

RoundedBlock.displayName = "RoundedBlock";

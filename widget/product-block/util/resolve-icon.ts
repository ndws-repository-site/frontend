import type { ComponentType } from "react";
import * as Icons from "lucide-react";
import { HelpCircle } from "lucide-react";

export const resolveProductBlockIcon = (
    name: string,
): ComponentType<{ size?: number }> =>
    (Icons as unknown as Record<string, ComponentType<{ size?: number }>>)[
        name
    ] ?? HelpCircle;

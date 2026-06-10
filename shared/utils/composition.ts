import { IngredientJson } from "@/shared/types";

const EMPTY_COMPOSITION_ITEM = (): IngredientJson => ({
    title: "",
    description: "",
});

const normalizeIngredient = (item: unknown): IngredientJson[] => {
    if (!item || typeof item !== "object") return [];

    const record = item as Record<string, unknown>;
    if (typeof record.title !== "string") return [];

    if (typeof record.description === "string") {
        return [{ title: record.title, description: record.description }];
    }

    if (Array.isArray(record.values)) {
        const values = record.values.filter(
            (value): value is string =>
                typeof value === "string" && value.trim() !== "",
        );

        if (values.length === 0) {
            return [{ title: record.title, description: "" }];
        }

        return values.map((value) => ({
            title: record.title as string,
            description: value,
        }));
    }

    return [{ title: record.title, description: "" }];
};

export const parseComposition = (
    composition: IngredientJson[] | string | null | undefined,
): IngredientJson[] => {
    if (Array.isArray(composition)) {
        const items = composition
            .flatMap(normalizeIngredient)
            .filter((item) => item.title || item.description);

        return items.length > 0 ? items : [EMPTY_COMPOSITION_ITEM()];
    }

    if (!composition?.trim()) return [EMPTY_COMPOSITION_ITEM()];

    try {
        const parsed = JSON.parse(composition) as unknown;

        if (Array.isArray(parsed)) {
            const items = parsed
                .flatMap(normalizeIngredient)
                .filter((item) => item.title || item.description);

            if (items.length > 0) return items;
        }
    } catch {
        // composition is plain text
    }

    return [{ title: "Composition", description: composition }];
};

export const serializeComposition = (
    items: IngredientJson[],
): IngredientJson[] => {
    return items
        .map((item) => ({
            title: item.title.trim(),
            description: item.description.trim(),
        }))
        .filter((item) => item.title && item.description);
};

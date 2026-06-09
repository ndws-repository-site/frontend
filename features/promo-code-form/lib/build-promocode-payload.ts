export interface PromocodePayloadInput {
    code: string;
    discount: number;
    maxUses: number;
    isActive: boolean;
    expiresAt?: string | null;
}

export const buildPromocodePayload = ({
    code,
    discount,
    maxUses,
    isActive,
    expiresAt,
}: PromocodePayloadInput) => {
    const payload: Record<string, unknown> = {
        code,
        discount,
        maxUses,
        isActive,
    };

    if (expiresAt !== undefined) {
        payload.expiresAt = expiresAt;
    }

    return payload;
};

export interface PromoCodeFormSchema {
    code: string;
    discount: number;
    maxUses: number;
    isActive: boolean;
    expiresAt: string;
}

export interface PromocodeResponse {
    id: number;
    code: string;
    discount: number;
    isActive: boolean;
    uses: number;
    maxUses: number;
    expiresAt: string | null;
    createdAt: string;
    updatedAt: string;
}

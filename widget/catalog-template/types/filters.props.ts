export interface FiltersProps {
    goals: string[];
    forms: string[];
    productTypes: string[];
    selectedGoals: string[];
    selectedForm: string[];
    selectedProductType: string[];
    onSave: (goals: string[], form: string[], productType: string[]) => void;
    onReset: () => void;
}

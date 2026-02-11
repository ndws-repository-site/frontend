export interface FiltersProps {
    selectedGoals: string[];
    selectedForm: string[];
    selectedProductType: string[];
    onSave: (goals: string[], form: string[], productType: string[]) => void;
    onReset: () => void;
}
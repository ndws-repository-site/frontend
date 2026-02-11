export interface FiltersProps {
    selectedGoals: string[];
    selectedForm: string[];
    selectedProductType: string[];
    onGoalsChange: (goals: string[]) => void;
    onFormChange: (form: string[]) => void;
    onProductTypeChange: (productType: string[]) => void;
    onSave: (goals: string[], form: string[], productType: string[]) => void;
    onReset: () => void;
}
export interface FiltersProps {
    selectedGoals: string[];
    selectedForm: string[];
    selectedProductType: string[];
    onGoalsChange: (goals: string[]) => void;
    onFormChange: (form: string[]) => void;
    onProductTypeChange: (productType: string[]) => void;
    onSave: () => void;
    onReset: () => void;
}
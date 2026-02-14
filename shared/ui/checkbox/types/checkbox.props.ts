export interface CheckboxProps {
    title: string;
    checked: boolean;
    onChange: (title: string) => void;
    hover?: boolean;
}

export interface FilterColumnProps {
    title: string;
    filters: string[];
    onChange: (filter: string) => void;
    checked: string[];
}
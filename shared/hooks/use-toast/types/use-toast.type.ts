export interface UseToast {
    active: boolean;
    title: string;
    showToast: (title: string) => void;
    hideToast: () => void;
}

import { create } from "zustand";
import { UseToast } from "../types/use-toast.type";

export const useToast = create<UseToast>((set) => ({
    active: false,
    title: "",
    showToast: (title) => set(() => ({ active: true, title: title })),
    hideToast: () => set(() => ({ active: false })),
}));

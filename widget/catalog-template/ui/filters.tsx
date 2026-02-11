"use client";

import { FilterIcon, XIcon } from "lucide-react"
import { GOALS_MOCK, FORM_MOCK, PRODUCT_TYPE_MOCK } from "../config"
import { FilterColumn } from "./filter-column"
import { useState } from "react";
import { ClassicButton } from "@/shared/ui";
import { FiltersProps } from "../types/filters.props";
import { AnimatePresence, motion } from "framer-motion";

export const Filter = ({
    selectedGoals,
    selectedForm,
    selectedProductType,
    onSave,
    onReset
}: FiltersProps) => {
    //=====STATES=====
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    // Черновик фильтров — только при открытой модалке редактирование влияет на него
    const [draftGoals, setDraftGoals] = useState<string[]>(selectedGoals);
    const [draftForm, setDraftForm] = useState<string[]>(selectedForm);
    const [draftProductType, setDraftProductType] = useState<string[]>(selectedProductType);

    const handleToggleFilter = () => {
        if (!isFilterOpen) {
            setDraftGoals([...selectedGoals]);
            setDraftForm([...selectedForm]);
            setDraftProductType([...selectedProductType]);
        }
        setIsFilterOpen(prev => !prev);
    };
    
    //=====FUNCTIONS=====
    const createFilterHandler = (
        selected: string[],
        onChange: (values: string[]) => void
    ) => (filter: string) => {
        const next = selected.includes(filter)
            ? selected.filter((f) => f !== filter)
            : [...selected, filter];
        onChange(next);
    };
    const handleFilterGoals = createFilterHandler(draftGoals, setDraftGoals);
    const handleFilterForm = createFilterHandler(draftForm, setDraftForm);
    const handleFilterProductType = createFilterHandler(draftProductType, setDraftProductType); 

    const handleSave = () => {
        onSave(draftGoals, draftForm, draftProductType);
        setIsFilterOpen(false);
    }

    const handleCancel = () => {
        // Просто закрываем — родительский state не менялся, откатывать нечего
        setIsFilterOpen(false);
    }

    return (
        <div className="relative z-20">
            <div className="flex items-center gap-5">
                {(selectedGoals.length > 0 || selectedForm.length > 0 || selectedProductType.length > 0) && (
                    <button 
                        className="text-white uppercase text-[20px] leading-none flex items-center gap-1 cursor-pointer group"
                        onClick={onReset}
                    >
                        Reset
                        <XIcon size={18} className="mb-0.5" />
                    </button>
                )}
                <button 
                    className="text-white uppercase text-[20px] leading-none flex items-center gap-1 cursor-pointer group"
                    onClick={handleToggleFilter}
                >
                    filter
                    <FilterIcon size={15} className="mb-1" />
                </button>
            </div>
                
            <AnimatePresence>
                {isFilterOpen && (
                    <motion.div
                        key="filter-modal"
                        initial={{ opacity: 0, scale: 0.95, y: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -8 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute top-9 right-0 p-5 bg-white rounded-2xl min-w-max w-fit [box-shadow:0px_4px_8px_0px_rgba(0,0,0,0.06),0px_0px_4px_0px_rgba(0,0,0,0.04)]"
                    >
                    <div className="grid grid-cols-3 gap-5 mb-5.5">
                        <FilterColumn 
                            title="Goals"
                            filters={GOALS_MOCK}
                            onChange={handleFilterGoals}
                            checked={draftGoals}
                        />
                        <FilterColumn 
                            title="Form"
                            filters={FORM_MOCK}
                            onChange={handleFilterForm}
                            checked={draftForm}
                        />
                        <FilterColumn 
                            title="Product Type"
                            filters={PRODUCT_TYPE_MOCK}
                            onChange={handleFilterProductType}
                            checked={draftProductType}
                        />
                    </div>

                    <div className="flex items-center justify-end gap-1.5">
                        <ClassicButton variant="outline" onClick={handleCancel}>
                            Cancel
                        </ClassicButton>

                        <ClassicButton onClick={handleSave}>
                            Save
                        </ClassicButton>
                    </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
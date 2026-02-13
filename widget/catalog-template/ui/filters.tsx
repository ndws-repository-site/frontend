"use client";

import { FilterIcon, XIcon, ChevronLeft } from "lucide-react"
import { GOALS_MOCK, FORM_MOCK, PRODUCT_TYPE_MOCK } from "../config"
import { FilterColumn } from "./filter-column"
import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { ClassicButton } from "@/shared/ui";
import { FiltersProps } from "../types/filters.props";
import { AnimatePresence, motion } from "framer-motion";

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.18 } },
    exit: { opacity: 0, transition: { duration: 0.18 } }
};

const headerVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 180, damping: 24 } },
    exit: { y: "-100%", opacity: 0, transition: { duration: 0.25 } }
};

const sheetVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 180, damping: 24 } },
    exit: { y: "100%", opacity: 0, transition: { duration: 0.25 } }
};

export const Filter = ({
    selectedGoals,
    selectedForm,
    selectedProductType,
    onSave,
    onReset
}: FiltersProps) => {
    //=====STATES=====
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const isMounted = useSyncExternalStore(() => () => {}, () => true, () => false);
    const [draftGoals, setDraftGoals] = useState<string[]>(selectedGoals);
    const [draftForm, setDraftForm] = useState<string[]>(selectedForm);
    const [draftProductType, setDraftProductType] = useState<string[]>(selectedProductType);

    
    //=====FUNCTIONS=====
    const handleToggleFilter = () => {
        if (!isFilterOpen) {
            setDraftGoals([...selectedGoals]);
            setDraftForm([...selectedForm]);
            setDraftProductType([...selectedProductType]);
        }
        setIsFilterOpen(prev => !prev);
    };
    
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
        setIsFilterOpen(false);
    }

    return (
        <div className="relative z-20">
            <div className="flex items-center gap-5">
                {(selectedGoals.length > 0 || selectedForm.length > 0 || selectedProductType.length > 0) && (
                    <button 
                        className="text-white uppercase lg:text-[20px] mob:text-[16px] text-[14px] leading-none flex items-center gap-1 cursor-pointer group"
                        onClick={onReset}
                    >
                        Reset
                        <XIcon className="lg:mb-0.5 w-[14px] h-[14px] mob:w-4 mob:h-4 lg:w-[18px] lg:h-[18px] shrink-0" />
                    </button>
                )}
                <button 
                    className="text-white uppercase lg:text-[20px] mob:text-[16px] text-[14px] leading-none flex items-center gap-1 cursor-pointer group"
                    onClick={handleToggleFilter}
                >
                    filter
                    <FilterIcon className="lg:mb-0.5 w-[10px] h-[10px] mob:w-[13px] mob:h-[13px] lg:w-[15px] lg:h-[15px] shrink-0" />
                </button>
            </div>
                
            <AnimatePresence>
                {isFilterOpen && (
                    <>
                        {/* Mobile only (< 500px): portal в body, чтобы быть поверх header */}
                        {isMounted && createPortal(
                            <motion.div
                                key="filter-mobile-overlay"
                                variants={backdropVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="fixed top-0 left-0 w-full h-dvh z-9999 flex flex-col bg-black/60 backdrop-blur-sm mob:hidden supports-[height:100dvh]:h-dvh"
                            >
                            <motion.div
                                variants={headerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="bg-white rounded-b-[20px] px-4 py-4 mb-2 flex items-center justify-between shadow-lg shrink-0 relative z-20"
                            >
                                <button onClick={handleCancel} className="p-1 -ml-1 text-black/60 hover:text-black">
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <h2 className="text-lg font-semibold uppercase">Filter</h2>
                                <div className="w-6" />
                            </motion.div>

                            <motion.div
                                variants={sheetVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="bg-white flex-1 rounded-t-[20px] shadow-2xl flex flex-col overflow-hidden relative z-10"
                            >
                                <div className="flex-1 overflow-y-auto p-5 min-h-0">
                                    <div className="grid grid-cols-1 gap-5 mb-5.5">
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
                                </div>
                                <div className="p-4 border-t border-black/7 bg-white mt-auto shrink-0 relative z-20 flex flex-col gap-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                                    <ClassicButton onClick={handleSave} className="w-full justify-center">
                                        Save
                                    </ClassicButton>
                                    <ClassicButton variant="outline" onClick={handleCancel} className="w-full justify-center">
                                        Cancel
                                    </ClassicButton>
                                </div>
                            </motion.div>
                        </motion.div>,
                            document.body
                        )}

                        {/* Tablet & Desktop (≥ 500px): dropdown popup */}
                        <motion.div
                            key="filter-desktop-popup"
                            initial={{ opacity: 0, scale: 0.95, y: -8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -8 }}
                            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="hidden mob:block absolute top-9 right-0 p-5 bg-white rounded-2xl min-w-max w-fit max-w-[calc(100vw-2rem)] [box-shadow:0px_4px_8px_0px_rgba(0,0,0,0.06),0px_0px_4px_0px_rgba(0,0,0,0.04)]"
                        >
                            <div className="grid grid-cols-2 lg:grid-cols-[repeat(3,minmax(200px,1fr))] gap-5 mb-5.5">
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
                                    className="col-span-2 lg:col-span-1"
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
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
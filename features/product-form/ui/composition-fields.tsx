"use client";

import {
    Control,
    UseFormRegister,
    useFieldArray,
    useFormState,
} from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { AdminButton, AdminInput } from "@/shared/admin";
import { ProductFormSchema } from "../types/product-form-schema";

interface CompositionFieldsProps {
    control: Control<ProductFormSchema>;
    register: UseFormRegister<ProductFormSchema>;
}

export const CompositionFields = ({
    control,
    register,
}: CompositionFieldsProps) => {
    const { isSubmitting } = useFormState({ control });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "composition",
    });

    return (
        <div className="flex flex-col gap-4">
            {fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
                    <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2">
                        <AdminInput
                            placeholder="Название"
                            disabled={isSubmitting}
                            {...register(`composition.${index}.title`)}
                        />
                        <AdminInput
                            placeholder="Значение"
                            disabled={isSubmitting}
                            {...register(`composition.${index}.description`)}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => remove(index)}
                        disabled={fields.length <= 1 || isSubmitting}
                        className="mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all hover:bg-red-500/20 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white/5 disabled:hover:text-gray-400"
                        title="Удалить"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            ))}

            <AdminButton
                type="button"
                variant="secondary"
                className="w-fit rounded-full"
                onClick={() => append({ title: "", description: "" })}
                disabled={isSubmitting}
            >
                <Plus size={18} className="mr-2" />
                Добавить позицию
            </AdminButton>
        </div>
    );
};

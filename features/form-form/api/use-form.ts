import { FormResponse } from "@/shared/types";
import { $apiAdmin } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useFormItem = (id: number | string | undefined) => {
    return useQuery({
        queryKey: ["form", id],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<FormResponse>(`/form/${id}`);
            return data;
        },
        enabled: id != null && id !== "",
    });
};

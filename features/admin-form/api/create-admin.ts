import { $apiAdmin } from "@/shared/utils";

interface CreateAdminPayload {
    name: string;
    email: string;
    password: string;
}

export const createAdmin = async (data: CreateAdminPayload) => {
    return $apiAdmin.post("", data);
};

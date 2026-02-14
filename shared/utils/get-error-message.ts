import axios, { AxiosError } from "axios";

interface NestErrorResponse {
    message: string | string[];
    error: string;
    statusCode: number;
}

/**
 * Обработка ошибок Axios пришедших из NestJS
 *
 * @param error - Любая ошибка (unknown)
 * @returns string - Текст ошибки для показа пользователю
 * @returns null - Ошибок нет
 */
export const getErrorMessage = (error: unknown): string | null => {
    if (!error) {
        return null;
    }

    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<NestErrorResponse>;

        if (axiosError.response) {
            const data = axiosError.response.data;

            if (data && data.message) {
                if (Array.isArray(data.message)) {
                    return data.message.join(", ");
                }

                return data.message;
            }

            return axiosError.response.statusText || "Server Error";
        }

        if (axiosError.request) {
            return "Server error. The response from the server did not arrive";
        }

        return axiosError.message;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Unknown error. Please try again later";
};

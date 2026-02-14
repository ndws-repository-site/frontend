export interface UploadImageResult {
    success: boolean;
    url?: string;
    error?: string;
}

/**
 * Загружает изображение через Next.js API.
 * @param file - Файл для загрузки
 * @param path - Массив строк — сегменты пути, куда отправить (например: ['hero'], ['products', '123'])
 * @returns Результат с URL загруженного изображения или ошибкой
 */
export async function uploadImage(
    file: File,
    path: string[],
): Promise<UploadImageResult> {
    if (!path.length) {
        return { success: false, error: "Path is required" };
    }

    const baseUrl =
        typeof window !== "undefined"
            ? window.location.origin
            : process.env.NEXT_PUBLIC_SITE_API_ORIGIN || "";
    const url = `${baseUrl}/api/upload/${path.join("/")}`;

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.error || "Upload failed",
            };
        }

        return {
            success: true,
            url: data.url,
        };
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Unknown error";
        return {
            success: false,
            error: message,
        };
    }
}

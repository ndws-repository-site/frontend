/** Картинки из /uploads/ отдаются runtime-route, next/image их не оптимизирует. */
export function isUploadSrc(src: string): boolean {
    return src.startsWith("/uploads/");
}

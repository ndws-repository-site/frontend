/**
 * Format the page number to a string with two digits
 * @param page - The page number to format
 * @returns The formatted page number as a string
 */
export const formatPage = (page: number): string => {
    if (page < 10) {
        return `0${page}`;
    }

    return page.toString();
};

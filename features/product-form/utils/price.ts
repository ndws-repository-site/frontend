/** Разрешает только цифры при вводе (остаток) */
export const handleStockKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
) => {
    const allowed = [
        "Backspace",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
    ];
    if (allowed.includes(e.key)) return;
    if (!/^\d$/.test(e.key)) e.preventDefault();
};

/** Разрешает только цифры и одну точку (цена) */
export const handlePriceKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
) => {
    const allowed = [
        "Backspace",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
    ];
    if (allowed.includes(e.key)) return;
    if (e.key === "." && !e.currentTarget.value.includes(".")) return;
    if (!/^\d$/.test(e.key)) e.preventDefault();
};

export const drawLetterTransition = (i: number) => ({
    duration: 0.6,
    delay: i * 0.12,
    ease: [0.22, 1, 0.36, 1] as const,
});

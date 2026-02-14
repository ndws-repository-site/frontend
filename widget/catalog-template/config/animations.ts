export const letterVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.04,
            duration: 0.35,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
        },
    }),
};

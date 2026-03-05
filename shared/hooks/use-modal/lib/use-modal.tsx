import { useCallback, useEffect, useMemo, useState } from "react";
import { UseModalOptions, UseModalControls } from "../types";
import { AnimatePresence } from "framer-motion";
import { Modal } from "@/widget/modal";

interface ModalPortalProps {
    active: boolean;
    mode: UseModalOptions["mode"];
    className?: string;
    content: UseModalOptions["children"];
    controls: UseModalControls;
}

function ModalPortal({
    active,
    mode,
    className,
    content,
    controls: { close, open, toggle },
}: ModalPortalProps) {
    return (
        <AnimatePresence>
            {active && (
                <Modal
                    key="modal"
                    active={active}
                    mode={mode}
                    className={className}
                    onClose={close}
                >
                    {typeof content === "function"
                        ? content({ close, open, toggle })
                        : content}
                </Modal>
            )}
        </AnimatePresence>
    );
}

export function useModal({ mode, className, children }: UseModalOptions) {
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (active) {
            const scrollY = window.scrollY;
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
        } else {
            const scrollY = document.body.style.top;
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            if (scrollY) {
                window.scrollTo(0, Math.abs(parseInt(scrollY, 10)));
            }
        }
    }, [active]);

    const open = useCallback(() => setActive(true), []);
    const close = useCallback(() => setActive(false), []);
    const toggle = useCallback(() => setActive((prev) => !prev), []);

    const controls: UseModalControls = useMemo(
        () => ({ open, close, toggle }),
        [open, close, toggle],
    );

    const ModalWithState = useCallback(
        () => (
            <ModalPortal
                active={active}
                mode={mode}
                className={className}
                content={children}
                controls={controls}
            />
        ),
        [active, mode, className, children, controls],
    );

    return {
        isActive: active,
        open,
        close,
        toggle,
        Modal: ModalWithState,
    };
}

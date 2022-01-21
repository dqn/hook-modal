import { RefObject, useEffect } from "react";
import { createFocusTrap } from "focus-trap"; // ESM

type UseModalKeyEventOptions = {
  ref: RefObject<HTMLElement>;
  onClose: () => void;
  closeOnOutsideClick: boolean;
  closeOnEsc: boolean;
};

// add key event for Esc key and Tab key
export function useFocusTrap(options: UseModalKeyEventOptions): void {
  const { ref, onClose, closeOnEsc, closeOnOutsideClick } = {
    ...options,
  };

  useEffect(() => {
    if (ref.current === null) {
      return;
    }

    const trap = createFocusTrap(ref.current, {
      onDeactivate: onClose,
      clickOutsideDeactivates: closeOnOutsideClick,
      escapeDeactivates: closeOnEsc,
    });
    trap.activate();

    return () => {
      trap.deactivate();
    };
  }, [ref, onClose, closeOnEsc, closeOnOutsideClick]);
}

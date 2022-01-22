import { RefObject, useEffect } from "react";
import { createFocusTrap } from "focus-trap";

type UseFocusTrapOptions = {
  ref: RefObject<HTMLElement>;
  isOpen: boolean;
  onClose: () => void;
  closeOnOutsideClick: boolean;
  closeOnEsc: boolean;
};

export function useFocusTrap(options: UseFocusTrapOptions): void {
  const { ref, isOpen, onClose, closeOnEsc, closeOnOutsideClick } = options;

  useEffect(() => {
    if (!isOpen || ref.current === null) {
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
  }, [ref, isOpen, onClose, closeOnEsc, closeOnOutsideClick]);
}

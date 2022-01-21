import { RefObject, useEffect } from "react";
import { createFocusTrap } from "focus-trap";

type UseModalKeyEventOptions = {
  ref: RefObject<HTMLElement>;
  isOpen: boolean;
  onClose: () => void;
  closeOnOutsideClick: boolean;
  closeOnEsc: boolean;
};

export function useFocusTrap(options: UseModalKeyEventOptions): void {
  const { ref, isOpen, onClose, closeOnEsc, closeOnOutsideClick } = {
    ...options,
  };

  useEffect(() => {
    if (!isOpen || ref.current === null) {
      return;
    }

    const trap = createFocusTrap(ref.current, {
      onDeactivate: onClose,
      clickOutsideDeactivates: closeOnOutsideClick,
      escapeDeactivates: closeOnEsc,
    });

    try {
      trap.activate();
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      if (/at least one tabbable node/.test(err.message)) {
        // ignore no tabbables error
        return;
      }

      throw err;
    }

    return () => {
      trap.deactivate();
    };
  }, [ref, isOpen, onClose, closeOnEsc, closeOnOutsideClick]);
}

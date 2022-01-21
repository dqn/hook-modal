import { RefObject, useEffect } from "react";
import { createFocusTrap } from "focus-trap"; // ESM

type UseModalKeyEventOptions = {
  ref: RefObject<HTMLElement>;
  isOpen: boolean;
  onClose: undefined | (() => void);
};

// add key event for Esc key and Tab key
export function useFocusTrap({
  ref,
  isOpen,
  onClose,
}: UseModalKeyEventOptions): void {
  useEffect(() => {
    if (!isOpen || ref.current === null) {
      return;
    }

    const trap = createFocusTrap(ref.current, {
      ...(onClose === undefined ? {} : { onDeactivate: onClose }),
    });
    trap.activate();

    return () => {
      trap.deactivate();
    };
  }, [ref, isOpen, onClose]);
}

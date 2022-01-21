import { RefObject, useEffect } from "react";
import { focusNextElement } from "./focusNextElement";

type UseModalKeyEventOptions = {
  ref: RefObject<HTMLElement>;
  isOpen: boolean;
  onClose: undefined | (() => void);
};

// add key event for Esc key and Tab key
export function useModalKeyEvent({
  ref,
  isOpen,
  onClose,
}: UseModalKeyEventOptions): void {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // when Esc key is pressed, close the modal
        event.preventDefault();
        onClose?.();
        return;
      }

      if (event.key === "Tab") {
        // when Tab key is pressed, focus the next element
        event.preventDefault();
        if (ref.current !== null) {
          focusNextElement(ref.current, event.shiftKey);
        }
        return;
      }
    };

    document.body.addEventListener("keydown", handleKeydown);

    return () => {
      document.body.removeEventListener("keydown", handleKeydown);
    };
  }, [ref, isOpen, onClose]);
}

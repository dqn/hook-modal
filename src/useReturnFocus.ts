import { useEffect, useRef } from "react";

// memory current focused element and re-focus it again after the modal is closed
export function useReturnFocus(isOpen: boolean): void {
  const returnFocusElement = useRef<null | HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const element = document.activeElement;

    if (element !== null && element instanceof HTMLElement) {
      returnFocusElement.current = element;
    }

    return () => {
      returnFocusElement.current?.focus();
    };
  }, [isOpen]);
}

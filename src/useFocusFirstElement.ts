import { RefObject, useEffect } from "react";
import { focusNextElement } from "./focusNextElement";

// auto-focus the first focusable element when the modal is opened
export function useFocusFirstElement(
  isOpen: boolean,
  ref: RefObject<HTMLElement>,
): void {
  useEffect(() => {
    if (!isOpen || ref.current === null) {
      return;
    }

    focusNextElement(ref.current, false);
  }, [isOpen, ref]);
}

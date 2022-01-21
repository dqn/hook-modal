import { RefObject, useEffect } from "react";
import { hideOthers } from "aria-hidden";

// set aria-hidden attribute when the modal is opened
export function useAriaHidden(
  ref: RefObject<HTMLElement>,
  isOpen: boolean,
): void {
  useEffect(() => {
    if (!isOpen || ref.current === null) {
      return;
    }

    return hideOthers(ref.current);
  }, [ref, isOpen]);
}

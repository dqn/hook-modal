import { useEffect } from "react";

// set aria-hidden attribute when the modal is opened
export function useAriaHidden(
  isOpen: boolean,
  appElementSelector: undefined | string,
): void {
  useEffect(() => {
    if (!isOpen || appElementSelector === undefined) {
      return;
    }

    const root = document.querySelector(appElementSelector);
    root?.setAttribute("aria-hidden", "true");

    return () => {
      root?.removeAttribute("aria-hidden");
    };
  }, [isOpen, appElementSelector]);
}

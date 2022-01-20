import { tabbable } from "tabbable";

export function focusNextElement(element: Element, reverse: boolean): void {
  const tabbables = tabbable(element);
  const currentIndex = tabbables.findIndex(
    (el) => el === document.activeElement,
  );

  if (currentIndex === -1) {
    // if there is no active element, focus the first element
    tabbables[0]?.focus();
    return;
  }

  // if `reverse` is true, focus the previous element
  const nextIndex = currentIndex + (reverse ? -1 : 1);

  if (nextIndex === -1) {
    // if previous element doesn't exist, focus the last element
    tabbables[tabbables.length - 1]?.focus();
    return;
  }

  if (nextIndex === tabbables.length) {
    // if next element doesn't exist, focus the first element
    tabbables[0]?.focus();
    return;
  }

  // otherwise, focus the next element
  const nextElement = tabbables[nextIndex];
  nextElement?.focus();
}

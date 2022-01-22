import { HTMLAttributes, RefObject, useRef } from "react";
import { useAriaHidden } from "./useAriaHidden";
import { useDisableScroll } from "./useDisableScroll";
import { useFocusTrap } from "./useFocusTrap";

type UseModalOptions = {
  isOpen: boolean;
  onClose: () => void;
  closeOnEsc?: undefined | boolean;
  closeOnOutsideClick?: undefined | boolean;
};

type UseModalReturn<T extends HTMLElement> = Required<
  Pick<HTMLAttributes<T>, "role" | "aria-modal">
> & {
  ref: RefObject<T>;
};

export function useModal<T extends HTMLElement = HTMLDivElement>(
  options: UseModalOptions,
): UseModalReturn<T> {
  const {
    isOpen,
    onClose,
    closeOnEsc = true,
    closeOnOutsideClick = true,
  } = options;
  const ref = useRef<T>(null);

  useAriaHidden(ref, isOpen);
  useFocusTrap({ ref, isOpen, onClose, closeOnEsc, closeOnOutsideClick });
  useDisableScroll(ref, isOpen);

  return {
    role: "dialog",
    "aria-modal": true,
    ref,
  };
}

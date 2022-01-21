import { HTMLAttributes, RefObject, useRef } from "react";
import { useAriaHidden } from "./useAriaHidden";
import { useFocusTrap } from "./useFocusTrap";

type UseModalOptions = {
  onClose: () => void;
  closeOnEsc?: undefined | boolean;
  closeOnOutsideClick?: undefined | boolean;
};

type UseModalReturn<T extends HTMLElement> = Required<
  Pick<HTMLAttributes<T>, "role" | "aria-modal">
> & {
  ref?: RefObject<T>;
};

export function useModal<T extends HTMLElement = HTMLDivElement>(
  options: UseModalOptions,
): UseModalReturn<T> {
  const { onClose, closeOnEsc = true, closeOnOutsideClick = true } = options;
  const ref = useRef<T>(null);

  useAriaHidden(ref);
  useFocusTrap({ ref, onClose, closeOnEsc, closeOnOutsideClick });

  return {
    role: "dialog",
    "aria-modal": true,
    ref,
  };
}

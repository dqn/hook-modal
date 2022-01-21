import {
  HTMLAttributes,
  MouseEventHandler,
  RefObject,
  useCallback,
  useRef,
} from "react";
import { useAriaHidden } from "./useAriaHidden";
import { useFocusTrap } from "./useFocusTrap";

type UseModalOptions = {
  isOpen?: boolean;
  onClose?: () => void;
};

type UseModalReturn<T extends HTMLElement> = Pick<
  HTMLAttributes<T>,
  "role" | "aria-modal" | "onClick"
> & {
  ref?: RefObject<T>;
};

export function useModal<T extends HTMLElement = HTMLDivElement>(
  options: UseModalOptions,
): UseModalReturn<T> {
  const { isOpen = true, onClose } = options;
  const ref = useRef<T>(null);

  useAriaHidden(isOpen, ref);
  useFocusTrap({ ref, isOpen, onClose });

  const onClick = useCallback<MouseEventHandler>((event) => {
    // to avoid emitting click event on the overlay
    event.stopPropagation();
  }, []);

  if (!isOpen) {
    return {};
  }

  return {
    role: "dialog",
    "aria-modal": true,
    onClick,
    ref,
  };
}

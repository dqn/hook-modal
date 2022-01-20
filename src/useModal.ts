import {
  HTMLAttributes,
  MouseEventHandler,
  RefObject,
  useCallback,
  useRef,
} from "react";
import { useAriaHidden } from "./useAriaHidden";
import { useFocusFirstElement } from "./useFocusFirstElement";
import { useModalKeyEvent } from "./useModalKeyEvent";
import { useReturnFocus } from "./useReturnFocus";

type UseModalOptions = {
  isOpen: boolean;
  onRequestClose: () => void;
  appElementSelector?: string;
};

type UseModalReturn = Pick<
  HTMLAttributes<HTMLDivElement>,
  "role" | "aria-modal" | "onClick"
> & {
  ref?: RefObject<HTMLDivElement>;
};

export function useModal(options: UseModalOptions): UseModalReturn {
  const { isOpen, onRequestClose, appElementSelector } = options;
  const ref = useRef<HTMLDivElement>(null);

  useReturnFocus(isOpen);
  useFocusFirstElement(isOpen, ref);
  useAriaHidden(isOpen, appElementSelector);
  useModalKeyEvent({ ref, isOpen, onRequestClose });

  const onClick = useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
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

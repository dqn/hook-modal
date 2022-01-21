import { createPortal } from "react-dom";
import { useModal } from "../../../src";
import classes from "./Modal.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  const modal = useModal({ isOpen, onClose });

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={classes.overlay}>
      <div {...modal} className={classes.content}>
        {children}
      </div>
    </div>,
    document.body,
  );
};

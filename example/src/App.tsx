import { useState } from "react";
import { createPortal } from "react-dom";
import { useModal } from "../../src";

type ModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, children }) => {
  const modal = useModal({ isOpen, onRequestClose });

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      // onClick={onRequestClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "#0008",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        {...modal}
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: "800px",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

export const App: React.VFC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  return (
    <main>
      <button onClick={open}>open</button>
      {/* <button onClick={open}>open</button> */}
      {/* <button onClick={open}>open</button> */}
      <h1>test1</h1>
      <h2>test2</h2>

      <Modal isOpen={isOpen} onRequestClose={close}>
        <h1>test3</h1>
        <h2>test4</h2>
        <button onClick={close}>close</button>
        {/* <button onClick={close}>close</button>
        <button onClick={close} tabIndex={-1} aria-disabled>
          close
        </button>
        <button onClick={close} disabled aria-disabled>
          close
        </button>
        <button onClick={close}>close</button> */}
      </Modal>
    </main>
  );
};

import { useState } from "react";
import { Modal } from "./Modal";

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
      <button onClick={open}>open</button>
      <button onClick={open}>open</button>
      <h1>test1</h1>
      <h2>test2</h2>

      <Modal isOpen={isOpen} onClose={close}>
        <h1>test3</h1>
        <h2>test4</h2>
        <button onClick={close}>close</button>
        <button onClick={close}>close</button>
        <button onClick={close}>close</button>
      </Modal>
    </main>
  );
};

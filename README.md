# hook-modal

> ⚠️ **Warning**: This package is no longer maintained. Please use @radix-ui/react-dialog instead.

[![CI](https://github.com/dqn/hook-modal/workflows/CI/badge.svg)](https://github.com/dqn/hook-modal/actions)
[![npm version](https://img.shields.io/npm/v/hook-modal.svg)](https://www.npmjs.com/package/hook-modal)

React Hook for making modal accessible.

## Installation

Using yarn:

```bash
$ yarn add hook-modal
```

Using npm:

```bash
$ npm install hook-modal
```

## Usage

```js
import { createPortal } from "react-dom";
import { useModal } from "hook-modal";
import classes from "./Modal.module.css";

const Modal = ({
  isOpen,
  onClose,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  children,
}) => {
  const props = useModal({ isOpen, onClose });

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={classes.overlay}>
      <div
        {...props}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        className={classes.content}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};
```

## Options

| name                | type       | required | description                                   | default |
| ------------------- | ---------- | -------- | --------------------------------------------- | ------- |
| isOpen              | boolean    | required | Set to `true` if the modal is open            | -       |
| onClose             | () => void | required | Callback function to close the modal          | -       |
| closeOnEsc          | boolean    | optional | If `true`, close the modal on Esc key pressed | `true`  |
| closeOnOutsideClick | boolean    | optional | If `true`, close the modal on outside clicked | `true`  |

## Accessibility

- Set `role="dialog"` and `aria-modal="true"` attributes to modal element
- When modal is opened, focus the first focusable element in the modal
- While modal is open, non-modal elements are marked with `aria-hidden="true"`
- While modal is open, scrolling of non-modal elements is disabled
- While modal is open, focus is trapped in modal
- Pressing the Esc key closes the modal
- Clicking outside the modal closes the modal
- Closing the modal returns focus to the element that was in focus before the modal was opened

## License

MIT

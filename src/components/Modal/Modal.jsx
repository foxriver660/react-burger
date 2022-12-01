import React from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";

const modalRootElement = document.querySelector("#modal");

const Modal = ({ onClose, children }) => {
  const element = React.useMemo(() => document.createElement("div"), []);

  React.useEffect(() => {
    const escClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", escClose);

    return () => window.removeEventListener("keydown", escClose);
  }, [onClose]);

  React.useEffect(() => {
    modalRootElement.appendChild(element);
    return () => {
      modalRootElement.removeChild(element);
    };
  });

  return createPortal(
    <ModalOverlay onClose={onClose}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={classes.container}
      >
        <button onClick={onClose} className={classes.closeBtn}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>,

    element
  );
};

export default Modal;

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

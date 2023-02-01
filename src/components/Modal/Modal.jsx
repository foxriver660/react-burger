import React from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const modalRootElement = document.querySelector("#modal");

const Modal = React.memo(({ onClose, children }) => {
  const close = () => {
    navigate(-1);
    onClose();
  };
  const navigate = useNavigate();
  React.useEffect(() => {
    const escClose = (e) => {
      if (e.key === "Escape") {
        onClose();
        navigate(-1);
      }
    };
    window.addEventListener("keydown", escClose);

    return () => window.removeEventListener("keydown", escClose);
  }, [onClose, navigate]);

  return createPortal(
    <ModalOverlay onClose={close}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={classes.container}
      >
        <button onClick={close} className={classes.closeBtn}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>,

    modalRootElement
  );
});

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

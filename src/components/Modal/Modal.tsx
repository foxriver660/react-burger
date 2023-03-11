import React, { FC, useEffect } from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../index";
import { useNavigate } from "react-router-dom";
import { TModal } from "../../services/types/data";


const modalRootElement = document.querySelector("#modal") as HTMLElement;

const Modal: FC<TModal> = React.memo(
  ({ children, onClose = () => {}, type }) => {
    const navigate = useNavigate();

    const close = () => {
      type === "modalOutRoute" ? onClose() : navigate(-1);
    };

    useEffect(() => {
      const escClose = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          type === "modalOutRoute" ? onClose() : navigate(-1);
        }
      };
      window.addEventListener("keydown", escClose);

      return () => window.removeEventListener("keydown", escClose);
    }, [navigate]); // eslint-disable-line

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
  }
);

export default Modal;
// TODO: this

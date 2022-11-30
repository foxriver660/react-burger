import React from "react";
import * as ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
const modalRootElement = document.querySelector("#modal");


const Modal = ({open, onClose, children}) => {
  const element = React.useMemo(() => document.createElement("div"), []);

  React.useEffect(() => {
    if (open) {
      modalRootElement.appendChild(element);

      return () => {
        modalRootElement.removeChild(element);
      };
    }
  });

  

  if (open) {
    return ReactDOM.createPortal(
      <ModalOverlay onClose={onClose}>
    <div onClick={(e)=>e.stopPropagation()} className={classes.container}>
      <button onClick={onClose} className={classes.closeBtn}>
        <CloseIcon type="primary" />
      </button>
          {children}
    </div>
    </ModalOverlay>,

      element
    );
  }
  return null;


  };

export default Modal;




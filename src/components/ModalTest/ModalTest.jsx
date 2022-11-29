import React from "react";
import * as ReactDOM from "react-dom";
import classes from "./ModalTest.module.css";
const modalRootElement = document.querySelector("#modal");
console.log(modalRootElement);

const ModalTest = ({ open, onClose, children }) => {
  const element = React.useMemo(() => document.createElement("div"), []);

  React.useEffect(() => {
    if (open) {
      modalRootElement.appendChild(element);

      return () => {
        modalRootElement.removeChild(element);
      };
    }
  });

  /* ЛОГИКА ОТКРЫТИЯ */
  if (open) {
    return ReactDOM.createPortal(
      <div className={classes.background}>
        <div onClick={onClose} className={classes.card}>
          {children}
        </div>
      </div>,

      element
    );
  }
  return null;
};

export default ModalTest;

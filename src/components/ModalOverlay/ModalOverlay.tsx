import React, { FC } from "react";
import { TModalOverlay } from "../../services/types/data";
import classes from "./ModalOverlay.module.css";

const ModalOverlay: FC<TModalOverlay> = React.memo(({ onClose, children }) => {
  return (
    <div onClick={onClose} className={classes.overlay}>
      {children}
    </div>
  );
});

export default ModalOverlay;
// TODO: this

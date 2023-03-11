import React, { FC } from "react";
import { TFormOverlay } from "../../services/types";
import classes from "./FormOverlay.module.css";

const FormOverlay: FC<TFormOverlay> = React.memo(({ children, type }) => {
  return (
    <div className={type === "profile" ? classes.profile : classes.login}>
      {children}
    </div>
  );
});

export default FormOverlay;
// TODO: this
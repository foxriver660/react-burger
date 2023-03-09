import React, { FC } from "react";
import { TLoader } from "../../services/types";
import classes from "./Loader.module.css";

const Loader: FC<TLoader> = ({ classname }) => {
  console.log(classname);
  console.log( typeof classname);
  return <div className={`${classes.loader} ${classname}`}></div>;
};

export { Loader };

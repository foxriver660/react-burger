import React from "react";
import classes from "./Loader.module.css";
const Loader = ({classname}) => {
  return <div className={`${classes.loader} ${classname}`}></div>;
};

export { Loader };

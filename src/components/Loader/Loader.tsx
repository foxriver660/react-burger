import { FC } from "react";
import { TLoader } from "../../services/types/data";

import classes from "./Loader.module.css";

const Loader: FC<TLoader> = ({ classname }) => {
  return <div className={`${classes.loader} ${classname}`}></div>;
};

export default Loader;

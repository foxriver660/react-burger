import React, { FC } from "react";
import { TCompoundItem } from "../../services/types";
import classes from "./CompoundItem.module.css";

const CompoundItem: FC<TCompoundItem> = React.memo(({ type, quantity }) => {
  return (
    <li className={classes.compoundItem}>
      <p className={`${classes.compoundName} text text_type_main-default`}>
        {type}
      </p>
      <p className={`${classes.compoundValue} text text_type_digits-default`}>
        {quantity}
      </p>
    </li>
  );
});

export default CompoundItem;

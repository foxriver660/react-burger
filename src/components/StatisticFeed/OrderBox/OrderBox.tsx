import React, { FC } from "react";
import { TOrderBox } from "../../../services/types/data";
import classes from "./OrderBox.module.css";

const OrderBox: FC<TOrderBox> = React.memo(({ doneOrder }) => {
  return (
    <>
      <div className={`${classes.wrapper} text text_type_digits-default`}>
        {doneOrder.length ? (
          doneOrder.map((item: number, index: number) => (
            <p
              key={index}
              className={`${classes.digits} ${classes.digitsReady}`}
            >
              {item}
            </p>
          ))
        ) : (
          <p className="text text_type_main-default text_color_inactive">
            Выполненые заказы отсуствуют
          </p>
        )}
      </div>
    </>
  );
});

export default OrderBox;

import React, { FC } from "react";
import { TOrderBox } from "../../../services/types";
import classes from "./OrderBox.module.css";

const OrderBox: FC<TOrderBox> = React.memo(({ doneOrder }) => {
  return (
    <>
      <div className={`${classes.div3} text text_type_digits-default`}>
        {doneOrder.length ? (
          doneOrder.slice(0, 10).map((item: number, index: number) => (
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
      {doneOrder.length > 10 && (
        <div className={`${classes.div3} text text_type_digits-default`}>
          {doneOrder.slice(10, 20).map((item: number, index: number) => (
            <p
              key={index}
              className={`${classes.digits} ${classes.digitsReady}`}
            >
              {item}
            </p>
          ))}
        </div>
      )}
      {doneOrder.length > 20 && (
        <div className={`${classes.div3} text text_type_digits-default`}>
          {doneOrder.slice(20, 30).map((item: number, index: number) => (
            <p
              key={index}
              className={`${classes.digits} ${classes.digitsReady}`}
            >
              {item}
            </p>
          ))}
        </div>
      )}
      {doneOrder.length > 30 && (
        <div className={`${classes.div3} text text_type_digits-default`}>
          {doneOrder.slice(30, 40).map((item: number, index: number) => (
            <p
              key={index}
              className={`${classes.digits} ${classes.digitsReady}`}
            >
              {item}
            </p>
          ))}
        </div>
      )}
      {doneOrder.length > 40 && (
        <div className={`${classes.div3} text text_type_digits-default`}>
          {doneOrder.slice(40, 50).map((item: number, index: number) => (
            <p
              key={index}
              className={`${classes.digits} ${classes.digitsReady}`}
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </>
  );
});

export default OrderBox;

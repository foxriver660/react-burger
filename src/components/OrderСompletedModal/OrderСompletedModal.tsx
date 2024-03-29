import React, { FC } from "react";
import classes from "./OrderСompletedModal.module.css";
import { Loader } from "../index";
import { status, statusColor } from "../../utils/determineStatus";
import { getOrders } from "../../selectors/selectors";
import { useAppSelector } from "../../services/hooks";
import { DONE } from "../../utils/constant";

const OrderСompletedModal: FC = React.memo(() => {
  const { orders } = useAppSelector(getOrders);
  // ПОСЛЕДНИЙ ЗАКАЗ ПО СОКЕТ СОЕДИНЕНИЮ
  const selected = [...orders].reverse()[0];

  return (
    <div className={`${classes.wrapper} pt-30 pr-10 pl-10 pb-30`}>
      {selected ? (
        <>
          <p
            className={`${classes.orderNumber} text text_type_digits-large pb-8`}
          >
            {selected.number}
          </p>
          <p className={`text text_type_main-medium pb-15`}>
            идентификатор заказа
          </p>
          {selected.status === DONE ? (
            <div className={`${classes.statusImageDone} mb-15`}></div>
          ) : (
            <div className={`${classes.statusImagePending} mb-15`}></div>
          )}

          <p
            className={`${classes.orderStatusText} text text_type_main-default pb-2`}
          >
            Статус заказа:
            <span
              style={statusColor(selected)}
              className={`${classes.orderStatusText} text text_type_main-default pb-2 pl-2`}
            >
              {status(selected)}
            </span>
          </p>
          <p
            className={`${classes.orderInstruction} text text_type_main-default`}
          >
            {selected.status === DONE
              ? "Заберите Ваш заказ"
              : "Дождитесь готовности на орбитальной станции"}
          </p>
        </>
      ) : (
        <Loader classname={undefined} />
      )}
    </div>
  );
});

export default OrderСompletedModal;

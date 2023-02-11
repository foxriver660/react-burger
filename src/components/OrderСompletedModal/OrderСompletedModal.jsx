import React from "react";
import classes from "./OrderСompletedModal.module.css";
import { useSelector } from "react-redux";
import { Loader } from "../Loader/Loader";
import { status, statusColor } from "../../components/utils/determineStatus";
import { getOrders } from "../../selectors/selectors";
const OrderСompletedModal = React.memo(() => {
  const { orders } = useSelector(getOrders);
  // ПОЛУЧАЕМ ПОСЛЕДНИЙ ЗАКАЗ ПО СОКЕТ СОЕДИНЕНИЮ
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
          {selected.status === "done" ? (
            <div className={`${classes.statusImageDone} mb-15`}></div>
          ) : (
            <div className={`${classes.statusImagePending} mb-15`}></div>
          )}

          <p
            className={`${classes.orderStatusText} text text_type_main-default pb-2`}
          >
            Статус заказа:{" "}
            <p
              style={statusColor(selected)}
              className={`${classes.orderStatusText} text text_type_main-default pb-2 pl-2`}
            >
              {status(selected)}
            </p>
          </p>
          <p
            className={`${classes.orderInstruction} text text_type_main-default`}
          >
            {selected.status === "done"
              ? "Заберите Ваш заказ"
              : "Дождитесь готовности на орбитальной станции"}
          </p>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
});

export default OrderСompletedModal;

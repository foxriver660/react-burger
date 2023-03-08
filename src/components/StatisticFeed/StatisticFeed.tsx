import React, { FC } from "react";
import classes from "./StatisticFeed.module.css";
import { useSelector } from "react-redux/es/exports";
import OrderBox from "./OrderBox/OrderBox";
import { getOrders } from "../../selectors/selectors";
import { Loader } from "../Loader/Loader";
import { TOrder } from "../../services/types/data";
const StatisticFeed: FC = React.memo(() => {
  // ПОЛУЧЕНИЕ ИЗ СТОРА ВСЕГО СТЕКА
  const orders = useSelector(getOrders);

  // РАЗДЕЛЯЕМ ПО ГОТОВНОСТИ
  const { doneOrder, waitOrder } = React.useMemo(() => {
    return orders.orders.reduce(
      (acc: {doneOrder: number[], waitOrder: number[]}, order: TOrder) => {
        console.log(acc)
        console.log(order)
        switch (order.status) {
          case "done":
            acc.doneOrder.push(order.number);
            break;
          default:
            acc.waitOrder.push(order.number);
            break;
        }
        return acc;
      },
      { doneOrder: [], waitOrder: [] }
    );
  }, [orders]);

  return (
    <div className={classes.statisticsWrapper}>
      {orders ? (
        <>
          <h2
            className={`${classes.subTitleDone} text text_type_main-medium pb-6`}
          >
            Готовы:{" "}
          </h2>
          <h2
            className={`${classes.subTitleWait} text text_type_main-medium pb-6`}
          >
            В работе:{" "}
          </h2>
          <div className={classes.doneOrderWrapper}>
            {doneOrder.length ? (
              <OrderBox doneOrder={doneOrder} />
            ) : (
              <p className="text text_type_main-default text_color_inactive">
                Готовых заказов нет.
              </p>
            )}
          </div>
          <div
            className={`${classes.waitOrderWrapper} text text_type_digits-default`}
          >
            {waitOrder.length ? (
              waitOrder.map((item: number, index: number) => (
                <p key={index} className={classes.digits}>
                  {item}
                </p>
              ))
            ) : (
              <p className="text text_type_main-default text_color_inactive">
                Все заказы выполнены
              </p>
            )}
          </div>
          <p className={`${classes.totalNumberTitle} text text_type_main-medium pt-15`}>
            Выполнено за все время:{" "}
          </p>
          <div className={`${classes.totalNumberWrapper} text text_type_digits-large`}>
            {orders.total}{" "}
          </div>
          <p className={`${classes.todayNumberTitle} text text_type_main-medium pt-15`}>
            Выполнено за сегодня:{" "}
          </p>
          <div className={`${classes.todayNumberWrapper} text text_type_digits-large`}>
            {orders.totalToday}{" "}
          </div>
        </>
      ) : (
        <Loader classname={undefined} />
      )}
    </div>
  );
});

export default StatisticFeed;

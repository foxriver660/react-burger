import React from "react";
import classes from "./StatisticFeed.module.css";
import { useSelector } from "react-redux/es/exports";
const StatisticFeed = ({ doneTotal, doneToday }) => {
  const orders = useSelector((state) => state.wsReducer.orders);
  console.log(orders);
  const { doneOrder, waitOrder } = React.useMemo(() => {
    return  orders.orders.reduce(
      (acc, order) => {
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
  }, [orders])
  
  return (
    <div className={classes.statisticsWrapper}>
      <div className={`${classes.div1} text text_type_main-medium pb-6`}>
        Готовы:{" "}
      </div>
      <div className={`${classes.div2} text text_type_main-medium pb-6`}>
        В работе:{" "}
      </div>
      <div className={`${classes.div3} text text_type_digits-default`}>
        {doneOrder.length ? (
          doneOrder
            .slice(0, 10)
            .map((item, index) => (
              <p key={index} className={`${classes.digits} ${classes.digitsReady}`}>
                {item}
              </p>
            ))
        ) : (
          <p className="text text_type_main-default text_color_inactive">
            Выполненые заказы отсуствуют
          </p>
        )}
      </div>
      <div className={`${classes.div4} text text_type_digits-default`}>
        {waitOrder.length ? (
          waitOrder.map((item, index) => <p key={index} className={classes.digits}>{item}</p>)
        ) : (
          <p className="text text_type_main-default text_color_inactive">
            Все заказы выполнены
          </p>
        )}
      </div>
      <div className={`${classes.div5} text text_type_main-medium pt-15`}>
        Выполнено за все время:{" "}
      </div>
      <div className={`${classes.div6} text text_type_digits-large`}>
        {doneTotal}{" "}
      </div>
      <div className={`${classes.div7} text text_type_main-medium pt-15`}>
        Выполнено за сегодня:{" "}
      </div>
      <div className={`${classes.div8} text text_type_digits-large`}>
        {doneToday}{" "}
      </div>
    </div>
  );
};

export default StatisticFeed;

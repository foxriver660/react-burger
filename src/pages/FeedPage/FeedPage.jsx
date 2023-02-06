import React from "react";
import classes from "./FeedPage.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderFeed from "../../components/OrderFeed/OrderFeed";
import StatisticFeed from "../../components/StatisticFeed/StatisticFeed";
import { useSelector } from "react-redux/es/hooks/useSelector";
const FeedPage = () => {
  const orders = useSelector((state) => state.wsReducer.orders);
  const { doneOrder, waitOrder } = React.useMemo(() => {
    return orders.orders.reduce(
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
  }, [orders.orders]);

  return (
    <section className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={`${classes.title} text text_type_main-large pb-5`}>
          Лента заказов
        </h2>
        <div className={classes.subContainer}>
          <div className={classes.orderWrapper}>
            {orders.orders.map((order, index) => (
              <OrderFeed key={index} order={order} />
            ))}
          </div>
          <StatisticFeed
            doneOrder={doneOrder}
            waitOrder={waitOrder}
            doneTotal={orders.total}
            doneToday={orders.totalToday}
          />
        </div>
      </div>
    </section>
  );
};

export default FeedPage;

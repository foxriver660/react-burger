import React from "react";
import classes from "./FeedPage.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderFeed from "../../components/OrderFeed/OrderFeed";
import StatisticFeed from "../../components/StatisticFeed/StatisticFeed";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
  WS_DISCONNECT,
} from "../../services/actions/wsActions";
import { wsDisconnect, wsConnectionStart } from "../../services/actions/wsActions";
const FeedPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const orders = useSelector((state) => state.wsReducer.orders);

  React.useEffect(() => {
    dispatch(wsConnectionStart());

    return () => {dispatch(wsDisconnect())};
  }, []);
  /* const { doneOrder, waitOrder } = React.useMemo(() => {
    return  orders?.orders?.reduce(
      (acc, order) => {
        switch (order?.status) {
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
  }, [orders.orders]); */

  return (
    <section className={classes.container}>
      {orders && (
        <div className={classes.wrapper}>
          <h2 className={`${classes.title} text text_type_main-large pb-5`}>
            Лента заказов
          </h2>
          <div className={classes.subContainer}>
            <ul className={classes.scrollWrapper}>
              {orders?.orders?.map((order, index) => (
                <Link
                  className={classes.link}
                  to={`/feed/${order._id}`}
                  state={{ backgroundLocationFeed: location }}
                >
                  <OrderFeed key={index} order={order} type="feed" />
                </Link>
              ))}
            </ul>
            <StatisticFeed
              /* doneOrder={doneOrder}
            waitOrder={waitOrder} */
              orders={orders}
              doneTotal={orders.total}
              doneToday={orders.totalToday}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default FeedPage;

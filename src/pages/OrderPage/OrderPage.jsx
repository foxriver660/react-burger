import React from "react";
import classes from "./OrderPage.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderFeed from "../../components/OrderFeed/OrderFeed";
import StatisticFeed from "../../components/StatisticFeed/StatisticFeed";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import {
  wsDisconnect,
  wsConnectionStartHistory,
} from "../../services/actions/wsActions";
import { Loader } from "../../components/Loader/Loader";
const OrderPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { orders } = useSelector((state) => state.wsReducer.orders);
  
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
  React.useEffect(() => {
    dispatch(wsConnectionStartHistory());

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  return (
    <section className={`${classes.container} mt-10`}>
      <div className={classes.wrapper}>
        {orders ? <ul className={classes.scrollWrapper}>
          {[...orders].reverse().map((order, index) => (
            <Link
              className={classes.link}
              to={`${order._id}`}
              state={{ backgroundLocationHistory: location }}
              key={index}
            >
              <OrderFeed order={order} type="orderHistory" />
            </Link>
          ))}
        </ul> : <Loader/>}
      </div>
    </section>
  );
};

export default OrderPage;

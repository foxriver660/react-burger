import React from "react";
import classes from "./OrderPage.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderFeed from "../../components/OrderFeed/OrderFeed";
import StatisticFeed from "../../components/StatisticFeed/StatisticFeed";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link, useLocation } from "react-router-dom";
const OrderPage = () => {
  const location = useLocation();
  const orders = useSelector((state) => state.wsReducer.orders);
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
    <section className={`${classes.container} mt-10`}>
    
        <div className={classes.wrapper}>
         
            <ul className={classes.scrollWrapper}>
              {orders?.orders?.map((order, index) => (
                <Link
                  className={classes.link}
                  to={`/feed/${order._id}`}
                  state={{ backgroundLocationFeed: location }}
                >
                  <OrderFeed key={index} order={order} type='orderHistory' />
                </Link>
              ))}
            </ul>
          
        </div>
    
    </section>
  );
};

export default OrderPage;

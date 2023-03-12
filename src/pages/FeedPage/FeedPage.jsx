import React from "react";
import classes from "./FeedPage.module.css";
import OrderFeed from "../../components/OrderFeed/OrderFeed";
import StatisticFeed from "../../components/StatisticFeed/StatisticFeed";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  wsDisconnect,
  wsConnectionStartFeed,
} from "../../services/actions/wsActions";
import { Loader } from "../../components/Loader/Loader";
import { getOrders } from "../../selectors/selectors";
const FeedPage = React.memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();
  const orders = useSelector(getOrders);

  React.useEffect(() => {
    dispatch(wsConnectionStartFeed());

    return () => {
      dispatch(wsDisconnect());
    };
  }, []); // eslint-disable-line

  return (
    <section className={classes.container}>
      {orders ? (
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
                  key={index}
                >
                  <OrderFeed order={order} type="feed" />
                </Link>
              ))}
            </ul>
            <StatisticFeed />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
});

export default FeedPage;

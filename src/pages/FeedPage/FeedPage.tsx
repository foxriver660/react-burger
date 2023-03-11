import React, { FC, useEffect } from "react";
import classes from "./FeedPage.module.css";
import { Link, useLocation } from "react-router-dom";
import {
  wsDisconnect,
  wsConnectionStart,
} from "../../services/actions/wsActions";
import { getOrders } from "../../selectors/selectors";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { TOrder } from "../../services/types/data";
import { WS_URL_FEED } from "../../utils/constant";
import { Loader, OrderFeed, StatisticFeed } from "../../components";

const FeedPage: FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const orders = useAppSelector(getOrders);

  useEffect(() => {
    dispatch(wsConnectionStart(WS_URL_FEED));

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
              {orders?.orders?.map((order: TOrder, index: number) => (
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
        <Loader classname={undefined} />
      )}
    </section>
  );
});

export default FeedPage;

import React, { FC, useEffect } from "react";
import classes from "./OrderPage.module.css";
import { Link, useLocation } from "react-router-dom";
import {
  wsDisconnect,
  wsConnectionStart,
} from "../../services/actions/wsActions";
import {
  getOrders,
  getWsConnectedFailed,
  getSuccessTokenUpdate,
} from "../../selectors/selectors";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { refreshToken } from "../../services/actions/profileActions";
import {WS_URL_HISTORY} from '../../utils/constant'
import { OrderFeed } from "../../components";
const OrderPage: FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { orders } = useAppSelector(getOrders);
  const wsConnectedFailed = useAppSelector(getWsConnectedFailed);
  const successTokenUpdate = useAppSelector(getSuccessTokenUpdate);

  useEffect(() => {
    dispatch(wsConnectionStart(WS_URL_HISTORY));
    if (wsConnectedFailed) {
      dispatch(refreshToken())
         }
    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch, successTokenUpdate, wsConnectedFailed]);

  return (
    <section className={`${classes.container} mt-10`}>
      <div className={classes.wrapper}>
        {orders.length ? (
          <ul className={classes.scrollWrapper}>
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
          </ul>
        ) : (
          <h2
            className={`${classes.emptyContainerMessage} text text_type_main-medium text_color_inactive`}
          >
            У Вас пока нет заказов
          </h2>
        )}
      </div>
    </section>
  );
});

export default OrderPage;

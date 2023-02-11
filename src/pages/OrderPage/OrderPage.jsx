import React from "react";
import classes from "./OrderPage.module.css";
import OrderFeed from "../../components/OrderFeed/OrderFeed";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { refreshToken } from "../../services/actions/profileActions";
import {
  wsDisconnect,
  wsConnectionStartHistory,
  wsResetMessage
} from "../../services/actions/wsActions";
import { Loader } from "../../components/Loader/Loader";
import { getCookie } from "../../components/utils/cookie";
import { getOrders } from "../../selectors/selectors";
const OrderPage = React.memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { orders } = useSelector(getOrders);
  const accessToken = getCookie("token");

  React.useEffect(() => {
    
    dispatch(wsConnectionStartHistory());
    if (!accessToken) {
      dispatch(refreshToken(getCookie("refreshToken")));
    }
    return () => {
      dispatch(wsDisconnect());
      
    };
  }, [dispatch, accessToken]);

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
          <h2 className={`${classes.emptyContainerMessage} text text_type_main-medium text_color_inactive`}>У Вас пока нет заказов</h2>
        )}
      </div>
    </section>
  );
});

export default OrderPage;

import React from "react";
import PropTypes from "prop-types";
import classes from "./OrderСompletedModal.module.css";
import { useSelector, useDispatch } from "react-redux";
import { wsDisconnect, wsConnectionStartFeed } from "../../services/actions/wsActions";
const OrderСompletedModal = React.memo(({ order }) => {
  const dispatch = useDispatch();
  
  const orders = useSelector((state) => state.wsReducer.orders);

  React.useEffect(() => {
    

    return () => {dispatch(wsDisconnect())};
  }, []);
  return (
    <div className={`${classes.wrapper} pt-30 pr-10 pl-10 pb-30`}>
      <p className={`${classes.orderNumber} text text_type_digits-large pb-8`}>
        {order && order}
      </p>
      <p className={`text text_type_main-medium pb-15`}>идентификатор заказа</p>
      <div className={`${classes.orderStatusImage} mb-15`}></div>
      <p
        className={`${classes.orderStatusText} text text_type_main-default pb-2`}
      >
        Ваш заказ начали готовить
      </p>
      <p className={`${classes.orderInstruction} text text_type_main-default`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
});
OrderСompletedModal.propTypes = {
  order: PropTypes.number.isRequired,
};
export default OrderСompletedModal;

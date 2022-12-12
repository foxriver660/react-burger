import React from "react";
import { OrderContext } from "../services/orderContext";
import classes from "./OrderDetails.module.css";

const OrderDetails = () => {
  const {order} = React.useContext(OrderContext)
 console.log(order)
  return (
    <div className={`${classes.wrapper} pt-30 pr-10 pl-10 pb-30`}>
      <p className={`${classes.orderNumber} text text_type_digits-large pb-8`}>
        {order && order.number} 
      </p>
      <p className={`text text_type_main-medium pb-15`}>идентификатор заказа</p>
      <div className={`${order ? classes.orderStatusImage : classes.loader} mb-15`}></div>
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
};

export default OrderDetails;

import React from "react";
import classes from "./OrderFeed.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ImageCicle from "../ImageCicle/ImageCicle";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date";
import OrderDetails from "../OrderDetails/OrderDetails";
import { BUN } from "../utils/constant";
import { testArray } from "../utils/constant";
const OrderFeed = ({ order, type }) => {
  const availableIngredients = useSelector(
    (state) => state.ingredientReducer.availableIngredients
  );
  const curOffset = new Date().getTimezoneOffset() / 60;
  const gmt = "i-GMT" + (curOffset > 0 ? "-" + curOffset : "+" + -curOffset);

  const resultArray = availableIngredients.filter((item) => {
    return order.ingredients.some((item2) => item2 === item._id);
  });
  const totalCost = resultArray.reduce(
    (acc, item) =>
      item.type === BUN ? acc + item.price * 2 : acc + item.price,
    0
  );



  const selector = type === "orderHistory";
  const status = order?.status === 'done' ? 'Выполнен' : order?.status === 'created' ? 'Создан' : order?.status === 'pending' ? 'Готовится' : 'Отменен'
  const statusColor = order?.status === 'pending' ? {color: '#00cccc'} : order?.status === 'cancel' ? {color: 'red'} : {color: 'white'}
  return (
    <li className={`${classes.orderWrapper} p-6`}>
      <div className={`${classes.orderID} text text_type_digits-default`}>
        #{order.number}
      </div>
      <div
        className={`${classes.orderDate} text text_type_main-default text_color_inactive`}
      >
        <FormattedDate date={new Date(order.createdAt)} />
        {` ${gmt}`}
      </div>
      <div className={`${classes.orderTitle} text text_type_main-medium`}>
        {order.name}
        {selector && <div className="text text_type_main-default pt-2" style={statusColor}>{status}</div>}
      </div>
      <div className={classes.orderImgs}>
        {resultArray.slice(0, 6).map((item, index) => (
          <ImageCicle key={index} src={item.image_mobile} index={index} rest={resultArray.length-6} />
        ))}
      </div>
      <div className={classes.orderPrice}>
        <p className={`${classes.orderSum} text text_type_digits-default`}>
          {totalCost}
        </p>{" "}
        <CurrencyIcon />
      </div>
    </li>
  );
};

export default OrderFeed;

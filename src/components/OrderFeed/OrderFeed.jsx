import React from "react";
import classes from "./OrderFeed.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ImageCicle from "../ImageCicle/ImageCicle";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date";
const OrderFeed = ({ order }) => {
  const availableIngredients = useSelector(
    (state) => state.ingredientReducer.availableIngredients
  );
  /* console.log(availableIngredients); */
  console.log(order);
  var curOffset = new Date().getTimezoneOffset() / 60;
  var gmt = "i-GMT" + (curOffset > 0 ? "-" + curOffset : "+" + -curOffset);

  const resultArray = availableIngredients.filter((item) => {
    return order.ingredients.some((item2) => item2 === item._id);
  });
  const totalCost = resultArray.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className={`${classes.orderWrapper} p-6`}>
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
      </div>
      <div className={classes.orderImgs}>
        {resultArray.map((item) => (
          <ImageCicle src={item.image_mobile} />
        ))}
      </div>
      <div className={classes.orderPrice}>
        <p className={`${classes.orderSum} text text_type_digits-default`}>
          {totalCost}
        </p>{" "}
        <CurrencyIcon />
      </div>
    </div>
  );
};

export default OrderFeed;

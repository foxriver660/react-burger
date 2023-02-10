import React from "react";
import classes from "./OrderFeed.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ImageCicle from "../ImageCicle/ImageCicle";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date";
import { status, statusColor } from "../utils/determineStatus";

import {
  calcTotalPrice,
  filterAvailableIngredients,
} from "../utils/calculationFunc";
import { gmt } from "../utils/determineGMT";
import { getData} from "../../selectors/selectors";
const OrderFeed = ({ order, type }) => {
  // ОТКУДА РЕНДЕРИМ
  const selector = type === "orderHistory";
  // ИНГРЕДИЕНТЫ ИЗ СТОРА
  const availableIngredients = useSelector(getData);
  // ВЫЧИСЛЕНИЯ
  const filteredIngredients = filterAvailableIngredients(
    availableIngredients,
    order
  );
  const totalPrice = calcTotalPrice(filteredIngredients);

  return (
    <li className={`${classes.orderWrapper} p-6`}>
      <div className={`text text_type_digits-default`}>
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
        {selector && (
          <div
            className="text text_type_main-default pt-2"
            style={statusColor(order)}
          >
            {status(order)}
          </div>
        )}
      </div>
      <div className={classes.orderImgs}>
        {filteredIngredients.slice(0, 6).map((item, index) => (
          <ImageCicle
            key={index}
            src={item.image_mobile}
            index={index}
            rest={filteredIngredients.length - 6}
          />
        ))}
      </div>
      <div className={classes.orderPrice}>
        <p className={`${classes.orderSum} text text_type_digits-default`}>
          {totalPrice}
        </p>{" "}
        <CurrencyIcon />
      </div>
    </li>
  );
};

export default OrderFeed;

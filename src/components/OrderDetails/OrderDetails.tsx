import React, { FC } from "react";
import classes from "./OrderDetails.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import IngredientItem from "../IngredientItem/IngredientItem";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date";
import { Loader } from "../Loader/Loader";
import { gmt } from "../../utils/determineGMT";
import { status, statusColor } from "../../utils/determineStatus";
import {
  calcTotalPrice,
  filterAvailableIngredients,
  countingOccurrences,
  findIngredient,
} from "../../utils/calculationFunc";
import { getData, getOrders } from "../../selectors/selectors";
import { TIngredient } from "../../services/types/data";
import useIngredientsOperations from "../../hooks/useIngredientsOperations";
const OrderDetails: FC = React.memo(() => {
  const { id } = useParams();
  const { orders } = useSelector(getOrders);
  const { order, filteredIngredients, totalPrice, quantityIngredients } =
    useIngredientsOperations(orders, id);

  return (
    <div className={classes.wrapper}>
      {order ? (
        <>
          <h3
            className={`${classes.orderID} text text_type_digits-default pb-10`}
          >
            #{order.number}
          </h3>
          <h3
            className={`${classes.orderTitle} text text_type_main-medium pb-3`}
          >
            {order.name}
          </h3>
          <p
            className={`${classes.orderStatus} text text_type_main-default pb-15`}
            style={statusColor(order)}
          >
            {status(order)}
          </p>
          <h3
            className={`${classes.orderComposition} text text_type_main-medium pb-6`}
          >
            Состав:
          </h3>
          <ul className={`${classes.scrollWrapper} pr-6 pb-10`}>
            {filteredIngredients.map(
              (ingredient: TIngredient, index: number) => (
                <IngredientItem
                  key={index}
                  ingredient={ingredient}
                  quantityIngredients={quantityIngredients}
                />
              )
            )}
          </ul>
          <div className={`${classes.orderFooter} pt-6`}>
            <p
              className={`${classes.orderTime} text text_type_main-default text_color_inactive`}
            >
              <FormattedDate date={new Date(order.createdAt)} />
              {` ${gmt}`}
            </p>
            <div className={classes.orderPrice}>
              <p
                className={`${classes.orderSum} text text_type_digits-default`}
              >
                {totalPrice}
              </p>{" "}
              <CurrencyIcon type={"secondary"} />
            </div>
          </div>
        </>
      ) : (
        <Loader classname={classes.loader} />
      )}
    </div>
  );
});

export default OrderDetails;

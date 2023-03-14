import React, { FC, useEffect } from "react";
import classes from "./OrderDetails.module.css";
import { useParams } from "react-router-dom";
import IngredientItem from "../IngredientItem/IngredientItem";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date";
import { Loader } from "../index";
import { gmt } from "../../utils/determineGMT";
import { status, statusColor } from "../../utils/determineStatus";
import { getAuthUser, getOrders } from "../../selectors/selectors";
import { TIngredient } from "../../services/types/data";
import useIngredientsOperations from "../../hooks/useIngredientsOperations";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getCookie } from "../../utils/cookie";
import { WS_URL, WS_URL_FEED } from "../../utils/constant";
import {
  wsConnectionStart,

 } from "../../services/actions/wsActions";


const OrderDetails: FC<{ page?: boolean; source?: string }> = React.memo(
  ({ page = false, source }) => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { orders } = useAppSelector(getOrders);
    const authUser = useAppSelector(getAuthUser);
    const { order, filteredIngredients, totalPrice, quantityIngredients } =
      useIngredientsOperations(orders, id);

    useEffect(() => {
      if (page) {
        const WS_URL_HISTORY = `${WS_URL}?token=${getCookie("token")}`;
        source === "feed"
          ? dispatch(wsConnectionStart(WS_URL_FEED))
          : dispatch(wsConnectionStart(WS_URL_HISTORY));
      }
  
    }, [authUser]); // eslint-disable-line

    return (
      <div className={page ? classes.wrapperPage : classes.wrapper}>
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
  }
);

export default OrderDetails;

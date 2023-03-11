import React, { FC, useEffect } from "react";
import classes from "./OrderDetailPage.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { getApiIngredients } from "../../services/actions/ingredientActions";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date";
import { gmt } from "../../utils/determineGMT";
import {
  wsDisconnect,
  wsConnectionStart,
  } from "../../services/actions/wsActions";
import { status, statusColor } from "../../utils/determineStatus";
import { getAuthUser, getOrders } from "../../selectors/selectors";
import { TOrderDetailPage } from "../../services/types";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { TIngredient } from "../../services/types/data";
import useIngredientsOperations from "../../hooks/useIngredientsOperations";
import { WS_URL, WS_URL_FEED, WS_URL_HISTORY } from "../../utils/constant";
import { IngredientItem, Loader } from "../../components";

const OrderDetailPage: FC<TOrderDetailPage> = React.memo(({ source }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { orders } = useAppSelector(getOrders);
  const { order, filteredIngredients, totalPrice, quantityIngredients } =
    useIngredientsOperations(orders, id);
  const authUser = useAppSelector(getAuthUser);
  
  useEffect(() => {
    dispatch(getApiIngredients());
  }, []); // eslint-disable-line
  
  useEffect(() => {
    source === "feed"
      ? dispatch(wsConnectionStart(WS_URL_FEED))
      : dispatch(wsConnectionStart(WS_URL_HISTORY))
    return () => {
      dispatch(wsDisconnect());
    };
  }, [authUser]); // eslint-disable-line

  return (
    <section className={classes.container}>
      {order ? (
        <div className={classes.wrapper}>
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
        </div>
      ) : (
        <Loader classname={undefined} />
      )}
    </section>
  );
});

export default OrderDetailPage;
// TODO: this
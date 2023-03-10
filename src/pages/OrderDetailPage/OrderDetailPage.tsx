import React, { FC, useEffect } from "react";
import classes from "./OrderDetailPage.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientItem from "../../components/IngredientItem/IngredientItem";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useParams } from "react-router-dom";
import { getApiIngredients } from "../../services/actions/ingredientActions";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date";
import {
  calcTotalPrice,
  filterAvailableIngredients,
  countingOccurrences,
  findIngredient,
} from "../../utils/calculationFunc";
import { Loader } from "../../components/Loader/Loader";
import { gmt } from "../../utils/determineGMT";
import {
  wsDisconnect,
  wsConnectionStartFeed,
  wsConnectionStartHistory,
} from "../../services/actions/wsActions";
import { status, statusColor } from "../../utils/determineStatus";
import { getAuthUser, getData, getOrders } from "../../selectors/selectors";
import { TOrderDetailPage } from "../../services/types";
import { useAppDispatch } from "../../services/hooks";
import { TIngredient } from "../../services/types/data";

const OrderDetailPage: FC<TOrderDetailPage> = React.memo(({ source }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { orders } = useSelector(getOrders);
  const availableIngredients = useSelector(getData);
  const authUser = useSelector(getAuthUser);
  // ДИСПАТИМ АПИ НА ДОСТУПНЫЕ ИНГРЕДИЕНТЫ
  useEffect(() => {
    dispatch(getApiIngredients());
  }, []); // eslint-disable-line
  // ДИСПАТИМ WS НА ИНГРЕДИЕНТЫ
  React.useEffect(() => {
    source === "feed"
      ? dispatch(wsConnectionStartFeed())
      : dispatch(wsConnectionStartHistory());
    return () => {
      dispatch(wsDisconnect());
    };
  }, [authUser]); // eslint-disable-line

  //  !ВЫЧИСЛЕНИЯ
  const order = React.useMemo(() => findIngredient(orders, id), [orders, id]);
  const filteredIngredients = React.useMemo(
    () => filterAvailableIngredients(availableIngredients, order),
    [availableIngredients, order]
  );
  const totalPrice = React.useMemo(
    () => calcTotalPrice(filteredIngredients),
    [filteredIngredients]
  );
  const quantityIngredients = React.useMemo(
    () => countingOccurrences(order),
    [order]
  );
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
            {filteredIngredients.map((ingredient: TIngredient, index: number) => (
              <IngredientItem
                key={index}
                ingredient={ingredient}
                quantityIngredients={quantityIngredients}
              />
            ))}
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

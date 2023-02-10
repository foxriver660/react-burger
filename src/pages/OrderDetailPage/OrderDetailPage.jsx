import React from "react";
import classes from "./OrderDetailPage.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ImageCicle from "../../components/ImageCicle/ImageCicle";
import IngredientItem from "../../components/IngredientItem/IngredientItem";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useParams } from "react-router-dom";
import { getApiIngredients } from "../../services/actions/ingredientActions";
import { BUN } from "../../components/utils/constant";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date";
import {
  calcTotalPrice,
  filterAvailableIngredients,
  countingOccurrences,
  findIngredient,
} from "../../components/utils/calculationFunc";
import { Loader } from "../../components/Loader/Loader";
import { gmt } from "../../components/utils/determineGMT";
import {
  wsDisconnect,
  wsConnectionStartFeed,
  wsConnectionStartHistory,
} from "../../services/actions/wsActions";
import { status, statusColor } from "../../components/utils/determineStatus";
const OrderDetailPage = ({ source }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { orders } = useSelector((state) => state.wsReducer.orders);
  // ВСЕ ДОСТУПНЫЕ ИНГРЕДИЕНТЫ ИЗ СТОРА
  const availableIngredients = useSelector(
    (state) => state.ingredientReducer.availableIngredients
  );
  // ПОЛУЧАЕМ ИЗ СТОРА АВТОРИЗИРОВАННОГО ПОЛЬЗОВАТЕЛЯ
  const { authUser } = useSelector((state) => state.profileReducer);
  // ДИСПАТИМ АПИ НА ДОСТУПНЫЕ ИНГРЕДИЕНТЫ
  React.useEffect(() => {
    dispatch(getApiIngredients());
  }, []);
  // ДИСПАТИМ WS НА ИНГРЕДИЕНТЫ
  React.useEffect(() => {
    source === "feed"
      ? dispatch(wsConnectionStartFeed())
      : dispatch(wsConnectionStartHistory());
    return () => {
      dispatch(wsDisconnect());
    };
  }, [authUser]);

  //  ИЩЕМ КОНКРЕТНЫЙ ЗАКАЗ ПО ID
  const order = findIngredient(orders, id);
  // ИЗ ДОСТПУНЫХ ИНГРЕДИЕНТОВ БЕРЕМ ИНГРЕДИЕНТЫ ПРИШЕДШИЕ ПО WS
  const filteredIngredients = filterAvailableIngredients(
    availableIngredients,
    order
  );
  // СЧИТАЕМ ОБЩУЮ СТОИМОСТЬ
  const totalPrice = calcTotalPrice(filteredIngredients);
// СЧИТАЕМ КОЛИЧЕСТВО ВХОЖДЕНИЙ ПО ID
const quantityIngredients = countingOccurrences(order)
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
            {filteredIngredients.map((ingredient, index) => (
              <IngredientItem key={index}
              ingredient={ingredient}
              quantityIngredients={quantityIngredients} />
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
              <CurrencyIcon />
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default OrderDetailPage;

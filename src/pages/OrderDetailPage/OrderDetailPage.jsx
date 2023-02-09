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

import { Loader } from "../../components/Loader/Loader";
import { wsDisconnect, wsConnectionStartFeed, wsConnectionStartHistory  } from "../../services/actions/wsActions";
const OrderDetailPage = ({source}) => {
  const orders = useSelector((state) => state.wsReducer.orders);
  const availableIngredients = useSelector(
    (state) => state.ingredientReducer.availableIngredients
  );
  const {authUser} = useSelector(
    (state) => state.profileReducer
  );
  console.log(authUser);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getApiIngredients());
  }, []);

  React.useEffect(() => {
   source === 'feed' ? dispatch(wsConnectionStartFeed()) : dispatch(wsConnectionStartHistory());

    return () => {dispatch(wsDisconnect())};
  }, [authUser]); 
 



  const { id } = useParams();
  const order = orders.orders?.find((item) => item._id === id);

  const filteredIngredients = [...availableIngredients].filter((item) => {
    return order?.ingredients?.some((item2) => item2 === item._id);
  });
  const totalCost = [...filteredIngredients].reduce(
    (acc, item) =>
      item.type === BUN ? acc + item.price * 2 : acc + item.price,
    0
  );

  const curOffset = new Date().getTimezoneOffset() / 60;
  const gmt = "i-GMT" + (curOffset > 0 ? "-" + curOffset : "+" + -curOffset);
  return (
    <section className={classes.container}>
      {order ? <div className={classes.wrapper}>
        <h3
          className={`${classes.orderID} text text_type_digits-default pb-10`}
        >
          #{order.number}
        </h3>
        <h3 className={`${classes.orderTitle} text text_type_main-medium pb-3`}>
          {order.name}
        </h3>
        <p
          className={`${classes.orderStatus} text text_type_main-default pb-15`}
        >
          {order.status === "done" ? "Выполнен" : "В процессе приготовления..."}
        </p>
        <h3
          className={`${classes.orderComposition} text text_type_main-medium pb-6`}
        >
          Состав:
        </h3>
        <ul className={`${classes.scrollWrapper} pr-6 pb-10`}>
          {filteredIngredients.map((ingredient, index) => (
            <IngredientItem key={index} ingredient={ingredient} />
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
            <p className={`${classes.orderSum} text text_type_digits-default`}>
              {totalCost}
            </p>{" "}
            <CurrencyIcon />
          </div>
        </div>
      </div> : <Loader/>}
    </section>
  );
};

export default OrderDetailPage;

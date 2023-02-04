import React from "react";
import classes from "./FeedPage.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderFeed from "../../components/OrderFeed/OrderFeed";
import StatisticFeed from "../../components/StatisticFeed/StatisticFeed";
const FeedPage = () => {
  return (
    <section className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={`${classes.title} text text_type_main-large pb-5`}>Лента заказов</h2>
        <div className={classes.subContainer}>
          <div className={classes.orderWrapper}>
          <OrderFeed/>
          <OrderFeed/>
          <OrderFeed/>
          <OrderFeed/>
          </div>
         <StatisticFeed/>
        </div>
      </div>
    </section>
  );
};

export default FeedPage;

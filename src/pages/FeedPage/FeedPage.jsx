import React from "react";
import classes from "./FeedPage.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderFeed from "../../components/OrderFeed/OrderFeed";
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
          <div className={classes.feedStatistics}>
          
<div class="div1"> </div>
<div class="div2"> </div>
<div class="div3"> </div>
<div class="div4"> </div>
<div class="div5"> </div>
<div class="div6"> </div>
<div class="div7"> </div>
<div class="div8"> </div>





          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedPage;

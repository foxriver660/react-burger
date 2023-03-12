import React from "react";
import classes from "./StatisticFeed.module.css";
const StatisticFeed = () => {
  return (
    <div className={classes.statisticsWrapper}>
      <div class={`${classes.div1} text text_type_main-medium pb-6`}>
        Готовы:{" "}
      </div>
      <div class={`${classes.div2} text text_type_main-medium pb-6`}>
        В работе:{" "}
      </div>
      <div class={`${classes.div3} text text_type_digits-default`}>
        <p className={`${classes.digits} ${classes.digitsReady}`}>345330</p>{" "}
        <p className={`${classes.digits} ${classes.digitsReady}`}>345330</p>{" "}
        <p className={`${classes.digits} ${classes.digitsReady}`}>345330</p>
      </div>
      <div class={`${classes.div4} text text_type_digits-default`}>
        <p className={classes.digits}>345330</p>{" "}
        <p className={classes.digits}>345330</p>{" "}
        <p className={classes.digits}>345330</p>
      </div>
      <div class={`${classes.div5} text text_type_main-medium pt-15`}>
        Выполнено за все время:{" "}
      </div>
      <div class={`${classes.div6} text text_type_digits-large`}>28 752 </div>
      <div class={`${classes.div7} text text_type_main-medium pt-15`}>
        Выполнено за сегодня:{" "}
      </div>
      <div class={`${classes.div8} text text_type_digits-large`}>138 </div>
    </div>
  );
};

export default StatisticFeed;

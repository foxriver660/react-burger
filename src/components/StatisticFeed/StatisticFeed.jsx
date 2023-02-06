import React from "react";
import classes from "./StatisticFeed.module.css";
const StatisticFeed = ({doneOrder, waitOrder, doneTotal, doneToday}) => {
    return (
    <div className={classes.statisticsWrapper}>
      <div className={`${classes.div1} text text_type_main-medium pb-6`}>
        Готовы:{" "}
      </div>
      <div className={`${classes.div2} text text_type_main-medium pb-6`}>
        В работе:{" "}
      </div>
      <div className={`${classes.div3} text text_type_digits-default`}>
      {doneOrder.slice(0, 8).map((item, index)=> <p className={`${classes.digits} ${classes.digitsReady}`}>{item}</p> )}
    
      </div>
      <div className={`${classes.div4} text text_type_digits-default`}>
        {waitOrder.length ? waitOrder.map(item=><p className={classes.digits}>{item}</p> ) : <p className="text text_type_main-default text_color_inactive">Все заказы выполнены</p>}
               
      </div>
      <div className={`${classes.div5} text text_type_main-medium pt-15`}>
        Выполнено за все время:{" "}
      </div>
      <div className={`${classes.div6} text text_type_digits-large`}>{doneTotal} </div>
      <div className={`${classes.div7} text text_type_main-medium pt-15`}>
        Выполнено за сегодня:{" "}
      </div>
      <div class={`${classes.div8} text text_type_digits-large`}>{doneToday} </div>
    </div>
  );
};

export default StatisticFeed;

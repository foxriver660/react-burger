import React from "react";
import classes from "./FeedInfoPage.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ImageCicle from "../../components/ImageCicle/ImageCicle";
import IngredientItem from "../../components/IngredientItem/IngredientItem";
const FeedInfoPage = () => {
  return (
    <section className={classes.container}>
      <div className={classes.wrapper}>
        <h3
          className={`${classes.orderID} text text_type_digits-default pb-10`}
        >
          #034533
        </h3>
        <h3 className={`${classes.orderTitle} text text_type_main-medium pb-3`}>
          Black Hole Singularity острый бургер
        </h3>
        <p
          className={`${classes.orderStatus} text text_type_main-default pb-15`}
        >
          Выполнен
        </p>
        <h3
          className={`${classes.orderComposition} text text_type_main-medium pb-6`}
        >
          Состав:
        </h3>
        <ul className={`${classes.ingredientsList} pr-6 pb-10`}>
          <IngredientItem />
          <IngredientItem />
          <IngredientItem />
          <IngredientItem />
        </ul>
        <div className={classes.orderFooter}>
          <p
            className={`${classes.orderTime} text text_type_main-default text_color_inactive`}
          >
            Вчера, 13:50 i-GMT+3
          </p>
          <div className={classes.orderPrice}>
            <p className={`${classes.orderSum} text text_type_digits-default`}>
              480
            </p>{" "}
            <CurrencyIcon />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedInfoPage;

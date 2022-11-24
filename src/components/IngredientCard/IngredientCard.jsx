import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import classes from "./IngredientCard.module.css";

const IngredientCard = ({ name, _id, type, price, image }) => {
  const [id, setID] = React.useState(_id)
  const [ingredientType, setType ] = React.useState(type)

  return (
    <div className={classes.container}>
      <img
        className={classes.image}
        src={image}
      />
      <div className={classes.currencyContainer}>
        <span className={`pr-2 text text_type_digits-default`}>{price}</span>
        <CurrencyIcon />
      </div>
      <p className={`${classes.ingredientName} text text_type_main-default`}>
        {name}
      </p>
      <Counter count={1} size="default" />
    </div>
  );
};

export default IngredientCard;



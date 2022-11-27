import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import classes from "./IngredientCard.module.css";
import itemPropTypes from "../utils/prop-types";

const IngredientCard = (props) => {
  //  ID и тип карточки записываются в состояние
  /* eslint-disable */
  const [id, setID] = React.useState(props._id);
  const [ingredientType, setType] = React.useState(props.type);
  /* eslint-enable */

  return (
    <div className={classes.container}>
      <img className={classes.image} src={props.image} alt={props.name} />
      <div className={classes.currencyContainer}>
        <span className={`pr-2 text text_type_digits-default`}>
          {props.price}
        </span>
        <CurrencyIcon />
      </div>
      <p className={`${classes.ingredientName} text text_type_main-default`}>
        {props.name}
      </p>
      <Counter count={1} size="default" />
    </div>
  );
};

export default IngredientCard;

IngredientCard.propTypes = {
  props: itemPropTypes,
};

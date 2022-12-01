import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import classes from "./IngredientCard.module.css";
import itemPropTypes from "../utils/prop-types";


const IngredientCard = ({ data }) => {
  //  ID и тип карточки записываются в состояние
  /* eslint-disable */
  const [id, setID] = React.useState(data._id);
  const [ingredientType, setType] = React.useState(data.type);
  /* eslint-enable */

  return (
    <div className={classes.container}>
      <img className={classes.image} src={data.image} alt={data.name} />
      <div className={classes.currencyContainer}>
        <span className={`pr-2 text text_type_digits-default`}>
          {data.price}
        </span>
        <CurrencyIcon />
      </div>
      <p className={`${classes.ingredientName} text text_type_main-default`}>
        {data.name}
      </p>
      <Counter count={1} size="default" />
    </div>
  );
};

export default IngredientCard;






IngredientCard.propTypes = {
  data: itemPropTypes.isRequired,
};

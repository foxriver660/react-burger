import React from "react";
import classes from "./IngredientItem.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ImageCicle from "../ImageCicle/ImageCicle";
import { BUN } from "../utils/constant";
import PropTypes from "prop-types";
const IngredientItem = React.memo(({ ingredient, quantityIngredients }) => {
  return (
    <li className={classes.item}>
      <ImageCicle src={ingredient?.image_mobile} />
      <p className={`${classes.itemName} text text_type_main-default`}>
        {ingredient?.name}
      </p>
      <div className={classes.orderPrice}>
        <p className={`${classes.orderSum} text text_type_digits-default`}>
          {ingredient?.type === BUN
            ? 2
            : quantityIngredients[`${ingredient._id}`]}{" "}
          x {ingredient?.price}
        </p>{" "}
        <CurrencyIcon />
      </div>
    </li>
  );
});
IngredientItem.propTypes = {
  ingredient: PropTypes.object.isRequired,
  quantityIngredients: PropTypes.object.isRequired,
};
export default IngredientItem;

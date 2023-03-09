import classes from "./ConstructorList.module.css";
import { useDispatch } from "react-redux";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  deleteIngredient,
  calcIngredients,
} from "../../services/actions/ingredientActions";
import React, { FC } from "react";
import { Reorder } from "framer-motion";
import { TIngredient, TIngredientNanoId } from "../../services/types/data";

// TODO РАЗОБРАТСЯ any
const ConstructorList: FC<any> = React.memo(({ value }) => {
  const dispatch = useDispatch();
console.log(value)
  const handleDeleteIngredient = (value: TIngredientNanoId) => {
        dispatch(deleteIngredient(value));
    dispatch(calcIngredients());
  };

  return (
    <Reorder.Item
      whileDrag={{ scale: 0.9 }}
      value={value}
      className={`${classes.ingredientItem} `}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        extraClass={`${classes.ingredientElement} mr-2`}
        text={value.name}
        price={value.price}
        thumbnail={value.image}
        handleClose={() => {
          handleDeleteIngredient(value);
        }}
      />
    </Reorder.Item>
  );
});

export default ConstructorList;



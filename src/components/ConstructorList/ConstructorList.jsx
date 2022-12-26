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
import React from "react";
import { Reorder } from "framer-motion";

const ConstructorList = ({ ingredient, value }) => {
  const { name, price, image } = ingredient;
  const dispatch = useDispatch();

  const handleDeleteIngredient = (ingredient) => {
    dispatch(deleteIngredient(ingredient));
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
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => {
          handleDeleteIngredient(ingredient);
        }}
      />
    </Reorder.Item>
  );
};

export default ConstructorList;

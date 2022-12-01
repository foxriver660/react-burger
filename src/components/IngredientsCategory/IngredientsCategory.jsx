import React from "react";
import IngredientCard from "../IngredientCard/IngredientCard";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import classes from "./IngredientsCategory.module.css";
import PropTypes from "prop-types";
import itemPropTypes from "../utils/prop-types";

const IngredientsCategory = ({ filteredArr }) => {
  /* СОСТОЯНИЕ МОДАЛКИ */
  const [isOpenCard, setIsOpenCard] = React.useState(false);
  /* ВЫБРАННЫЙ ИНГРЕДИЕНТ */
  const [selectedIngredient, setSelectedIngredient] = React.useState();

  return (
    <>
      {filteredArr.map((item) => (
        <li
          className={classes.card}
          key={item._id}
          onClick={() => {
            setSelectedIngredient(item);
            setIsOpenCard(true);
          }}
        >
          <IngredientCard data={item} />
        </li>
      ))}
      {selectedIngredient && isOpenCard && (
        <IngredientDetails
          data={selectedIngredient}
          onClose={() => setIsOpenCard(false)}
        />
      )}
    </>
  );
};

export default IngredientsCategory;

IngredientsCategory.propTypes = {
  filteredArr: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};

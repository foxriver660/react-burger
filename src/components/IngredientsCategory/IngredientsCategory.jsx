import React from "react";
import IngredientCard from "../IngredientCard/IngredientCard";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import classes from "./IngredientsCategory.module.css";
import PropTypes from "prop-types";
import itemPropTypes from "../utils/prop-types";

const IngredientsCategory = ({ filteredArr }) => {
  /* СОСТОЯНИЕ МОДАЛКИ */
  const [openCard, setOpenCard] = React.useState(false);
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
            setOpenCard(true);
          }}
        >
          <IngredientCard data={item} />
        </li>
      ))}
      {selectedIngredient && (
        <IngredientDetails
          data={selectedIngredient}
          open={openCard}
          onClose={() => setOpenCard(false)}
        />
      )}
    </>
  );
};

export default IngredientsCategory;

IngredientsCategory.propTypes = {
  filteredArr: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};

import React from "react";
import IngredientCard from "../IngredientCard/IngredientCard";
import classes from "./IngredientsCategory.module.css";
import PropTypes from "prop-types";
import itemPropTypes from "../utils/prop-types";
import { useDispatch } from "react-redux/es/exports";
import { openIngredientModal } from "../../services/actions/modalActions";

const IngredientsCategory = React.memo(({ filteredArr }) => {
  const dispatch = useDispatch();

  return (
    <>
      {filteredArr.map((item) => (
        <li
          className={classes.card}
          key={item._id}
          onClick={() => {
            dispatch(openIngredientModal(item));
          }}
        >
          <IngredientCard data={item} />
        </li>
      ))}
    </>
  );
});

export default IngredientsCategory;

IngredientsCategory.propTypes = {
  filteredArr: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};

import React from "react";
import IngredientCard from "../IngredientCard/IngredientCard";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import classes from "./IngredientsCategory.module.css";
import PropTypes from "prop-types";
import itemPropTypes from "../utils/prop-types";
import Modal from "../Modal/Modal";
import { useSelector, useDispatch } from "react-redux/es/exports";
import {
  OPEN_INGREDIENT_MODAL,
  CLOSE_INGREDIENT_MODAL,
} from "../../services/actions/modalActions";

const IngredientsCategory = ({ filteredArr }) => {
  const dispatch = useDispatch();
  const selectedIngredient = useSelector((state) => state.modalReducer.selectedIngredient);

  return (
    <>
      {filteredArr.map((item) => (
        <li
          className={classes.card}
          key={item._id}
          onClick={() => {
            dispatch({ type: OPEN_INGREDIENT_MODAL, payload: item });
          }}
        >
          <IngredientCard data={item} />
        </li>
      ))}
      {selectedIngredient && (
        <Modal onClose={() => dispatch({ type: CLOSE_INGREDIENT_MODAL })}>
          <IngredientDetails data={selectedIngredient} />
        </Modal>
      )}
    </>
  );
};

export default IngredientsCategory;

IngredientsCategory.propTypes = {
  filteredArr: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};

import React from "react";
import IngredientCard from "../IngredientCard/IngredientCard";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import classes from "./IngredientsCategory.module.css";
import PropTypes from "prop-types";
import itemPropTypes from "../utils/prop-types";
import Modal from "../Modal/Modal";
import { useSelector, useDispatch } from "react-redux/es/exports";
import {
  openIngredientModal,
  closeIngredientModal,
} from "../../services/actions/modalActions";

const getSelectedIngredient = (state) => state.modalReducer.selectedIngredient;

const IngredientsCategory = React.memo(({ filteredArr }) => {
  const dispatch = useDispatch();
  const selectedIngredient = useSelector(getSelectedIngredient);

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
      {selectedIngredient && (
        <Modal onClose={() => dispatch(closeIngredientModal())}>
          <IngredientDetails data={selectedIngredient} />
        </Modal>
      )}
    </>
  );
});

export default IngredientsCategory;

IngredientsCategory.propTypes = {
  filteredArr: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};

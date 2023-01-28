import React from "react";
import IngredientCard from "../IngredientCard/IngredientCard";
import classes from "./IngredientsCategory.module.css";
import PropTypes from "prop-types";
import itemPropTypes from "../utils/prop-types";
import { useDispatch } from "react-redux/es/exports";
import { openIngredientModal } from "../../services/actions/modalActions";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const IngredientsCategory = React.memo(({ filteredArr }) => {
  const dispatch = useDispatch();
  const location = useLocation();

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
          <Link className={classes.link} to={`/ingredients/${item._id}`} state={{ backgroundLocation: location }}>
            <IngredientCard data={item} />
          </Link>
        </li>
      ))}
    </>
  );
});

export default IngredientsCategory;

IngredientsCategory.propTypes = {
  filteredArr: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};

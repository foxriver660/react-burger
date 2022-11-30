import React from "react";
import IngredientCard from "../IngredientCard/IngredientCard";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import classes from './IngredientsCategory.module.css';
import PropTypes from "prop-types";
import itemPropTypes from "../utils/prop-types";

const IngredientsCategory = ({ filteredArr }) => {
  const [openCard, setOpenCard] = React.useState(false);
  const [selectedIngredient, setSelectedIngredient] = React.useState();
  const escClose = (e) => {
    if (e.key === "Escape") {
      setOpenCard(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener("keydown", escClose);
    return () => window.removeEventListener("keydown", escClose);
  }, [openCard]);


  return (
    <>
      {filteredArr.map((item) => (
        <li className={classes.card} key={item._id} onClick={() => {
          setSelectedIngredient(item);
          setOpenCard(true);
        }}>
          <IngredientCard
            data={item}
          />
        </li>
      ))}
      {selectedIngredient && (
        <IngredientDetails
          data={selectedIngredient}
          onKeyPress={escClose}
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
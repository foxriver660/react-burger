import React from "react";
import IngredientCard from "../IngredientCard/IngredientCard";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import classes from './IngredientsCategory.module.css';

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
            name={item.name}
            _id={item._id}
            type={item.type}
            price={item.price}
            image={item.image}
            key={item._id}
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

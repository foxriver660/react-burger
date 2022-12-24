import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import classes from "./IngredientCard.module.css";
import itemPropTypes from "../utils/prop-types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux/es/exports";
const IngredientCard = ({ data }) => {
  //  ID и тип карточки записываются в состояние
  const [id] = React.useState(data._id);
  const [type] = React.useState(data.type);

  // DRAGGABLE
  const [{ opacity }, dragRef] = useDrag({
    type: "items",
    item: { id, type },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });


// СЧЕТЧИК КОЛ_ВА ИНГРЕДИЕНТОВ
  let ingredientCounter = 0; 
  const ingredients = useSelector((state) => state.ingredientReducer.constructorIngredients);
    ingredients.forEach((ingredient) =>
    ingredient._id === id
      ? ingredientCounter += 1
      : ingredientCounter
  );
  const bun = useSelector((state) => state.ingredientReducer.constructorBun);
  [bun].forEach((bun) =>
  bun._id === id
      ? ingredientCounter += 2
      : ingredientCounter
  );


  return (
    <div ref={dragRef} style={{ opacity }} className={classes.container}>
      <img className={classes.image} src={data.image} alt={data.name} />
      <div className={classes.currencyContainer}>
        <span className={`pr-2 text text_type_digits-default`}>
          {data.price}
        </span>
        <CurrencyIcon />
      </div>
      <p className={`${classes.ingredientName} text text_type_main-default`}>
        {data.name}
      </p>
      <Counter count={ingredientCounter} size="default" />
    </div>
  );
};

export default IngredientCard;

IngredientCard.propTypes = {
  data: itemPropTypes.isRequired,
};

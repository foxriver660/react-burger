import React, { FC, useState } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import classes from "./IngredientCard.module.css";
import { useDrag } from "react-dnd";
import { getIngredients, getBun } from "../../selectors/selectors";
import { TIngredient, TIngredientCard } from "../../services/types/data";
import { useAppSelector } from "../../services/hooks";

const IngredientCard: FC<TIngredientCard> = React.memo(({ data }) => {
  const [id] = useState(data._id);
  const [type] = useState(data.type);

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
  const ingredients = useAppSelector(getIngredients);
  ingredients.forEach((ingredient: TIngredient) =>
    ingredient._id === id ? (ingredientCounter += 1) : ingredientCounter
  );
  const bun = useAppSelector(getBun);
  [bun].forEach((bun: TIngredient | undefined) => (bun?._id === id ? (ingredientCounter += 2) : ingredientCounter));

  return (
    <div ref={dragRef} style={{ opacity }} className={classes.container}>
      <img className={classes.image} src={data.image} alt={data.name} />
      <div className={classes.currencyContainer}>
        <span className={`pr-2 text text_type_digits-default`}>{data.price}</span>
        <CurrencyIcon type={"secondary"} />
      </div>
      <p className={`${classes.ingredientName} text text_type_main-default`}>{data.name}</p>
      <Counter count={ingredientCounter} size="default" />
    </div>
  );
});

export default IngredientCard;

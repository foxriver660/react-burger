import React, { FC } from "react";
import classes from "./IngredientDetails.module.css";
import { useParams } from "react-router-dom";
import { getData } from "../../selectors/selectors";
import { CompoundItem, Loader } from "../index";
import { useAppSelector } from "../../services/hooks";
import useDetermineEntity from "../../hooks/useDetermineEntity";

const IngredientDetails: FC<{page?: boolean}> = React.memo(({page=false}) => {
  const { id } = useParams();
  const availableIngredients = useAppSelector(getData);
  const { order } = useDetermineEntity(availableIngredients, id);
  return (
    <>
      {order ? (
        <div className={`${page ? classes.wrapperPage :classes.wrapper} pt-10 pr-10 pl-10 pb-15`}>
          <p
            className={`${classes.ingredientHeader} text text_type_main-large`}
          >
            Детали ингредиента
          </p>
          <img className={`mb-4`} src={order.image_large} alt={order.name} />
          <p
            className={`${classes.ingredientName} text text_type_main-medium pb-8`}
          >
            {order.name}
          </p>

          <ul className={classes.compoundList}>
            <CompoundItem type="Калории,ккал" quantity={order.calories} />
            <CompoundItem type="Белки, г" quantity={order.proteins} />
            <CompoundItem type="Жиры, г" quantity={order.fat} />
            <CompoundItem type="Углеводы, г" quantity={order.carbohydrates} />
          </ul>
        </div>
      ): (
        <Loader classname={classes.loader} />
      )}
    </>
  );
});

export default IngredientDetails;


import React, { FC } from "react";
import classes from "./IngredientDetails.module.css";
import { useSelector } from "react-redux/es/exports";
import { useParams } from "react-router-dom";
import { getData } from "../../selectors/selectors";
import { findIngredient } from "../utils/calculationFunc";
import CompoundItem from "./CompoundItem/CompoundItem";

const IngredientDetails: FC = React.memo(() => {
  const { id } = useParams();
  const availableIngredients = useSelector(getData);
  const data = findIngredient(availableIngredients, id);

  return (
    <>
      {data && (
        <div className={`${classes.wrapper} pt-10 pr-10 pl-10 pb-15`}>
          <p
            className={`${classes.ingredientHeader} text text_type_main-large`}
          >
            Детали ингредиента
          </p>
          <img className={`mb-4`} src={data.image_large} alt={data.name} />
          <p
            className={`${classes.ingredientName} text text_type_main-medium pb-8`}
          >
            {data.name}
          </p>

          <ul className={classes.compoundList}>
            <CompoundItem type="Калории,ккал" quantity={data.calories} />
            <CompoundItem type="Белки, г" quantity={data.proteins} />
            <CompoundItem type="Жиры, г" quantity={data.fat} />
            <CompoundItem type="Углеводы, г" quantity={data.carbohydrates} />
          </ul>
        </div>
      )}{" "}
    </>
  );
});

export default IngredientDetails;

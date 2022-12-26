import React from "react";
import classes from "./IngredientDetails.module.css";
import { useSelector } from "react-redux/es/exports";

const IngredientDetails = React.memo(() => {
  const data = useSelector((state) => state.modalReducer.selectedIngredient);
  return (
    <div className={`${classes.wrapper} pt-10 pr-10 pl-10 pb-15`}>
      <p className={`${classes.ingredientHeader} text text_type_main-large`}>
        Детали ингредиента
      </p>
      <img className={`mb-4`} src={data.image_large} alt={data.name} />
      <p
        className={`${classes.ingredientName} text text_type_main-medium pb-8`}
      >
        {data.name}
      </p>

      <div className={classes.compoundList}>
        <div className={classes.compoundItem}>
          <p className={`${classes.compoundName} text text_type_main-default`}>
            Калории,ккал
          </p>
          <p
            className={`${classes.compoundValue} text text_type_digits-default`}
          >
            {data.calories}
          </p>
        </div>
        <div className={classes.compoundItem}>
          <p className={`${classes.compoundName} text text_type_main-default`}>
            Белки, г
          </p>
          <p
            className={`${classes.compoundValue} text text_type_digits-default`}
          >
            {data.proteins}
          </p>
        </div>
        <div className={classes.compoundItem}>
          <p className={`${classes.compoundName} text text_type_main-default`}>
            Жиры, г
          </p>
          <p
            className={`${classes.compoundValue} text text_type_digits-default`}
          >
            {data.fat}
          </p>
        </div>
        <div className={classes.compoundItem}>
          <p className={`${classes.compoundName} text text_type_main-default`}>
            Углеводы, г
          </p>
          <p
            className={`${classes.compoundValue} text text_type_digits-default`}
          >
            {data.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
});

export default IngredientDetails;

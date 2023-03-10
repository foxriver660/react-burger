import React, { FC } from "react";
import classes from "./IngredientPage.module.css";
import { useParams } from "react-router-dom";
import { getApiIngredients } from "../../services/actions/ingredientActions";
import { getData } from "../../selectors/selectors";
import CompoundItem from "../../components/IngredientDetails/CompoundItem/CompoundItem";
import { Loader } from "../../components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import useIngredientsOperations from "../../hooks/useIngredientsOperations";


const IngredientPage: FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  React.useEffect(() => {
    dispatch(getApiIngredients());
  }, [dispatch]);

  const availableIngredients = useAppSelector(getData);

  const { order } = useIngredientsOperations(availableIngredients, id);

  return (
    <>
      {order ? (
        <div className={`${classes.wrapper} pt-30 pr-10 pl-10 pb-15`}>
          <h2
            className={`${classes.ingredientHeader} text text_type_main-large`}
          >
            Детали ингредиента
          </h2>
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
      ) : (
        <Loader classname={classes.loader} />
      )}
    </>
  );
});

export default IngredientPage;

import React, { FC } from "react";
import classes from "./IngredientPage.module.css";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useParams } from "react-router-dom";
import { getApiIngredients } from "../../services/actions/ingredientActions";
import { getData } from "../../selectors/selectors";
import { findIngredient } from "../../utils/calculationFunc";
import CompoundItem from "../../components/IngredientDetails/CompoundItem/CompoundItem";
import { Loader } from "../../components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../services/hooks";


const IngredientPage: FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  React.useEffect(() => {
    dispatch(getApiIngredients());
  }, [dispatch]);

  const availableIngredients = useAppSelector(getData);

  const data = findIngredient(availableIngredients, id);

  return (
    <>
      {data ? (
        <div className={`${classes.wrapper} pt-30 pr-10 pl-10 pb-15`}>
          <h2
            className={`${classes.ingredientHeader} text text_type_main-large`}
          >
            Детали ингредиента
          </h2>
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
      ) : (
        <Loader classname={undefined} />
      )}
    </>
  );
});

export default IngredientPage;

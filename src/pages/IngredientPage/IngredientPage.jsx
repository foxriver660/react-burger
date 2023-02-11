import React from "react";
import classes from "./IngredientPage.module.css";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useParams } from "react-router-dom";
import { getApiIngredients } from "../../services/actions/ingredientActions";
import { getData } from "../../selectors/selectors";
import { findIngredient } from "../../components/utils/calculationFunc";
import CompoundItem from "./CompoundItem/CompoundItem";
import { Loader } from "../../components/Loader/Loader";
const IngredientPage = React.memo(() => {
  const dispatch = useDispatch();
  const { id } = useParams();
  React.useEffect(() => {
    dispatch(getApiIngredients());
  }, [dispatch]);

  const availableIngredients = useSelector(getData);

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
            <CompoundItem type="Калории,ккал" data={data.calories} />
            <CompoundItem type="Белки, г" data={data.proteins} />
            <CompoundItem type="Жиры, г" data={data.fat} />
            <CompoundItem type="Углеводы, г" data={data.carbohydrates} />
          </ul>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
});

export default IngredientPage;

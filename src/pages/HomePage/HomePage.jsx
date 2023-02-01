import React from "react";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import classes from "./HomePage.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux/es/exports";

const getServerResponse = (state) => state.ingredientReducer.serverResponse;
const getData = (state) => state.ingredientReducer.availableIngredients;

const HomePage = React.memo(() => {
  const { isLoading, hasError } = useSelector(getServerResponse);
  const data = useSelector(getData);

  return (
    <div className={`${classes.container} p-4`}>
      {isLoading && (
        <div className={`${classes.loadingMessage} text_type_main-medium`}>
          Загрузка...
        </div>
      )}
      {hasError && (
        <div className={`${classes.loadingMessage} text_type_main-medium`}>
          Что-то пошло не так :(
        </div>
      )}
      {!isLoading && !hasError && !!data.length && (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      )}
    </div>
  );
});

export default HomePage;

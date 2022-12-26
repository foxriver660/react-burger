import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import classes from "./App.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { getApiIngredients } from "../../services/actions/ingredientActions";

const App = React.memo(() => {
  const dispatch = useDispatch();
  const { isLoading, hasError } = useSelector(
    (state) => state.ingredientReducer.serverResponse
  );
  const data = useSelector(
    (state) => state.ingredientReducer.availableIngredients
  );

  React.useEffect(() => {
    dispatch(getApiIngredients());
  }, [dispatch]);

  return (
    <main className={`p-10`}>
      <AppHeader />
      <div className={`${classes.subContainer} p-4`}>
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
    </main>
  );
});

export default App;

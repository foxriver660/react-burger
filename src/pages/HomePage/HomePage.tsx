import React, { FC } from "react";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import classes from "./HomePage.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux/es/exports";
import { getData, getServerResponse } from "../../selectors/selectors";
import { Loader } from "../../components/Loader/Loader";
import { useAppSelector } from "../../services/hooks";

const HomePage: FC = React.memo(() => {
  const { isLoading, hasError } = useAppSelector(getServerResponse);
  const data = useAppSelector(getData);

  return (
    <div className={`${classes.container} p-4`}>
      {isLoading && <Loader classname="mt-30" />}
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

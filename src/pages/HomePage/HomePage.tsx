import React, { FC } from "react";
import classes from "./HomePage.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getData, getServerResponse } from "../../selectors/selectors";
import { useAppSelector } from "../../services/hooks";
import { BurgerConstructor, BurgerIngredients, Loader } from "../../components";

const HomePage: FC = React.memo(() => {
  const { isLoading, hasError } = useAppSelector(getServerResponse);
 /*  const data = useAppSelector(getData); */

  return (
    <div className={`${classes.container} p-4`}>
      {isLoading && <Loader classname="mt-30" />}
      {hasError && (
        <div className={`${classes.loadingMessage} text_type_main-medium`}>
          Что-то пошло не так :(
        </div>
      )}
      {!isLoading && (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      )}
    </div>
  );
});

export default HomePage;
// TODO: this
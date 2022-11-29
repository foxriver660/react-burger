import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import classes from "./App.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ModalTest from "../ModalTest/ModalTest";

const App = () => {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  React.useEffect(() => {
    const getData = async () => {
      setState({ ...state, hasError: false, isLoading: true });
      fetch("https://norma.nomoreparties.space/api/ingredients")
        .then((res) => res.json())
        .then((res) => {
          setState({ ...state, data: res.data, isLoading: false });
        })
        .catch((err) => {
          console.log(err);
          setState({ ...state, hasError: true, isLoading: false });
        });
    };
    getData();
  }, []);

  return (
    <main className={`p-10`}>
      <AppHeader />
      <div className={`${classes.subContainer} p-4`}>
        {state.isLoading && (
          <div className={`${classes.loadingMessage} text_type_main-medium`}>
            Загрузка...
          </div>
        )}
        {state.hasError && (
          <div className={`${classes.loadingMessage} text_type_main-medium`}>
            Что-то пошло не так :(
          </div>
        )}
        {!state.isLoading && !state.hasError && state.data.length && (
          <>
            <BurgerIngredients data={state.data} />
            <BurgerConstructor data={state.data} />
          </>
        )}
      </div>
      
     </main>
  );
};

export default App;

import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import data from "../utils/data";
import classes from "./App.module.css";

const App = () => {
  return (
    <main className={`p-10`}>
      <AppHeader />
      <div className={`${classes.subContainer} p-4`}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </div>
    </main>
  );
};

export default App;

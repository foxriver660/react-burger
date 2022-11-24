import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

import classes from "./App.module.css";

const App = () => {
    return (
    <main className={`${classes.mainContainer} p-10`}>
      <AppHeader />
      <div className={`${classes.subContainer} p-4`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};

export default App;

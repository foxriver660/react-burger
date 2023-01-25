import React from "react";
import { Routes, Route } from "react-router-dom";
import AppHeader from "../components/AppHeader/AppHeader";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { getApiIngredients } from "../services/actions/ingredientActions";
import HomePage from "../pages/HomePage/HomePage";
import Layout from "../pages/Layout";
import RegisterPage from '../pages/RegisterPage/RegisterPage'

const App = React.memo(() => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<HomePage />} /> */}
          <Route index element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
});

export default App;

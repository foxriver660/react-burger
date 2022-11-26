import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import data from "../utils/data";
import classes from "./App.module.css";
import PropTypes from 'prop-types';

const itemPropTypes = PropTypes.shape({
  _id:PropTypes.string.isRequired,
  name:PropTypes.string.isRequired,
  type:PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates:PropTypes.number.isRequired,
  calories:PropTypes.number.isRequired,
  price:PropTypes.number.isRequired,
  image:PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v:PropTypes.number.isRequired
  });
  BurgerConstructor.propTypes = {data: PropTypes.arrayOf(itemPropTypes).isRequired}
  BurgerIngredients.propTypes = {data: PropTypes.arrayOf(itemPropTypes).isRequired}


const App = () => {
    return (
    <main className={`${classes.mainContainer} p-10`}>
      <AppHeader />
      <div className={`${classes.subContainer} p-4`}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
      </div>
    </main>
  );
};

export default App;

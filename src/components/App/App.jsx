import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';




import classes from './App.module.css'

const App = () => {
  console.log(classes)
  return(
    <main className={`${classes.mainContainer} p-4`}>
    <AppHeader/>
    <BurgerIngredients/>
    </main>
  )
}

export default App

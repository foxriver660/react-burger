import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import classes from './IngredientCard.module.css'

const IngredientCard = () => {
return (
  <div className={classes.container}>
<img className={classes.image} src='https://code.s3.yandex.net/react/code/bun-02.png' />
<div className={classes.currencyContainer}><span className="pr-2">20</span><CurrencyIcon/></div>
<p  className={classes.ingredientName}>Космическая булка F3de</p>
<Counter count={1} size="default"/>
  </div>
)
}






export default IngredientCard
import React from "react";
import classes from './BurgerIngredients.module.css';

const BurgerIngredients = () => {
  console.log(classes)
  return (
    <section className={`${classes.container}`}>
      <h1>Соберите бургер</h1>
      
      <ul className={`${classes.inputList}`}>
                <li>
                  <input id="radio-amount-1" type="radio" name="amount"
                    value="1" checked/>
                  <label for="radio-amount-1">Булки</label>
                </li>
                <li>
                  <input id="radio-amount-2" type="radio" name="amount"
                    value="2" />
                  <label for="radio-amount-2">Соусы</label>
                </li>
                <li>
                  <input id="radio-amount-3" type="radio" name="amount"
                    value="3" />
                  <label for="radio-amount-3">Начинки</label>
                </li>
</ul>




     
      <h2>Булки</h2>
      <div>
        <ul>
          <li></li>
          <li></li>
        </ul>
      </div>
      <h2>Соусы</h2>
      <div>
        <ul>
          <li></li>
          <li></li>
        </ul>
      </div>
      <h2>Начинки</h2>
      <div>
        <ul>
          <li></li>
          <li></li>
        </ul>
      </div>
    </section>
  );
};

export default BurgerIngredients;

import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import IngredientCard from "../IngredientCard/IngredientCard";
import classes from "./BurgerIngredients.module.css";
import CustomScrollBar from "../CustomScrollBar/CustomScrollBar";

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState("one");

  return (
    <section className={`${classes.container}`}>
      <h1 className={classes.title}>Соберите бургер</h1>

      <div className={classes.outline} style={{ display: "flex" }}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <CustomScrollBar>
        <h2 className={classes.subtitle}>Булки</h2>

        <ul className={classes.ingredientsList}>
          <li className={classes.outline}>
            <IngredientCard />
          </li>
          <li className={classes.outline}>
            <IngredientCard />
          </li>
        </ul>

        <h2 className={classes.subtitle}>Соусы</h2>

        <ul className={classes.ingredientsList}>
          <li className={classes.outline}>
            <IngredientCard />
          </li>
          <li className={classes.outline}>
            <IngredientCard />
          </li>
        </ul>

        <h2 className={classes.subtitle}>Начинки</h2>

        <ul className={classes.ingredientsList}>
          <li className={classes.outline}>
            <IngredientCard />
          </li>
          <li className={classes.outline}>
            <IngredientCard />
          </li>
          <li className={classes.outline}>
            <IngredientCard />
          </li>
          <li className={classes.outline}>
            <IngredientCard />
          </li>
        </ul>
      </CustomScrollBar>
    </section>
  );
};

export default BurgerIngredients;

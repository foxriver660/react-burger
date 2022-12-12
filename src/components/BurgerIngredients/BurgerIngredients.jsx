import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import classes from "./BurgerIngredients.module.css";
import PropTypes from "prop-types";
import itemPropTypes from "../utils/prop-types";
import IngredientsCategory from "../IngredientsCategory/IngredientsCategory";
import { IngredientContext } from "../services/ingredientContext";


const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState("bun");
  // ДАТА ИЗ КОНТЕКСТА
  const {data} = React.useContext(IngredientContext)
  // РЕАЛИЗАЦИЯ СКРОЛЛА
  const mainRef = React.useRef(null);
  const sauceRef = React.useRef(null);
  const bunRef = React.useRef(null);

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleClickTab = (tab) => {
    setCurrent(tab);
    switch (tab) {
      case "bun":
        scrollTo(bunRef);
        break;
      case "sauce":
        scrollTo(sauceRef);
        break;
      case "main":
        scrollTo(mainRef);
        break;
      // no default
    }
  };
  // ФИЛЬТРАЦИЯ ОБЪЕКТОВ ВХОДНОГО МАССИВА ПО ТИПУ
  const { buns, mains, sauces } = React.useMemo(() => {
    return data.reduce(
      (acc, ingredient) => {
        switch (ingredient.type) {
          case "bun":
            acc.buns.push(ingredient);
            break;
          case "main":
            acc.mains.push(ingredient);
            break;
          case "sauce":
            acc.sauces.push(ingredient);
            break;
          // no default
        }
        return acc;
      },
      { buns: [], mains: [], sauces: [] }
    );
  }, [data]);

  return (
    <section className={`${classes.container}`}>
      <h1 className={`${classes.title} pt-10 text text_type_main-large`}>
        Соберите бургер
      </h1>

      <div className={`${classes.tabContainer} pt-5 pb-10`}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => handleClickTab("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => handleClickTab("sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => handleClickTab("main")}
        >
          Начинки
        </Tab>
      </div>

      <div className={classes.scrollWrapper}>
        <h2
          ref={bunRef}
          className={`${classes.subtitle} pb-6 text text_type_main-medium`}
        >
          Булки
        </h2>

        <ul className={classes.ingredientsList}>
          <IngredientsCategory filteredArr={buns} />
        </ul>

        <h2
          ref={sauceRef}
          className={`${classes.subtitle} pt-10 pb-6 text text_type_main-medium`}
        >
          Соусы
        </h2>

        <ul className={classes.ingredientsList}>
          <IngredientsCategory filteredArr={sauces} />
        </ul>

        <h2
          ref={mainRef}
          className={`${classes.subtitle} pt-10 pb-6 text text_type_main-medium`}
        >
          Начинки
        </h2>

        <ul className={classes.ingredientsList}>
          <IngredientsCategory filteredArr={mains} />
        </ul>
      </div>
    </section>
  );
};

export default BurgerIngredients;



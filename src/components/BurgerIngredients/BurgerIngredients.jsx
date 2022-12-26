import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import classes from "./BurgerIngredients.module.css";
import IngredientsCategory from "../IngredientsCategory/IngredientsCategory";

import { SAUCE, BUN, MAIN } from "../utils/constant";
import { Waypoint } from "react-waypoint";
import { useSelector } from "react-redux/es/exports";
const BurgerIngredients = React.memo(() => {
  const [current, setCurrent] = React.useState(BUN);
  const data = useSelector(
    (state) => state.ingredientReducer.availableIngredients
  );
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
      case BUN:
        scrollTo(bunRef);
        break;
      case SAUCE:
        scrollTo(sauceRef);
        break;
      case MAIN:
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
          case BUN:
            acc.buns.push(ingredient);
            break;
          case MAIN:
            acc.mains.push(ingredient);
            break;
          case SAUCE:
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
          value={BUN}
          active={current === BUN}
          onClick={() => handleClickTab(BUN)}
        >
          Булки
        </Tab>
        <Tab
          value={SAUCE}
          active={current === SAUCE}
          onClick={() => handleClickTab(SAUCE)}
        >
          Соусы
        </Tab>
        <Tab
          value={MAIN}
          active={current === MAIN}
          onClick={() => handleClickTab(MAIN)}
        >
          Начинки
        </Tab>
      </div>

      <div id="scroll-root" className={classes.scrollWrapper}>
        <Waypoint bottomOffset="90%" onEnter={() => setCurrent(BUN)} />
        <h2
          ref={bunRef}
          className={`${classes.subtitle} pb-6 text text_type_main-medium`}
        >
          Булки
        </h2>

        <ul className={classes.ingredientsList}>
          <IngredientsCategory filteredArr={buns} />
        </ul>
        <Waypoint bottomOffset="90%" onEnter={() => setCurrent(SAUCE)} />
        <h2
          ref={sauceRef}
          className={`${classes.subtitle} pt-10 pb-6 text text_type_main-medium`}
        >
          Соусы
        </h2>

        <ul className={classes.ingredientsList}>
          <IngredientsCategory filteredArr={sauces} />
        </ul>
        <Waypoint bottomOffset="90%" onEnter={() => setCurrent(MAIN)} />
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
});

export default BurgerIngredients;

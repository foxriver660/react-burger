import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import classes from "./BurgerIngredients.module.css";
import CustomScrollBar from "../CustomScrollBar/CustomScrollBar";
import PropTypes from "prop-types";
import itemPropTypes from "../utils/prop-types";
import IngredientsCategory from "../IngredientsCategory/IngredientsCategory";

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = React.useState("one");

  // РЕАЛИЗАЦИЯ СКРОЛЛА
  const mainRef = React.useRef(null);
  const sauceRef = React.useRef(null);
  const bunRef = React.useRef(null);
  const scrollToMain = () => {
    mainRef.current.scrollIntoView();
  };
  const scrollToBun = () => {
    bunRef.current.scrollIntoView();
  };
  const scrollToSauce = () => {
    sauceRef.current.scrollIntoView();
  };

  // ФИЛЬТРАЦИЯ ОБЪЕКТОВ ВХОДНОГО МАССИВА ПО ТИПУ
  const [filterBun, setFilterBun] = React.useState([]);
  const [filterMain, setFilterMain] = React.useState([]);
  const [filterSauce, setFilterSauce] = React.useState([]);
  React.useMemo(() => {
    setFilterBun(data.filter((item) => item.type === "bun"));
    setFilterMain(data.filter((item) => item.type === "main"));
    setFilterSauce(data.filter((item) => item.type === "sauce"));
  }, [data]);

  return (
    <section className={`${classes.container}`}>
      <h1 className={`${classes.title} pt-10 text text_type_main-large`}>
        Соберите бургер
      </h1>

      <div className={`${classes.tabContainer} pt-5 pb-10`}>
        <Tab
          value="one"
          active={current === "one"}
          onClick={() => {
            scrollToBun();
            setCurrent("one");
          }}
        >
          Булки
        </Tab>
        <Tab
          value="two"
          active={current === "two"}
          onClick={() => {
            scrollToSauce();
            setCurrent("two");
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="three"
          active={current === "three"}
          onClick={() => {
            scrollToMain();
            setCurrent("three");
          }}
        >
          Начинки
        </Tab>
      </div>

      <CustomScrollBar side="left">
        <h2
          ref={bunRef}
          className={`${classes.subtitle} pb-6 text text_type_main-medium`}
        >
          Булки
        </h2>

        <ul className={classes.ingredientsList}>
          <IngredientsCategory filteredArr={filterBun} />
        </ul>

        <h2
          ref={sauceRef}
          className={`${classes.subtitle} pt-10 pb-6 text text_type_main-medium`}
        >
          Соусы
        </h2>

        <ul className={classes.ingredientsList}>
          <IngredientsCategory filteredArr={filterSauce} />
        </ul>

        <h2
          ref={mainRef}
          className={`${classes.subtitle} pt-10 pb-6 text text_type_main-medium`}
        >
          Начинки
        </h2>

        <ul className={classes.ingredientsList}>
          <IngredientsCategory filteredArr={filterMain} />
        </ul>
      </CustomScrollBar>
    </section>
  );
};

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};

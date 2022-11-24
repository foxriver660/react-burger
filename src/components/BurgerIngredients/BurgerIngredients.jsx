import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "../IngredientCard/IngredientCard";
import classes from "./BurgerIngredients.module.css";
import CustomScrollBar from "../CustomScrollBar/CustomScrollBar";
import data from "../utils/data";


const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState("one");
  const [dataAPI, setDataAPI] = React.useState(data)

// ФИЛЬТРАЦИЯ ОБЪЕКТОВ ВХОДНОГО МАССИВА ПО ТИПУ
const [filterBun, setFilterBun] = React.useState([])
const [filterMain, setFilterMain] = React.useState([])
const [filterSauce, setFilterSauce] = React.useState([])
 React.useEffect(()=>
 {
  setFilterBun(dataAPI.filter((item) => item.type === "bun"))
  setFilterMain(dataAPI.filter((item) => item.type === "main"))
  setFilterSauce(dataAPI.filter((item) => item.type === "sauce"))

 }, [dataAPI])


  return (
    <section className={`${classes.container}`}>
      <h1 className={`${classes.title} pt-10 text text_type_main-large`}>
        Соберите бургер
      </h1>

      <div className={`${classes.tabContainer} pt-5`}>
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
        <h2
          className={`${classes.subtitle} pt-10 pb-6 text text_type_main-medium`}
        >
          Булки
        </h2>

        <ul className={classes.ingredientsList}>
          {filterBun.map((item) => (
              <li key={item._id}>
                <IngredientCard
                  name={item.name}
                  _id={item._id}
                  type={item.type}
                  price={item.price}
                  image={item.image}
                  key={item._id}
                />
              </li>
            ))}
        </ul>

        <h2
          className={`${classes.subtitle} pt-10 pb-6 text text_type_main-medium`}
        >
          Соусы
        </h2>

        <ul className={classes.ingredientsList}>
          {filterSauce
            .map((item) => (
              <li key={item._id}>
                <IngredientCard
                  name={item.name}
                  _id={item._id}
                  type={item.type}
                  price={item.price}
                  image={item.image}
                  key={item._id}
                />
              </li>
            ))}
        </ul>

        <h2
          className={`${classes.subtitle} pt-10 pb-6 text text_type_main-medium`}
        >
          Начинки
        </h2>

        <ul className={classes.ingredientsList}>
          {filterMain.map((item) => (
              <li key={item._id}>
                <IngredientCard
                  name={item.name}
                  _id={item._id}
                  type={item.type}
                  price={item.price}
                  image={item.image}
                  key={item._id}
                />
              </li>
            ))}
        </ul>
      </CustomScrollBar>
    </section>
  );
};

export default BurgerIngredients;

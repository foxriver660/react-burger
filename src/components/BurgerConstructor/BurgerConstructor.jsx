import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import CustomScrollBar from "../CustomScrollBar/CustomScrollBar";
import classes from "./BurgerConstructor.module.css";
import bigCurrencyIcon from "../../images/bigCurrencyIcon.svg";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import PropTypes from "prop-types";
import itemPropTypes from "../utils/prop-types";

const BurgerConstructor = ({ data }) => {
  const bun = data.find((item) => item.type === "bun");
  const ingredients = data.filter((item) => item.type !== "bun");

  console.log(bun);
  console.log(ingredients);
  return (
    <section className={`${classes.container} pt-25 pl-4`}>
      <ConstructorElement
        extraClass={`${classes.ingredientElement} mb-4 mr-3`}
        text={`${bun.name} (верх)`}
        price={bun.price}
        thumbnail={bun.image}
        type="top"
        isLocked={true}
      />
      <CustomScrollBar side={"right"}>
        <ul className={`${classes.ingredientList} `}>
          {ingredients.map((item) => (
            <li key={item._id} className={`${classes.ingredientItem} `}>
              <DragIcon type="primary" />
              <ConstructorElement
                extraClass={classes.ingredientElement}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          ))}
        </ul>
      </CustomScrollBar>
      <ConstructorElement
        extraClass={`${classes.ingredientElement} mt-4 mr-3`}
        text={`${bun.name} (низ)`}
        price={bun.price}
        thumbnail={bun.image}
        type="bottom"
        isLocked={true}
      />
      <div className={`${classes.currencyContainer} pt-10`}>
        <p className="text text_type_digits-medium">610</p>
        <img className="pl-2 pr-10" src={bigCurrencyIcon} />
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};

export default BurgerConstructor;

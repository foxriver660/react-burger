import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import CustomScrollBar from "../CustomScrollBar/CustomScrollBar";
import classes from "./BurgerConstructor.module.css";
import bigCurrencyIcon from "../../images/bigCurrencyIcon.svg";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import data from "../utils/data";


const BurgerConstructor = () => {
  return (
    <section className={`${classes.container} pt-25 pl-4`}>
      <CustomScrollBar>
        <ul className={classes.ingredientList}>
         
{data.map(item => <li key={item._id}  className={classes.ingredientItem}>
  <DragIcon type="primary" />
            <ConstructorElement
            extraClass={classes.ingredientElement}
            key={item._id}   
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />


</li>)}
</ul>
</CustomScrollBar>

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
export default BurgerConstructor;

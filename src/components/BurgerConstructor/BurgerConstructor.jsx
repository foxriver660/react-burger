import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import CustomScrollBar from "../CustomScrollBar/CustomScrollBar";
import classes from "./BurgerConstructor.module.css";
import bigCurrencyIcon from "../../images/bigCurrencyIcon.svg";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";

const BurgerConstructor = () => {
  return (
    <section className={`${classes.container} pt-25 pl-4 pr-4`}>
      <CustomScrollBar>
        <ul className={classes.ingredientList}>
          <li className={classes.ingredientItem}>
            <DragIcon type="primary" />
            <ConstructorElement
              type="top"
              isLocked={true}
              text="Краторная булка N-200i (верх)"
              price={200}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-02.png"}
            />
          </li>
          <li className={classes.ingredientItem}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-02.png"}
            />
          </li>
          <li className={classes.ingredientItem}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-02.png"}
            />
          </li>
          <li className={classes.ingredientItem}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-02.png"}
            />
          </li>
          <li className={classes.ingredientItem}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-02.png"}
            />
          </li>
          <li className={classes.ingredientItem}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-02.png"}
            />
          </li>
          <li className={classes.ingredientItem}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-02.png"}
            />
          </li>
          <li className={classes.ingredientItem}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-02.png"}
            />
          </li>
          <li className={classes.ingredientItem}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-02.png"}
            />
          </li>
          <li className={classes.ingredientItem}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-02.png"}
            />
          </li>
          <li className={classes.ingredientItem}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-02.png"}
            />
          </li>
          <li className={classes.ingredientItem}>
            <DragIcon type="primary" />
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-02.png"}
            />
          </li>
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

import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import CustomScrollBar from "../CustomScrollBar/CustomScrollBar";
import classes from "./BurgerConstructor.module.css";
import bigCurrencyIcon from "../../images/bigCurrencyIcon.svg";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import PropTypes from "prop-types";
import itemPropTypes from "../utils/prop-types";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

const BurgerConstructor = ({ data }) => {
  const bun = data.find((item) => item.type === "bun");
  const ingredients = data.filter((item) => item.type !== "bun");
  /* МОДАЛКА ОРДЕРА */
  const [openOrder, setOpenOrder] = React.useState(false);
  /* ЗАКРЫТИЕ МОДАЛКИ ПО ESC */
  const escClose = (e) => {
    if (e.key === "Escape") {
      setOpenOrder(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener("keydown", escClose);
    return () => window.removeEventListener("keydown", escClose);
  }, [openOrder]);

  /* МОДАЛКА ИНГРЕДИЕНТОВ */
  const [openCard, setOpenCard] = React.useState(false);
  const escCloseCard = (e) => {
    if (e.key === "Escape") {
      setOpenCard(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener("keydown", escCloseCard);
    return () => window.removeEventListener("keydown", escCloseCard);
  }, [openCard]);

  /* ВЫБРАННЫЙ ЭНГРЕДИЕНТ */
  const [selectedIngredient, setSelectedIngredient] = React.useState();

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
          {ingredients.map((item) => {
            return (
              <li
                onClick={() => {
                  setSelectedIngredient(item);
                  setOpenCard(true);
                }}
                key={item._id}
                className={`${classes.ingredientItem} `}
              >
                <DragIcon type="primary" />
                <ConstructorElement
                  extraClass={classes.ingredientElement}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            );
          })}
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
        <img className="pl-2 pr-10" src={bigCurrencyIcon} alt="иконка валюты" />
        <Button
          onClick={() => setOpenOrder(true)}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
      {selectedIngredient && <IngredientDetails
        data={selectedIngredient}
        onKeyPress={escCloseCard}
        open={openCard}
        onClose={() => setOpenCard(false)}
      />}
      {openOrder && <OrderDetails
        onKeyPress={escClose}
        open={openOrder}
        onClose={() => setOpenOrder(false)}
      />}
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};

export default BurgerConstructor;

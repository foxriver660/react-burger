import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import classes from "./BurgerConstructor.module.css";
import bigCurrencyIcon from "../../images/bigCurrencyIcon.svg";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import PropTypes from "prop-types";
import itemPropTypes from "../utils/prop-types";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import { IngredientContext } from "../services/ingredientContext";
const BurgerConstructor = () => {
  const [totalPrice, setTotalPrice] = React.useState(0)
  const {data} = React.useContext(IngredientContext)
 
  /* РАСПРЕДЕЛЕНИЕ МАССИВОВ ПО ТИПУ */
  const bun = data.find((item) => item.type === "bun");
  const ingredients = data.filter((item) => item.type !== "bun");
 
const calcPrice = React.useMemo(() => (setTotalPrice(bun.price*2 + ingredients.reduce((acc, curr) => acc + curr.price, 0))), [])
  
  /* СОСТОЯНИЕ МОДАЛОК */
  const [isOpenOrder, setIsOpenOrder] = React.useState(false);

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
      <div className={classes.scrollWrapper}>
        <ul className={`${classes.ingredientList} `}>
          {ingredients.map((item) => {
            return (
              <li key={item._id} className={`${classes.ingredientItem} `}>
                <DragIcon type="primary" />
                <ConstructorElement
                  extraClass={`${classes.ingredientElement} mr-2`}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <ConstructorElement
        extraClass={`${classes.ingredientElement} mt-4 mr-3`}
        text={`${bun.name} (низ)`}
        price={bun.price}
        thumbnail={bun.image}
        type="bottom"
        isLocked={true}
      />
      <div className={`${classes.currencyContainer} pt-10`}>
        <p className="text text_type_digits-medium">{totalPrice}</p>
        <img className="pl-2 pr-10" src={bigCurrencyIcon} alt="иконка валюты" />
        <Button
          onClick={() => setIsOpenOrder(true)}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>

      {isOpenOrder && (
        <Modal onClose={() => setIsOpenOrder(false)}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

/* BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
}; */

export default BurgerConstructor;

import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import classes from "./BurgerConstructor.module.css";
import bigCurrencyIcon from "../../images/bigCurrencyIcon.svg";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import { DataContext } from "../../services/dataContext";
import { getOrder } from "../utils/burger-api";
import priceReducer from "../../services/priceReducer";
import { BUN } from "../utils/constant";

const BurgerConstructor = () => {
  // DATA ИЗ КОНТЕКСТА
  const { data } = React.useContext(DataContext);
  // УСТАНОВКА СТЕЙТА ЦЕНЫ
  const [state, dispatch] = React.useReducer(priceReducer, { totalPrice: 0 });
  // ОТФИЛЬТРОВАННЫЕ МИССИВЫ

  const bun = data.find((item) => item.type === BUN);
  const ingredients = data.filter((item) => item.type !== BUN);

  // ПОДСЧЕТ ОБЩЕЙ СТОИМОСТИ
  /* eslint-disable */
  React.useMemo(() => {
    dispatch({ type: "reset" });
    dispatch({
      type: "add",
      payload:
        bun.price * 2 + ingredients.reduce((acc, curr) => acc + curr.price, 0),
    });
  }, [data]);

  // НОМЕР ОРДЕРА
  const [order, setOrder] = React.useState(undefined);

  /* eslint-enable */
  // НАПРАВЛЯЕМ ID НА СЕРВЕР ДЛЯ ПОЛУЧЕНИЯ ORDER
  const handleClickOrder = () => {
    getOrder([...ingredients.map((item) => item._id), bun._id])
      .then((res) => setOrder(res.order.number))
      .catch((err) => {
        console.log(err);
        setOrder(`error`);
      });
  };

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
        <p className="text text_type_digits-medium">{state.totalPrice}</p>
        <img className="pl-2 pr-10" src={bigCurrencyIcon} alt="иконка валюты" />
        <Button
          onClick={() => {
            handleClickOrder();
          }}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>

      {order && (
        <Modal
          onClose={() => {
            setOrder(undefined);
          }}
        >
          <OrderDetails order={order} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;

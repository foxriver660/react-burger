import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import classes from "./BurgerConstructor.module.css";
import bigCurrencyIcon from "../../images/bigCurrencyIcon.svg";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";

import { getOrder } from "../utils/burger-api";
import priceReducer from "../../services/priceReducer";
import { BUN } from "../utils/constant";
import { useSelector, useDispatch } from "react-redux/es/exports";
import {GET_CONSTRUCTOR_INGREDIENTS} from '../../services/reducers/reducers'
const BurgerConstructor = () => {
  // DATA ИЗ КОНТЕКСТА
  const dataRedux =useSelector(state=>state.availableIngredients);
// !ГЕНЕРАЦИЯ СЛУЧАЙНОГО МАССИВА
function arrayRandElement(arr) {
  let randomArr = []
  for(let i=0; i <= Math.floor(Math.random() * arr.length); i++ ){
    randomArr.push(arr[i])
  }
  return randomArr;
}
const data = arrayRandElement(dataRedux)
// !ГЕНЕРАЦИЯ СЛУЧАЙНОГО МАССИВА

  const dispatch = useDispatch()
  React.useEffect(() => {    
    dispatch({ type: GET_CONSTRUCTOR_INGREDIENTS, payload: data })
     
}, []); 
const totalCost=useSelector(state=>state.totalCost);
const ordernum=useSelector(state=>state.currentOrder);
console.log(ordernum)
  // УСТАНОВКА СТЕЙТА ЦЕНЫ
 /*  const [state, dispatch] = React.useReducer(priceReducer, { totalPrice: 0 }); */
  // ОТФИЛЬТРОВАННЫЕ МИССИВЫ

  const bun = data.find((item) => item.type === BUN);
  const ingredients = data.filter((item) => item.type !== BUN);



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
        <p className="text text_type_digits-medium">{totalCost}</p>
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

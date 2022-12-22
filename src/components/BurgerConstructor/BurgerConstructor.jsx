import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon, InfoIcon, BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import classes from "./BurgerConstructor.module.css";
import bigCurrencyIcon from "../../images/bigCurrencyIcon.svg";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";

import { getOrder } from "../utils/burger-api";
import { useDrop } from "react-dnd";
import { BUN } from "../utils/constant";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { GET_ORDER, RESET_ORDER, ADD_INGREDIENT_TO_CONSTRUCTOR, DELETE_INGREDIENT_FROM_CONSTRUCTOR, CALC_INGREDIENTS_IN_CONSTRUCTOR} from '../../services/reducers/reducers'
const BurgerConstructor = () => {
  
// !ГЕНЕРАЦИЯ СЛУЧАЙНОГО МАССИВА

const dispatch = useDispatch()

  
  // НАПРАВЛЯЕМ ID НА СЕРВЕР ДЛЯ ПОЛУЧЕНИЯ ORDER
  const handleClickOrder = () => {
    getOrder(order.ingredientsId)
      .then((res) => {dispatch({ type: GET_ORDER, payload: res.order.number });})
      .catch((err) => {
        console.log(err);
              });
  };
  const totalCost=useSelector(state=>state.totalCost);
  const order=useSelector(state=>state.currentOrder);


// !DND
const [{ canDrop, isOver }, dropRef] = useDrop(() => ({
  accept: 'items',
  drop: (item) => {dispatch({
    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
    payload: item,
  }); dispatch({
    type: CALC_INGREDIENTS_IN_CONSTRUCTOR,
  })},
  collect: (monitor) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
}))
const data=useSelector(state=>state.constructorIngredients);







const bun = data.find((item) => item.type === BUN);
const ingredients = data.filter((item) => item.type !== BUN);

console.log(bun)


const isActive = canDrop && isOver
let outline = 'none'
if (isActive) {
  outline = '3px solid #00cccc'
} else if (canDrop) {
  outline = '1px solid red'
}
const deleteIngredient = (ingredient) => {
  dispatch({
    type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    payload: ingredient,
  });
  dispatch({
    type: CALC_INGREDIENTS_IN_CONSTRUCTOR,
  })
}
const errorMessage = (message) => {
  return (<span className={`${classes.defaultMessage} text text_type_main-default pt-1`}><InfoIcon type={isActive ? "success" : "error"} /> {message} </span>)
}
  return (
    <section ref={dropRef} style={{outline} } className={`${classes.container} pt-25 pl-4`}>
      {data.length>0 ? (<>{bun && <ConstructorElement
        extraClass={`${classes.ingredientElement} mb-4 mr-3`}
        text={`${bun.name} (верх)`}
        price={bun.price}
        thumbnail={bun.image}
        type="top"
        isLocked={true}
      />}
      {ingredients.length>0 ? <div className={classes.scrollWrapper}>
        <ul className={`${classes.ingredientList} `}>
          {ingredients.map((item, index) => {
            return (
              <li key={index} className={`${classes.ingredientItem} `}>
                <DragIcon type="primary" />
                <ConstructorElement
                  extraClass={`${classes.ingredientElement} mr-2`}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  handleClose={()=>{deleteIngredient(item)}}
                />
              </li>
            );
          })}
        </ul>
      </div> : errorMessage('Добавьте начинку')}
      {bun ? <ConstructorElement
        extraClass={`${classes.ingredientElement} mt-4 mr-3`}
        text={`${bun.name} (низ)`}
        price={bun.price}
        thumbnail={bun.image}
        type="bottom"
        isLocked={true}
      /> : errorMessage('Добавьте булочку')}
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

      {order.order && (
        <Modal
            onClose={()=>dispatch({ type: RESET_ORDER })}     >
          <OrderDetails order={order.order} />
        </Modal>
      )}</>) : <div className={`${classes.defaultContainer} text text_type_main-large pt-30`}>	
      	
        <BurgerIcon type={isActive ? "success" : "primary"} /> {isActive ? 'Можно добавить!' : 'Соберите свой бургер, пока заказ пуст...'} </div>}
    </section>
  );
};

export default BurgerConstructor;

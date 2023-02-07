import React from 'react'
import classes from './OrderDetails.module.css'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import IngredientItem from '../IngredientItem/IngredientItem'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date'
import { BUN } from '../utils/constant'

const OrderDetails = () => {
 
  const orders = useSelector((state) => state.wsReducer.orders);
  const availableIngredients = useSelector(
    (state) => state.ingredientReducer.availableIngredients
  );
  const { id } = useParams();
  const order = orders.orders.find((item) => item._id === id);
  const curOffset = new Date().getTimezoneOffset() / 60;
  const gmt = "i-GMT" + (curOffset > 0 ? "-" + curOffset : "+" + -curOffset);

 const filteredIngredients = availableIngredients.filter((item)=> {
  return order.ingredients.some((item2) => item2 === item._id);
})
const totalCost = filteredIngredients.reduce((acc, item) => item.type === BUN ? acc + item.price*2 : acc + item.price, 0);

  return (
    <div className={classes.wrapper}>
        <h3
          className={`${classes.orderID} text text_type_digits-default pb-10`}
        >
          #{order.number}
        </h3>
        <h3 className={`${classes.orderTitle} text text_type_main-medium pb-3`}>
          {order.name}
        </h3>
        <p
          className={`${classes.orderStatus} text text_type_main-default pb-15`}
        >
         {order.status === "done" ? 'Выполнен' : 'В процессе приготовления...'} 
        </p>
        <h3
          className={`${classes.orderComposition} text text_type_main-medium pb-6`}
        >
          Состав:
        </h3>
        <ul className={`${classes.scrollWrapper} pr-6 pb-10`}>
          {filteredIngredients.map((ingredient, index)=> <IngredientItem key={index} ingredient={ingredient}/>)}
         
        </ul>
        <div className={`${classes.orderFooter} pt-6`}>
          <p
            className={`${classes.orderTime} text text_type_main-default text_color_inactive`}
          >
            <FormattedDate date={new Date(order.createdAt)} />
        {` ${gmt}`}
          </p>
          <div className={classes.orderPrice}>
            <p className={`${classes.orderSum} text text_type_digits-default`}>
              {totalCost}
            </p>{" "}
            <CurrencyIcon />
          </div>
        </div>
      </div>
  )
}

export default OrderDetails

import React from 'react'
import classes from './OrderFeed.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ImageCicle from '../ImageCicle/ImageCicle'
const OrderFeed = () => {
  return (
    <div className={`${classes.orderWrapper} p-6`}>
    <div className={`${classes.orderID} text text_type_digits-default`}>#034535</div>
    <div className={`${classes.orderDate} text text_type_main-default text_color_inactive`}>Сегодня, 16:20 i-GMT+3</div>
    <div className={`${classes.orderTitle} text text_type_main-medium`}>
      Death Star Starship Main бургер
    </div>
    <div className={classes.orderImgs}>
      <ImageCicle/>
      <ImageCicle/>
      <ImageCicle/>
      
     
    </div>
    <div className={classes.orderPrice}>
      <p className={`${classes.orderSum} text text_type_digits-default`}>480</p> <CurrencyIcon />
    </div>
  </div>
  )
}

export default OrderFeed

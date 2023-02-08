import React from 'react'
import classes from './IngredientItem.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ImageCicle from '../ImageCicle/ImageCicle'
const IngredientItem = ({ingredient}) => {
 
  return (
    <li className={classes.item}>
            <ImageCicle src={ingredient?.image_mobile} />
            <p className={`${classes.itemName} text text_type_main-default`}>
              {ingredient?.name}
            </p>
            <div className={classes.orderPrice}>
              <p
                className={`${classes.orderSum} text text_type_digits-default`}
              >
                2 x {ingredient?.price}
              </p>{" "}
              <CurrencyIcon />
            </div>
          </li>
  )
}

export default IngredientItem

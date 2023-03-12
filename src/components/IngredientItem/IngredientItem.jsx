import React from 'react'
import classes from './IngredientItem.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ImageCicle from '../ImageCicle/ImageCicle'
const IngredientItem = () => {
  return (
    <li className={classes.item}>
            <ImageCicle />
            <p className={`${classes.itemName} text text_type_main-default`}>
              Флюоресцентная булка R2-D3
            </p>
            <div className={classes.orderPrice}>
              <p
                className={`${classes.orderSum} text text_type_digits-default`}
              >
                2 x 20
              </p>{" "}
              <CurrencyIcon />
            </div>
          </li>
  )
}

export default IngredientItem

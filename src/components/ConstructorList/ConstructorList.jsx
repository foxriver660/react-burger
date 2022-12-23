import classes from './ConstructorList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import { GET_ORDER, RESET_ORDER, ADD_INGREDIENT_TO_CONSTRUCTOR, DELETE_INGREDIENT_FROM_CONSTRUCTOR, CALC_INGREDIENTS_IN_CONSTRUCTOR} from '../../services/reducers/reducers'
import React from 'react'
import { Reorder } from "framer-motion";

const ConstructorList = ({ ingredient, value }) => {
const { name, price, image, } = ingredient;
const dispatch = useDispatch()

 
  const deleteIngredient = (ingredient) => {
    dispatch({
      type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
      payload: ingredient,
    });
    dispatch({
      type: CALC_INGREDIENTS_IN_CONSTRUCTOR,
    })
  }

  return (
    <Reorder.Item whileDrag={{scale: .9}} value={value} className={`${classes.ingredientItem} `}>
                <DragIcon type="primary" />
                <ConstructorElement
                  extraClass={`${classes.ingredientElement} mr-2`}
                  text={name}
        price={price}
        thumbnail={image}
                  handleClose={()=>{deleteIngredient(ingredient)}}
                />
              </Reorder.Item>
  )
}

export default ConstructorList

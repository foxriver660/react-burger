import React from 'react'
import classes from './IngredientDetails.module.css'
import Modal from '../Modal/Modal'


const IngredientDetails = ({data, open, onClose}) => {
  
  return (
    <Modal open={open} onClose={onClose}>
    <div className={`${classes.wrapper} pt-10 pr-10 pl-10 pb-15`}>
        <p className={`${classes.ingredientHeader} text text_type_main-large`}>
          Детали ингредиента
        </p>
        <img
          className={`${classes.ingredientImage} mb-4`}
          src={data.image_large}
        />
        <p className={`${classes.ingredientName} text text_type_main-medium pb-8`}>
          {data.name}
        </p>

        <div className={classes.compoundList}>
          <div className={classes.compoundItem}>
            <p className={`${classes.compoundName} text text_type_main-default`}>
              Калории,ккал
            </p>
            <p
              className={`${classes.compoundValue} text text_type_digits-default`}
            >
              {data.calories}
            </p>
          </div>
          <div className={classes.compoundItem}>
            <p className={`${classes.compoundName} text text_type_main-default`}>
              Белки, г
            </p>
            <p
              className={`${classes.compoundValue} text text_type_digits-default`}
            >
              {data.proteins}
            </p>
          </div>
          <div className={classes.compoundItem}>
            <p className={`${classes.compoundName} text text_type_main-default`}>
              Жиры, г
            </p>
            <p
              className={`${classes.compoundValue} text text_type_digits-default`}
            >
              {data.fat}
            </p>
          </div>
          <div className={classes.compoundItem}>
            <p className={`${classes.compoundName} text text_type_main-default`}>
              Углеводы, г
            </p>
            <p
              className={`${classes.compoundValue} text text_type_digits-default`}
            >
              {data.carbohydrates}
            </p>
          </div>
        </div>
      </div>
      </Modal>
  )
}

export default IngredientDetails

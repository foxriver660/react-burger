import React from 'react'
import classes from './IngredientDetails.module.css'
import Modal from '../Modal/Modal'


const IngredientDetails = () => {
  return (
    <div className={`${classes.wrapper} pt-10 pr-10 pl-10 pb-15`}>
        <p className={`${classes.ingredientHeader} text text_type_main-large`}>
          Детали ингредиента
        </p>
        <img
          className={`${classes.ingredientImage} mb-4`}
          src="https://code.s3.yandex.net/react/code/meat-04-large.png"
        />
        <p className={`${classes.ingredientName} text text_type_main-medium pb-8`}>
          Котлета из марсианской Магнолии
        </p>

        <div className={classes.compoundList}>
          <div className={classes.compoundItem}>
            <p className={`${classes.compoundName} text text_type_main-default`}>
              Калории,ккал
            </p>
            <p
              className={`${classes.compoundValue} text text_type_digits-default`}
            >
              244,4
            </p>
          </div>
          <div className={classes.compoundItem}>
            <p className={`${classes.compoundName} text text_type_main-default`}>
              Калории,ккал
            </p>
            <p
              className={`${classes.compoundValue} text text_type_digits-default`}
            >
              244,4
            </p>
          </div>
          <div className={classes.compoundItem}>
            <p className={`${classes.compoundName} text text_type_main-default`}>
              Калории,ккал
            </p>
            <p
              className={`${classes.compoundValue} text text_type_digits-default`}
            >
              244,4
            </p>
          </div>
          <div className={classes.compoundItem}>
            <p className={`${classes.compoundName} text text_type_main-default`}>
              Калории,ккал
            </p>
            <p
              className={`${classes.compoundValue} text text_type_digits-default`}
            >
              244,4
            </p>
          </div>
        </div>
      </div>
  )
}

export default IngredientDetails

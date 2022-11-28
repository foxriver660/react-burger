import React from "react";
import classes from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
const Modal = () => {
  return (
    <ModalOverlay>
    <div className={classes.container}>
      <button className={classes.closeBtn}>
        <CloseIcon type="primary" />
      </button>
      {/* OrderDetails */}
      {/* <div className={`${classes.wrapper} pt-30 pr-10 pl-10 pb-30`}>
    <p className={`${classes.orderNumber} text text_type_digits-large pb-8`}>034536</p>
    <p className={`${classes.orderNumberText} text text_type_main-medium pb-15`}>
  идентификатор заказа
</p>
<div className={`${classes.orderStatusImage} mb-15`}></div>
<p className={`${classes.orderStatusText} text text_type_main-default pb-2`}>
Ваш заказ начали готовить
</p>
<p className={`${classes.orderInstruction} text text_type_main-default`}>
Дождитесь готовности на орбитальной станции
</p>
    </div> */} 

      {/* IngredientDetails */}
      <div className={`${classes.wrapperTwo} pt-10 pr-10 pl-10 pb-15`}>
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
      {/* ___________________________________________ */}
    </div>
    </ModalOverlay>
  );
};

export default Modal;

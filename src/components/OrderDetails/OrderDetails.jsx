import React from 'react'
import classes from './OrderDetails.module.css'
import Modal from '../Modal/Modal'
import PropTypes from "prop-types";

const OrderDetails = ({open, onClose}) => {
  return (
    <Modal open={open} onClose={onClose}>
    <div className={`${classes.wrapper} pt-30 pr-10 pl-10 pb-30`}>
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
    </div> 
    </Modal>
  )
}

export default OrderDetails

OrderDetails.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
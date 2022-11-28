import React from 'react'
import classes from './ModalOverlay.module.css'
import Modal from '../Modal/Modal'

const ModalOverlay = ({active, setActive}) => {
  return (
    <div className={classes.overlay}>
      <Modal/>
    </div>
  )
}

export default ModalOverlay

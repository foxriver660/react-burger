import React from 'react'
import classes from './ModalOverlay.module.css'
import Modal from '../Modal/Modal'

const ModalOverlay = ({children}) => {
  return (
    <div className={classes.overlay}>
     {children}
    </div>
  )
}

export default ModalOverlay

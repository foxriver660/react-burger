import React from 'react'
import classes from './ModalOverlay.module.css'


const ModalOverlay = ({onClose, children}) => {
  return (
    <div onClick={onClose} className={classes.overlay}>
     {children}
    </div>
  )
}

export default ModalOverlay

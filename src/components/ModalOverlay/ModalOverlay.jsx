import React from 'react'
import classes from './ModalOverlay.module.css'


const ModalOverlay = ({open,  onClose, children}) => {
  return (
    <div onClick={onClose} className={open ? classes.overlayOpen : classes.overlay}>
     {children}
    </div>
  )
}

export default ModalOverlay

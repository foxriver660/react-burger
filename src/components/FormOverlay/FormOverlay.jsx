import React from 'react'
import classes from './FormOverlay.module.css'
const FormOverlay = ({children, type}) => {
  return (
    <div className={type === 'profile' ? classes.profile : classes.login}>
      {children}
    </div>
  )
}

export default FormOverlay

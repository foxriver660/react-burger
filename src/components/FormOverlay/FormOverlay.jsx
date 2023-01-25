import React from 'react'
import classes from './FormOverlay.module.css'
const FormOverlay = ({children}) => {
  return (
    <div className={classes.container}>
      {children}
    </div>
  )
}

export default FormOverlay

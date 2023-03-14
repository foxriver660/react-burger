import React from 'react'
import classes from './ErrorUserFetch.module.css'
 const ErrorUserFetch = () => {
  return (
    <p className={`${classes.error} text text_type_main-small text_color_inactive`}>
                  Ошибка запроса на сервер, проверьте правильность указанных данных
                </p>
  )
}
export default ErrorUserFetch
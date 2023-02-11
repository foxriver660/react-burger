import React from 'react'
import classes from './CompoundItem.module.css'
const CompoundItem = React.memo(({type, data}) => {
  return (
    <li className={classes.compoundItem}>
              <p
                className={`${classes.compoundName} text text_type_main-default`}
              >
                {type}
              </p>
              <p
                className={`${classes.compoundValue} text text_type_digits-default`}
              >
                {data}
              </p>
            </li>
  )
})

export default CompoundItem

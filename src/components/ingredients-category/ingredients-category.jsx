import React from 'react'
import IngredientCard from "../IngredientCard/IngredientCard";


const IngredientsCategory = ({filteredArr}) => {
console.log(filteredArr)
  return (
    <>
      {filteredArr.map((item) => (
            <li key={item._id}>
              <IngredientCard
                name={item.name}
                _id={item._id}
                type={item.type}
                price={item.price}
                image={item.image}
                key={item._id}
              />
            </li>
          ))}
    </>
  )
}

export default IngredientsCategory


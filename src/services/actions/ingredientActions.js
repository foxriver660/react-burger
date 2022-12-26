import { nanoid } from "nanoid";
export const GET_API_INGREDIENTS = "GET_API_INGREDIENTS";
export const ADD_INGREDIENT_TO_CONSTRUCTOR = "ADD_INGREDIENT_TO_CONSTRUCTOR";
export const ADD_BUN_TO_CONSTRUCTOR = "ADD_BUN_TO_CONSTRUCTOR";
export const CALC_INGREDIENTS_IN_CONSTRUCTOR = "CALC_INGREDIENTS_IN_CONSTRUCTOR";
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR ="DELETE_INGREDIENT_FROM_CONSTRUCTOR";
export const SORT_INSIDE_CONSTRUCTOR = "SORT_INSIDE_CONSTRUCTOR";



// ГЕНЕРАТОРЫ
export const deleteIngredient = (payload) => ({type: DELETE_INGREDIENT_FROM_CONSTRUCTOR, payload})
export const calcIngredients = () => ({type: CALC_INGREDIENTS_IN_CONSTRUCTOR})
export const sortIngredient = (payload) => ({type: SORT_INSIDE_CONSTRUCTOR, payload})
export const addBun = (payload) => ({type: ADD_BUN_TO_CONSTRUCTOR, payload})
export const addIngredient = (payload) => ({type: ADD_INGREDIENT_TO_CONSTRUCTOR, payload, nanoid: nanoid()})




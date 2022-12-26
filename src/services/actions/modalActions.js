export const OPEN_INGREDIENT_MODAL = "OPEN_MODAL";
export const CLOSE_INGREDIENT_MODAL = "OPEN_MODAL";


// ГЕНЕРАТОРЫ
export const openIngredientModal = (payload) => ({type: OPEN_INGREDIENT_MODAL, payload})
export const closeIngredientModal = () => ({type: CLOSE_INGREDIENT_MODAL})
import { BURGER_API_URL } from "./constant";

/* ПРОВЕРКА ОТВЕТА СЕРВЕРА */
const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

/* ЗАПРОС НА СЕРВЕР НА ПОЛУЧЕНИЕ ДАННЫХ ИНГРЕДИЕНТОВ */
const getIngredientsAPI = () =>
  fetch(`${BURGER_API_URL}/ingredients`).then(checkReponse);

const getOrderAPI = (ingredients) =>
  fetch(`${BURGER_API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients,
    }),
  }).then(checkReponse);

export { getIngredientsAPI, getOrderAPI };

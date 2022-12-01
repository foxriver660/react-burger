import {BURGER_API_URL} from "../utils/variables";

  const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };

  function getIngredients() {
    return fetch(`${BURGER_API_URL}/ingredients`)
     .then(checkReponse)
 }

 export {getIngredients} 
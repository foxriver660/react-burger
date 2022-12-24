import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import classes from "./App.module.css";
import { getIngredients } from "../utils/burger-api";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from "react-redux/es/exports";
import {GET_API_INGREDIENTS} from '../../services/actions/ingredientActions'

const App = () => {


const dispatch = useDispatch()
 

  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  React.useEffect(() => {
    const getRedData = async () => { 
      getIngredients()
        .then((res) => dispatch({ type: GET_API_INGREDIENTS, payload: res.data }))
        
    };
    getRedData();
  }, []); 
  
  /* зависимость без дополнительных параметров, выполнение тоолько при первом ренедере */
  React.useEffect(() => {
    const getData = async () => {
      setState({ ...state, isLoading: true });
      getIngredients()
        .then((res) => setState({ ...state, data: res.data }))
        .catch((err) => setState({ ...state, hasError: true }))
        .finally(() =>
          setState((prevState) => {
            return { ...prevState, isLoading: false };
          })
        );
    };
    getData();
  }, []);
  /* eslint-enable */

  return (
    <main className={`p-10`}>
      <AppHeader />
      <div className={`${classes.subContainer} p-4`}>
        {state.isLoading && (
          <div className={`${classes.loadingMessage} text_type_main-medium`}>
            Загрузка...
          </div>
        )}
        {state.hasError && (
          <div className={`${classes.loadingMessage} text_type_main-medium`}>
            Что-то пошло не так :(
          </div>
        )}
        {!state.isLoading && !state.hasError && !!state.data.length && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
            </DndProvider>
        )}
      </div>
    </main>
  );
};

export default App;

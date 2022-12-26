import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import classes from "./App.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { getApiIngredients} from '../../services/actions/ingredientActions'

const App = () => {


const dispatch = useDispatch()
 const {isLoading, hasError } = useSelector(state=> state.ingredientReducer.serverResponse)
 const data = useSelector(state=> state.ingredientReducer.availableIngredients)
console.log(data)

/*   const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
  }); */

  React.useEffect(() => {
   dispatch(getApiIngredients())
  }, [dispatch]); 
  
  /* зависимость без дополнительных параметров, выполнение тоолько при первом ренедере */
/*  React.useEffect(() => {
    const getData = async () => {
      setState({ ...state, isLoading: true });
      getIngredientsAPI()
        .then((res) => setState({ ...state, data: res.data }))
        .catch((err) => setState({ ...state, hasError: true }))
        .finally(() =>
          setState((prevState) => {
            return { ...prevState, isLoading: false };
          })
        );
    };
    getData();
  }, []);  */
  /* eslint-enable */

  return (
    <main className={`p-10`}>
      <AppHeader />
      <div className={`${classes.subContainer} p-4`}>
        {isLoading && (
          <div className={`${classes.loadingMessage} text_type_main-medium`}>
            Загрузка...
          </div>
        )}
         {hasError && (
          <div className={`${classes.loadingMessage} text_type_main-medium`}>
            Что-то пошло не так :(
          </div>
        )}   
        { !isLoading && !hasError &&  !!data.length && (
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

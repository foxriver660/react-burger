import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Layout from "../pages/Layout";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ForgotPassPage from "../pages/ForgotPassPage/ForgotPassPage";
import ResetPassPage from "../pages/ResetPassPage/ResetPassPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import { ProtectedRouteElement } from "../components/ProtectedRouteElement/ProtectedRouteElement";
import { OnlyUnAuthRoute } from "../components/ProtectedRouteElement/OnlyUnAuthRoute";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import { useDispatch } from "react-redux/es/exports";
import { checkUserAccess } from "../services/actions/profileActions";
import { getCookie } from "../components/utils/cookie";
import Modal from "../components/Modal/Modal";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import OrderDetails from "../components/OrderDetails/OrderDetails";
import { closeIngredientModal } from "../services/actions/modalActions";
import IngredientPage from "../pages/IngredientPage/IngredientPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import FeedPage from "../pages/FeedPage/FeedPage";
import FeedInfoPage from "../pages/SingleFeedPage/FeedInfoPage";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getApiIngredients } from "../services/actions/ingredientActions";
import { WS_CONNECTION_START } from "../services/actions/wsActions";
const App = React.memo(() => {
  const dispatch = useDispatch();
  const accessToken = getCookie("token");
  const location = useLocation();
  const successTokenUpdate = useSelector(
    (state) => state.profileReducer.successTokenUpdate
  );
  /* eslint-disable */
  React.useEffect(() => {
    dispatch(checkUserAccess(accessToken));
  }, [successTokenUpdate]);

  React.useEffect(() => {
    dispatch(getApiIngredients());
  }, []);
  
  React.useEffect(
    () => {
             dispatch({ type: WS_CONNECTION_START });
             console.log('ОТРАБОТ КОННЕКТ')
          },
    [dispatch] 
  );
/* eslint-enable */

  return (
    <>
      <Routes location={location.state?.backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="register"
            element={<OnlyUnAuthRoute element={<RegisterPage />} />}
          />
          <Route
            path="login"
            element={<OnlyUnAuthRoute element={<LoginPage />} />}
          />
          <Route path="feed" element={<FeedPage />} />
          <Route path="feed/:id" element={<FeedInfoPage />} />
          <Route
            path="forgot-password"
            element={<OnlyUnAuthRoute element={<ForgotPassPage />} />}
          />
          <Route path="reset-password" element={<ResetPassPage />} />
          <Route
            path="profile/"
            element={<ProtectedRouteElement element={<ProfilePage />} />}
          >
            <Route path="orders" element={<OrderPage />} />
          </Route>
          <Route path="ingredients/:id" element={<IngredientPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      {location.state?.backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={() => dispatch(closeIngredientModal())}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      {location.state?.backgroundLocationFeed && (
        <Routes>
          <Route
            path="/feed/:id"
            element={
              <Modal onClose={() => dispatch(closeIngredientModal())}>
                 <OrderDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
});

export default App;

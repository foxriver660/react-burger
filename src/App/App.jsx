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
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { checkUserAccess } from "../services/actions/profileActions";
import { getCookie } from "../components/utils/cookie";
import Modal from "../components/Modal/Modal";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import { closeIngredientModal } from "../services/actions/modalActions";
import IngredientPage from "../pages/IngredientPage/IngredientPage";
import OrderPage from "../pages/OrderPage/OrderPage";
const App = React.memo(() => {
  const dispatch = useDispatch();
  const accessToken = getCookie("token");
  const location = useLocation();

  React.useEffect(() => {
    dispatch(checkUserAccess(`Bearer ${accessToken}`));
  }, []);
  return (
    <>
      <Routes location={location.state?.backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPassPage />} />
          <Route path="reset-password" element={<ResetPassPage />} />
          <Route
            path="profile/*"
            element={<ProtectedRouteElement element={<ProfilePage />} />}
          >
            <Route path="orders" element={<OrderPage />} />
            </Route>
           <Route path="ingredients/:id" element={<IngredientPage />} /> 
           <Route path="*" element={<NotFoundPage />} />
        </Route>
        
      </Routes>
      {location.state && (
        <Routes>
          <Route path="ingredients/:id" element={ <Modal
            onClose={() => dispatch(closeIngredientModal())}
             >
              <IngredientDetails />
            </Modal>} />
        </Routes>
      )}
     
    </>
  );
});

export default App;

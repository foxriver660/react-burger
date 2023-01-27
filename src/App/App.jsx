import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Layout from "../pages/Layout";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ForgotPassPage from "../pages/ForgotPassPage/ForgotPassPage";
import ResetPassPage from "../pages/ResetPassPage/ResetPassPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import { ProtectedRouteElement } from "../components/ProtectedRouteElement/ProtectedRouteElement";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { checkUserAccess } from "../services/actions/profileActions";
import { getCookie } from "../components/utils/cookie";
const App = React.memo(() => {
  const dispatch = useDispatch();
  const accessToken = getCookie("token");

  
  React.useEffect(() => {
    dispatch(checkUserAccess(`Bearer ${accessToken}`));
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPassPage />} />
          <Route path="reset-password" element={<ResetPassPage />} />
          <Route
            path="profile"
            element={<ProtectedRouteElement element={<ProfilePage />} />}
          />
        </Route>
      </Routes>
    </>
  );
});

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Layout from "../pages/Layout";
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import LoginPage from "../pages/LoginPage/LoginPage";
import ForgotPassPage from "../pages/ForgotPassPage/ForgotPassPage";
import ResetPassPage from "../pages/ResetPassPage/ResetPassPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
const App = React.memo(() => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<HomePage />} /> */}
           {/* <Route index element={<RegisterPage />} />  */}
          {/* <Route index element={<LoginPage />} /> */}
          {/* <Route index element={<ForgotPassPage />} /> */}
          {/* <Route index element={<ResetPassPage />} /> */}
          <Route index element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
});

export default App;

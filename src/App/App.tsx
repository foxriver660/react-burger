import React, { FC, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { checkUserAccess } from "../services/actions/profileActions";
import { getApiIngredients } from "../services/actions/ingredientActions";
import { getSuccessTokenUpdate } from "../selectors/selectors";
import { useAppDispatch, useAppSelector } from "../services/hooks";
import {
  FeedPage,
  ForgotPassPage,
  HomePage,
  Layout,
  LoginPage,
  NotFoundPage,
  OrderPage,
  ProfilePage,
  RegisterPage,
  ResetPassPage,
} from "../pages";
import {
  IngredientDetails,
  Modal,
  OrderDetails,
  ProtectedRoute,
} from "../components";

const App: FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const successTokenUpdate = useAppSelector(getSuccessTokenUpdate);

  /* eslint-disable */
  useEffect(() => {
    dispatch(checkUserAccess());
  }, [successTokenUpdate]);
  useEffect(() => {
    dispatch(getApiIngredients());
  }, []);
  /* eslint-enable */
  const locationBackground =
    location.state?.backgroundLocation ||
    location.state?.backgroundLocationFeed ||
    location.state?.backgroundLocationHistory ||
    location;
  return (
    <>
      <Routes location={locationBackground}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="register"
            element={
              <ProtectedRoute onlyUnAuth={true} element={<RegisterPage />} />
            }
          />
          <Route
            path="login"
            element={
              <ProtectedRoute onlyUnAuth={true} element={<LoginPage />} />
            }
          />
          <Route path="feed" element={<FeedPage />} />
          <Route
            path="feed/:id"
            element={<OrderDetails page={true} source={"feed"} />}
          />
          <Route
            path="forgot-password"
            element={
              <ProtectedRoute onlyUnAuth={true} element={<ForgotPassPage />} />
            }
          />
          <Route path="reset-password" element={<ResetPassPage />} />
          <Route
            path="profile/"
            element={<ProtectedRoute element={<ProfilePage />} />}
          >
            <Route path="orders" element={<OrderPage />} />
          </Route>
          <Route
            path="profile/orders/:id"
            element={
              <ProtectedRoute
                element={<OrderDetails page={true} source={"history"} />}
              />
            }
          />
          <Route path="ingredients/:id" element={<IngredientDetails />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      {location.state?.backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal type="modalInRoute">
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
              <Modal type="modalInRoute">
                <OrderDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      {location.state?.backgroundLocationHistory && (
        <Routes>
          <Route
            path="/profile/orders/:id"
            element={
              <Modal type="modalInRoute">
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

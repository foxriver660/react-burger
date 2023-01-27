import { useLocation, Navigate, useNavigate } from "react-router-dom";
import React from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { getUser } from "../../services/actions/profileActions";
import { getCookie } from "../utils/cookie";
import { getUserAPI } from "../utils/burger-api";

export const ProtectedRouteElement = ({ element }) => {
  const [isUserLoaded, setUserLoaded] = React.useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.profileReducer.user);
  const accessToken = getCookie('token');
 const init = async () => {
    await dispatch(getUser(`Bearer ${accessToken}`));
    setUserLoaded(true);
    navigate(element, {replace: true})
  };

  React.useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }
  return user.email ? element : <Navigate to="/login" replace />;
};

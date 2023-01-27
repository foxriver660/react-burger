import { useLocation, Navigate, useNavigate } from "react-router-dom";
import React from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { getUser } from "../../services/actions/profileActions";
import { getCookie } from "../utils/cookie";
import { getUserAPI } from "../utils/burger-api";

export const ProtectedRouteElement = ({ element }) => {
  const location = useLocation();
   const authUser = useSelector((state) => state.profileReducer.authUser);
  

if(!authUser) {
  
  return <Navigate to="/login" state={{from: location}} />
}
return element


};

import { useLocation, Navigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux/es/exports";


export const ProtectedRouteElement = ({ element }) => {
  const location = useLocation();
  const authUser = useSelector((state) => state.profileReducer.authUser);

  if (!authUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return element;
};

import { useLocation, Navigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux/es/exports";
import PropTypes from "prop-types";

const OnlyUnAuthRoute = ({element}) => {
  const location = useLocation();
  const authUser = useSelector((state) => state.profileReducer.authUser);
  console.log(location)
  const fromPage = location.state?.from?.pathname || "/";
  if (authUser) {
    return <Navigate to={fromPage} replace state={{ from: location }} />;
  }
  return element;
}

export {OnlyUnAuthRoute}

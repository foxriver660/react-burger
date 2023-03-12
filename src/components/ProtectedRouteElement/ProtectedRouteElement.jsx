import { useLocation, Navigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux/es/exports";
import PropTypes from "prop-types";
import { getAuthUser } from "../../selectors/selectors";
export const ProtectedRouteElement = ({ element }) => {
  const location = useLocation();
  const authUser = useSelector(getAuthUser);

  if (!authUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return element;
};
ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};

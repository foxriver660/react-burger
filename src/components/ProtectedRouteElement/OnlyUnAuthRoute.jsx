import { useLocation, Navigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux/es/exports";
import PropTypes from "prop-types";
import { getAuthUser } from "../../selectors/selectors";
const OnlyUnAuthRoute = ({ element }) => {
  const location = useLocation();
  const authUser = useSelector(getAuthUser);

  const fromPage = location.state?.from?.pathname || "/";
  if (authUser) {
    return <Navigate to={fromPage} replace state={{ from: location }} />;
  }
  return element;
};
OnlyUnAuthRoute.propTypes = {
  element: PropTypes.element.isRequired,
};
export { OnlyUnAuthRoute };

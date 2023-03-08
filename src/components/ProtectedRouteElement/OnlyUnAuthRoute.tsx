import { useLocation, Navigate, RouteProps } from "react-router-dom";
import React, { FC, ReactNode } from "react";
import { useSelector } from "react-redux/es/exports";
import { getAuthUser } from "../../selectors/selectors";

export const OnlyUnAuthRoute: FC<RouteProps> = ({ element }) => {
  const location = useLocation();
  const authUser = useSelector(getAuthUser);

  const fromPage = location.state?.from?.pathname || "/";
  if (authUser) {
    return <Navigate to={fromPage} replace state={{ from: location }} />;
  }
  return <>{element}</>;
};


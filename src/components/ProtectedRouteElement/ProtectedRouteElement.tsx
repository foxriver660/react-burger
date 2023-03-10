import { useLocation, Navigate, RouteProps } from "react-router-dom";
import { FC } from "react";
import { useSelector } from "react-redux/es/exports";
import { getAuthUser } from "../../selectors/selectors";


export const ProtectedRouteElement: FC<RouteProps> = ({ element }) => {
  const location = useLocation();
  const authUser = useSelector(getAuthUser);

  if (!authUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <>{element}</>;
};


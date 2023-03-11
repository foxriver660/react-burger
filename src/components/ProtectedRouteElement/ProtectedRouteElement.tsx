import { useLocation, Navigate, RouteProps } from "react-router-dom";
import { FC } from "react";
import { getAuthUser } from "../../selectors/selectors";
import { useAppSelector } from "../../services/hooks";


const ProtectedRouteElement: FC<RouteProps> = ({ element }) => {
  const location = useLocation();
  const authUser = useAppSelector(getAuthUser);

  if (!authUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <>{element}</>;
};

export default ProtectedRouteElement;
// TODO: this
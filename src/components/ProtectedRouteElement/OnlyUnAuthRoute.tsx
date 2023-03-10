import { useLocation, Navigate, RouteProps } from "react-router-dom";
import { FC } from "react";
import { getAuthUser } from "../../selectors/selectors";
import { useAppSelector } from "../../services/hooks";

const OnlyUnAuthRoute: FC<RouteProps> = ({ element }) => {
  const location = useLocation();
  const authUser = useAppSelector(getAuthUser);

  const fromPage = location.state?.from?.pathname || "/";
  if (authUser) {
    return <Navigate to={fromPage} replace state={{ from: location }} />;
  }
  return <>{element}</>;
};

export default OnlyUnAuthRoute
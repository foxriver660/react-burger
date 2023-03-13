import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getIsAuth, getIsAuthCheck } from "../../selectors/selectors";
import { useAppSelector } from "../../services/hooks";
import { TProtectedRoute } from "../../services/types/data";
import { PATH } from "../../utils/constant";
import { Loader } from "../index";

const ProtectedRoute: FC<TProtectedRoute> = ({
  onlyUnAuth = false,
  element,
}) => {
  const location = useLocation();
  const isAuth = useAppSelector(getIsAuth);
  const isAuthCheck = useAppSelector(getIsAuthCheck);

  if (!isAuthCheck) {
    return <Loader classname="--loader-router" />;
  }

  if (onlyUnAuth && isAuth) {
    const fromPage = location.state?.from?.pathname || PATH.HOME;
    return <Navigate to={fromPage} replace state={{ from: location }} />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to={PATH.LOGIN} replace state={{ from: location }} />;
  }

  return <>{element}</>;
};
export default ProtectedRoute;

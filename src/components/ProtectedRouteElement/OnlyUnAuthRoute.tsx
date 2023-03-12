import { useLocation, Navigate, RouteProps } from "react-router-dom";
import { FC } from "react";
import { PATH } from "../../utils/constant";
import { useAppSelector } from "../../services/hooks";
import { getAuthUser } from "../../selectors/selectors";

const OnlyUnAuthRoute: FC<RouteProps> = ({ element }) => {
  const location = useLocation();
  const authUser = useAppSelector(getAuthUser);
  const fromPage = location.state?.from?.pathname || PATH.HOME;

  return (
    <>
      {authUser ? (
        <Navigate to={fromPage} replace state={{ from: location }} />
      ) : (
        element
      )}
    </>
  );
};

export default OnlyUnAuthRoute;


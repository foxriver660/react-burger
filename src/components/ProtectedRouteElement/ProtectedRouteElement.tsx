import { useLocation, Navigate, RouteProps } from "react-router-dom";
import { FC } from "react";
import { getAuthUser } from "../../selectors/selectors";
import { useAppSelector } from "../../services/hooks";
import { PATH } from "../../utils/constant";


const ProtectedRouteElement: FC<RouteProps> = ({ element}) => {
  const location = useLocation();
  const authUser = useAppSelector(getAuthUser);
  
  return (
    <>
      {!authUser ? (
        <Navigate to={PATH.LOGIN} replace state={{ from: location }} />
      ) : (
        element
      )}
    </>
  );
};

export default ProtectedRouteElement;


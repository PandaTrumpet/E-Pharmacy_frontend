import { useSelector } from "react-redux";
import { isLoggedSelector } from "../redux/auth/selector";
import { Navigate } from "react-router-dom";
interface PrivateRouteProps {
  component: React.ReactElement;
  redirectTo: string;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component,
  redirectTo,
}) => {
  const isLogged = useSelector(isLoggedSelector);
  return isLogged ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;

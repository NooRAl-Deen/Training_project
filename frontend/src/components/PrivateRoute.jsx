import { Navigate, Outlet } from "react-router-dom";
import UnAuthorized from "@/pages/Unauthorized";
import useAuth from "@/hooks/useAuth";

const PrivateRoute = ({ children, allowedRoutes }) => {
  const { user } = useAuth();
  const hasAccess = user?.roles?.some((role) => allowedRoutes.includes(role));

  if (!user || Object.keys(user).length === 0) {
    return <Navigate to="/login" replace={true} />;
  }

  if (!hasAccess) {
    return <UnAuthorized />;
  }



  return <Outlet/>;
};

export default PrivateRoute;

import { Route } from "react-router-dom";
import { lazy } from "react";
const Login = lazy(() => import("@/pages/auth/pages/Login"));
const Register = lazy(() => import("@/pages/auth/pages/Register"));

const AuthRoutes = () => {
  return (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </>
  );
};

export default AuthRoutes;

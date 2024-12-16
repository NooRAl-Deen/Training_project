import { Route } from "react-router-dom";
import { lazy } from "react";
import PrivateRoute from "@/components/PrivateRoute";

const Profile = lazy(() => import("@/features/profile/pages/Profile"));

const ProfileRoutes = () => {
  return (
    <>
      <Route element={<PrivateRoute allowedRoutes={["admin", "user"]} />}>
        <Route index element={<Profile />} />
      </Route>
    </>
  );
};

export default ProfileRoutes;

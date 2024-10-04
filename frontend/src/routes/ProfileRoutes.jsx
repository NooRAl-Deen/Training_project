import { Route } from "react-router-dom";
import Profile from "../pages/Profile";
import PrivateRoute from "../components/PrivateRoute";

const ProfileRoutes = () => {
  return (
    <>
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </>
  );
};

export default ProfileRoutes;

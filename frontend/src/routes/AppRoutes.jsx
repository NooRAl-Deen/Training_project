import MainRoutes from "./MainRoutes";
import AuthRoutes from "./AuthRoutes";
import ProfileRoutes from "./ProfileRoutes";
import PostRoutes from "./PostRoutes";
import NotFoundRoutes from "./NotFoundRoutes";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import AppLayout from "../components/AppLayout";

const mainRoutes = MainRoutes();
const authRoutes = AuthRoutes();
const profileRoutes = ProfileRoutes();
const postRoutes = PostRoutes();
const notFoundRoutes = NotFoundRoutes();

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {mainRoutes}
          {authRoutes}
          {profileRoutes}
          {postRoutes}
          {notFoundRoutes}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;

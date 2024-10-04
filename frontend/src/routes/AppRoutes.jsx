import MainRoutes from "./MainRoutes";
import AuthRoutes from "./AuthRoutes";
import ProfileRoutes from "./ProfileRoutes";
import PostRoutes from "./PostRoutes";
import NotFoundRoutes from "./NotFoundRoutes";
import { Routes, BrowserRouter as Router } from "react-router-dom";

const mainRoutes = MainRoutes();
const authRoutes = AuthRoutes();
const profileRoutes = ProfileRoutes();
const postRoutes = PostRoutes();
const notFoundRoutes = NotFoundRoutes();

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {mainRoutes}
        {authRoutes}
        {profileRoutes}
        {postRoutes}
        {notFoundRoutes}
      </Routes>
    </Router>
  );
};

export default AppRoutes;

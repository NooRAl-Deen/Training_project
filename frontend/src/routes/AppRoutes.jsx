import { lazy, Suspense } from "react";
import MainRoutes from "./MainRoutes";
import AuthRoutes from "./AuthRoutes";
import ProfileRoutes from "./ProfileRoutes";
import PostRoutes from "./PostRoutes";

import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import AuthLayout from "@/components/layouts/auth/AuthLayout";


const AppLayout = lazy(() => import("@/components/layouts/app/AppLayout"));

const ProfileLayout = lazy(() =>
  import("@/components/layouts/profile/ProfileLayout")
);
const NotFound = lazy(() => import("@/pages/NotFound"));
const Spinner = lazy(() => import("@/components/ui/Spinner"));

const mainRoutes = MainRoutes();
const authRoutes = AuthRoutes();
const profileRoutes = ProfileRoutes();
const postRoutes = PostRoutes();

const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <Routes>
          {/* <Route path="/" >
            {mainRoutes}
          </Route> */}

          <Route path="/" element={<AuthLayout />}>
            {authRoutes}
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/profile" element={<ProfileLayout />}>
            {profileRoutes}
            {postRoutes}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
};

export default AppRoutes;

import { Route } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("@/pages/main/Home"));
const About = lazy(() => import("@/pages/main/About"));

const MainRoutes = () => {
  return (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </>
  );
};

export default MainRoutes;

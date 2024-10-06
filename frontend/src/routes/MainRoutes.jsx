import { Route, Routes } from "react-router-dom";
import Home from "../pages/main/Home";
import About from "../pages/main/About";

const MainRoutes = () => {
  return (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </>
  );
};

export default MainRoutes;

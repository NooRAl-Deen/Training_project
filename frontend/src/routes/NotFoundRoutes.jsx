import { Route } from "react-router-dom";
import NotFound from "../pages/NotFound";

const NotFoundRoutes = () => {
  return (
    <>
      <Route path="*" element={<NotFound />} />
    </>
  );
};

export default NotFoundRoutes;

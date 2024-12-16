import { Route } from "react-router-dom";
import { lazy } from "react";

const NotFound = lazy(() => import("@/features/NotFound"));

const NotFoundRoutes = () => {
  return (
    <>
      <Route path="*" element={<NotFound />} />
    </>
  );
};

export default NotFoundRoutes;

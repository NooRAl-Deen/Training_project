import { Route } from "react-router-dom";
import PrivateRoute from "@/components/PrivateRoute";
import { lazy } from "react";
import { PostsProvider } from "@/pages/posts/contexts/PostsContext";

const Posts = lazy(() => import("@/pages/posts/pages/Posts"));

const PostRoutes = () => {
  return (
    <>
      <Route element={<PrivateRoute allowedRoutes={["admin", "user"]} />}>
        <Route
          path="/profile/posts"
          element={
            <PostsProvider>
              <Posts />
            </PostsProvider>
          }
        />
      </Route>
    </>
  );
};

export default PostRoutes;

import { Route } from "react-router-dom";
import PrivateRoute from "@/components/PrivateRoute";
import { lazy } from "react";
import { PostsProvider } from "@/features/posts/contexts/PostsContext";
import Timeline from "../features/timeline/pages/Timeline";
import PostDetails from "../features/posts/pages/PostDetails";

const Posts = lazy(() => import("@/features/posts/pages/Posts"));

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
        <Route
          path="/profile/posts/:postId"
          element={
            <PostsProvider>
              <PostDetails />
            </PostsProvider>
          }
        />
        <Route
          path="/profile/news"
          element={
            <PostsProvider>
              <Timeline />
            </PostsProvider>
          }
        />
      </Route>
    </>
  );
};

export default PostRoutes;

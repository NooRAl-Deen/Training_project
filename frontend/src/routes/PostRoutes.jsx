import { Route } from "react-router-dom";
import CreatePost from "../pages/posts/CreatePost";
import PostList from "../pages/posts/PostList";
import PrivateRoute from "../components/PrivateRoute";
import UpdatePost from "../pages/posts/UpdatePost";

const PostRoutes = () => {
  return (
    <>
      <Route
        path="/posts"
        element={
          <PrivateRoute>
            <PostList />
          </PrivateRoute>
        }
      />
      <Route
        path="/post-create"
        element={
          <PrivateRoute>
            <CreatePost />
          </PrivateRoute>
        }
      />
      <Route
        path="/post-update/:id"
        element={
          <PrivateRoute>
            <UpdatePost />
          </PrivateRoute>
        }
      />
    </>
  );
};

export default PostRoutes;

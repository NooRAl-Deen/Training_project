import { useEffect, useState } from "react";
import PostCard from "../../components/posts/PostCard";
import { Link } from "react-router-dom";
import useFetchData from "../../hooks/queries/useFetchData";
import PostListSkeletonLoader from "../../skeleton-loaders/posts/PostListSkeletonLoader";
import useDeleteMutation from "../../hooks/queries/useDeleteMutation";
import useError from "../../hooks/useError";
import { useTranslation } from 'react-i18next';

const PostList = () => {
  const { t } = useTranslation('posts\\list');
  const [posts, setPosts] = useState([]);
  const { errorMessage, triggerError } = useError();

  const { data, isLoading } = useFetchData("/posts/");
  const { mutate } = useDeleteMutation("/posts");

  useEffect(() => {
    if (data) {
      setPosts(data.posts);
    }
  }, [data]);

  const deletePost = (id) => {
    mutate(id, {
      onSuccess: () => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      },
      onError: (error) => {
        const message = handleAxiosError(error);
        triggerError(message);
      },
    });
  };

  if (isLoading) {
    return <PostListSkeletonLoader />;
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-center">{t("posts")}</h2>
          <Link to="/post-create" className="btn btn-primary">
            {t("create_post_button")}
          </Link>
        </div>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="row">
          {posts.length === 0 ? (
            <div className="col-12 text-center">
              <p className="text-muted">{t("no_posts_available")}</p>
            </div>
          ) : (
            posts.map((post, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <PostCard post={post} deletePost={deletePost} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostList;

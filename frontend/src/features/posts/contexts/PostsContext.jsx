import { createContext, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useDeletePost, useUserPosts } from "../hooks/hooks";

const PostsContext = createContext();

const PostsProvider = ({ children }) => {
  const { data: posts, isLoading: waitUsersPosts } = useUserPosts();
  const { mutate: deletePost, isPending: waitDeletePost } = useDeletePost(() => {

  });
  const [showEditCard, setShowEditCard] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const { user } = useAuth();

  const toggleEdit = (post) => {
    if (currentPost?.id !== post.id) {
      setCurrentPost(post);
      setShowEditCard(true);
    } else {
      setShowEditCard((prev) => !prev);
    }
  };

  const closeEdit = () => {
    setShowEditCard(false);
  };

  const openEditCard = () => {
    setShowEditCard(true);
  };

  useEffect(() => {
    console.log(currentPost);
  }, [currentPost]);

  const deleteUserPost = (post) => {
    console.log(`context delete post ${post.id}`);
    deletePost(post.id);
  };


  let dataToExport = {
    user,
    posts,
    waitUsersPosts,
    deleteUserPost,
    waitDeletePost,
    setCurrentPost,
    currentPost,
    setShowEditCard,
    showEditCard,
    openEditCard,
    toggleEdit,
    closeEdit,
  };

  return (
    <PostsContext.Provider value={dataToExport}>
      {children}
    </PostsContext.Provider>
  );
};

export { PostsContext, PostsProvider };

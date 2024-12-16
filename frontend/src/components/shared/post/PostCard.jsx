import styles from "@styles/post/post-card.module.scss";
import { Box, Container } from "@posts/utils/sharedImports";
import usePosts from "@posts/hooks/usePosts";
import EditPostCard from "../../../features/posts/components/EditPostCard";
import PostHeader from "./post-card/PostHeader";
import PostContent from "./post-card/PostContent";
import PostFooter from "./post-card/PostFooter";
import Card from "@mui/material/Card";
import { useState } from "react";
import PostModal from "./PostModal";

const PostCard = ({ post, innerRef, context }) => {
  const { showEditCard, currentPost } = usePosts();

  return (
    <>
      {showEditCard && currentPost.id === post.id ? (
        <EditPostCard post={post} />
      ) : (
        <Card ref={innerRef} className={styles.card}>
          <PostHeader post={post} context={context} />
          <PostContent post={post} />
          <PostFooter post={post} context={context} />
        </Card>
      )}
    </>
  );
};

export default PostCard;

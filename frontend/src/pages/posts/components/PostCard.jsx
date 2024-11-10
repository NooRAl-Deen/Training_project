import styles from "@posts/styles/post-card.module.scss";
import { Box, Container } from "@posts/utils/sharedImports";
import usePosts from "@posts/hooks/usePosts";
import EditPostCard from "./EditPostCard";
import PostHeader from "./post-card/PostHeader";
import PostContent from "./post-card/PostContent";
import PostFooter from "./post-card/PostFooter";
const PostCard = ({ post, innerRef }) => {
  const { user, showEditCard, currentPost } = usePosts();

  return (
    <>
      {showEditCard && currentPost.id === post.id ? (
        <>
          <EditPostCard post={post} user={user} />
        </>
      ) : (
        <Container>
          <Box ref={innerRef} className={styles.postsContainer}>
            <PostHeader post={post} />
            <PostContent post={post} />
            <PostFooter />
          </Box>
        </Container>
      )}
    </>
  );
};

export default PostCard;

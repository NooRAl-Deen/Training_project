import styles from "@styles/post/post-card/post-footer.module.scss";
import { Box } from "@posts/utils/sharedImports";
import { Typography } from "@mui/material";
import { useState } from "react";
import PostModal from "../PostModal";
import AddComment from "../../comment/components/AddComment";
import SocialShareModal from "../../social-share/SocialShareModal";
import ShowComments from "../../comment/components/ShowComments";
import PostActions from "./PostActions";

const PostFooter = ({ post, context }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <PostActions post={post} context={context} />

      <Box className={styles.commentsSectionContainer}>
        <Typography
          className={styles.viewAllComments}
          onClick={handleOpenModal}
        >
          {post?.total_comment_count > 3
            ? `view all (${post?.total_comment_count}) comments`
            : ""}
        </Typography>
        <ShowComments comments={post?.comments} />
      </Box>
      <PostModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        post={post}
        context={context}
      />
      <AddComment post={post} />
    </>
  );
};

export default PostFooter;

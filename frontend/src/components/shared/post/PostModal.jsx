import {
  Box,
  Avatar,
  Typography,
  IconButton,
  formatDate,
  useState,
  CloseIcon,
} from "@posts/utils/sharedImports";
import { useInView } from "react-intersection-observer";
import { Modal } from "@mui/material";
import styles from "@styles/post/post-modal.module.scss";
import PostCard from "./PostCard";
import { useComments } from "../comment/hooks/comment";
import PostHeader from "./post-card/PostHeader";
import PostContent from "./post-card/PostContent";
import { useEffect } from "react";
import AddComment from "../comment/components/AddComment";
import ShowComments from "../comment/components/ShowComments";
import PostActions from "./post-card/PostActions";
const PostModal = ({ isModalOpen, handleCloseModal, post, context }) => {
  const { data, isFetched, hasNextPage, fetchNextPage } = useComments(post?.id, {
    enabled: isModalOpen
  });
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, inView]);
  if(isFetched) {
    // console.log(data)
  }
  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className={styles.modalBox}>
        <Box className={styles.modalBoxHeader}>
          <Typography variant="h6">Post Details</Typography>
          <IconButton onClick={handleCloseModal} className={styles.closeIcon}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className={styles.postContent}>
          <PostHeader post={post} />
          <PostContent post={post} />
          <PostActions post={post} context={context} />
        </Box>
        {data?.pages?.length > 0
          ? data.pages.map((page, pageIndex) => (
              <ShowComments key={pageIndex} comments={page?.comments}  ref={pageIndex === data.pages.length - 1 ? ref : null}/>
            ))
          : ""}
        <Box className={styles.addCommentSection}>
          <AddComment post={post} />
        </Box>
      </Box>
    </Modal>
  );
};

export default PostModal;

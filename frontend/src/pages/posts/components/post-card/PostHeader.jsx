import React, { useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  formatDate,
  useState,
} from "@posts/utils/sharedImports";
import usePosts from "@posts/hooks/usePosts";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "@posts/styles/post-card/post-header.module.scss";
import MoreActions from "./MoreActions";

const PostHeader = ({ post }) => {
  const { user } = usePosts();
  const [formattedDate, setFormattedDate] = useState(formatDate(post?.createdAt));
  const [showActionsMenu, setShowActionsMenu] = useState(null);
  const openActionsMenu = (event) => setShowActionsMenu(event?.currentTarget);
  const closeActionsMenu = () => setShowActionsMenu(null);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFormattedDate(formatDate(post?.createdAt));
    }, 60000); 
    return () => clearInterval(intervalId);
  }, [post?.createdAt]);
  return (
    <Box className={styles.postHeader}>
      <Avatar
        className={styles.avatar}
        src={`${import.meta.env.VITE_SERVER_URL}/${user?.profilePic}`}
        alt={user?.username}
      />
      <Box className={styles.postDetails}>
        <Box className={styles.publishDetails}>
          <Typography className={styles.publisherName}>
            {user?.username}
          </Typography>
          <Typography className={styles.publishDate}>
            {formattedDate}
          </Typography>
        </Box>
      </Box>
      <Box className={styles.postActions}>
        <IconButton onClick={(e) => openActionsMenu(e)}>
          <MoreHorizIcon />
        </IconButton>
        <MoreActions
          post={post}
          showActionsMenu={showActionsMenu}
          closeActionsMenu={closeActionsMenu}
        />
      </Box>
    </Box>
  );
};

export default PostHeader;

import React, { useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  formatDate,
  useState,
  CloseIcon,
} from "@posts/utils/sharedImports";
import usePosts from "@posts/hooks/usePosts";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "@styles/post/post-card/post-header.module.scss";
import MoreActions from "./MoreActions";
import CardHeader from "@mui/material/CardHeader";
import { Divider } from "@mui/material";
import PostModal from "../PostModal";

const PostHeader = ({ post, context }) => {
  const { user } = usePosts();
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const [formattedDate, setFormattedDate] = useState(
    formatDate(post?.createdAt)
  );
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
    <>
      <CardHeader
        className={styles.header}
        avatar={
          <Avatar
            src={`${import.meta.env.VITE_SERVER_URL}/${post?.user?.profilePic}`}
            aria-label="user"
          />
        }
        action={
          post?.user?.id === user.id ? (
            <IconButton onClick={openActionsMenu} aria-label="settings">
              <MoreHorizIcon />
            </IconButton>
          ) : null
        }
        title={post?.user?.username}
        subheader={
          <Typography onClick={handleOpenModal} className={styles.subheader}>
            {formattedDate}
          </Typography>
        }
      />
      <Divider className={styles.divider} />
      <PostModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        post={post}
        context={context}
      />
      <MoreActions
        post={post}
        showActionsMenu={showActionsMenu}
        closeActionsMenu={closeActionsMenu}
      />
    </>
  );
};

export default PostHeader;

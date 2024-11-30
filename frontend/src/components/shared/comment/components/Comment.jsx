import { Box, Avatar, Typography } from "@posts/utils/sharedImports";
import React, { useState } from "react";
import styles from "../styles/comment.module.scss";
import { IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useAuth from "@/hooks/useAuth";
import CommentActions from "./CommentActions";
import EditComment from "./EditComment";

const Comment = React.forwardRef(({ comment }, ref) => {
  const [showActionsMenu, setShowActionsMenu] = useState(null);
  const [currentCommentId, setCurrentCommentId] = useState(0);
  const [editComment, setEditComment] = useState(false);
  const handeleToggleEdit = () => {
    setEditComment(!editComment)
  }
  const { user } = useAuth();

  const openActionsMenu = (event, id) => {
    setShowActionsMenu(event?.currentTarget);
    setCurrentCommentId(id);
  };

  const closeActionsMenu = () => setShowActionsMenu(null);
  return editComment ? (
    <EditComment comment={comment} setEditComment={handeleToggleEdit} />
  ) : (
    <Box className={styles.commentsSection} ref={ref}>
      <Box className={styles.userDetails}>
        <Avatar
          src={`${import.meta.env.VITE_SERVER_URL}/${
            comment?.user?.profilePic
          }`}
          className={styles.userImg}
          alt={comment?.user?.username || "User"}
        />
      </Box>
      <Box className={styles.commentContentContainer}>
        <Box className={styles.commentContent}>
          <Typography className={styles.username}>
            {comment?.user?.username || "Anonymous"}
          </Typography>
          <Typography className={styles.text}>
            {comment?.text || "No comment"}
          </Typography>
        </Box>
        {comment?.user_id === user?.id && (
          <Box className={styles.commentMenuActions}>
            <IconButton onClick={(e) => openActionsMenu(e, comment?.id)}>
              <MoreHorizIcon />
            </IconButton>
            <CommentActions
              showActionsMenu={showActionsMenu}
              closeActionsMenu={closeActionsMenu}
              comment={comment}
              currentCommentId={currentCommentId}
              openEditComment={handeleToggleEdit}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
});

export default Comment;

import { Box, Avatar, Typography } from "@posts/utils/sharedImports";
import React, { useState } from "react";
import styles from "../styles/show-comments.module.scss";
import { IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useAuth from "@/hooks/useAuth";
import CommentActions from "./CommentActions";
import Comment from "./Comment";

const ShowComments = React.forwardRef(({ comments }, ref) => {
  return (
    <>
      {comments?.map((comment) => (
        <React.Fragment key={comment?.id}>
          <Comment comment={comment} ref={ref} />
          {comment?.replies?.length > 0 && <div className={styles.separator} />}
          {comment?.replies?.map((reply) => (
            <Box
              key={`${comment?.id}-reply-${reply?.id}`}
              className={styles.replyContainer}
            >
              <Comment
                key={`${comment?.id}-reply-${reply?.id}`}
                comment={reply}
                ref={ref}
              />
            </Box>
          ))}
        </React.Fragment>
      ))}
    </>
  );
});

export default ShowComments;

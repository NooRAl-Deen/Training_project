import { Menu, MenuItem } from "@posts/utils/sharedImports";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDeleteComment } from "../hooks/comment";
import { useState } from "react";
import EditComment from "./EditComment";

const CommentActions = ({ showActionsMenu, closeActionsMenu, comment, currentCommentId, openEditComment }) => {
  const { mutate } = useDeleteComment(comment?.post_id);
  



  return (
    <Menu
      anchorEl={showActionsMenu}
      open={Boolean(showActionsMenu)}
      onClose={closeActionsMenu}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MenuItem
        onClick={() => {
          openEditComment()
          closeActionsMenu();
        }}
      >
        <ModeEditOutlineOutlinedIcon />
        edit
      </MenuItem>
      <MenuItem
        onClick={() => {
          const postId = comment.post_id;
          const commentId = currentCommentId
          console.log(postId)
        //   console.log(commentId)
          console.log(currentCommentId)
          mutate({ postId, commentId });
          closeActionsMenu();
        }}
      >
        <DeleteOutlineOutlinedIcon />
        delete
      </MenuItem>
      {/* <ConfirmDeleteModal post={post} open={open} onClose={closeModal} /> */}
    </Menu>
  );
};

export default CommentActions;
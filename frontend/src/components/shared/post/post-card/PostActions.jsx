import styles from "@styles/post/post-card/post-actions.module.scss";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import { Divider } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import MessageIcon from "@mui/icons-material/Message";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useState } from "react";
import SocialShareModal from "../../social-share/SocialShareModal";
import { useLike } from "../../like/hooks/like";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

const PostActions = ({ post, context }) => {
  const [open, setOpen] = useState(false);
  const { mutate } = useLike(context);

  const handleLikeClick = () => {
    mutate(post);
  };
  return (
    <>
      <Divider className={styles.divider} />
      <CardActions className={styles.actions}>
        <IconButton className={styles.button} onClick={handleLikeClick}>
          {post?.isLiked ? (
            <ThumbUpAltIcon color="primary" />
          ) : (
            <ThumbUpOffAltIcon />
          )}
          {post?.total_likes_count} Likes
        </IconButton>
        <IconButton className={styles.button}>
          <MessageIcon />
          {post?.total_comment_count} comments
        </IconButton>
        <IconButton onClick={() => setOpen(true)} className={styles.button}>
          <ShareIcon />3 Shares
        </IconButton>
        <SocialShareModal open={open} setOpen={setOpen} postId={post.id} />
        <IconButton className={styles.button}>
          <BookmarkBorderIcon className={styles.save} />
          Save
        </IconButton>
      </CardActions>
      <Divider className={styles.divider} />
    </>
  );
};

export default PostActions;

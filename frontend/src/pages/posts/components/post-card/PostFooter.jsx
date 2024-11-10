import styles from "@posts/styles/post-card/post-footer.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Box } from "@posts/utils/sharedImports";

const PostFooter = () => {
  return (
    <Box className={styles.postReactionsContainer}>
      <Box className={styles.reactions}>
        <FavoriteBorderIcon className={styles.icon} />
        <ChatBubbleOutlineIcon className={styles.icon} />
        <ShareIcon className={styles.icon} />
      </Box>
      <Box className={styles.bookmark}>
        <BookmarkBorderIcon className={styles.icon} />
      </Box>
    </Box>
  );
};

export default PostFooter;

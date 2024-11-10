import { Container, Box, Skeleton, IconButton } from "@mui/material";
import styles from "@posts/styles/add-post.module.scss";
import stylesCard from "@posts/styles/post-card.module.scss";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const PostsSkeleton = () => {
  return (
    <>
      <Container>
        <Box className={styles.addPostContainer}>
          <Box className={styles.addPostHeader}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box className={styles.userDetails}>
              <Skeleton variant="text" width={100} height={20} />
              <Skeleton variant="text" width={50} height={15} />
            </Box>
          </Box>
          <Skeleton variant="rectangular" width="100%" height={100} />
          <Box className={styles.postActions}>
            <Box className={styles.leftActions}>
              <Skeleton
                className={styles.leftActions}
                variant="circular"
                width={40}
                height={40}
              />
              <Skeleton
                className={styles.leftActions}
                variant="circular"
                width={40}
                height={40}
              />
            </Box>
            <Box className={styles.rightActions}>
              <Skeleton variant="rectangular" width={80} height={40} />
            </Box>
          </Box>
        </Box>
      </Container>

      <Container>
        <Box className={stylesCard.postsContainer}>
          <Box className={stylesCard.postHeader}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box className={stylesCard.postDetails}>
              <Box className={stylesCard.publishDetails}>
                <Skeleton variant="text" width={100} height={20} />
                <Skeleton variant="text" width={50} height={15} />
              </Box>
              <Box className={stylesCard.postActions}>
                <IconButton disabled>
                  <MoreHorizIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box className={stylesCard.postContent}>
            <Skeleton variant="text" width="100%" height={80} />
            <Skeleton variant="rectangular" width="100%" height={300} />
          </Box>
          <Box className={stylesCard.postReactionsContainer}>
            <Box sx={{ display: "flex" }}>
              <Skeleton
                className={stylesCard.icon}
                variant="circular"
                width={40}
                height={40}
              />
              <Skeleton
                className={stylesCard.icon}
                variant="circular"
                width={40}
                height={40}
              />
              <Skeleton
                className={stylesCard.icon}
                variant="circular"
                width={40}
                height={40}
              />
            </Box>
            <Box className={stylesCard.bookmark}>
              <Skeleton
                className={stylesCard.icon}
                variant="circular"
                width={40}
                height={40}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default PostsSkeleton;

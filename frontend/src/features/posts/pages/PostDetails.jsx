import PostCard from "@/components/shared/post/PostCard";
import { Box } from "@mui/material";
import styles from "../styles/posts.module.scss";
import { useUserPosts } from "@posts/hooks/hooks";
import PostsSkeleton from "@posts/skeletons/PostsSkeleton";
import useAuth from "@/hooks/useAuth";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import FriendsList from "@/components/shared/friends-list/FriendsList";
import ProfileActivity from "@/components/shared/profile-activity/ProfileActivity";
import PostsPageHeader from "../components/PostsPageHeader";
import Stories from "../../stories/pages/Stories";
import FriendSuggestions from "@/components/shared/friends-suggestions/FriendSuggestions";
import { usePost } from "../hooks/hooks";
import { useParams } from "react-router-dom";

const PostDetails = () => {
  const params = useParams();
  const { data, isFetched, isLoading } = usePost(params.postId);
  if(isLoading) {
    return <h2>loading....</h2>
  }

  return (
    <Box className={styles.layoutContainer}>
      <Box className={styles.mainSection}>
        <Box className={styles.postsSection}>
            <PostCard post={data?.post} context="post-details" />
        </Box>
      </Box>
      <Box className={styles.rightSection}>
        <Box className={styles.friendSuggestions}>
          <FriendSuggestions />
        </Box>
        <Box className={styles.profileActivity}>
          <ProfileActivity />
        </Box>
        <Box className={styles.chatFriends}>
          <FriendsList />
        </Box>
      </Box>
    </Box>
  );
};

export default PostDetails;

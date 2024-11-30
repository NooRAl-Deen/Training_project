import PostCard from "@/components/shared/post/PostCard";
import { Box } from "@mui/material";
import styles from "../styles/timeline.module.scss";
import { useUserPosts } from "@posts/hooks/hooks";
import PostsSkeleton from "@posts/skeletons/PostsSkeleton";
import useAuth from "@/hooks/useAuth";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import FriendsList from "@/components/shared/friends-list/FriendsList";
import ProfileActivity from "@/components/shared/profile-activity/ProfileActivity";
import PostsPageHeader from "@posts/components/PostsPageHeader";
import Stories from "../../stories/pages/Stories";
import FriendSuggestions from "@/components/shared/friends-suggestions/FriendSuggestions";
import { useTimeLine } from "../hooks/timeline";
import { useLocation } from "react-router-dom";
const Timeline = () => {

  const location = useLocation()
  const {
    data,
    isPending,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetched,
  } = useTimeLine({
    enabled: location.pathname === '/profile/news'
  });

  const { user } = useAuth();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, inView]);


  if (isPending) {
    return <PostsSkeleton />;
  }
  return (
    <Box className={styles.layoutContainer}>
      <Box className={styles.mainSection}>
        <Box className={styles.newPostSection}>
          <PostsPageHeader />
        </Box>

        <Stories />

        <Box className={styles.postsSection}>
          {data?.pages?.map((page) =>
            page.posts?.map((post, index) => (
              <PostCard key={post.id} post={post} innerRef={ref} context="timeline" />
            ))
          )}
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

export default Timeline;

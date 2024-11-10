import PostCard from "@posts/components/PostCard";
import { useUserPosts } from "@posts/hooks/hooks";
import PostsSkeleton from "@posts/skeletons/PostsSkeleton";
import AddPost from "@posts/components/AddPost";
import useAuth from "@/hooks/useAuth";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";
import FadeInSection from "@/components/ui/FadeInSection";

const Posts = () => {
  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useUserPosts();

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
    <>
      <AddPost user={user} />
      {data?.pages?.map((page) =>
        page.posts?.map((post, index) => (
          <FadeInSection key={index}>
            <PostCard key={post.id} post={post} innerRef={ref} />
          </FadeInSection>
        ))
      )}
      <Container>
        {isFetchingNextPage ? <CircularProgress size={20} /> : ""}
      </Container>
    </>
  );
};

export default Posts;

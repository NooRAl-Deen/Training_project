import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createNewPost,
  deletePost,
  getUserPosts,
  updatePost,
  getPost
} from "@posts/services/posts";
import {
  CREATE_POST_MUTATION_KEY,
  DELETE_POST_MUTATION_KEY,
  POSTS_QUERY_KEY,
  UPDATE_POST_MUTATION_KEY,
} from "@posts/constants/constants";
import { GET_POST_KEY } from "../constants/constants";


export const useUserPosts = (options) => {
  return useInfiniteQuery({
    queryKey: POSTS_QUERY_KEY,
    queryFn: getUserPosts,
    staleTime: 1000 * 60 * 5,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage?.current_page < lastPage?.total_pages 
        ? lastPage?.current_page + 1
        : undefined;
      return nextPage;
    },
    ...options
  });
};
export const usePost = (postId) => {
  return useQuery({
    queryKey: GET_POST_KEY,
    queryFn: () => getPost(postId),
    enabled: !!postId

  })
};

export const useCreatePost = (onSuccess) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: CREATE_POST_MUTATION_KEY,
    mutationFn: (post) => createNewPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
      onSuccess?.();
    },
  });
};

export const useUpdatePost = (id, onSuccess) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: UPDATE_POST_MUTATION_KEY,
    mutationFn: (postData) => {
      console.log("mutationFn called with id:", id);
      console.log("mutationFn called with postData:", postData);
      return updatePost(id, postData); 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
      onSuccess?.();
    },
  });
};

export const useDeletePost = (onSuccess) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: DELETE_POST_MUTATION_KEY,
    mutationFn: (id) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
      onSuccess?.();
    },
  });
};

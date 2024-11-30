import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../services/comment";
import {
  CREATE_COMMENT_KEY,
  DELETE_COMMENT_KEY,
  GET_COMMENTS_KEY,
  UPDATE_COMMENT_KEY,
} from "../constants/constants";

import { POSTS_QUERY_KEY } from "@posts/constants/constants";
import { TIMELINE_QUERY_KEY } from "../../../../features/timeline/constants/constants";
import { GET_POST_KEY } from "../../../../features/posts/constants/constants";

export const useComments = (postId, options) => {
  return useInfiniteQuery({
    queryKey: [GET_COMMENTS_KEY, postId],
    queryFn: ({ queryKey, pageParam }) => getComments({ queryKey, pageParam }),
    staleTime: 1000 * 60 * 5,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const commentsPerPage = lastPage.per_page;
      const totalPages = lastPage?.total_comments
        ? Math.ceil(lastPage?.total_comments / commentsPerPage)
        : 1;

      return lastPage?.current_page < totalPages
        ? lastPage?.current_page + 1
        : undefined;
    },
    ...options,
  });
};

export const useCreateComment = (postId, onSuccess) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: CREATE_COMMENT_KEY,
    mutationFn: (commentData) => createComment(postId, commentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: TIMELINE_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [GET_COMMENTS_KEY, postId] });
      queryClient.invalidateQueries({ queryKey: GET_POST_KEY });
      onSuccess?.();
    },
  });
};

export const useUpdateComment = (onSuccess) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: UPDATE_COMMENT_KEY,
    mutationFn: ({ postId, commentId, commentData }) =>
      updateComment({ postId, commentId, commentData }),
    onSuccess: () => {
      onSuccess?.();
    },
    onMutate: ({ postId, commentId, commentData }) => {
      console.log(postId);
      console.log(commentId);
      console.log(commentData);
      const key = [GET_COMMENTS_KEY, postId]
      console.log(queryClient.getQueryData(POSTS_QUERY_KEY))
    },
  });
};

export const useDeleteComment = (post_id, onSuccess) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: DELETE_COMMENT_KEY,
    mutationFn: ({ postId, commentId }) => deleteComment({ postId, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: TIMELINE_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [GET_COMMENTS_KEY, post_id] });
      queryClient.invalidateQueries({ queryKey: GET_POST_KEY });
      onSuccess?.();
    },
  });
};

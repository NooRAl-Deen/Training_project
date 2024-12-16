import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CREATE_LIKE_KEY } from "../constants/constants";
import { addLike } from "../services/like";
import { POSTS_QUERY_KEY, GET_POST_KEY } from "@posts/constants/constants";
import { TIMELINE_QUERY_KEY } from "../../../../features/timeline/constants/constants";

export const useLike = (context) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: CREATE_LIKE_KEY,
    mutationFn: (post) => addLike(post),
    onMutate: async (post) => {
      console.log(context);
      const contextKey = getQueryKeyForContext(context);
      await queryClient.cancelQueries(contextKey);

      const previousData = queryClient.getQueryData(contextKey);

      if (contextKey === GET_POST_KEY) {
        queryClient.setQueryData(contextKey, (oldData) => {
          const newData = {
            ...oldData,
            post: {
              ...oldData.post,  
              isLiked: !oldData.post.isLiked,  
              total_likes_count: oldData.post.isLiked
                ? oldData.post.total_likes_count - 1
                : oldData.post.total_likes_count + 1,
            },
          };
          return newData;
        });
      } else {
        queryClient.setQueryData(contextKey, (oldData) => {
          const newData = {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              posts: page.posts.map((p) =>
                p.id === post.id
                  ? {
                      ...p,
                      isLiked: !p.isLiked,
                      total_likes_count: p.isLiked
                        ? p.total_likes_count - 1
                        : p.total_likes_count + 1,
                    }
                  : p
              ),
            })),
          };

          return newData;
        });
      }

      return { previousData, contextKey };
    },
    onError: (_error, _post, context) => {
      if (context.previousData) {
        queryClient.setQueryData(context.contextKey, context.previousData);
      }
    },
    onSettled: (post) => {
      queryClient.invalidateQueries(getQueryKeyForContext(context));
    },
  });
};

const getQueryKeyForContext = (context) => {
  switch (context) {
    case "timeline":
      return TIMELINE_QUERY_KEY;
    case "posts":
      return POSTS_QUERY_KEY;
    case "post-details":
      return GET_POST_KEY;
    default:
      return GET_POST_KEY;
  }
};

const updatePostInData = (data, postId, updates) => {
  if (!data) return data;
  if (Array.isArray(data)) {
    return data.map((post) =>
      post.id === postId ? { ...post, ...updates } : post
    );
  }
  return { ...data, ...updates };
};

import { axiosPrivate } from "@/api/Axios";
import {
  CREATE_COMMENT_URL,
  DELETE_COMMENT_URL,
  GET_COMMENTS_URL,
  UPDATE_COMMENT_URL,
} from "../constants/constants";

export const getComments = async ({ queryKey, pageParam }) => {
  const [, postId] = queryKey;
  const url = GET_COMMENTS_URL(postId);
  const { data } = await axiosPrivate.get(`${url}?page=${pageParam}`);
  return data;
};

export const createComment = async (postId, commentData) => {
  const url = CREATE_COMMENT_URL(postId);
  const { data } = await axiosPrivate.post(url, commentData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

export const updateComment = async ({ postId, commentId, commentData }) => {
  const url = UPDATE_COMMENT_URL(postId, commentId);
  const { data } = await axiosPrivate.patch(url, commentData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

export const deleteComment = async ({ postId, commentId }) => {
  const url = DELETE_COMMENT_URL(postId, commentId);
  const { data } = await axiosPrivate.delete(url);
  return data;
};

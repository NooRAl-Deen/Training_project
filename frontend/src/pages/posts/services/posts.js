import { axiosPrivate } from "@/api/Axios";
import { CREATE_POST_URL, DELETE_POST_URL, GET_USER_POSTS_URL, UPDATE_POST_URL } from "@posts/constants/constants";

export const getUserPosts = async ({ pageParam }) => {
  const { data } = await axiosPrivate.get(`${GET_USER_POSTS_URL}?page=${pageParam}`);
  return data;
};

export const createNewPost = async (post) => {
  const { data } = await axiosPrivate.post(CREATE_POST_URL, post, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
  return data;
};

export const updatePost = async (id, post) => {
  const { data } = await axiosPrivate.patch(`${UPDATE_POST_URL}${id}`, post);
  return data;
};

export const deletePost = async (id) => {
  const { data } = await axiosPrivate.delete(`${DELETE_POST_URL}${id}`)
  return data;
}

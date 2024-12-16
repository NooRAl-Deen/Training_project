import { CREATE_LIKE_URL } from "../constants/constants"
import { axiosPrivate } from "@/api/Axios";

export const addLike = async (post) => {
    const url = CREATE_LIKE_URL(post.id);
    const { data } = await axiosPrivate.post(url);
    return data;
}
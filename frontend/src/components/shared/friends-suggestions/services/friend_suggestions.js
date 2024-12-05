import { axiosPrivate } from "@/api/Axios"
import { FRIEND_SUGGESTIONS_URL } from "../constants/constants"


export const getFriendSuggestions = async () => {
    const { data } = await axiosPrivate.get(FRIEND_SUGGESTIONS_URL);
    return data;
}
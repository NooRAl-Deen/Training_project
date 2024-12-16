import { axiosPrivate } from "@/api/Axios"
import { PROFILE_ACTIVITY_URL } from "../constants/constants"

export const getProfileActivity = async () => {
    const { data } = await axiosPrivate.get(PROFILE_ACTIVITY_URL);
    return data;
}
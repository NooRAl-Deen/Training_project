import { axiosPrivate } from "@/api/Axios"
import { TIMELINE_URL } from "../constants/constants"
export const getTimeLine = async ({ pageParam }) => {
    const { data } = await axiosPrivate.get(`${TIMELINE_URL}?page=${pageParam}`);
    return data
}
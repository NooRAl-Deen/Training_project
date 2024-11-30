import { axiosPrivate } from "@/api/Axios";
import {
  GET_USER_PROFILE_URL,
  UPDATE_USER_PROFILE_URL,
  LOGOUT_URL
} from "../constants/constants";

export const getUserProfile = async () => {
  const { data } = await axiosPrivate.get(GET_USER_PROFILE_URL);
  return data;
};

export const updateUserProfile = async (profileData) => {
  const { data } = await axiosPrivate.patch(
    UPDATE_USER_PROFILE_URL,
    profileData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};


export const logout = async () => {
  const { data } = await axiosPrivate.post(LOGOUT_URL);
  return data;
}

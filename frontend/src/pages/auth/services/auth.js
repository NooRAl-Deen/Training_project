import { axiosInstance } from "@/api/Axios";
import { LOGIN_URL, REGISTER_URL } from "../constants/constants";

export const login = async (credentials) => {
  const { data } = await axiosInstance.post(LOGIN_URL, credentials);
  return data;
};

export const register = async (credentials) => {
  const { data } = await axiosInstance.post(REGISTER_URL, credentials);
  return data;
};

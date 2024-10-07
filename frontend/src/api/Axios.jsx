import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_API_URL;

const axiosInstance = axios.create({
  baseURL,
});

const axiosPrivate = axios.create({
  baseURL,
});

axiosPrivate.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");

    request.headers["Authorization"] = `Bearer ${token}`;
    return request;
  },
  (error) => {
    throw error;
  }
);

export { axiosInstance, axiosPrivate };

import axios from "axios";

const baseUrl = "http://127.0.0.1:5000/api";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

const axiosPrivate = axios.create({
  baseURL: baseUrl,
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

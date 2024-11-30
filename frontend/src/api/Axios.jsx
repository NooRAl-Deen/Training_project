import axios from "axios";
import Cookies from "universal-cookie";

const baseURL = import.meta.env.VITE_BASE_API_URL;
const cookie = new Cookies();

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosPrivate = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "X-CSRF-Token": cookie.get("csrf_access_token"),
  },
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const csrfToken = cookie.get("csrf_access_token");
    console.log(csrfToken)
    if (csrfToken) {
      config.headers["X-CSRF-Token"] = csrfToken;
    } else {
      console.warn("CSRF token is missing.");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  (response) => {
    console.log(response.status);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const csrfToken = cookie.get("csrf_refresh_token");
        await axiosInstance.post(
          "/refresh",
          {},
          {
            headers: {
              "X-CSRF-Token": csrfToken,
            },
          }
        );
        return axiosPrivate(originalRequest);
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstance, axiosPrivate };

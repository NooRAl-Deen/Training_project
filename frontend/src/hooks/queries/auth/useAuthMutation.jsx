import { useMutation } from "@tanstack/react-query";
import {axiosInstance} from "../../../api/Axios";

const useAuthMutation = (url) => {
  return useMutation({
    mutationFn: async (payload) => {
      try {
        const { data } = await axiosInstance.post(url, payload);
        return data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export default useAuthMutation;

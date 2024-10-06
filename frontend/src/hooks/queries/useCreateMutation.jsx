import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "../../api/Axios";

const useCreateMutation = (url) => {
  return useMutation({
    mutationFn: async (payload) => {
      try {
        const { data } = await axiosPrivate.post(url, payload);
        return data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export default useCreateMutation;

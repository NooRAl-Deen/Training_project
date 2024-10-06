import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "../../api/Axios";

const useUpdateMutation = (url) => {
  return useMutation({
    mutationFn: async (payload) => {
      try {
        const { data } = await axiosPrivate.put(url, payload);
        return data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export default useUpdateMutation;

import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "../../api/Axios";

const useDeleteMutation = (url) => {
  return useMutation({
    mutationFn: async (id) => {
      try {
        const { data } = await axiosPrivate.delete(`${url}/${id}`);
        return data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export default useDeleteMutation;

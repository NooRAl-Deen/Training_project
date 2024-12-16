import { useQuery } from "@tanstack/react-query";
import { PROFILE_ACTIVITY_KEY } from "../constants/constants";
import { getProfileActivity } from "../services/profile-activity";

export const useProfileActivity = () => {
  return useQuery({
    queryKey: PROFILE_ACTIVITY_KEY,
    queryFn: () => getProfileActivity(),
  });
};

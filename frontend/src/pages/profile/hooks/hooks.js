import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserProfile,
  updateUserProfile,
  logout
} from "@/pages/profile/services/profile";
import {
  PROFILE_MUTATION_KEY,
  PROFILE_QUERY_KEY,
  LOGOUT_MUTATION_KEY
} from "@/pages/profile/constants/constants";

export const useProfile = () =>
  useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 5,
  });

export const useUpdateProfile = (onSuccess) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: PROFILE_MUTATION_KEY,
    mutationFn: (profileData) => updateUserProfile(profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
      onSuccess?.();
    },
    onError: (error) => {
      throw new Error(error)
    }
  });
};

export const useLogout = (onSuccess) => {
  return useMutation({
    mutationKey: LOGOUT_MUTATION_KEY,
    mutationFn: () => logout(),
    onSuccess: () => {
      onSuccess?.();
    }
  });
}

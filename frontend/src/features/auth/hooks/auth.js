import { useMutation } from "@tanstack/react-query";
import { login, register } from "../services/auth";
import { LOGIN_MUTATION_KEY, REGISTER_MUTATION_KEY } from "../constants/constants";

export const useLogin = (onSuccess) => {
  return useMutation({
    mutationKey: LOGIN_MUTATION_KEY,
    mutationFn: (credentials) => login(credentials),
    onSuccess: (data) => {
        onSuccess?.(data)
    }
  });
};

export const useRegister = (onSuccess) => {
  return useMutation({
    mutationKey: REGISTER_MUTATION_KEY,
    mutationFn: (credentials) => register(credentials),
    onSuccess: (data) => {
        onSuccess?.(data)
    }
  });
};

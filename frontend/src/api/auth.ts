import {
  AuthLogin,
  AuthLoginSchema,
  AuthRegister,
  AuthRegisterSchema,
  type AuthCredentialsDTO,
} from "@/types/auth";

import apiClient from "./client";

export const authApi = {
  register: async (payload: AuthCredentialsDTO) => {
    const { data } = await apiClient.post<{ data: AuthRegister }>("/auth/register", payload);
    return AuthRegisterSchema.parse(data.data);
  },

  login: async (payload: AuthCredentialsDTO) => {
    const { data } = await apiClient.post<{ data: AuthLogin }>("/auth/login", payload);
    const token = data.data;
    AuthLoginSchema.parse(token);
    localStorage.setItem("token", token);
    return token;
  },
};

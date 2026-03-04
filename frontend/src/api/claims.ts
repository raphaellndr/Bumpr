import axios from "axios";

import type { Claim, CreateClaimDTO, UpdateClaimDTO } from "@/types/claims";

const api = axios.create({ baseURL: "/api" });

export const claimsApi = {
  getAll: async (status?: string, sortBy?: string, order?: string): Promise<Claim[]> => {
    const { data } = await api.get<{ data: Claim[] }>("/claims", {
      params: { status, sortBy, order },
    });
    return data.data;
  },
  getById: async (id: string): Promise<Claim> => {
    const { data } = await api.get<{ data: Claim }>(`/claims/${id}`);
    return data.data;
  },
  create: async (payload: CreateClaimDTO): Promise<Claim> => {
    const { data } = await api.post<{ data: Claim }>("/claims", payload);
    return data.data;
  },
  update: async (id: string, payload: UpdateClaimDTO): Promise<Claim> => {
    const { data } = await api.patch<{ data: Claim }>(`/claims/${id}`, payload);
    return data.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/claims/${id}`);
  },
};

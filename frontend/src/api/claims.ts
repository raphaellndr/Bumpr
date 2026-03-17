import z from "zod";

import { ClaimSchema, type Claim, type CreateClaimDTO, type UpdateClaimDTO } from "@/types/claims";

import apiClient from "./client";

export const claimsApi = {
  getAll: async (status?: string, sortBy?: string, order?: string): Promise<Claim[]> => {
    const { data } = await apiClient.get<{ data: Claim[] }>("/claims", {
      params: {
        ...(status && { status }),
        ...(sortBy && { sortBy }),
        ...(order && { order }),
      },
    });
    return z.array(ClaimSchema).parse(data.data);
  },

  getById: async (id: number): Promise<Claim> => {
    const { data } = await apiClient.get<{ data: Claim }>(`/claims/${id}`);
    return ClaimSchema.parse(data.data);
  },

  create: async (payload: CreateClaimDTO): Promise<Claim> => {
    try {
      console.log(payload);
      const { data } = await apiClient.post<{ data: Claim }>("/claims", payload);
      return ClaimSchema.parse(data.data);
    } catch (err) {
      const error = err as Error;
      console.log(error);

      throw new Error(error.message);
    }
  },

  update: async (id: number, payload: UpdateClaimDTO): Promise<Claim> => {
    const { data } = await apiClient.patch<{ data: Claim }>(`/claims/${id}`, payload);
    return ClaimSchema.parse(data.data);
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/claims/${id}`);
  },
};
